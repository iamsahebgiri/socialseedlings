import usersService from "@/services/users.service";
import React from "react";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { PER_PAGE } from "@/config/constants";  
import useSWRInfinite from "swr/infinite";

const getKey = (page: number, prevData: any[], username: string) => {
  if (prevData && !prevData.length) return null;
  return `/users/${username}/photos?page=${page + 1}&per_page=${PER_PAGE}`;
};

interface PhotosTabProps {
  username: string;
}

export default function PhotosTab({ username }: PhotosTabProps) {
  const { data, size, setSize, isLoading, error } = useSWRInfinite(
    (...args) => getKey(...args, username),
    (url) => usersService.getPhotosInfinite(url)
  );

  return (
    <div>
      <InfiniteScroll
        data={data}
        size={size}
        setSize={setSize}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
