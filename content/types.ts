/**
 * The shared shape of /content/en.ts and /content/ar.ts.
 * Edit copy in those two files; components only read from here.
 */

/** Plain text, or text with a flag. `tbc` renders as <Placeholder> ("To be confirmed"); `arPending` marks English left in the Arabic site. */
export type Txt = string | Rich;
export interface Rich {
  text: string;
  tbc?: true;
  arPending?: true;
}

export type SystemSlug =
  | "smart-lighting"
  | "climate-control"
  | "curtains-shades"
  | "security-cctv"
  | "intercom-access"
  | "networking-wifi"
  | "audio-video"
  | "building-management";

export type RoomId = "entrance" | "kitchen" | "living" | "bedroom" | "outdoor" | "night";
export type Light = "dawn" | "noon" | "golden" | "dusk" | "night";
export type PropertyType = "villa" | "apartment" | "office" | "hotel" | "building";
export type PageKey =
  | "home"
  | "solutions"
  | "projects"
  | "carePlans"
  | "professionals"
  | "planner"
  | "contact";

/** An image slot. With no `src` it renders a tonal <ScenePlaceholder>; add a path in /public to show a real photo. */
export interface ImageRef {
  src?: string;
  alt: string;
  caption: Txt;
  tone: Light | "stone";
}

export interface RoomContent {
  id: RoomId;
  name: string;
  time: string;
  light: Light;
  moment: Txt;
  detail: Txt;
  systems: SystemSlug[];
}

export interface SystemContent {
  slug: SystemSlug;
  name: string;
  short: Txt;
  depth: "full" | "short";
  heroTitle: string;
  heroText: Txt;
  whatItDoes: { title: string; text: Txt }[];
  connections: { label: string; note: Txt }[];
  wired: { text: Txt; points: Txt[] };
  wireless: { text: Txt; points: Txt[] };
  faq: { q: string; a: Txt }[];
  relatedProject: string;
  brands: string[];
}

export interface ProjectContent {
  slug: string;
  title: Txt;
  location: Txt;
  type: PropertyType;
  size: Txt;
  timeline: Txt;
  systems: SystemSlug[];
  summary: Txt;
  cover: ImageRef;
  challenge: Txt;
  solution: Txt;
  result: Txt;
  gallery: ImageRef[];
  quote: { text: Txt; author: Txt };
}

export interface CarePlan {
  name: string;
  forWhom: Txt;
  price: Txt;
  response: Txt;
  features: Txt[];
  featured?: boolean;
}

export interface Testimonial {
  quote: Txt;
  name: Txt;
  place: Txt;
}

export interface Option<T extends string = string> {
  value: T;
  label: string;
  note?: string;
}

export interface SiteContent {
  locale: "en" | "ar";
  meta: {
    siteName: string;
    titleTemplate: string;
    description: string;
    ogLocale: string;
    pages: Record<PageKey, { title: string; description: string }>;
  };
  brand: {
    name: string;
    nameNote: Txt;
    wordmarkSub: string;
    promise: string;
    /** The part of the promise set in italics. */
    promiseEmphasis: string;
  };
  contact: {
    phone: string;
    phoneHref: string;
    whatsappNumber: string;
    email: string;
    address: string;
    hours: string;
    emergency: Txt;
    serviceArea: Txt[];
    serviceAreaLabel: string;
    mapCaption: Txt;
    geo: { lat: number; lng: number };
  };
  ui: {
    menu: string;
    close: string;
    plan: string;
    whatsappUs: string;
    switchLanguage: string;
    switchLanguageShort: string;
    skipToContent: string;
    tbc: string;
    arPending: string;
    pendingConfirmation: string;
    room: string;
    roomsNav: string;
    goToRoom: string;
    learnMore: string;
    viewProject: string;
    viewAll: string;
    previous: string;
    next: string;
    call: string;
    email: string;
    address: string;
    hours: string;
    replacePhoto: string;
    whatsappFloat: string;
    whatsappTemplate: string;
    topics: Record<PageKey, string>;
    propertyTypes: Record<PropertyType, string>;
  };
  nav: {
    links: { label: string; path: string }[];
    floorPlanTitle: string;
    floorPlanHint: string;
    otherPages: string;
  };
  home: {
    hero: {
      subline: string;
      proLink: string;
      scrollPrompt: string;
    };
    walkthrough: { title: string; intro: Txt; systemsLabel: string };
    systems: { title: string; intro: Txt };
    why: {
      title: string;
      intro: Txt;
      pullQuote: string;
      pillars: { title: string; text: Txt }[];
      image: ImageRef;
    };
    how: { title: string; intro: Txt; steps: { title: string; text: Txt }[] };
    projects: { title: string; intro: Txt };
    care: {
      title: string;
      intro: Txt;
      healthCheck: string;
      healthCheckCta: string;
      plansCta: string;
      emergencyLabel: string;
    };
    brands: { title: string; intro: Txt; protocolsTitle: string };
    testimonials: { title: string };
    pros: { title: string; text: string; cta: string; profile: string };
    final: { title: string; text: Txt; cta: string };
  };
  rooms: RoomContent[];
  systems: SystemContent[];
  services: { title: string; text: Txt }[];
  solutions: {
    title: string;
    intro: Txt;
    servicesTitle: string;
    labels: {
      whatItDoes: string;
      worksWith: string;
      worksWithIntro: Txt;
      wiredVsWireless: string;
      wired: string;
      wiredFor: string;
      wireless: string;
      wirelessFor: string;
      related: string;
      brands: string;
      faq: string;
      ctaTitle: string;
      ctaText: Txt;
      ctaButton: string;
      allSystems: string;
    };
  };
  projects: ProjectContent[];
  projectsPage: {
    title: string;
    intro: Txt;
    filterType: string;
    filterSystem: string;
    all: string;
    empty: string;
    labels: {
      location: string;
      type: string;
      size: string;
      timeline: string;
      systems: string;
      challenge: string;
      solution: string;
      result: string;
      gallery: string;
      similar: string;
      ctaTitle: string;
      ctaButton: string;
    };
  };
  carePlans: CarePlan[];
  carePage: {
    title: string;
    intro: Txt;
    promiseTitle: string;
    promises: { title: string; text: Txt }[];
    tiersTitle: string;
    responseLabel: string;
    choose: string;
    healthTitle: string;
    healthText: Txt;
    healthCta: string;
  };
  brands: { name: string; status: string }[];
  protocols: string[];
  testimonials: Testimonial[];
  prosPage: {
    title: string;
    intro: Txt;
    capabilitiesTitle: string;
    capabilities: { title: string; text: Txt }[];
    sectorsTitle: string;
    sectors: string[];
    teamsTitle: string;
    teams: { title: string; text: Txt }[];
    profileTitle: string;
    profileText: Txt;
    profileCta: string;
    formTitle: string;
    formIntro: Txt;
  };
  forms: {
    name: string;
    mobile: string;
    email: string;
    company: string;
    message: string;
    visitDate: string;
    notes: string;
    upload: string;
    uploadHint: string;
    uploadChosen: string;
    projectType: string;
    submit: string;
    sending: string;
    sent: string;
    sentText: string;
    error: string;
    required: string;
    invalidEmail: string;
    invalidMobile: string;
    optional: string;
  };
  planner: {
    title: string;
    intro: Txt;
    stepLabel: string;
    of: string;
    back: string;
    next: string;
    submit: string;
    steps: {
      who: { title: string; options: Option<"homeowner" | "professional" | "designer" | "business">[] };
      property: { title: string; options: Option<PropertyType>[] };
      stage: { title: string; options: Option<"planning" | "construction" | "finished">[] };
      location: { title: string; options: Option<"rak" | "uaq" | "ajman" | "sharjah" | "other">[] };
      systems: { title: string; hint: string };
      contact: { title: string; hint: string };
    };
    errors: { choose: string; chooseSystems: string };
    summary: {
      title: string;
      lead: string;
      otherLocation: string;
      systemsCount: string;
      systemsCountOne: string;
      answerLabels: Record<"who" | "property" | "stage" | "location" | "systems" | "visit", string>;
      stageNotes: Record<"planning" | "construction" | "finished", string>;
      yourAnswers: string;
      book: string;
      whatsapp: string;
      edit: string;
      bookedTitle: string;
      bookedText: string;
      waIntro: string;
    };
  };
  contactPage: {
    title: string;
    intro: Txt;
    whatsappText: string;
    formTitle: string;
    emergencyTitle: string;
    openDaily: string;
  };
  footer: {
    quickLinks: string;
    contact: string;
    supportedBadge: string;
    rights: string;
    concept: string;
  };
}
