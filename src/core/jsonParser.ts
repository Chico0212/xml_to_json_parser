import * as fs from "fs"

class JsonParser {
  public parse(jsonName: string, body: any): void {
    if (!jsonName.includes(".json")) jsonName = `${jsonName}.json`;
    const objectParseJSON = this.getObject(body);
  
    fs.writeFileSync(jsonName, JSON.stringify(objectParseJSON));
  }
  
  private getObject(map: any): any {
    "AAAA";
  }
}

export const JsonDocumentParser = new JsonParser()