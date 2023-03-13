import { SrvRecord } from "dns";
import * as fs from "fs";
import { json } from "stream/consumers";
const TEST_FILLE_NAME = "teste.xml";

const CLOSE_TAG_PATTERN = RegExp("/(.+)>");
const VALUATED_TAG_PATTERN = RegExp(">(.+)");
const AUTO_CLOSE_TAG_PATTERN = RegExp(".+/>");
const ALL_SPACES_AND_TABS_PATTERN = RegExp("(\n|\t|\r)");

class Xml {
  body = {} as Map<any, any>;
  constructor(filePath: string, jsonName: string | boolean = "") {
    // TEST_FILLE_NAME sem quebra de linhas
    const file = fs
      .readFileSync(filePath)
      .toString()
      .replace(ALL_SPACES_AND_TABS_PATTERN, "");

    this.build(file);

    if (jsonName) this.parse(jsonName as string);
  }

  private parse(jsonName: string) {
    if (!jsonName.includes(".json")) jsonName = `${jsonName}.json`;
    const objectParseJSON = this.getObject(this.body);

    fs.writeFileSync(jsonName, JSON.stringify(objectParseJSON));
  }

  private build(file: string) {
    const splitedXmlFile = file.split("<");
    const startPoint = splitedXmlFile[1];
    this.body = this.getAllSubtags(startPoint, splitedXmlFile);
  }

  private getAllSubtags(tag: string, xml: string[]): any {
    return "this isn't working yet";
  }

  private isAutoClose(tag: string) {
    return AUTO_CLOSE_TAG_PATTERN.test(tag);
  }

  private isAValueatedTag(tag: string) {
    return VALUATED_TAG_PATTERN.test(tag);
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

  private getObject(map: Map<string, string | Map<string, string>>): any {
    let jsonParseObject;
    for (const [key, value] of map) {
      if (value instanceof Map<string, string | Map<string, string>>) {
        jsonParseObject = Object.fromEntries(
          Array([key, this.getObject(value)])
        );
        continue;
      }

      jsonParseObject = Object.fromEntries(Array([key, value]));
    }

    return jsonParseObject;
  }
}

export { TEST_FILLE_NAME, Xml };
