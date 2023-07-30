import React, { useRef, useState, useCallback } from "react";
import { PER_PAGE } from "@/config/constants";
import { UnsplashImage } from "@/types/unsplash";
import { Post } from "../post";
import { Spinner } from "../spinner";
import style from "./infinite-scroll.module.css";
import { Icon } from "@iconify/react";
import cloudError24Regular from "@iconify/icons-fluent/cloud-error-24-regular";
import checkmarkCircle24Regular from "@iconify/icons-fluent/checkmark-circle-24-regular";
import imageCircle24Regular from "@iconify/icons-fluent/image-circle-24-regular";
import glance24Regular from "@iconify/icons-fluent/glance-24-regular";
import textBulletListSquare24Regular from "@iconify/icons-fluent/text-bullet-list-square-24-regular";
import { Masonry } from "../masonry";
import { ErrorState, InfoState } from "@/components/state";

interface InfiniteScrollProps {
  data: any[] | undefined;
  size: number;
  setSize: (args: any) => any;
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
  const [columnsCount, setColumnsCount] = useState(1);

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

  if (error) {
    return <ErrorState error={error} icon={cloudError24Regular} />;
  }

  return (
    <div>
      <header>
        <div className={style.view__type_container}>
          <span />
          <div className={style.view__btn_container}>
            <button
              title="List view"
              onClick={() => setColumnsCount(1)}
              className={
                columnsCount === 1
                  ? style.view__btn_active
                  : style.view__btn_inactive
              }
            >
              <Icon
                icon={textBulletListSquare24Regular}
                height={20}
                width={20}
              />
              List
            </button>
            <button
              title="Grid view"
              onClick={() => setColumnsCount(2)}
              className={
                columnsCount === 2
                  ? style.view__btn_active
                  : style.view__btn_inactive
              }
            >
              <Icon icon={glance24Regular} height={20} width={20} />
              Grid
            </button>
          </div>
        </div>
      </header>
      {isEmpty && (
        <InfoState
          icon={imageCircle24Regular}
          title="Oops! Nothing in here"
          subtitle="Come back later, may be"
        />
      )}

      <Masonry columnsCount={columnsCount}>
        {images.map((image: UnsplashImage, index) => {
          if (images.length === index + 1) {
            return <Post ref={lastElementRef} key={image.id} image={image} />;
          }
          return <Post key={image.id} image={image} />;
        })}
      </Masonry>

      {isLoadingMore && <Spinner />}
      {isReachingEnd && !isEmpty && (
        <InfoState
          icon={checkmarkCircle24Regular}
          title="You're all caught up"
          subtitle="You have seen all the photos."
        />
      )}
    </div>
  );
}
