import {
  ALL_SPACES_AND_TABS_PATTERN,
  AUTO_CLOSE_TAG_PATTERN,
  CLOSE_TAG_PATTERN,
  TEST_FILLE_NAME,
  VALUATED_TAG_PATTERN,
} from "../utils/constants";

export const TagValidator = {
  isAutoClose(tag: string): boolean {
    return AUTO_CLOSE_TAG_PATTERN.test(tag);
  },

  isAValueatedTag(tag: string): boolean {
    return VALUATED_TAG_PATTERN.test(tag);
  },

  isCloseTag(tagName: string, tag: string): boolean {
    return CLOSE_TAG_PATTERN(tagName).test(tag);
  },

  getTagName(tag: string) {
    let tagName = tag.split(" ")[0];
    if (tag.indexOf(">") > 0) tagName = tag.slice(0, -1);
    return tagName;
  },
}
