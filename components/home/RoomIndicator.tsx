"use client";

import s from "./RoomIndicator.module.css";

interface Props {
  rooms: { id: string; name: string; time: string; label: string }[];
  active: number;
  visible: boolean;
  onJump: (i: number) => void;
  label: string;
  goTo: string;
}

/** Slim side rail: the current room and time of day, with a stop for each room. */
export function RoomIndicator({ rooms, active, visible, onJump, label, goTo }: Props) {
  const current = rooms[Math.max(0, active)];
  return (
    <nav className={s.rail} aria-label={label} data-visible={visible}>
      <p className={s.now} aria-live="polite">
        <span className={s.nowLabel}>{current.label}</span>
        <span className={s.nowName}>{current.name}</span>
        <span className={s.nowTime}>{current.time}</span>
      </p>
      <ol className={s.stops}>
        {rooms.map((r, i) => (
          <li key={r.id}>
            <button
              type="button"
              className={s.stop}
              aria-current={i === active ? "step" : undefined}
              aria-label={`${goTo} ${r.label} · ${r.name} · ${r.time}`}
              onClick={() => onJump(i)}
              tabIndex={visible ? 0 : -1}
            >
              <span className={s.tick} aria-hidden="true" />
              <span className={s.tip} aria-hidden="true">
                {r.name}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
