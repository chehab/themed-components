import styled from "styled-components";
import { has as _has } from "lodash";

import themed from "./themed";
import {
  isRTL,
  isLTR,
  propsIs,
  propsNot,
  propsOneOf,
  propsAllOf
} from "./utils";

export default Object.entries(styled).reduce(
  (r, [k, v]) => {
    const isFunc = typeof v === "function";
    const isComp = _has(v, "attrs") && _has(v, "withConfig");

    if (isFunc && isComp) {
      /* eslint-disable no-param-reassign */
      r[k] = themed(v);
      r[k].attrs = (...args) => themed(v.attrs(...args));
      r[k].withConfig = (...args) => themed(v.withConfig(...args));
      /* eslint-enable no-param-reassign */
    }

    return r;
  },
  {
    ...styled,
    isRTL,
    isLTR,
    is: propsIs,
    not: propsNot,
    oneOf: propsOneOf,
    allOf: propsAllOf
  }
);
