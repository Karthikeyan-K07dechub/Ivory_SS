import type { RoomId } from "@/content/types";
import s from "./RoomArt.module.css";

interface Props {
  room: RoomId;
  /** When true, the room's systems animate into their "on" state. */
  active: boolean;
  /** Unique per instance, used for gradient ids. */
  uid: string;
  className?: string;
  title?: string;
}

/**
 * Refined line-art interiors (architectural elevations, thin strokes) whose
 * systems animate: curtains slide, light pools glow, AC vents shimmer,
 * cameras pulse, the door lock clicks. Colour comes from `currentColor`
 * and the page's --glow token, so the drawings follow the scroll-driven light.
 */
export function RoomArt({ room, active, uid, className, title }: Props) {
  const glow = `${uid}-glow`;
  const cone = `${uid}-cone`;
  const Art = ART[room];
  return (
    <svg
      viewBox="0 0 640 440"
      className={`${s.art} ${className ?? ""}`}
      data-active={active}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={glow} cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="var(--glow)" stopOpacity="0.95" />
          <stop offset="60%" stopColor="var(--glow)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--glow)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={cone} x1="0" x2="1" y1="0" y2="0.6">
          <stop offset="0%" stopColor="var(--glow)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--glow)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className={s.lines}>
        <Art glow={`url(#${glow})`} cone={`url(#${cone})`} />
      </g>
    </svg>
  );
}

type ArtProps = { glow: string; cone: string };

/* ------------------------------------------------------------------ Entrance, 6:30 AM */
function Entrance({ glow }: ArtProps) {
  return (
    <>
      {/* Dawn sky */}
      <circle className={s.sun} cx="560" cy="96" r="22" />
      <path className={s.faint} d="M500 132h110M520 146h70" />
      {/* Façade and cornice */}
      <path d="M40 400V92h560v308M30 92h580M40 104h560" />
      {/* Arched opening */}
      <path d="M210 400V196a110 110 0 0 1 220 0v204" />
      <path d="M224 400V198a96 96 0 0 1 192 0v202" />
      {/* Transom fan */}
      <path className={s.faint} d="M224 214h192M320 214V104M320 214l-62-88M320 214l62-88M320 214l-86-48M320 214l86-48" />
      {/* Door leaves */}
      <rect x="228" y="218" width="90" height="182" />
      <rect x="322" y="218" width="90" height="182" />
      <rect className={s.faint} x="242" y="236" width="62" height="70" />
      <rect className={s.faint} x="242" y="318" width="62" height="66" />
      <rect className={s.faint} x="336" y="236" width="62" height="70" />
      <rect className={s.faint} x="336" y="318" width="62" height="66" />
      <path d="M308 296v28M332 296v28" />
      {/* Smart lock: bolt slides and the LED lights */}
      <rect x="338" y="282" width="14" height="26" rx="2" />
      <path className={s.bolt} d="M338 296h-10" strokeWidth="2.4" />
      <circle className={s.led} cx="345" cy="289" r="2.4" />
      {/* Light pools from sconces */}
      <path className={s.pool} d="M150 226l-46 174h92z" fill={glow} />
      <path className={s.pool} d="M490 226l-46 174h92z" fill={glow} />
      <rect x="142" y="206" width="16" height="22" rx="2" />
      <rect x="482" y="206" width="16" height="22" rx="2" />
      {/* Video intercom */}
      <rect x="444" y="262" width="36" height="58" rx="3" />
      <rect className={s.screen} x="450" y="268" width="24" height="18" />
      <circle cx="462" cy="304" r="5" />
      <path className={s.faint} d="M454 293h16" />
      <circle className={s.pulse} cx="462" cy="277" r="16" />
      {/* Steps and planters */}
      <path d="M180 400h280M190 410h260M200 420h240" />
      <path d="M86 400l6-34h36l6 34z" />
      <path className={s.faint} d="M110 366c-14-24-6-48 0-62M110 366c14-22 22-40 18-58M110 366c-22-14-34-30-36-48" />
      <path d="M506 400l6-34h36l6 34z" />
      <path className={s.faint} d="M530 366c-14-24-6-48 0-62M530 366c14-22 22-40 18-58M530 366c-22-14-34-30-36-48" />
    </>
  );
}

/* ------------------------------------------------------------------ Kitchen, 1:00 PM */
function Kitchen({ glow }: ArtProps) {
  return (
    <>
      <path d="M20 40h600M20 400h600" />
      {/* Window with midday sun */}
      <rect x="392" y="96" width="196" height="150" />
      <path className={s.faint} d="M490 96v150M392 171h196" />
      <circle className={s.sun} cx="548" cy="132" r="16" />
      {/* Sun-tracking shade, half drawn */}
      <path className={`${s.shade}`} d="M392 96h196v54H392z" />
      {/* AC split unit with vents */}
      <rect x="92" y="54" width="168" height="30" rx="7" />
      <path className={s.faint} d="M104 76h144" />
      <path className={s.vent} d="M110 96c10 6 20-6 30 0s20 6 30 0 20-6 30 0 20 6 30 0" />
      <path className={s.vent} d="M118 110c10 6 20-6 30 0s20 6 30 0 20-6 30 0 20 6 30 0" />
      <path className={s.vent} d="M126 124c10 6 20-6 30 0s20 6 30 0 20-6 30 0" />
      {/* Upper cabinets */}
      <rect x="60" y="140" width="290" height="62" />
      <path className={s.faint} d="M132 140v62M205 140v62M278 140v62" />
      {/* Base run and hob */}
      <path d="M60 300h290M60 300v100M350 300v100" />
      <path className={s.faint} d="M60 312h290M132 312v88M205 312v88M278 312v88" />
      <ellipse cx="168" cy="296" rx="20" ry="3" />
      {/* Thermostat with readout */}
      <rect x="360" y="206" width="28" height="40" rx="3" />
      <text className={s.readout} x="374" y="232" textAnchor="middle">23°</text>
      {/* Presence sensor */}
      <path d="M300 40a10 10 0 0 0 20 0" />
      <circle className={s.pulse} cx="310" cy="46" r="18" />
      {/* Pendants over island with pools */}
      <path d="M410 40v136M470 40v136M530 40v136" className={s.faint} />
      <path d="M396 190l14-14 14 14zM456 190l14-14 14 14zM516 190l14-14 14 14z" />
      <path className={s.pool} d="M398 192l-28 138h80z" fill={glow} />
      <path className={s.pool} d="M458 192l-28 138h80z" fill={glow} />
      <path className={s.pool} d="M518 192l-28 138h80z" fill={glow} />
      {/* Island and stools */}
      <rect x="380" y="330" width="210" height="70" />
      <path className={s.faint} d="M380 342h210" />
      <path d="M404 400v-36h28v36M454 400v-36h28v36" />
    </>
  );
}

/* ------------------------------------------------------------------ Living & Majlis, 7:00 PM */
function Living({ glow }: ArtProps) {
  return (
    <>
      <path d="M20 40h600M20 400h600" />
      {/* Cove lighting along the ceiling */}
      <path d="M20 62h600" className={s.faint} />
      <rect className={s.cove} x="20" y="63" width="600" height="26" fill={glow} />
      {/* Window with evening sun, curtains close for privacy */}
      <rect x="364" y="104" width="226" height="226" />
      <path className={s.faint} d="M477 104v226" />
      <path className={s.sun} d="M440 330a37 37 0 0 1 74 0" />
      <path className={s.faint} d="M380 300h196M400 312h156" />
      <path d="M352 96h250" />
      <g className={s.curtainL}>
        <path d="M364 98v236M372 98v236M380 98v236M388 98v236" />
      </g>
      <g className={s.curtainR}>
        <path d="M590 98v236M582 98v236M574 98v236M566 98v236" />
      </g>
      {/* Ceiling speaker with sound */}
      <circle cx="196" cy="102" r="9" />
      <path className={s.wave} d="M176 120a28 28 0 0 0 40 0" />
      <path className={s.wave} d="M166 132a42 42 0 0 0 60 0" />
      {/* Framed art and keypad */}
      <rect x="96" y="160" width="190" height="104" />
      <rect className={s.faint} x="108" y="172" width="166" height="80" />
      <rect x="320" y="226" width="16" height="26" rx="2" />
      <circle className={s.led} cx="328" cy="236" r="2.6" />
      {/* Majlis seating */}
      <path d="M40 400v-74h300v74" />
      <path d="M40 342h300" />
      <path className={s.faint} d="M58 326c0-16 12-22 30-22s30 6 30 22M128 326c0-16 12-22 30-22s30 6 30 22M198 326c0-16 12-22 30-22s30 6 30 22M268 326c0-16 12-22 30-22s30 6 30 22" />
      {/* Coffee table with dallah */}
      <path d="M120 400v-24h140v24" />
      <path d="M170 376c0-14 4-22 10-26 0-6 2-10 6-10s6 4 6 10c6 4 10 12 10 26zM202 362l14-10" />
      <path className={s.faint} d="M224 376v-8h12v8M242 376v-8h12v8" />
      {/* Floor lamp pool */}
      <path d="M354 400V222M338 222h32l-8-24h-16z" />
      <path className={s.pool} d="M354 226l-52 174h104z" fill={glow} />
    </>
  );
}

/* ------------------------------------------------------------------ Bedroom, 10:30 PM */
function Bedroom({ glow }: ArtProps) {
  return (
    <>
      <path d="M20 40h600M20 400h600" />
      {/* Window with moon; blackout curtains close */}
      <rect x="228" y="72" width="184" height="128" />
      <path className={s.sun} d="M372 104a16 16 0 1 0 12 26 13 13 0 0 1-12-26z" />
      <path d="M216 66h208" />
      <g className={s.curtainL}>
        <path d="M228 68v136M235 68v136M242 68v136" />
      </g>
      <g className={s.curtainR}>
        <path d="M412 68v136M405 68v136M398 68v136" />
      </g>
      {/* AC unit */}
      <rect x="470" y="54" width="128" height="26" rx="6" />
      <path className={s.vent} d="M482 92c9 5 18-5 27 0s18 5 27 0 18-5 27 0 18 5 27 0" />
      <path className={s.vent} d="M490 104c9 5 18-5 27 0s18 5 27 0 18-5 27 0" />
      {/* Bed */}
      <rect x="178" y="226" width="284" height="94" rx="4" />
      <path className={s.faint} d="M196 244h248" />
      <rect x="160" y="320" width="320" height="44" />
      <path d="M170 364v36M470 364v36" />
      <rect className={s.faint} x="200" y="292" width="100" height="28" rx="10" />
      <rect className={s.faint} x="340" y="292" width="100" height="28" rx="10" />
      <path className={s.faint} d="M160 334c80 10 240 10 320 0" />
      {/* Bedside tables and lamps */}
      <rect x="86" y="318" width="62" height="82" />
      <rect x="492" y="318" width="62" height="82" />
      <path d="M102 318v-34M538 318v-34" />
      <path d="M92 284h20l-6-26h-8zM528 284h20l-6-26h-8z" />
      <path className={s.lamp} d="M102 288l-44 112h88z" fill={glow} />
      <path className={s.lamp} d="M538 288l-44 112h88z" fill={glow} />
      {/* "Goodnight" keypad */}
      <rect x="574" y="230" width="18" height="30" rx="2" />
      <circle className={s.led} cx="583" cy="241" r="2.8" />
    </>
  );
}

/* ------------------------------------------------------------------ Outdoor & Security, 11:15 PM */
function Outdoor({ glow, cone }: ArtProps) {
  return (
    <>
      {/* Night sky */}
      <path className={s.sun} d="M110 70a20 20 0 1 0 16 32 16 16 0 0 1-16-32z" />
      <path className={s.star} d="M200 60v6M197 63h6M262 98v6M259 101h6M300 44v6M297 47h6M180 132v4M178 134h4" />
      {/* Villa façade */}
      <path d="M330 400V130h276v270M320 130h296M330 142h276" />
      <rect className={s.faint} x="364" y="176" width="58" height="76" />
      <rect className={s.faint} x="452" y="176" width="58" height="76" />
      <rect className={s.faint} x="540" y="176" width="40" height="76" />
      <rect className={s.faint} x="452" y="290" width="62" height="110" />
      {/* CCTV camera, view cone and pulse */}
      <path d="M330 162h14M344 156h28l6 12h-34z" />
      <path className={s.cone} d="M378 166L250 330l-70-36z" fill={cone} />
      <circle className={s.pulse} cx="360" cy="162" r="18" />
      <circle className={s.led} cx="374" cy="162" r="2.2" />
      {/* Boundary wall and sliding gate */}
      <path d="M20 330h96M300 330h30M20 330v70M116 330v70M300 330v70" />
      <g className={s.gate}>
        <path d="M120 336h176v64H120z" />
        <path className={s.faint} d="M140 336v64M160 336v64M180 336v64M200 336v64M220 336v64M240 336v64M260 336v64M280 336v64" />
      </g>
      {/* Palm */}
      <path d="M64 330c4-60 2-120-10-170" />
      <path className={s.faint} d="M54 160c-20-6-40 0-50 14M54 160c-10-20-30-30-48-26M54 160c18-14 40-14 56-2M54 160c14-20 34-26 52-20M54 160c4-18-2-36-12-46" />
      {/* Path bollards and pools */}
      <path d="M150 400v-18M220 400v-18M290 400v-18" />
      <path className={s.pool} d="M150 384l-30 16h60z" fill={glow} />
      <path className={s.pool} d="M220 384l-30 16h60z" fill={glow} />
      <path className={s.pool} d="M290 384l-30 16h60z" fill={glow} />
      <path d="M10 400h620" />
    </>
  );
}

/* ------------------------------------------------------------------ Whole home at night, 11:45 PM */
function Night({ glow }: ArtProps) {
  const windows: [number, number, number, number][] = [
    [140, 170, 70, 60],
    [240, 170, 70, 60],
    [340, 170, 70, 60],
    [140, 290, 70, 60],
    [340, 290, 70, 60],
  ];
  return (
    <>
      <path className={s.star} d="M80 60v6M77 63h6M470 70v6M467 73h6M560 40v6M557 43h6M40 140v4M38 142h4M600 150v4M598 152h4" />
      <path className={s.sun} d="M520 96a18 18 0 1 0 14 30 15 15 0 0 1-14-30z" />
      {/* Section through the villa */}
      <path d="M110 400V140h330v260M98 140h354M110 152h330M110 270h330M226 152v118M324 152v248" />
      {windows.map(([x, y, w, h], i) => (
        <g key={i}>
          <rect className={s.win} x={x} y={y} width={w} height={h} fill={glow} style={{ ["--i" as string]: i }} />
          <rect x={x} y={y} width={w} height={h} />
        </g>
      ))}
      {/* Front door with lock */}
      <rect x="240" y="300" width="56" height="100" />
      <g className={s.lockIcon}>
        <rect x="258" y="334" width="20" height="16" rx="2" />
        <path d="M262 334v-6a6 6 0 0 1 12 0v6" />
      </g>
      {/* Phone with one-touch Away */}
      <rect x="500" y="214" width="84" height="150" rx="12" />
      <path className={s.faint} d="M528 226h28" />
      <circle className={s.away} cx="542" cy="290" r="22" />
      <path d="M534 284a10 10 0 1 0 16 0M542 278v10" />
      <circle className={s.pulse} cx="542" cy="290" r="30" />
      <path d="M20 400h600" />
    </>
  );
}

const ART: Record<RoomId, (p: ArtProps) => React.ReactElement> = {
  entrance: Entrance,
  kitchen: Kitchen,
  living: Living,
  bedroom: Bedroom,
  outdoor: Outdoor,
  night: Night,
};
