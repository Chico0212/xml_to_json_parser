import * as fs from "fs";
import internal from "stream";
const ARQ = "teste.xml";

const IsAutocloseRegEx = /\<*\/>/g;

class Xml {
  body = {};
  constructor(filePath) {
    // arquivo sem quebra de linhas
    const file = fs
      .readFileSync(filePath)
      .toString()
      .replace(/(\n|\t|\r)/g, "");

    this.body = this.build(file);
  }

  build(file) {}

  isAutoClose(tag) {
    return IsAutocloseRegEx.test(tag);
  }

  getAllAtributes(tag) {
    const atributeList = new Array(...tag.split(" ").slice(1));
    const lastPosition = atributeList.length - 1;
    const last = atributeList[lastPosition];

    // tira o caractere > casa exista no ultimo item
    if (last.indexOf(">") > 0) atributeList[lastPosition] = last.slice(0, -1);

    var obj = {}

    for (let i = 0; i < atributeList.length; i++){
      var item = atributeList[i].split("=")
      obj[item[0]] = item[1]
    }

    return obj;
  }
}

export { ARQ, Xml };
