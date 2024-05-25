import { createTheme, ThemeOptions } from "@mui/material";

interface CustomThemeOptions extends ThemeOptions {
  palette?: {
    primary?: {
      main: string;
    };
    secondary?: {
      main: string;
    };
    background?: {
      default: string;
    };
    text?: {
      primary: string;
      secondary: string;
    };
  };
  typography?: {
    fontFamily: string;
  };
  breakpoints?: {
    values: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
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
    fontFamily: ["Inter", "Playfair Display", "Roboto", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1024,
      xl: 1240,
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
