import { css } from "styled-components";

export default {
  dir: "left",
  dirInv: "right",
  var: {
    colors: {
      brand: {
        primary: "palevioletred",
        accent: "papayawhip"
      }
    },
    font: {
      sizes: {
        sm: "10px",
        md: "14px",
        lg: "18px",
        xl: "21px"
      }
    }
  },
  css: {
    font: {
      primary: css`
        color: palevioletred;
        font-size: 14px;
        background-color: papayawhip;
        padding: 50px;
      `,
      accent: css`
        color: papayawhip;
        font-size: 14px;
        background-color: palevioletred;
        border: 2px solid papayawhip;
        padding: 50px;
      `
    }
  }
};
