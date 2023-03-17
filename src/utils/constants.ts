const CLOSE_TAG_PATTERN = (tag: string): RegExp => {
  return RegExp(`/(.+)*${tag}(.+)*>`);
};

const VALUATED_TAG_PATTERN = RegExp(">(.+)");
const AUTO_CLOSE_TAG_PATTERN = RegExp(".+/>");
const ALL_SPACES_AND_TABS_PATTERN = RegExp("(\n|\t|\r)");
const TEST_FILLE_NAME = "teste.xml";

interface XmlProp {
  tagName: string;
  atributes: Map<string, string>;
  value: Array<Map<string, XmlProp> | string>;
}

export {
  CLOSE_TAG_PATTERN,
  VALUATED_TAG_PATTERN,
  AUTO_CLOSE_TAG_PATTERN,
  ALL_SPACES_AND_TABS_PATTERN,
  TEST_FILLE_NAME,
  XmlProp,
};
