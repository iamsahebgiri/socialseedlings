import { Post } from "@/components/post";
import MainLayout from "@/layouts/main.layout";
import photosService from "@/services/photos.service";
import { UnsplashImage } from "@/types/unsplash";
import useSWRInfinite from "swr/infinite";

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
    </MainLayout>
  );
}
