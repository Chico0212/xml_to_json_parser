"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_FILLE_NAME = exports.ALL_SPACES_AND_TABS_PATTERN = exports.AUTO_CLOSE_TAG_PATTERN = exports.VALUATED_TAG_PATTERN = exports.CLOSE_TAG_PATTERN = void 0;
const CLOSE_TAG_PATTERN = (tag) => {
    return RegExp(`/(.+)*${tag}(.+)*>`);
};
exports.CLOSE_TAG_PATTERN = CLOSE_TAG_PATTERN;
const VALUATED_TAG_PATTERN = RegExp(">(.+)");
exports.VALUATED_TAG_PATTERN = VALUATED_TAG_PATTERN;
const AUTO_CLOSE_TAG_PATTERN = RegExp(".+/>");
exports.AUTO_CLOSE_TAG_PATTERN = AUTO_CLOSE_TAG_PATTERN;
const ALL_SPACES_AND_TABS_PATTERN = RegExp("(\n|\t|\r)");
exports.ALL_SPACES_AND_TABS_PATTERN = ALL_SPACES_AND_TABS_PATTERN;
const TEST_FILLE_NAME = "teste.xml";
exports.TEST_FILLE_NAME = TEST_FILLE_NAME;
//# sourceMappingURL=constants.js.map