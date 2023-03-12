import { SrvRecord } from "dns";
import * as fs from "fs";
import { json } from "stream/consumers";
const TEST_FILLE_NAME = "teste.xml";

const AUTO_CLOSE_TAG_PATTERN = /\<*\/>/g;
const ALL_SPACES_AND_TABS = /(\n|\t|\r)/g;
const TAG_HAVE_VALUE = />\w+</g;

class Xml {
  body = {} as Map<any, any>;
  constructor(filePath: string, jsonName: string = "") {
    // TEST_FILLE_NAME sem quebra de linhas
    const file = fs
      .readFileSync(filePath)
      .toString()
      .replace(ALL_SPACES_AND_TABS, "");

    this.build(file);

    if (jsonName != "") this.parse(jsonName);
  }

  private parse(jsonName: string) {
    if (!jsonName.includes(".json")) jsonName = `${jsonName}.json`;
    const bodyEntries = this.getAllEntries(this.body).slice(0, -1);
    console.log(bodyEntries);

    fs.writeFileSync(jsonName, bodyEntries);
  }

  private build(file: string) {
    const splitedXmlFile = file.split("<");
    const startPoint = splitedXmlFile[1];
    this.body = this.getAllSubtags(startPoint, splitedXmlFile);
  }

  private getAllSubtags(tag: string, xml: string[]): any {
    const atributeList = this.getAllAtributes(tag);
    const tagName = tag.slice(0, tag.indexOf(" "));

    if (this.isAutoClose(tag))
      return new Map([
        [
          `${tagName}`,
          new Map([
            ["atributes", atributeList],
            ["value", null],
          ]),
        ],
      ]);

    if ((this, this.isAValueatedTag(tag))) {
      return new Map([
        [
          `${tagName}`,
          new Map([
            ["atributes", null],
            ["value", tag.split(">")[1]],
          ]),
        ],
      ]);
    }

    const indexOfNextTag = xml.indexOf(tag) + 1;
    const next = xml[indexOfNextTag];

    return new Map([
      [`${tagName}`, this.getAllSubtags(next, xml.slice(indexOfNextTag))],
    ]);
  }

  private isAutoClose(tag: string) {
    return AUTO_CLOSE_TAG_PATTERN.test(tag);
  }

  private isAValueatedTag(tag: string) {
    return TAG_HAVE_VALUE.test(tag);
  }

  private getAllAtributes(tag: string) {
    const atributeList = tag.split(" ").slice(1);

    if (atributeList.length == 0) {
      return null;
    }

    const lastPosition = atributeList.length - 1;
    const last = atributeList[lastPosition];

    // removes ">" if last item contains it
    if (last.indexOf(">") > 0) atributeList[lastPosition] = last.slice(0, -1);

    let tagAtributes = new Map<string, string>();

    for (let i = 0; i < atributeList.length; i++) {
      let item = atributeList[i].split("=");
      tagAtributes.set(item[0], item[1]);
    }

    return tagAtributes;
  }

  private getAllEntries(map: Map<string, string | Map<string, string>>) {
    return "this isn't workin yet"
  }
}

export { TEST_FILLE_NAME, Xml };
