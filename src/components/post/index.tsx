import React from "react";
import style from "./post.module.css";
import { Avatar } from "@/components/avatar";
import { UnsplashImage } from "@/types/unsplash";
import { BlurImage } from "../blur-image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import heart24Regular from "@iconify/icons-fluent/heart-24-regular";
import dayjs from "@/lib/dayjs";

interface PostProps {
  image: UnsplashImage;
}

const Post = React.forwardRef<HTMLDivElement, PostProps>(function Post(
  { image }: PostProps,
  ref
) {
  return (
    <div className={style.post} ref={ref}>
      <div className={style.post__header}>
        <Link href={`/${image.user.username}`}>
          <Avatar
            url={image.user.profile_image.medium}
            name={image.user.name}
            username={image.user.username}
            isAvailableForHire={image.user.for_hire}
          />
        </Link>
      </div>
      <div className={style.post__content}>
        <p>{image.alt_description}</p>
        <Link href={`/photos/${image.id}`}>
          <BlurImage
            alt={image.alt_description}
            src={image.urls.small}
            color={image.color}
            raw={image.urls.raw}
            height={image.height}
            width={image.width}
          />
        </Link>
      </div>
      <div className={style.post__footer}>
        <div className={style.post__footer_left}>
          <Icon icon={heart24Regular} height={24} width={24} />
          <span>{image.likes} likes</span>
        </div>
        <p className={style.post__footer_right}>
          {dayjs(image.created_at).fromNow()}
        </p>
      </div>
    </div>
  );
});

export { Post };
