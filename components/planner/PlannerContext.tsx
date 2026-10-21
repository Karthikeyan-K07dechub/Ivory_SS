"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { PropertyType, SystemSlug } from "@/content/types";

export type Who = "homeowner" | "professional" | "designer" | "business";
export type Stage = "planning" | "construction" | "finished";
export type Place = "rak" | "uaq" | "ajman" | "sharjah" | "other";

export interface PlannerAnswers {
  who: Who | null;
  property: PropertyType | null;
  stage: Stage | null;
  location: Place | null;
  systems: SystemSlug[];
  contact: { name: string; mobile: string; email: string; visitDate: string; notes: string; company: string; drawing: string };
}

interface PlannerState {
  answers: PlannerAnswers;
  step: number;
  setStep: (n: number) => void;
  update: <K extends keyof PlannerAnswers>(key: K, value: PlannerAnswers[K]) => void;
  setContact: (key: keyof PlannerAnswers["contact"], value: string) => void;
  toggleSystem: (slug: SystemSlug) => void;
  isPro: boolean;
}

const Ctx = createContext<PlannerState | null>(null);

export const emptyAnswers: PlannerAnswers = {
  who: null,
  property: null,
  stage: null,
  location: null,
  systems: [],
  contact: { name: "", mobile: "", email: "", visitDate: "", notes: "", company: "", drawing: "" },
};

/** Holds the Planner's answers and current step for every step component. */
export function PlannerProvider({ initial, children }: { initial: Partial<PlannerAnswers>; children: React.ReactNode }) {
  const [answers, setAnswers] = useState<PlannerAnswers>({ ...emptyAnswers, ...initial });
  const [step, setStep] = useState(0);

  const value = useMemo<PlannerState>(
    () => ({
      answers,
      step,
      setStep,
      update: (key, v) => setAnswers((a) => ({ ...a, [key]: v })),
      setContact: (key, v) => setAnswers((a) => ({ ...a, contact: { ...a.contact, [key]: v } })),
      toggleSystem: (slug) =>
        setAnswers((a) => ({
          ...a,
          systems: a.systems.includes(slug) ? a.systems.filter((x) => x !== slug) : [...a.systems, slug],
        })),
      isPro: answers.who === "professional" || answers.who === "designer",
    }),
    [answers, step]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePlanner() {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePlanner must be used inside <PlannerProvider>");
  return v;
}
