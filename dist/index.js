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
const CLOSE_TAG_PATTERN = RegExp("/(.+)>");
const VALUATED_TAG_PATTERN = RegExp(">(.+)");
const AUTO_CLOSE_TAG_PATTERN = RegExp(".+/>");
const ALL_SPACES_AND_TABS_PATTERN = RegExp("(\n|\t|\r)");
class Xml {
    constructor(filePath, jsonName = "") {
        this.body = {};
        // TEST_FILLE_NAME sem quebra de linhas
        const file = fs
            .readFileSync(filePath)
            .toString()
            .replace(ALL_SPACES_AND_TABS_PATTERN, "");
        this.build(file);
        if (jsonName)
            this.parse(jsonName);
    }
    parse(jsonName) {
        if (!jsonName.includes(".json"))
            jsonName = `${jsonName}.json`;
        const objectParseJSON = this.getObject(this.body);
        fs.writeFileSync(jsonName, JSON.stringify(objectParseJSON));
    }
    build(file) {
        const splitedXmlFile = file.split("<");
        const startPoint = splitedXmlFile[1];
        this.body = this.getAllSubtags(startPoint, splitedXmlFile);
    }
    getAllSubtags(tag, xml) {
        const atributeList = this.getAllAtributes(tag);
        const tagName = tag.slice(0, tag.indexOf(" "));
        let teste;
        if (this.isAutoClose(tag)) {
            teste = new Map([
                [
                    `${tagName}`,
                    new Map([
                        ["atributes", atributeList],
                        ["value", null],
                    ]),
                ],
            ]);
            return teste;
        }
        if (this.isAValueatedTag(tag)) {
            console.log(tag, tag.split(">")[1]);
            teste = new Map([
                [
                    `${tagName}`,
                    new Map([
                        ["atributes", null],
                        ["value", tag.split(">")[1]],
                    ]),
                ],
            ]);
            return teste;
        }
        const indexOfNextTag = xml.indexOf(tag) + 1;
        const next = xml[indexOfNextTag];
        return new Map([
            [`${tagName}`, this.getAllSubtags(next, xml.slice(indexOfNextTag))],
        ]);
    }
    isAutoClose(tag) {
        return AUTO_CLOSE_TAG_PATTERN.test(tag);
    }
    isAValueatedTag(tag) {
        return VALUATED_TAG_PATTERN.test(tag);
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
    getObject(map) {
        let jsonParseObject;
        for (const [key, value] of map) {
            if (value instanceof (Map)) {
                jsonParseObject = Object.fromEntries(Array([key, this.getObject(value)]));
                continue;
            }
            jsonParseObject = Object.fromEntries(Array([key, value]));
        }
        return jsonParseObject;
    }
}
exports.Xml = Xml;
//# sourceMappingURL=index.js.map