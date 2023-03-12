import { SrvRecord } from "dns";
import * as fs from "fs";
const TEST_FILLE_NAME = "teste.xml";

const AUTO_CLOSE_TAG_PATTERN = /\<*\/>/g;
const ALL_SPACES_AND_TABS = /(\n|\t|\r)/g;
const TAG_HAVE_VALUE = />\w+</g;


class Xml {
  body = {}
  constructor(filePath: string, jsonName: boolean | string = false) {
    // TEST_FILLE_NAME sem quebra de linhas
    const file = fs
      .readFileSync(filePath)
      .toString()
      .replace(ALL_SPACES_AND_TABS, "");

    this.build(file);

    if(jsonName) JSON.parse(JSON.stringify(this.body));
  }

  private build(file: string) {
    const splitedXmlFile = file.split("<");
    const startPoint = splitedXmlFile[0];
    this.body = this.getAllSubtags(startPoint, splitedXmlFile)
  }

  private getAllSubtags(tag: string, splitedXmlFile: string[]){ 
    return {"this": "is not working yet"}
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
}

export { TEST_FILLE_NAME, Xml };
