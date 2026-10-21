"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/i18n";
import { getLenis } from "@/lib/scroll";
import styles from "./FloorPlanMenu.module.css";

interface Props {
  id: string;
  open: boolean;
  onClose: () => void;
  locale: Locale;
  ui: SiteContent["ui"];
  nav: SiteContent["nav"];
  rooms: { id: string; name: string }[];
  contact: { phone: string; phoneHref: string; email: string };
}

/** Plan geometry (viewBox 0 0 420 320). The plan is a drawing, so it is not mirrored in Arabic. */
const zones: Record<string, { d: string; lx: number; ly: number }> = {
  living: { d: "M70 60h170v120H70z", lx: 155, ly: 124 },
  kitchen: { d: "M240 60h110v90H240z", lx: 295, ly: 109 },
  bedroom: { d: "M240 150h110v110H240z", lx: 295, ly: 209 },
  entrance: { d: "M150 180h90v80h-90z", lx: 195, ly: 224 },
  outdoor: { d: "M14 14h392v292H14zM70 60v200h280V60z", lx: 62, ly: 292 },
  night: { d: "M383 40a22 22 0 1 1-44 0 22 22 0 0 1 44 0z", lx: 361, ly: 82 },
};

export const roomAnchor = (id: string) => `room-${id}`;

export function FloorPlanMenu({ id, open, onClose, locale, ui, nav, rooms, contact }: Props) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() ?? "";
  const onHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  // Focus management, Escape to close, focus trap, pause smooth scrolling.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialog.current) return;
      const focusables = Array.from(
        dialog.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open, onClose]);

  const goToRoom = (roomId: string) => (e: React.MouseEvent) => {
    if (!onHome) {
      onClose();
      return;
    }
    e.preventDefault();
    onClose();
    window.dispatchEvent(new CustomEvent("ivory:room", { detail: roomId }));
  };

  return (
    <div
      id={id}
      ref={dialog}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={ui.menu}
      data-open={open}
      hidden={!open}
    >
      <div className={`wrap ${styles.top}`}>
        <p className={styles.title}>{nav.floorPlanTitle}</p>
        <button ref={closeBtn} type="button" className={styles.close} onClick={onClose}>
          {ui.close}
          <span aria-hidden="true" className={styles.x} />
        </button>
      </div>

      <div className={`wrap ${styles.body}`}>
        <div className={styles.planCol}>
          <p className={styles.hint}>{nav.floorPlanHint}</p>
          <svg className={styles.plan} viewBox="0 0 420 320" role="group" aria-label={ui.roomsNav} direction="ltr">
            {/* Walls and openings */}
            <g className={styles.walls} aria-hidden="true">
              <rect x="70" y="60" width="280" height="200" />
              <path d="M240 60v40M240 125v55M240 180v80M150 180v80M70 180h80M240 150h110M175 260h40" />
              <path d="M150 180h20m25 0h45" />
              <path className={styles.door} d="M175 260a20 20 0 0 1 20-20" />
              <rect x="80" y="190" width="60" height="60" className={styles.service} />
              <path d="M84 196l52 48M84 214l34 32M100 194l38 36" className={styles.hatch} />
            </g>
            {rooms.map((room) => {
              const z = zones[room.id];
              if (!z) return null;
              return (
                <a
                  key={room.id}
                  href={`${href(locale)}#${roomAnchor(room.id)}`}
                  onClick={goToRoom(room.id)}
                  className={styles.zone}
                  data-room={room.id}
                  aria-label={`${ui.goToRoom} ${room.name}`}
                >
                  <path d={z.d} fillRule="evenodd" />
                  {room.id === "night" && (
                    <path className={styles.moon} d="M367 32a12 12 0 1 0 8 18 10 10 0 0 1-8-18z" aria-hidden="true" />
                  )}
                  <text x={z.lx} y={z.ly} textAnchor={room.id === "outdoor" ? "start" : "middle"} aria-hidden="true">
                    {room.name}
                  </text>
                </a>
              );
            })}
          </svg>
        </div>

        <nav className={styles.links} aria-label={nav.otherPages}>
          <ul role="list">
            {nav.links.map((l) => (
              <li key={l.path}>
                <Link href={href(locale, l.path)} onClick={onClose} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.contact}>
            <Link href={href(locale, "/planner")} onClick={onClose} className="btn btn--light">
              {ui.plan}
            </Link>
            <a href={contact.phoneHref} dir="ltr">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </nav>
      </div>
    </div>
  );
}
