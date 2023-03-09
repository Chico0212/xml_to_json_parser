import * as fs from "fs";
const TEST_FILLE_NAME = "teste.xml";

const AUTO_CLOSE_TAG_PATTERN = /\<*\/>/g;
const ALL_SPACES_AND_TABS = /(\n|\t|\r)/g;

class Xml {
  body = {};
  constructor(filePath: string) {
    // TEST_FILLE_NAME sem quebra de linhas
    const file = fs
      .readFileSync(filePath)
      .toString()
      .replace(ALL_SPACES_AND_TABS, "");

    this.build(file);
  }

  private build(file: string) {
    console.log()
  }


  isAutoClose(tag: string) {
    return AUTO_CLOSE_TAG_PATTERN.test(tag);
  }

  getAllAtributes(tag: string) {
    const atributeList = tag.split(" ").slice(1);
    const lastPosition = atributeList.length - 1;
    const last = atributeList[lastPosition];

    // reoves ">" if last item contains it
    if (last.indexOf(">") > 0) atributeList[lastPosition] = last.slice(0, -1);

    let tagAtributes = new Map<string, string>();

    for (let i = 0; i < atributeList.length; i++) {
      let item = (atributeList[i]).split("=");
      tagAtributes.set(item[0], item[1])
    }

    return tagAtributes;
  }
}

export { TEST_FILLE_NAME, Xml };
