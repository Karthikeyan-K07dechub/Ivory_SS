"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RoomContent, SiteContent, SystemSlug } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/i18n";
import { LIGHTS, clearLight } from "@/lib/light";
import { scrollToTarget } from "@/lib/scroll";
import { setWaTopic, waLink } from "@/lib/wa";
import { RoomArt } from "@/components/rooms/RoomArt";
import { SystemIcon } from "@/components/SystemIcon";
import { T } from "@/components/T";
import { Emphasis } from "@/components/Emphasis";
import { HeroArt } from "./HeroArt";
import { RoomIndicator } from "./RoomIndicator";
import s from "./HomeExperience.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  locale: Locale;
  brand: SiteContent["brand"];
  hero: SiteContent["home"]["hero"];
  walkthrough: SiteContent["home"]["walkthrough"];
  ui: Pick<SiteContent["ui"], "plan" | "whatsappUs" | "room" | "roomsNav" | "goToRoom" | "whatsappTemplate">;
  rooms: RoomContent[];
  systemNames: Record<SystemSlug, string>;
  whatsappNumber: string;
}

const pad = (n: number) => String(n).padStart(2, "0");
type Mode = "stack" | "horizontal";

export function HomeExperience({ locale, brand, hero, walkthrough, ui, rooms, systemNames, whatsappNumber }: Props) {
  const heroRef = useRef<HTMLElement>(null);
  const heroSpacerRef = useRef<HTMLDivElement>(null);
  const walkRef = useRef<HTMLElement>(null);
  const walkSpacerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const jumpRef = useRef<(i: number) => void>(() => {});
  const [mode, setMode] = useState<Mode>("stack");
  const [active, setActive] = useState(-1);
  const [inView, setInView] = useState(false);

  const roomLabel = (i: number) => `${ui.room} ${pad(i + 1)} / ${pad(rooms.length)}`;

  /* ---------- Layout mode: pinned horizontal walk on wide screens with motion allowed ---------- */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const apply = () => setMode(mq.matches ? "horizontal" : "stack");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* ---------- Scroll scenes ---------- */
  useLayoutEffect(() => {
    const root = document.documentElement;
    const heroEl = heroRef.current;
    const walkEl = walkRef.current;
    const heroSpacer = heroSpacerRef.current;
    const walkSpacer = walkSpacerRef.current;
    const track = trackRef.current;
    if (!heroEl || !walkEl || !heroSpacer || !walkSpacer || !track) return;
    const rtl = document.documentElement.dir === "rtl";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(root, LIGHTS.dawn);
      /* Hero: the doors open as you scroll, and you step toward the entrance. */
      if (!reduced) {
        const doorTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroEl,
            start: "top top",
            end: mode === "horizontal" ? "+=70%" : "bottom top",
            scrub: 0.6,
            pin: mode === "horizontal",
            pinSpacer: heroSpacer,
          },
        });
        doorTl
          .to(heroEl.querySelector(".hero-door-l"), { scaleX: 0.12, transformOrigin: "0% 50%", ease: "power2.inOut" }, 0)
          .to(heroEl.querySelector(".hero-door-r"), { scaleX: 0.12, transformOrigin: "100% 50%", ease: "power2.inOut" }, 0)
          .to(heroEl.querySelector(".hero-glow"), { opacity: 1, ease: "none" }, 0)
          .to(heroEl.querySelector(`.${s.heroArt}`), { scale: 1.18, transformOrigin: "50% 85%", ease: "none" }, 0)
          .to(heroEl.querySelector(`.${s.heroCopy}`), { y: -40, opacity: 0.25, ease: "none" }, 0);
      } else {
        gsap.set(heroEl.querySelectorAll(".hero-door-l, .hero-door-r"), { scaleX: 0.12 });
      }

      if (mode === "horizontal") {
        /* Walkthrough: pinned horizontal scroll, light interpolates from dawn to night. */
        // Each room fills the content viewport beside the fixed timeline.
        const vw = () => track.parentElement?.clientWidth ?? walkEl.clientWidth;
        const introW = () => introRef.current?.offsetWidth ?? 0;
        const dist = () => Math.max(0, track.scrollWidth - vw());
        const dir = rtl ? 1 : -1;

        const light = gsap.timeline({ paused: true, defaults: { ease: "none" } });
        light.set(root, LIGHTS[rooms[0].light], 0);
        rooms.slice(1).forEach((room, i) => {
          // Transition while room i slides out and room i+1 slides in.
          light.to(root, { ...LIGHTS[room.light], duration: 1 }, i + (introW() / vw()));
        });
        const lightSpan = light.duration() || 1;
        let exitTween: gsap.core.Tween | null = null;

        const st = ScrollTrigger.create({
          trigger: walkEl,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          pinSpacer: walkSpacer,
          scrub: 0.5,
          invalidateOnRefresh: true,
          animation: gsap.to(track, { x: () => dir * dist(), ease: "none" }),
          onUpdate(self) {
            const pos = self.progress * dist();
            const idx = Math.min(rooms.length - 1, Math.max(0, Math.floor((pos + vw() / 2 - introW()) / vw())));
            setActive((prev) => (prev === idx ? prev : idx));
            light.progress(Math.min(1, (pos / vw()) / lightSpan));
          },
          onToggle(self) {
            setInView(self.isActive);
          },
          onLeave() {
            exitTween?.kill();
            exitTween = gsap.to(root, { ...LIGHTS.ivory, duration: 0.8 });
          },
          onEnterBack(self) {
            exitTween?.kill();
            exitTween = null;
            // Re-render even if progress is unchanged, so the walk's light replaces the exit light.
            light.progress(0).progress(Math.min(1, ((self.progress * dist()) / vw()) / lightSpan));
          },
          onLeaveBack() {
            exitTween?.kill();
            exitTween = gsap.to(root, { ...LIGHTS.dawn, duration: 0.6 });
          },
          onEnter() {
            exitTween?.kill();
            exitTween = null;
          },
        });

        jumpRef.current = (i: number) => {
          const target = st.start + Math.min(dist(), introW() + i * vw());
          scrollToTarget(target);
        };
      } else {
        /* Stacked rooms (phones, reduced motion): each room carries its own light. */
        const roomsEls = Array.from(walkEl.querySelectorAll<HTMLElement>("[data-room-index]"));
        roomsEls.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 45%",
            onToggle(self) {
              if (self.isActive) {
                setActive(i);
                gsap.to(root, { ...LIGHTS[rooms[i].light], duration: reduced ? 0 : 0.6, overwrite: "auto" });
              }
            },
          });
        });
        ScrollTrigger.create({
          trigger: walkEl,
          start: "top 60%",
          end: "bottom 40%",
          onToggle(self) {
            setInView(self.isActive);
          },
          onLeave() {
            gsap.to(root, { ...LIGHTS.ivory, duration: reduced ? 0 : 0.6, overwrite: "auto" });
          },
          onLeaveBack() {
            gsap.to(root, { ...LIGHTS.dawn, duration: reduced ? 0 : 0.6, overwrite: "auto" });
          },
        });
        jumpRef.current = (i: number) => {
          const el = roomsEls[i];
          if (el) scrollToTarget(el, -60);
        };
      }
    });

    ScrollTrigger.refresh();

    // Arrive at a room from the floor-plan menu on another page (#room-kitchen).
    const hash = window.location.hash.replace("#room-", "");
    const fromHash = rooms.findIndex((r) => r.id === hash);
    const t = fromHash >= 0 ? window.setTimeout(() => jumpRef.current(fromHash), 350) : 0;

    return () => {
      window.clearTimeout(t);
      jumpRef.current = () => {};
      // Restore pins before React updates or removes the section DOM.
      ctx.revert();
      clearLight();
    };
  }, [mode, rooms]);

  /* ---------- Floor-plan menu and indicator jumps ---------- */
  useEffect(() => {
    const onRoom = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const i = rooms.findIndex((r) => r.id === id);
      if (i >= 0) window.setTimeout(() => jumpRef.current(i), 60);
    };
    window.addEventListener("ivory:room", onRoom);
    return () => window.removeEventListener("ivory:room", onRoom);
  }, [rooms]);

  /* ---------- WhatsApp names the room in view ---------- */
  useEffect(() => {
    if (active < 0 || !inView) {
      setWaTopic(null);
      return;
    }
    const r = rooms[active];
    setWaTopic(`${roomLabel(active)} · ${r.name} (${r.systems.map((x) => systemNames[x]).join(", ")})`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, inView]);

  useEffect(() => () => setWaTopic(null), []);

  const jump = useCallback((i: number) => jumpRef.current(i), []);
  const waMessage = ui.whatsappTemplate.replace("{topic}", brand.name);

  return (
    <div className={s.experience} data-mode={mode}>
      {/* a. Arrival */}
      <div ref={heroSpacerRef}>
      <section ref={heroRef} className={s.hero} aria-labelledby="hero-title">
        <div className={`wrap ${s.heroGrid}`}>
          <h1 id="hero-title" className={s.headline}>
            <Emphasis text={brand.promise} phrase={brand.promiseEmphasis} />
          </h1>
          <div className={s.heroCopy}>
            <p className={s.subline}>{hero.subline}</p>
            <div className={s.ctas}>
              <Link className="btn" href={href(locale, "/planner")}>
                {ui.plan}
              </Link>
              <a className="btn btn--ghost" href={waLink(whatsappNumber, waMessage)} target="_blank" rel="noopener noreferrer">
                <span>{ui.whatsappUs}</span>
              </a>
            </div>
            <Link className="link-arrow" href={href(locale, "/professionals")}>
              {hero.proLink} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={s.heroArt}>
            <HeroArt label={rooms[0].name} />
          </div>
          <a className={s.prompt} href="#walkthrough">
            <span className={s.promptLine} aria-hidden="true" />
            <span className={s.promptLabel}>{hero.scrollPrompt}</span>
          </a>
        </div>
      </section>
      </div>

      {/* b. The walkthrough */}
      <div ref={walkSpacerRef}>
      <section id="walkthrough" ref={walkRef} className={s.walk} aria-labelledby="walk-title">
        <div className={s.walkViewport}>
        <div ref={trackRef} className={s.track}>
          <div ref={introRef} className={s.intro}>
            <h2 id="walk-title" className={s.walkTitle}>
              {walkthrough.title}
            </h2>
            <p className={s.walkIntro}>
              <T v={walkthrough.intro} />
            </p>
            <span className={`arrow ${s.walkArrow}`} aria-hidden="true">
              →
            </span>
          </div>

          {rooms.map((room, i) => {
            const [clock, ...period] = room.time.split(" ");
            return (
              <article
                key={room.id}
                id={`room-${room.id}`}
                className={s.room}
                data-room-index={i}
                data-light={room.light}
                data-active={active === i}
                aria-labelledby={`room-title-${room.id}`}
              >
                <div className={s.roomText}>
                  <p className="chapter">{roomLabel(i)}</p>
                  <p className={s.time} aria-label={room.time}>
                    <span className="numeral">{clock}</span>
                    <span className={s.period}>{period.join(" ")}</span>
                  </p>
                  <h3 id={`room-title-${room.id}`} className={s.roomName}>
                    {room.name}
                  </h3>
                  <p className={s.moment}>
                    <T v={room.moment} />
                  </p>
                  <p className={s.detail}>
                    <T v={room.detail} />
                  </p>
                  <p className={s.chipsLabel}>{walkthrough.systemsLabel}</p>
                  <ul role="list" className={s.chips}>
                    {room.systems.map((slug) => (
                      <li key={slug}>
                        <Link href={href(locale, `/solutions/${slug}`)} className={s.chip} data-switch>
                          <SystemIcon slug={slug} className={s.chipIcon} on={active === i} />
                          {systemNames[slug]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.roomArt}>
                  <RoomArt room={room.id} active={active === i} uid={`walk-${room.id}`} />
                </div>
              </article>
            );
          })}
        </div>
        </div>
      </section>
      </div>

      <RoomIndicator
        rooms={rooms.map((r, i) => ({ id: r.id, name: r.name, time: r.time, label: roomLabel(i) }))}
        active={active}
        visible={inView}
        onJump={jump}
        label={ui.roomsNav}
        goTo={ui.goToRoom}
      />
    </div>
  );
}
