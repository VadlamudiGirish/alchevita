import { SWRConfig } from "swr";
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
} from "styled-components";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout/Layout.jsx";
import GlobalStyle from "../styles.js";
import { ThemeProvider } from "../context/ThemeContext";

const RootStyle = createGlobalStyle`
  #__next {
    display: grid;
    gap: 0.5rem;
    margin-top: 5rem;
    padding: 0.5rem;
    position: relative;
    width: 100%;
  }
`;

async function fetcher(...args) {
  const res = await fetch(...args);
  if (!res.ok) {
    throw new Error(`Request failed: ${JSON.stringify(args)}`);
  }
  return res.json();
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <RootStyle />
        <GlobalStyle />
        <SWRConfig value={{ fetcher }}>
          <Layout title={Component.pageTitle}>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </SessionProvider>
  );
}
