import React, { useRef, useCallback } from "react";
import { PER_PAGE } from "@/config/constants";
import { UnsplashImage } from "@/types/unsplash";
import { Post } from "../post";
import { Spinner } from "../spinner";

interface InfiniteScrollProps {
  data: any[] | undefined;
  size: number;
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<any[] | undefined>;
  isLoading: boolean;
}

export function InfiniteScroll({
  data,
  size,
  setSize,
  isLoading,
}: InfiniteScrollProps) {
  const images = data ? [].concat(...data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PER_PAGE);

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries.length > 0 && entries[0].isIntersecting && !isReachingEnd) {
          setSize(size + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isReachingEnd, data]
  );

  console.log(images.length);

  return (
    <div>
      {isEmpty ? <p>Yay, no images found.</p> : null}

      {images.map((image: UnsplashImage, index) => {
        if (images.length === index + 1) {
          return <Post ref={lastElementRef} key={image.id} image={image} />;
        }
        return <Post key={image.id} image={image} />;
      })}

      {isLoading && <Spinner />}
      {isReachingEnd && <p>No more images</p>}
    </div>
  );
}
