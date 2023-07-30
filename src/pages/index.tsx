import { InfiniteScroll } from "@/components/infinite-scroll";
import { PER_PAGE } from "@/config/constants";
import MainLayout from "@/layouts/main.layout";
import photosService from "@/services/photos.service";
import useSWRInfinite from "swr/infinite";

const getKey = (page: number, prevData: any[]) => {
  if (prevData && !prevData.length) return null;
  return `/photos?page=${page + 1}&per_page=${PER_PAGE}`;
};

export default function Home() {
  const { data, size, setSize, isLoading, error } = useSWRInfinite(
    getKey,
    (url) => photosService.list(url)
  );

  return (
    <MainLayout>
      <header>
        <div className="container">Home</div>
      </header>
      <div>
        <InfiniteScroll
          data={data}
          size={size}
          setSize={setSize}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </MainLayout>
  );
}
