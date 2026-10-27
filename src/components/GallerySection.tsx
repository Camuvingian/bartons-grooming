import { Daisy } from "@/components/groovy/Daisy";
import { Photo } from "@/components/Photo";
import { GALLERY, GALLERY_SECTION } from "@/data/content";
import { useReveal } from "@/hooks/useReveal";

/** Finished grooms as a wall of tilted polaroids. Hover (or focus) straightens one up. */
export function GallerySection() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="gallery" ref={ref} className="reveal page-x pb-10 pt-20" aria-labelledby="gallery-title">
      <div className="mb-10 flex flex-col gap-4 min-[768px]:flex-row min-[768px]:items-end min-[768px]:justify-between">
        <div>
          <p className="eyebrow text-[13px] text-brand-primary">{GALLERY_SECTION.eyebrow}</p>
          <h2 id="gallery-title" className="display groovy-title mt-3 text-[clamp(38px,5vw,60px)]">
            {GALLERY_SECTION.title}
          </h2>
        </div>
        <p className="max-w-[380px] text-[17px] leading-[1.55] opacity-75">{GALLERY_SECTION.sub}</p>
      </div>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-9 min-[640px]:grid-cols-3 min-[1024px]:grid-cols-5" role="list">
        {GALLERY.map((g, i) => (
          <li
            key={g.src}
            className="polaroid"
            style={{ ["--tilt" as string]: `${[-4, 3, -2, 5, -3, 2, -5, 4, -2, 3][i % 10]}deg` }}
          >
            <Photo
              src={g.src}
              alt={g.alt}
              caption={`done photo: ${g.name}`}
              tone="after"
              className="aspect-square w-full"
            />
            <Daisy className="polaroid-pin" petal="var(--brand-pop)" center="var(--brand-sun)" />
            <p className="display mt-3 text-[20px] leading-none">{g.name}</p>
            <p className="eyebrow mt-1 text-[10px] opacity-70">{g.groom}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
