import themed from "./themed";

/*
colors: {
      brand: {
        primary: "palevioletred",
        accent: "papayawhip"
      }

*/

export const H1 = themed.h1`
  color: @var-colors.brand.primary;
  background-color: gray;
`;

export const H2 = themed.h2`
  font-size: 18px;
`;

export const Container = themed.div`
  background-color: @var-colors.brand.accent;
`;
