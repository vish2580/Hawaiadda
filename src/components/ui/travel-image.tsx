import type { ImgHTMLAttributes } from "react";
import type { MediaAsset } from "@/types/travel";
import { cn } from "@/lib/utils";

type TravelImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height"> & {
  image: MediaAsset;
};

export function TravelImage({ image, className, loading = "lazy", style, ...props }: TravelImageProps) {
  return (
    <img
      src={image.src}
      srcSet={image.src.includes("images.unsplash.com") ? [480, 900, 1400, 1800].map(w => `${image.src.replace(/w=\d+/, `w=${w}`)} ${w}w`).join(", ") : undefined}
      sizes="(max-width: 767px) 100vw, (max-width: 1200px) 60vw, 45vw"
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={loading}
      decoding="async"
      className={cn("size-full object-cover", className)}
      style={{ objectPosition: image.focalPoint, ...style }}
      {...props}
    />
  );
}
