"use client";

import { useEffect, useRef, useState } from "react";
import type { RoomId } from "@/content/types";
import { RoomArt } from "@/components/rooms/RoomArt";

/** A room drawing that switches its systems on once it scrolls into view. */
export function LiveRoomArt({ room, uid, title }: { room: RoomId; uid: string; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <RoomArt room={room} active={active} uid={uid} title={title} />
    </div>
  );
}
