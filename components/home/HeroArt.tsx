import s from "./HeroArt.module.css";

/** The villa entrance at dawn. Its doors open as the visitor scrolls into the walkthrough. */
export function HeroArt({ label }: { label: string }) {
  const diamonds = Array.from({ length: 34 }, (_, i) => 74 + i * 19.4);
  return (
    <svg viewBox="0 0 800 520" className={s.art} role="img" aria-label={label} preserveAspectRatio="xMidYMax meet">
      <defs>
        <radialGradient id="hero-pool" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="var(--golden)" stopOpacity="0.9" />
          <stop offset="70%" stopColor="var(--golden)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--golden)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className={s.lines}>
        {/* Dawn sun and sky */}
        <circle className={s.sun} cx="716" cy="66" r="26" />
        <path className={s.faint} d="M640 108h130M664 122h80" />

        {/* Parapet with geometric screen band */}
        <path d="M60 500V150h680v350M48 130h704v20H48z" />
        <g className={s.faint}>
          {diamonds.map((x) => (
            <path key={x} d={`M${x} 140l6-6 6 6-6 6z`} />
          ))}
        </g>
        <path className={s.faint} d="M60 166h680" />

        {/* Flanking arched windows */}
        <path d="M140 420V250a50 50 0 0 1 100 0v170zM560 420V250a50 50 0 0 1 100 0v170z" />
        <path className={s.faint} d="M190 200v220M140 300h100M610 200v220M560 300h100" />
        <path d="M130 420h120M550 420h120" />

        {/* Interior light revealed as the doors open */}
        <path className={`${s.glow} hero-glow`} d="M326 500V262a74 74 0 0 1 148 0v238z" />

        {/* Arched entrance */}
        <path d="M310 500V250a90 90 0 0 1 180 0v250" />
        <path d="M326 500V252a74 74 0 0 1 148 0v248" />
        <path className={s.faint} d="M326 266h148M400 266v-88M400 266l-50-66M400 266l50-66" />

        {/* Door leaves */}
        <g className="hero-door-l">
          <path d="M330 500V270h70v230z" className={s.leaf} />
          <path className={s.faint} d="M342 286h46v84h-46zM342 386h46v96h-46z" />
          <path d="M392 380v28" />
        </g>
        <g className="hero-door-r">
          <path d="M400 500V270h70v230z" className={s.leaf} />
          <path className={s.faint} d="M412 286h46v84h-46zM412 386h46v96h-46z" />
          <path d="M408 380v28" />
        </g>

        {/* Sconces with light pools */}
        <path className={s.pool} d="M284 292l-40 208h80z" fill="url(#hero-pool)" />
        <path className={s.pool} d="M516 292l-40 208h80z" fill="url(#hero-pool)" />
        <rect x="277" y="270" width="14" height="22" rx="2" />
        <rect x="509" y="270" width="14" height="22" rx="2" />

        {/* Video intercom */}
        <rect x="530" y="340" width="26" height="42" rx="2" />
        <rect className={s.screen} x="534" y="345" width="18" height="13" />
        <circle cx="543" cy="371" r="4" />

        {/* Steps and ground */}
        <path d="M260 500h280M250 510h300M240 520h320M0 500h800" />

        {/* Palms */}
        <path d="M24 500c6-90 4-170-12-240" />
        <path className={s.faint} d="M12 260c-16-4-30 4-38 16M12 260c-6-18-22-28-38-26M12 260c16-12 34-12 48 0M12 260c12-18 30-22 46-16" />
        <path d="M778 500c-6-90-4-170 12-240" />
        <path className={s.faint} d="M790 260c16-4 30 4 38 16M790 260c6-18 22-28 38-26M790 260c-16-12-34-12-48 0M790 260c-12-18-30-22-46-16" />
      </g>
    </svg>
  );
}
