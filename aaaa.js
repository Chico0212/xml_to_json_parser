import { Xml, ARQ } from "./index.js"

const xml = new Xml(ARQ)

console.log(xml.getAllAtributes("<tag a='b' b='c'>"))


