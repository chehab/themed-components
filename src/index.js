import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import theme from "./theme";
import { Container, H1, H2 } from "./components";

function App() {
  return (
    <Container>
      <H1>Hello CodeSandbox</H1>
      <H2>Start editing to see some magic happen!</H2>
    </Container>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  rootElement
);
