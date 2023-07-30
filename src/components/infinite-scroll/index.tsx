import React, { useRef, useCallback } from "react";
import { PER_PAGE } from "@/config/constants";
import { UnsplashImage } from "@/types/unsplash";
import { Post } from "../post";
import { Spinner } from "../spinner";
import style from "./infinite-scroll.module.css";
import { Icon } from "@iconify/react";
import checkmarkCircle24Regular from "@iconify/icons-fluent/checkmark-circle-24-regular";
import imageCircle24Regular from '@iconify/icons-fluent/image-circle-24-regular';

interface InfiniteScrollProps {
  data: any[] | undefined;
  size: number;
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<any[] | undefined>;
  isLoading: boolean;
  error: any;
}

export function InfiniteScroll({
  data,
  size,
  setSize,
  isLoading,
  error,
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

  return (
    <div>
      {isEmpty && (
        <div className={style.end__container}>
          <Icon
            icon={imageCircle24Regular}
            height={48}
            width={48}
            color="var(--primary-color)"
          />
          <div className={style.end__text_wrapper}>
            <h2>Oops! Nothing in here</h2>
            <p>Come back later, may be</p>
          </div>
        </div>
      )}
      {isEmpty ? <p></p> : null}

      {images.map((image: UnsplashImage, index) => {
        if (images.length === index + 1) {
          return <Post ref={lastElementRef} key={image.id} image={image} />;
        }
        return <Post key={image.id} image={image} />;
      })}

      {isLoadingMore && <Spinner />}
      {isReachingEnd && !isEmpty && (
        <div className={style.end__container}>
          <Icon
            icon={checkmarkCircle24Regular}
            height={48}
            width={48}
            color="var(--primary-color)"
          />
          <div className={style.end__text_wrapper}>
            <h2>You&apos;re all caught up</h2>
            <p>You have seen all the photos.</p>
          </div>
        </div>
      )}
    </div>
  );
}
