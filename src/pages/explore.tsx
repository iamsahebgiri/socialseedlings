import { InfiniteScroll } from "@/components/infinite-scroll";
import { PER_PAGE } from "@/config/constants";
import { siteConfig } from "@/config/site";
import MainLayout from "@/layouts/main.layout";
import photosService from "@/services/photos.service";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Explore() {
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState<any[]>([]);
  const [error, setError] = useState(null);

  const fetchRandomImages = () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    photosService
      .random({
        params: {
          count: PER_PAGE,
        },
      })
      .then((images) => {
        setPages([...pages, images]);
        console.log(images);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRandomImages();
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>{`Explore - ${siteConfig.name}`}</title>
      </Head>
      <header>
        <div className="group heading">Explore</div>
      </header>
      <div>
        <InfiniteScroll
          data={pages}
          size={0}
          setSize={() => {
            // console.log(pages)
            if (!isLoading) {
              fetchRandomImages();
            }
          }}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </MainLayout>
  );
}
