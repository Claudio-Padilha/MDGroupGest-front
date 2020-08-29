import { createGlobalStyle } from "styled-components";

import "./fonts.css";

export const CONSTANTS = {
  margin: 16,
  heroSize: 680,
  maxWidth: 1152,
  boxShadow: "0 0 3rem #333",
  //──── Colors ────────────────────────────────────────────────────────────────────────────
  colors: {
    lightGrey: "#C9C9C9",
    mediumGrey: "#868686",
    darkGrey: "#464646",
    green: "#37981F",
    white: "#FFF",
    red: "#FF461E",
    black: "#000",
    // feedback: {
    //   success: {
    //     default: "#2DCA73",
    //     hover: "#57D48F",
    //     background: "#EAF9F1"
    //   },
    //   error: {
    //     default: "#DB1E3B",
    //     hover: "#E24B61",
    //     background: "#FBE8EB"
    //   },
    //   warning: {
    //     default: "#FEC35A",
    //     hover: "#FECE7B",
    //     background: "#FEF8EE"
    //   }
    // },
    muted: {
      red: "#F1A5B1",
      orange: "#F9B9B0",
      yellow: "#FFE7BD",
      blue: "#BEE1F5",
      lightBlue: "#E8F6FA",
      green: "#ABEAC7",
      purple: "#CBABEA"
    }
  }
};

export const GlobalStyles = createGlobalStyle`
    html {
      scroll-behavior: smooth;
    }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
`;
