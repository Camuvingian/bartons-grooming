import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { StudioDog } from "@/components/StudioDog";
import { useTheme } from "@/components/theme-provider";
import { Daisy } from "@/components/groovy/Daisy";
import { Rings } from "@/components/groovy/Rings";
import { HERO } from "@/data/content";
import { SCHEMES } from "@/lib/theme";
import { SetterBubbles } from "./SetterBubbles";
import { SpinningBadge } from "./SpinningBadge";

/**
 * The hero: a hot primary block. Headline left with its self-drawing underline; the setter right on
 * mod target rings, under a soap-bubble shower (canvas), with a spinning "Yeah baby!" sticker.
 */
export function Hero() {
  const { scheme, setScheme, resolvedMode } = useTheme();
  const [shower, setShower] = useState(0);
  return (
    <section className="studio-hero" aria-labelledby="hero-title">
      <div className="studio-meta">
        <span>{HERO.metaLeft}</span>
        <span>{HERO.metaRight}</span>
      </div>
      <div className="studio-hero-grid">
        <div className="studio-copy">
          <p className="studio-kicker">
            <Daisy petal="currentColor" center="var(--brand-ink)" /> {HERO.kicker}
          </p>
          <h1 id="hero-title">
            {HERO.title1}
            <br />
            <span className="studio-fancy">
              {HERO.title2}
              <svg viewBox="0 0 600 30" preserveAspectRatio="none" aria-hidden="true">
                <path d="M6 20 Q 60 4 114 20 T 222 20 T 330 20 T 438 20 T 546 20 T 598 16" />
              </svg>
            </span>
          </h1>
          <p className="studio-intro">{HERO.intro}</p>
          <div className="studio-actions">
            <Link to="/book" className="studio-book">
              {HERO.cta} <ArrowUpRight size={21} aria-hidden />
            </Link>
            <a href="#services" className="studio-explore">
              {HERO.explore} <ArrowDown size={17} aria-hidden />
            </a>
          </div>
          <div className="studio-signoff">
            <span className="studio-handwritten">{HERO.signoff}</span>
            <span className="studio-small">{HERO.signoffSmall}</span>
          </div>
        </div>

        {/* remounting on `shower` replays the bubble shower */}
        <div className="studio-art setter-scene" key={shower}>
          <Rings
            className="studio-rings"
            count={8}
            colors={["var(--brand-sun)", "var(--brand-pop)", "var(--brand-zing)", "var(--brand-primary)"]}
          />
          <Daisy className="studio-daisy studio-daisy--a" petal="var(--brand-sun)" center="var(--brand-pop)" />
          <Daisy className="studio-daisy studio-daisy--b" petal="var(--brand-on-primary)" center="var(--brand-sun)" />
          <Daisy className="studio-daisy studio-daisy--c" petal="var(--brand-pop)" center="var(--brand-ink)" />
          <span className="studio-art-note">
            {HERO.note1}
            <br />
            {HERO.note2}
          </span>
          <StudioDog className="hero-dog" />
          <SetterBubbles />
          <SpinningBadge className="studio-badge" ring={HERO.badgeRing} centre={HERO.badgeCentre} />
          <button
            type="button"
            className="setter-shower-button"
            onClick={() => setShower((n) => n + 1)}
            aria-label="Replay the setter's bubble shower"
          >
            {HERO.replay} <span aria-hidden="true">↻</span>
          </button>
        </div>
      </div>

      <div className="studio-bottom">
        <span>{HERO.pickerLabel}</span>
        <div className="studio-theme-picker" role="group" aria-label="Choose a colour groove">
          {SCHEMES.map((s) => (
            <button key={s.id} type="button" onClick={() => setScheme(s.id)} aria-pressed={scheme === s.id}>
              <span className="dots" aria-hidden>
                {(resolvedMode === "dark" ? s.dark : s.swatch).map((c, i) => (
                  <span key={i} style={{ background: c }} />
                ))}
              </span>
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
