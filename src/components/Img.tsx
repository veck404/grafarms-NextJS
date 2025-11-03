'use client';

import { useMemo } from "react";

const NAMED_ASSETS: Record<string, string> = {
  "1": "/svgs/Svg1.svg",
  "2": "/svgs/Svg2.svg",
  Empty: "/svgs/Empty.svg",
  Error: "/svgs/Error.svg",
  Confirm: "/svgs/Confirm.svg",
};

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  img?: string;
};

export default function Img({ className, img, src, alt = "", ...rest }: ImgProps) {
  const resolvedSrc = useMemo(() => {
    if (img && NAMED_ASSETS[img]) {
      return NAMED_ASSETS[img];
    }
    return typeof src === "string" ? src : undefined;
  }, [img, src]);

  return (
    <div className={className}>
      <img draggable={false} className="h-full w-full object-contain" src={resolvedSrc ?? "/whitebg.avif"} alt={alt} {...rest} />
    </div>
  );
}
