"use client";

import { usePathname } from "next/navigation";
import type { PageKey } from "@/content/types";
import { useWaTopic, waLink } from "@/lib/wa";
import styles from "./WhatsAppButton.module.css";

interface Props {
  number: string;
  template: string;
  label: string;
  topics: Record<PageKey, string>;
}

const routeToKey: [RegExp, PageKey][] = [
  [/\/solutions/, "solutions"],
  [/\/projects/, "projects"],
  [/\/care-plans/, "carePlans"],
  [/\/professionals/, "professionals"],
  [/\/planner/, "planner"],
  [/\/contact/, "contact"],
];

/** Floating WhatsApp button on every page; the message names the current page, room or system. */
export function WhatsAppButton({ number, template, label, topics }: Props) {
  const pathname = usePathname() ?? "";
  const live = useWaTopic();
  const key = routeToKey.find(([re]) => re.test(pathname))?.[1] ?? "home";
  const topic = live ?? topics[key];
  const message = template.replace("{topic}", topic);

  return (
    <a className={styles.button} href={waLink(number, message)} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className={styles.icon}>
        <path
          fill="currentColor"
          d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.3 28.8l6.6-1.7A12.7 12.7 0 1 0 16 3.2Zm0 23.2a10.5 10.5 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.5 10.5 0 1 1 16 26.4Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.6 8.6 0 0 1-2.5-1.6 9.6 9.6 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5a.6.6 0 0 0 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.4 3.4 14.6 14.6 0 0 0 5.6 4.9c2 .9 2.8.9 3.8.8a3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.4Z"
        />
      </svg>
      <span className={styles.text}>WhatsApp</span>
    </a>
  );
}
