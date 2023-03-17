import * as fs from "fs";
import {
  ALL_SPACES_AND_TABS_PATTERN,
  TEST_FILLE_NAME,
  XmlProp,
} from "../utils/constants";
import { JsonDocumentParser } from "./jsonParser";
import { TagValidator } from "./tagValidator";

class Xml {
  body = {} as Map<any, any>;
  constructor(filePath: string, jsonName: string | boolean = "") {
    // TEST_FILLE_NAME sem quebra de linhas
    const file = fs
      .readFileSync(filePath)
      .toString()
      .replace(ALL_SPACES_AND_TABS_PATTERN, "");

    this.build(file);

    if (jsonName) JsonDocumentParser.parse(jsonName as string, this.body);
  }

  private build(file: string): void {
    const splitedXmlFile = file.split("<");
    const startPoint = splitedXmlFile[1];
    this.body = this.getAllSubtags(startPoint, splitedXmlFile);
  }

  private getAllSubtags(entryTag: string, xml: string[]): any {
    for (const tag of xml) console.log(TagValidator.getTagName(tag));
  }

  private getAllAtributes(tag: string): Map<string, string> | null {
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
