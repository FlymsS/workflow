import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/300.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { UIProvider } from "@/context/ui";
import { EntriesProvider } from "@/context/entries";
import { lightTheme, darkTheme } from "@/themes";
import { TeamsProvider } from "@/context/proyects";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <TeamsProvider>
        <EntriesProvider>
          <UIProvider>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </EntriesProvider>
      </TeamsProvider>
    </SnackbarProvider>
  );
}
