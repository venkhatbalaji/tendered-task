"use client";
import { Inter } from "next/font/google";
import { ThemeProvider } from "styled-components";
import StoreProvider from "./store.provider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Tendered</title>
      </Head>
      <body
        className={inter.className}
        style={{
          margin: "0px",
          background:
            "linear-gradient(90deg,rgba(238, 174, 202, 1) 0%,rgba(148, 187, 233, 1) 100%)",
        }}
      >
        <main>
          <StoreProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </StoreProvider>
        </main>
      </body>
    </html>
  );
}
