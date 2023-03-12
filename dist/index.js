"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xml = exports.TEST_FILLE_NAME = void 0;
const fs = __importStar(require("fs"));
const TEST_FILLE_NAME = "teste.xml";
exports.TEST_FILLE_NAME = TEST_FILLE_NAME;
const AUTO_CLOSE_TAG_PATTERN = /\<*\/>/g;
const ALL_SPACES_AND_TABS = /(\n|\t|\r)/g;
const TAG_HAVE_VALUE = />\w+</g;
class Xml {
    constructor(filePath, jsonName = false) {
        this.body = {};
        // TEST_FILLE_NAME sem quebra de linhas
        const file = fs
            .readFileSync(filePath)
            .toString()
            .replace(ALL_SPACES_AND_TABS, "");
        this.build(file);
        // if(jsonName) fs.writeFileSync(jsonName as string);
    }
    build(file) {
        const splitedXmlFile = file.split("<");
        const startPoint = splitedXmlFile[0];
        this.getAllSubtags(startPoint, splitedXmlFile);
    }
    getAllSubtags(tag, xml) {
        const atributeList = this.getAllAtributes(tag);
        const indexOfTagNextTag = xml.indexOf(tag) + 1;
        const next = xml[indexOfTagNextTag];
        if (this.isAutoClose(tag) || this.isAValueatedTag(tag)) {
            return {
                tag: this.getAllSubtags(next, xml.slice(indexOfTagNextTag)),
                atributes: atributeList,
                value: tag.split(">")[1],
            };
        }
        if (RegExp(`/${tag}>`).test(tag))
            return new Map([
                [`${tag}`, this.getAllSubtags(next, xml.slice(indexOfTagNextTag))],
            ]);
        return;
    }
    isAutoClose(tag) {
        return AUTO_CLOSE_TAG_PATTERN.test(tag);
    }
    isAValueatedTag(tag) {
        return TAG_HAVE_VALUE.test(tag);
    }
    getAllAtributes(tag) {
        const atributeList = tag.split(" ").slice(1);
        if (atributeList.length == 0) {
            return null;
        }
        const lastPosition = atributeList.length - 1;
        const last = atributeList[lastPosition];
        // removes ">" if last item contains it
        if (last.indexOf(">") > 0)
            atributeList[lastPosition] = last.slice(0, -1);
        let tagAtributes = new Map();
        for (let i = 0; i < atributeList.length; i++) {
            let item = atributeList[i].split("=");
            tagAtributes.set(item[0], item[1]);
        }
        return tagAtributes;
    }
}
exports.Xml = Xml;
//# sourceMappingURL=index.js.map