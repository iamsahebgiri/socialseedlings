import { SingleUnsplashImage } from "@/types/unsplash";
import style from "./single-photo.module.css";
import { BlurImage } from "../blur-image";
import Link from "next/link";
import { Avatar } from "../avatar";
import { formatNumber } from "@/utils/numbers";
import { getColor } from "@/utils/colors";
import dayjs from "@/lib/dayjs";

export function SinglePhoto({ image }: { image: SingleUnsplashImage }) {
  return (
    <div className={style.single_photo__container}>
      <div className={style.single_photo__header}>
        <Link href={`/${image.user.username}`}>
          <Avatar
            url={image.user.profile_image.medium}
            name={image.user.name}
            username={image.user.username}
            isAvailableForHire={image.user.for_hire}
          />
        </Link>
      </div>
      <BlurImage
        alt={image.alt_description}
        color={image.color}
        raw={image.urls.raw}
        src={image.urls.regular}
      />
      <div className={style.profile__stats}>
        <div className={style.profile__stats_item}>
          <p>{formatNumber(image.likes)}</p>
          <span>Likes</span>
        </div>
        <div className={style.profile__stats_item}>
          <p>{formatNumber(image.views)}</p>
          <span>Views</span>
        </div>
        <div className={style.profile__stats_item}>
          <p>{formatNumber(image.downloads)}</p>
          <span>Downloads</span>
        </div>
      </div>
      <div className={style.tags_container}>
        <h3 className={style.tags__title}>Tags</h3>
        <div className={style.tags}>
          {image.tags
            .filter((t) => t.type === "search")
            .map(({ title }) => (
              <div
                key={title}
                className={style.tag}
                style={{
                  backgroundColor: getColor(title).bg,
                  color: getColor(title).text,
                }}
              >
                {title}
              </div>
            ))}
        </div>
      </div>
      {/* <div className={style.post__footer}>
        <div className={style.post__footer_left}>
          <Icon icon={heart24Regular} height={24} width={24} />
          <span>{formatNumber(image.likes)} likes</span>
        </div>
        <p className={style.post__footer_right}>
          {dayjs(image.created_at).fromNow()}
        </p>
      </div> */}
    </div>
  );
}
