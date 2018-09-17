import { isEmpty as _isEmpty } from "lodash";

import processTokens from "./expressions";

export default function processTemplate(stringParts, expressions) {
  if (_isEmpty(stringParts)) {
    return {
      strs: stringParts,
      exps: expressions
    };
  }

  const parsed = parseStringTags(stringParts, expressions);
  const exps = processTokens(parsed.exps);

  return {
    strs: parsed.strs,
    exps
  };
}

/**
 * parse tagged template to create new expressions
 *  from token pattern `/(@(.*):|@(.*))/gi`
 *
 * @param {Array<strings>} strs - string parts of tagged template
 * @param {Array} exps - expressions of tagged template
 *
 * @return {{ strs:Array, exps:Array }}
 */
function parseStringTags(strs, exps) {
  function parse(accum, str, ndx) {
    /**
     * regex to match string tags
     *
     * @type {RegExp}
     */
    const tag = /(@(.*):|@(.*))/gi;

    /**
     * pattern to mark tag position to
     *  split string at.
     *
     * @type {string}
     */
    const mrk = "@@-%-@@";

    /**
     * regex pattern of `mrk`
     *
     * @type {RegExp}
     */
    const mre = new RegExp(mrk, "g");

    /**
     * next tagged template expression for
     *  current string part
     *
     * @type {*}
     */
    const nxtExp = exps[ndx] ? [exps[ndx]] : [];

    /**
     * tags extracted from tagged template
     *  current string part
     *
     * @type {Array}
     */
    const newTag = str.match(tag) || [];

    /**
     * splitted strings parts of tagged template
     *  current string part making enw parts
     *
     * @type {Array}
     */
    const newStr = str.replace(tag, mrk).split(mre) || [];

    /**
     * return parse tagged template args
     *
     * @type {{ strs:Array, exps:Array }}
     */
    const x = {
      strs: [...accum.strs, ...newStr],
      exps: [...accum.exps, ...newTag, ...nxtExp]
    };
    return x;
  }

  const r = strs.reduce(parse, { strs: [], exps: [] });
  return r;
}
