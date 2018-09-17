import { css } from "styled-components";
import { get as _get } from "lodash";

import themed from "./themed";

function createGetPropAndMatch({ propPath, getMatch, styledTag }) {
  return (...styledArgs) => props => {
    const prop = _get(props, propPath);

    if (getMatch(prop, { props, styledArgs })) {
      return themed(styledTag)(...styledArgs);
    }

    return null;
  };
}

export function propsIs(propPath, match) {
  const getMatch = prop => prop || prop === match;

  return createGetPropAndMatch({
    propPath,
    getMatch,
    styledTag: css
  });
}

export function propsNot(propPath, match) {
  const getMatch = prop => !prop || prop !== match;

  return createGetPropAndMatch({
    propPath,
    getMatch,
    styledTag: css
  });
}

export function propsOneOf(...propsPaths) {
  const getMatch = (_, { props }) =>
    propsPaths.reduce((r, p) => {
      return r || _get(props, p, false);
    }, false);

  return createGetPropAndMatch({
    getMatch,
    styledTag: css
  });
}

export function propsAllOf(...propsPaths) {
  const getMatch = (_, { props }) =>
    propsPaths.reduce((r, p) => {
      return r && _get(props, p, false);
    }, true);

  return createGetPropAndMatch({
    getMatch,
    styledTag: css
  });
}

export function isRTL(...styledArgs) {
  const getMatch = () => themed.__getUserLocaleDir() === "rtl";

  return createGetPropAndMatch({
    getMatch,
    styledTag: css
  })(...styledArgs);
}

export function isLTR(...styledArgs) {
  const getMatch = () => themed.__getUserLocaleDir() === "ltr";

  return createGetPropAndMatch({
    getMatch,
    styledTag: css
  })(...styledArgs);
}
