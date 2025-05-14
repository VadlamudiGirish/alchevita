import { SWRConfig } from "swr";
import { createGlobalStyle } from "styled-components";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout/Layout.jsx";
import GlobalStyle from "../styles.js";

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
    <>
      <RootStyle />
      <GlobalStyle />
      <SessionProvider session={session}>
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
