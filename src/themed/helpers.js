import processTemplate from "./processTemplate";

/**
 *
 * @param {function} styledTagged -- styled-component tagged string function
 */
export default function themed(styledTagged) {
  return (_stringParts, ..._expressions) => {
    const r = processTemplate(_stringParts, _expressions);
    const { strs, exps } = r;

    // const err = ErrorStackParser.parse(new Error('BOOM'))
    // console.log(err)

    return styledTagged(strs, ...exps);
  };
}

themed.__getUserLocaleDir = () => "ltr";
themed.getUserLocaleDir = func => {
  themed.__getUserLocaleDir = func;
};
