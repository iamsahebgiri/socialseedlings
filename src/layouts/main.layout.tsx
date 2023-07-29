import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { Icon } from "@iconify/react";
import compassNorthwest24Filled from "@iconify/icons-fluent/compass-northwest-24-filled";
import compassNorthwest24Regular from "@iconify/icons-fluent/compass-northwest-24-regular";
import home24Filled from "@iconify/icons-fluent/home-24-filled";
import home24Regular from "@iconify/icons-fluent/home-24-regular";

import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

interface MainLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    title: "Home",
    icon: {
      regular: home24Regular,
      filled: home24Filled,
    },
    href: "/",
  },
  {
    title: "Explore",
    icon: {
      regular: compassNorthwest24Regular,
      filled: compassNorthwest24Filled,
    },
    href: "/explore",
  },
];

const NavItem = ({ title, icon, href }: (typeof navItems)[0]) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <div className="nav-item">
      <div className="tooltip">
        <Link href={href}>
          <Icon
            icon={isActive ? icon.filled : icon.regular}
            color="var(--icon-color)"
            height={28}
            width={28}
          />
          <span>{title}</span>
        </Link>
      </div>
    </div>
  );
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={`${inter.className}`}>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
      </Head>
      <div className="holy-grail">
        <main className="holy-grail__main">
          <aside className="holy-grail__left">
            <nav className="navigation">
              {navItems.map((navItem) => (
                <NavItem
                  key={navItem.href}
                  title={navItem.title}
                  href={navItem.href}
                  icon={navItem.icon}
                />
              ))}
              <ThemeToggle />
            </nav>
          </aside>

          <article className="holy-grail__middle">{children}</article>

          <footer className="holy-grail__right">Footer</footer>
        </main>
      </div>
    </div>
  );
}
