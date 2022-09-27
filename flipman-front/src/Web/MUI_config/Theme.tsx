import { ThemeProvider } from "material-ui-core";
import {ReactNode} from "react"
import { createMuiTheme } from "material-ui-core/styles"
  
interface ThemeProps {
    children: ReactNode;
}

  function Theme({children} : ThemeProps) {
      

    const theme = createMuiTheme({
      palette: {
        primary: {
          light: "#63b8ff",
          main: "#0989e3",
          dark: "#005db0",
          contrastText: "#000",
        },
        secondary: {
          main: "#4db6ac",
          light: "#82e9de",
          dark: "#00867d",
          contrastText: "#000",
        },
      },
    });
  
    return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  }
  
  export default Theme;