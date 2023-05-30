import React from 'react';
import Head from "next/head";
import { AppProps } from "next/app";
import Script from "next/script";
import "@/styles/main.scss";

interface ExtraProps {

}

type NextAppProps<P = any> = {
  pageProps: P;
} & Omit<AppProps<P>, "pageProps">

function App({ Component, pageProps }: NextAppProps<ExtraProps>) : JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </>
  );
}

export default App;
