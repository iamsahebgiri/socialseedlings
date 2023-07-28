import Head from "next/head";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import useSWRInfinite from "swr/infinite";
import photosService from "@/services/photos.service";
import Image from "next/image";
import { UnsplashImage } from "@/types/unsplash";
import styles from "@/styles/Home.module.css";
import { Masonry } from "@/components/masonry";

const inter = Inter({ subsets: ["latin"] });

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
    <>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className} ${styles.main}`}>
        <h1>Social Seedlings</h1>

        {isEmpty ? <p>Yay, no images found.</p> : null}

        <Masonry>
          {images.map((image: UnsplashImage) => (
            <Image
              key={image.id}
              alt={image.alt_description}
              src={image.urls.thumb}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto", borderRadius: "1rem" }}
            />
          ))}
        </Masonry>

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
      </main>
    </>
  );
}
