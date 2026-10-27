import { Photo } from "@/components/Photo";
import { HERO } from "@/data/content";

/** The morphing blob photo frame (§6.3). */
export function BlobFrame() {
  return (
    <Photo
      src={HERO.photo.src}
      alt={HERO.photo.alt}
      caption={HERO.photo.caption}
      loading="eager"
      className="animate-blob size-[min(440px,80vw)] border-[3px] border-white/60"
      imgClassName="scale-[1.02]"
    />
  );
}
