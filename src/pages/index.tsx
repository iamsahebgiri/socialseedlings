import { Post } from "@/components/post";
import MainLayout from "@/layouts/main.layout";
import photosService from "@/services/photos.service";
import { UnsplashImage } from "@/types/unsplash";
import home24Filled from "@iconify/icons-fluent/home-24-filled";
import home24Regular from "@iconify/icons-fluent/home-24-regular";
import compassNorthwest24Regular from "@iconify/icons-fluent/compass-northwest-24-regular";
import compassNorthwest24Filled from "@iconify/icons-fluent/compass-northwest-24-filled";
import { Icon } from "@iconify/react";
import Link from "next/link";
import useSWRInfinite from "swr/infinite";
import { useRouter } from "next/router";
import { ThemeToggle } from "@/components/theme-toggle";

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
const PER_PAGE = 10;

const getKey = (page: number, prevData: any[]) => {
  if (prevData && !prevData.length) return null;
  return `/photos?page=${page + 1}&per_page=${PER_PAGE}`;
};

export default function Home() {
  const { data, size, setSize, isValidating, isLoading } = useSWRInfinite(
    getKey,
    (url) => photosService.list(url)
  );

  const images = data ? [].concat(...data) : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PER_PAGE);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <MainLayout>
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

          <article className="holy-grail__middle">
            <header>
              <div className="container">Header</div>
            </header>
            <div>
              {isEmpty ? <p>Yay, no images found.</p> : null}
              <div className="card-wrapper">
                {images.map((image: UnsplashImage) => (
                  <Post key={image.id} image={image} />
                ))}
              </div>

              <button
                disabled={isLoadingMore || isReachingEnd}
                onClick={() => setSize(size + 1)}
              >
                {isLoadingMore
                  ? "loading..."
                  : isReachingEnd
                  ? "no more issues"
                  : "load more"}
              </button>
            </div>
          </article>

          <footer className="holy-grail__right">Footer</footer>
        </main>
      </div>
    </MainLayout>
  );
}
