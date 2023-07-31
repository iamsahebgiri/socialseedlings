import Image, { ImageProps } from "next/image";
import { useState } from "react";
import style from "./blur-image.module.css";

interface BlurImageProps extends ImageProps {
  color: string;
  raw: string;
}

export function BlurImage(props: BlurImageProps) {
  const { color, height, width, ...rest } = props;
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={style.image__container}
      style={{
        backgroundColor: color,
        aspectRatio: Number(width) / Number(height),
      }}
    >
      <Image
        {...rest}
        alt={props.alt}
        title={props.alt}
        style={{
          filter: loading ? "blur(20px)" : "blur(0px)",
          transform: loading ? "scale(110%)" : "scale(100%)",
        }}
        loading="lazy"
        height={0}
        width={0}
        sizes="100vw"
        className={style.image}
        onLoadingComplete={async () => {
          setLoading(false);
        }}
      />
    </div>
  );
}
