import { createTheme, ThemeOptions } from "@mui/material";

interface CustomThemeOptions extends ThemeOptions {
  palette?: {
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
    background: {
      default: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
  };
  typography: {
    fontFamily: string;
  };
}

const themeOptions: CustomThemeOptions = {
  palette: {
    primary: {
      main: "#fcb541",
    },
    secondary: {
      main: "#0d1941",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#060708",
      secondary: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Playfair Display", "Inter", "roboto", "sans-serif"].join(","),
  },
};

const theme = createTheme(themeOptions);

export default theme;
