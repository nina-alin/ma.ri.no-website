import "./globals.css";
import "./locomotive-scroll.css";

import { dir } from "i18next";
import type { Metadata } from "next";
import localFont from "next/font/local";

import Footer from "@/app/[lng]/components/layout/footer/footer";
import Navbar from "@/app/[lng]/components/layout/navbar/navbar";

import { languages } from "../i18n/settings";
import styles from "./layout.module.css";

const akkurat = localFont({
  src: [
    {
      path: "../fonts/akkurat.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/akkurat-italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/akkurat-bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../fonts/akkurat-light.ttf",
      weight: "200",
      style: "light",
    },
  ],
  display: "swap",
});
export const metadata: Metadata = {
  title: "ma.ri.no",
  description: "Graphic design portfolio of Déborah Marino. ma.ri.no is a graphic design studio based in Asahikawa, Japan.",
};
// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const RootLayout = async ({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) => {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={akkurat.className}>
        <div className={styles.body} data-scroll-container>
          <Navbar lng={lng} />
          <main id={"scrollableDiv"}>{children}</main>
          <Footer lng={lng} />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;