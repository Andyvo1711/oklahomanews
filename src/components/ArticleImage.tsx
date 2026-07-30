import Image from "next/image";

interface ArticleImageProps {
  src: string;
  alt: string;
  aspectClassName?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Fixed-aspect-ratio image wrapper using next/image with object-cover.
 * aspectClassName should set an explicit aspect-ratio utility, e.g. "aspect-[16/9]".
 */
export function ArticleImage({
  src,
  alt,
  aspectClassName = "aspect-[16/9]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: ArticleImageProps) {
  return (
    <div className={`relative ${aspectClassName} overflow-hidden bg-cloud-gray`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
