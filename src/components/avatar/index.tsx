import React from "react";
import style from "./avatar.module.css";
import Image from "next/image";

export function Avatar({ url, name, username, isAvailableForHire }: any) {
  return (
    <div className={style.avatar}>
      <div className={style.avatar__avatar}>
        <Image src={url} height={64} width={64} alt={name} />
      </div>
      <div className={style.avatar__text_container}>
        <div className={style.avatar__text_group}>
          <p className={style.avatar__name}>{name}</p>
          {isAvailableForHire ? (
            <span className={style.avatar__pill}>Hirable</span>
          ) : (
            ""
          )}
        </div>
        <span className={style.avatar__username}>@{username}</span>
      </div>
    </div>
  );
}
