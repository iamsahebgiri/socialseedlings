import React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={`${inter.className}`}>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
      </Head>
      {children}
    </div>
  );
}
