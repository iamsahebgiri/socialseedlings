import React from "react";
import { Icon } from "@iconify/react";
import checkmarkStarburst24Filled from "@iconify/icons-fluent/checkmark-starburst-24-filled";
import style from "./profile.module.css";
import { getColor } from "@/utils/colors";
import { UserProfile } from "@/types/unsplash";
import Image from "next/image";
import { formatNumber } from "@/utils/numbers";

interface ProfileProps {
  profile: UserProfile;
}

export function Profile({ profile }: ProfileProps) {
  return (
    <div className={style.profile}>
      <div className={style.profile__row}>
        <Image
          src={profile.profile_image.large}
          alt={profile.name}
          height={158}
          width={158}
          className={style.profile__image}
        />
      </div>
      <div className={style.profile__user_section}>
        <h1 className={style.profile__user_name}>
          {profile.name}{" "}
          {profile.badge && profile.badge.slug === "verified" && (
            <Icon
              icon={checkmarkStarburst24Filled}
              height={24}
              width={24}
              color="hsl(210, 100%, 50%)"
            />
          )}
        </h1>
        <p className={style.profile__user_username}>@{profile.username}</p>
        <p className={style.profile__user_bio}>{profile.bio}</p>
      </div>
      <div className={style.profile__stats}>
        <div className={style.profile__stats_item}>
          <p>
            {formatNumber(profile.followers_count)} <span>Followers</span>
          </p>
        </div>
        <div className={style.profile__stats_item}>
          <p>
            {formatNumber(profile.downloads)} <span>Downloads</span>
          </p>
        </div>
      </div>

      <div className={style.tags_container}>
        <h3 className={style.tags__title}>Interests</h3>
        <div className={style.tags}>
          {profile.tags.custom
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
    </div>
  );
}
