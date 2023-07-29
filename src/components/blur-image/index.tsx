import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import style from "./blur-image.module.css";

interface BlurImageProps extends ImageProps {
  color: string;
  raw: string;
}

export function BlurImage(props: BlurImageProps) {
  const { color, height, width, ...rest } = props;
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState(props.src);
  useEffect(() => setSrc(props.src), [props.src]);

  return (
    <div
      className={style.image__container}
      style={{
        backgroundColor: loading ? color : "var(--bg-color)",
        aspectRatio: Number(width) / Number(height),
      }}
    >
      <Image
        {...rest}
        src={src}
        alt={props.alt}
        title={props.alt}
        placeholder="blur"
        blurDataURL={props.raw + "&q=2&w=60"}
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
