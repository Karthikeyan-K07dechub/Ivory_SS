import type { SiteContent, SystemContent, ProjectContent } from "./types";
import { tbc } from "./helpers";

/* ---------------------------------------------------------------------------
 * Ivory Smart Home — English content.
 * Everything wrapped in tbc() is invented and listed in /content/PLACEHOLDERS.md.
 * ------------------------------------------------------------------------- */

const systems: SystemContent[] = [
  {
    slug: "smart-lighting",
    name: "Smart Lighting & Scenes",
    short: "Every light in the home on one touch, a schedule or the time of day.",
    depth: "full",
    heroTitle: "Light that knows what the room is for",
    heroText:
      "One tap sets the whole villa for morning, dinner, prayer or sleep. Lights fade in at dawn, guide you at night and switch off in rooms nobody is using.",
    whatItDoes: [
      {
        title: "Scenes instead of switches",
        text: "A single keypad button or phone tap sets every light in a room at once: \"Welcome guests\" brightens the majlis and dims the corridor, \"Dinner\" lowers the living room and warms the dining table.",
      },
      {
        title: "Morning and night routines",
        text: "Bedroom lights rise slowly before your alarm. At night, low path lights guide you to the kitchen or the children's room without waking anyone.",
      },
      {
        title: "Lights that follow you",
        text: "Motion and presence sensors switch on corridors, stairs, store rooms and bathrooms as you walk in, and switch them off when the room is empty.",
      },
      {
        title: "Outdoor and façade lighting",
        text: "Garden, pool and façade lights come on at sunset and go off at a time you choose, adjusting automatically through the year.",
      },
      {
        title: "Less wasted energy",
        text: "Lights left on in empty rooms are switched off for you, and you can see and control the whole home from your phone when you are away.",
      },
    ],
    connections: [
      { label: "Scenes", note: "One button sets lights, curtains and AC together." },
      { label: "Sensors", note: "Presence and daylight sensors decide when lights are needed." },
      { label: "Curtains", note: "Curtains close and lights rise at sunset." },
      { label: "Schedules", note: "Sunrise and sunset times update through the year." },
      { label: "Security", note: "Lights switch on if the alarm or a camera detects movement." },
    ],
    wired: {
      text: "Planned during construction, with lighting circuits and keypads wired back to a central panel.",
      points: [
        "Most reliable choice for a new villa",
        "Clean, minimal keypads with engraved scene names",
        "Easy to expand and maintain for decades",
      ],
    },
    wireless: {
      text: "Smart switches and dimmers replace your existing ones, with no new cables or broken walls.",
      points: [
        "Installed in a finished home in days",
        "Works with your existing light fittings",
        "Ideal for apartments and phased upgrades",
      ],
    },
    faq: [
      {
        q: "Can I still use normal switches?",
        a: "Yes. Every room keeps a physical keypad or switch, so guests, family and staff never need a phone to turn on a light.",
      },
      {
        q: "What happens if the internet goes down?",
        a: "Lighting runs locally inside your home. Keypads, scenes and schedules keep working without the internet; only remote control from outside the home pauses.",
      },
      {
        q: "Will it work with my existing light fittings?",
        a: "In most cases, yes. During the site survey we check your fittings and drivers and tell you which ones dim smoothly and which should be replaced.",
      },
      {
        q: "Can you add smart lighting to a finished villa?",
        a: "Yes. Wireless dimmers and switches fit into existing back boxes, so we can automate a finished home without chasing walls.",
      },
      {
        q: "Who changes the scenes later?",
        a: "We set up scenes with you at handover and train you to adjust them in the app. If you want bigger changes, our local team can reprogram them on site or remotely.",
      },
    ],
    relatedProject: "private-villa-al-hamra",
    brands: ["LifeSmart", "CORE", "Larnitech"],
  },
  {
    slug: "climate-control",
    name: "Climate & AC Control",
    short: "Cool only the rooms in use, and arrive to a home at the right temperature.",
    depth: "short",
    heroTitle: "Cool where you are, not where you are not",
    heroText:
      "Air conditioning is the largest bill in a UAE home. Ivory links every AC unit to schedules and presence sensors so empty rooms rest while occupied rooms stay comfortable.",
    whatItDoes: [
      {
        title: "Room-by-room control",
        text: "Set each room's temperature from a wall panel or your phone, and keep the whole house in one view.",
      },
      {
        title: "Cool only occupied rooms",
        text: "Presence sensors relax the AC in rooms nobody is using and bring it back before you walk in.",
      },
      {
        title: "Arrive to a cool home",
        text: "Start cooling from the car or let the home do it on a schedule before you return.",
      },
    ],
    connections: [
      { label: "Sensors", note: "Presence decides which rooms need cooling." },
      { label: "Curtains", note: "Shades close on the sunny side to help the AC." },
      { label: "Scenes", note: "\"Goodnight\" sets bedrooms to sleep temperature." },
      { label: "Schedules", note: "Pre-cool before you get home." },
    ],
    wired: {
      text: "AC gateways and wall panels planned with your MEP consultant during construction.",
      points: ["Central and ducted systems", "Engraved wall panels", "Energy monitoring per zone"],
    },
    wireless: {
      text: "Smart controllers for split units added to a finished home.",
      points: ["No rewiring", "Works with most split AC brands", "Installed in a day"],
    },
    faq: [
      {
        q: "Does it work with my AC brand?",
        a: "Most central, ducted and split systems can be controlled. We confirm compatibility during the site survey.",
      },
      {
        q: "Will it reduce my electricity bill?",
        a: "Cooling only the rooms in use usually lowers consumption. We will show you the settings that make the biggest difference for your home.",
      },
      {
        q: "Can I still use the AC remote?",
        a: "Yes. Remotes and wall panels keep working; the system simply knows what each unit is doing.",
      },
    ],
    relatedProject: "office-building-rak",
    brands: ["LifeSmart", "CORE"],
  },
  {
    slug: "curtains-shades",
    name: "Curtains & Shades",
    short: "Curtains that open with the morning and close against the afternoon sun.",
    depth: "full",
    heroTitle: "Curtains that move with the sun",
    heroText:
      "Motorised curtains and shades open gently with the morning, close against the afternoon heat and give you privacy at night, without anyone walking from window to window.",
    whatItDoes: [
      {
        title: "Morning open",
        text: "Bedroom curtains open slowly at the time you choose, so you wake to daylight instead of an alarm.",
      },
      {
        title: "Keep rooms cool in summer",
        text: "Sun-tracking closes shades on the side of the house facing the sun and opens them again as it moves on, so the AC works less through UAE summers.",
      },
      {
        title: "Privacy at night",
        text: "At sunset, curtains facing the street and neighbours close by themselves, and the lights come on behind them.",
      },
      {
        title: "Holiday mode",
        text: "While you travel, curtains open and close at different times each day so the villa looks lived in.",
      },
      {
        title: "One touch for the whole floor",
        text: "Close every curtain in the majlis or the whole upper floor with one button, instead of walking from window to window.",
      },
    ],
    connections: [
      { label: "Scenes", note: "\"Cinema\" closes curtains and dims lights together." },
      { label: "Sun position", note: "Shades follow the sun around the house." },
      { label: "Air conditioning", note: "Closing hot windows helps the AC." },
      { label: "Schedules", note: "Open at sunrise, close at sunset." },
      { label: "Away mode", note: "Varies opening times while you travel." },
    ],
    wired: {
      text: "Curtain boxes, power and control cables planned with your interior designer before ceilings close.",
      points: [
        "Motors hidden in ceiling pockets",
        "Silent, heavy-duty tracks for long curtains",
        "Keypad control in every room",
      ],
    },
    wireless: {
      text: "Battery or plug-in motors fitted to existing curtain tracks and blinds.",
      points: [
        "No new cables or ceiling work",
        "Fitted to most existing tracks",
        "Controlled from phone, remote or keypad",
      ],
    },
    faq: [
      {
        q: "Can you motorise my existing curtains?",
        a: "Often, yes. We check your tracks and fabric weight during the survey. Light to medium curtains can usually be motorised; very heavy ones may need a new track.",
      },
      {
        q: "Are the motors noisy?",
        a: "The motors we install are designed for bedrooms and run quietly. We will demonstrate the sound before you decide.",
      },
      {
        q: "What happens in a power cut?",
        a: "Curtains stay where they are, and most can still be pulled by hand. Battery motors keep working through a short power cut.",
      },
      {
        q: "Can curtains really help with cooling?",
        a: "Yes. Closing shades on sun-facing windows during the hottest hours keeps heat out of the room, so the AC has less to do.",
      },
      {
        q: "When should I plan motorised curtains?",
        a: "Ideally before the ceiling and curtain pockets are finished, so power and motors can be hidden. In a finished home we use wireless motors instead.",
      },
    ],
    relatedProject: "apartment-mina-al-arab",
    brands: ["LifeSmart", "Larnitech"],
  },
  {
    slug: "security-cctv",
    name: "Security & CCTV",
    short: "Cameras, sensors and alerts you can check from anywhere.",
    depth: "short",
    heroTitle: "See your home from anywhere",
    heroText:
      "Cameras, door sensors and alarms work together, and send a clear alert to your phone when something needs your attention, not every time a cat walks past.",
    whatItDoes: [
      { title: "Cameras you can trust", text: "Clear day and night images of gates, doors, parking and garden, recorded on site." },
      { title: "Smart alerts", text: "Notifications for people and vehicles, with quiet hours you set." },
      { title: "Lights that respond", text: "Outdoor lights switch on when a camera sees movement at night." },
    ],
    connections: [
      { label: "Lighting", note: "Floodlights respond to movement." },
      { label: "Intercom", note: "See who is at the gate before you answer." },
      { label: "Away mode", note: "Arms sensors and cameras together." },
      { label: "Phone", note: "Live view and recordings from anywhere." },
    ],
    wired: {
      text: "Cabled cameras and sensors planned with the villa's network.",
      points: ["Most reliable recording", "PoE cameras with one cable each", "Central recorder on site"],
    },
    wireless: {
      text: "Wireless cameras and sensors for a finished home.",
      points: ["Fast installation", "No ceiling or wall work", "Easy to add more later"],
    },
    faq: [
      { q: "Where is the footage stored?", a: "On a recorder inside your home, with optional cloud backup if you prefer." },
      { q: "Can I see cameras on my phone?", a: "Yes, live and recorded, from anywhere with an internet connection." },
      { q: "Can you upgrade an existing system?", a: "Yes. We can review what you have and reuse cables and cameras where it makes sense." },
    ],
    relatedProject: "private-villa-al-hamra",
    brands: ["LifeSmart", "CORE"],
  },
  {
    slug: "intercom-access",
    name: "Intercom & Access Control",
    short: "Answer the gate from your phone and let the right people in.",
    depth: "short",
    heroTitle: "Answer the gate from anywhere",
    heroText:
      "A video intercom at the gate and smart locks at the door let you see visitors, talk to them and open up for family, drivers or deliveries, wherever you are.",
    whatItDoes: [
      { title: "Video intercom", text: "See and talk to visitors from indoor screens or your phone." },
      { title: "Smart locks", text: "Fingerprint, code, card or phone entry, with a record of who came in." },
      { title: "Guest and staff access", text: "Temporary codes for guests, cleaners and maintenance visits." },
    ],
    connections: [
      { label: "Lighting", note: "Entrance lights welcome you as the door unlocks." },
      { label: "Cameras", note: "Gate camera opens with every call." },
      { label: "Scenes", note: "Unlocking at night turns on the path lights." },
      { label: "Phone", note: "Answer and open from anywhere." },
    ],
    wired: {
      text: "Intercom and access cabling planned for gates, doors and lifts.",
      points: ["Multiple indoor screens", "Gate and door control", "Ideal for villas and buildings"],
    },
    wireless: {
      text: "Wireless video doorbells and smart locks for finished homes.",
      points: ["Quick to install", "Phone-based answering", "Works on existing doors"],
    },
    faq: [
      { q: "Can I open the gate from my phone?", a: "Yes, with a video call first so you can see who is there." },
      { q: "Do smart locks work in a power cut?", a: "Yes. Locks run on batteries and keep a mechanical key backup." },
      { q: "Can tenants or staff have their own codes?", a: "Yes. Each person gets their own code or card that you can cancel at any time." },
    ],
    relatedProject: "private-villa-al-hamra",
    brands: ["LifeSmart", "Larnitech"],
  },
  {
    slug: "networking-wifi",
    name: "Networking & Whole-Home Wi-Fi",
    short: "Strong Wi-Fi in every room, garden and majlis included.",
    depth: "short",
    heroTitle: "Wi-Fi that reaches the garden",
    heroText:
      "Thick villa walls stop ordinary routers. A properly designed network gives every room, the majlis and the garden a strong, stable connection, and gives your smart home a reliable backbone.",
    whatItDoes: [
      { title: "Every room covered", text: "Access points placed by survey, not guesswork." },
      { title: "One seamless network", text: "Walk from bedroom to garden without the connection dropping." },
      { title: "Separate guest Wi-Fi", text: "Guests get internet without seeing your devices." },
    ],
    connections: [
      { label: "Cameras", note: "Dedicated capacity for recording." },
      { label: "Audio-video", note: "Stable streaming in every room." },
      { label: "Smart devices", note: "A separate, secure network for automation." },
      { label: "Remote support", note: "Lets our team help without a visit." },
    ],
    wired: {
      text: "Network cabling and racks planned during construction.",
      points: ["Ceiling access points", "Organised network cabinet", "Best speed and stability"],
    },
    wireless: {
      text: "Mesh Wi-Fi for finished homes where cabling is difficult.",
      points: ["No new cables", "Installed in hours", "Expandable"],
    },
    faq: [
      { q: "Why is my Wi-Fi weak in some rooms?", a: "Concrete and block walls absorb signal. More well-placed access points solve it." },
      { q: "Do I need a new internet contract?", a: "No. We work with your existing provider's connection." },
      { q: "Can you fix Wi-Fi in a finished villa?", a: "Yes, with mesh access points or by reusing existing cables." },
    ],
    relatedProject: "apartment-mina-al-arab",
    brands: ["LifeSmart"],
  },
  {
    slug: "audio-video",
    name: "Audio-Video & Home Cinema",
    short: "Music in every room and a cinema that starts with one touch.",
    depth: "short",
    heroTitle: "Music in every room, cinema on one touch",
    heroText:
      "Ceiling speakers that disappear into the design, music that follows you through the home, and a home cinema where one button dims the lights, closes the curtains and starts the film.",
    whatItDoes: [
      { title: "Multi-room audio", text: "Different music in each room, or the same everywhere." },
      { title: "Home cinema", text: "Projector, screen and sound designed for the room." },
      { title: "One-touch movie night", text: "Lights, curtains and AC set themselves for the film." },
    ],
    connections: [
      { label: "Lighting", note: "Lights dim when the film starts." },
      { label: "Curtains", note: "Curtains close for the screen." },
      { label: "Scenes", note: "\"Welcome guests\" starts soft music." },
      { label: "Network", note: "Stable streaming in every room." },
    ],
    wired: {
      text: "Speaker and video cabling planned before ceilings close.",
      points: ["Invisible ceiling speakers", "Dedicated cinema rooms", "Central equipment rack"],
    },
    wireless: {
      text: "Wireless speakers and streaming for finished rooms.",
      points: ["No ceiling work", "Add rooms over time", "Phone-controlled"],
    },
    faq: [
      { q: "Can I play music from my phone?", a: "Yes, from your usual music apps, to any room." },
      { q: "Do I need a separate cinema room?", a: "No. A living room can become a cinema with the right screen, sound and scene." },
      { q: "Will speakers be visible?", a: "Ceiling and wall speakers can be painted to match or hidden completely." },
    ],
    relatedProject: "private-villa-al-hamra",
    brands: ["CORE"],
  },
  {
    slug: "building-management",
    name: "Building Management (BMS)",
    short: "Lighting, AC, access and energy for whole buildings, in one view.",
    depth: "short",
    heroTitle: "One view of the whole building",
    heroText:
      "For offices, hotels and residential buildings, a building management system brings lighting, AC, access and energy monitoring into one view for the facility team.",
    whatItDoes: [
      { title: "Central monitoring", text: "Lighting, AC and access status for every floor." },
      { title: "Energy tracking", text: "See consumption by floor, tenant or system." },
      { title: "Alarms and maintenance", text: "Faults reported before tenants notice them." },
    ],
    connections: [
      { label: "AC", note: "Schedules by floor and tenant." },
      { label: "Lighting", note: "Common areas follow occupancy." },
      { label: "Access", note: "Cards and lifts managed centrally." },
      { label: "Energy", note: "Metering and reports." },
    ],
    wired: {
      text: "Designed with the MEP consultant for new buildings.",
      points: ["Open protocols such as KNX", "Scalable to any size", "Full documentation"],
    },
    wireless: {
      text: "Retrofit monitoring for existing buildings.",
      points: ["Minimal disruption", "Phased upgrades", "Works alongside existing systems"],
    },
    faq: [
      { q: "Do you work with consultants and contractors?", a: "Yes. We provide design drawings, BOQ and commissioning for building projects." },
      { q: "Can you take over an existing BMS?", a: "We can review it and advise on support or upgrade." },
      { q: "Which protocols do you use?", a: "Mainly open standards such as KNX, so the building is not locked to one supplier." },
    ],
    relatedProject: "office-building-rak",
    brands: ["CORE", "Larnitech"],
  },
];

const gallery = (place: string, rooms: string[]) =>
  rooms.map((room, i) => ({
    alt: `${room}, ${place}`,
    caption: `Photo: ${room.toLowerCase()} (replace)`,
    tone: (["golden", "dawn", "noon", "dusk", "stone", "night"] as const)[i % 6],
  }));

const projects: ProjectContent[] = [
  {
    slug: "private-villa-al-hamra",
    title: tbc("Private villa, Al Hamra"),
    location: tbc("Al Hamra, Ras Al Khaimah"),
    type: "villa",
    size: tbc("5 bedrooms · 850 m²"),
    timeline: tbc("6 months, from design to handover"),
    systems: ["smart-lighting", "climate-control", "curtains-shades", "security-cctv", "intercom-access", "audio-video"],
    summary: tbc("A family villa automated from the shell stage: lighting scenes, curtains, cooling and security in one system."),
    cover: { alt: "Living room of a villa in Al Hamra at dusk", caption: "Photo: Al Hamra villa, living room at dusk (replace)", tone: "golden" },
    challenge: tbc(
      "The family wanted every room to feel simple to use for parents, children and visiting grandparents, with a large majlis that changes from everyday use to formal guests in seconds."
    ),
    solution: tbc(
      "We joined the project before the ceilings closed, planned wired lighting and curtain control throughout, and designed four whole-home scenes: Morning, Welcome guests, Goodnight and Away."
    ),
    result: tbc(
      "One keypad per room, fewer switches on every wall, and a villa that cools only the rooms in use. The family was trained at handover and is on a Plus care plan."
    ),
    gallery: gallery("Al Hamra villa", ["Majlis with evening scene", "Entrance and video intercom", "Kitchen at midday", "Master bedroom curtains", "Garden lighting", "Equipment rack"]),
    quote: { text: tbc("We stopped thinking about switches. The house just feels right at every hour."), author: tbc("Homeowner, Al Hamra") },
  },
  {
    slug: "apartment-mina-al-arab",
    title: tbc("Apartment, Mina Al Arab"),
    location: tbc("Mina Al Arab, Ras Al Khaimah"),
    type: "apartment",
    size: tbc("3 bedrooms · 210 m²"),
    timeline: tbc("3 weeks, in a finished home"),
    systems: ["curtains-shades", "smart-lighting", "networking-wifi", "climate-control"],
    summary: tbc("A finished sea-view apartment upgraded wirelessly, with no walls opened."),
    cover: { alt: "Sea-view apartment in Mina Al Arab at midday", caption: "Photo: Mina Al Arab apartment, sea view at noon (replace)", tone: "noon" },
    challenge: tbc("Floor-to-ceiling glass made the apartment hot every afternoon, and the owners did not want any building work."),
    solution: tbc("Wireless curtain motors on the existing tracks, sun-tracking shades, smart dimmers in existing back boxes and a mesh Wi-Fi network."),
    result: tbc("Cooler afternoons, curtains that look after themselves, and strong Wi-Fi on the balcony."),
    gallery: gallery("Mina Al Arab apartment", ["Living room shades", "Balcony at sunset", "Bedroom morning light", "Kitchen dimmers", "Wi-Fi access point", "Entrance keypad"]),
    quote: { text: tbc("No dust, no broken walls, and the apartment is noticeably cooler in the afternoon."), author: tbc("Owner, Mina Al Arab") },
  },
  {
    slug: "office-building-rak",
    title: tbc("Office building, RAK"),
    location: tbc("Ras Al Khaimah city"),
    type: "office",
    size: tbc("6 floors · 4,200 m²"),
    timeline: tbc("9 months, with the MEP contractor"),
    systems: ["building-management", "climate-control", "smart-lighting", "intercom-access", "networking-wifi"],
    summary: tbc("Lighting, AC and access for a six-floor office building in one management view."),
    cover: { alt: "Office building lobby in Ras Al Khaimah", caption: "Photo: RAK office building, lobby (replace)", tone: "stone" },
    challenge: tbc("The owner needed to cut energy use in common areas and give each tenant control of their own floor."),
    solution: tbc("A KNX-based building management system with occupancy-based lighting, tenant AC schedules and card access, designed with the MEP consultant."),
    result: tbc("One view of the whole building for the facility team, with energy reports by floor."),
    gallery: gallery("RAK office building", ["Lobby lighting", "Tenant floor", "Meeting room panel", "Access control", "Facility dashboard", "Riser and panels"]),
    quote: { text: tbc("The facility team finally sees the whole building on one screen."), author: tbc("Facility manager, RAK") },
  },
];

export const en: SiteContent = {
  locale: "en",
  meta: {
    siteName: "Ivory Smart Home",
    titleTemplate: "%s · Ivory Smart Home",
    description:
      "Smart homes designed in Ras Al Khaimah and supported for life. Lighting, climate, curtains, security, intercom, Wi-Fi and home cinema, designed into your home and maintained by our local team.",
    ogLocale: "en_AE",
    pages: {
      home: {
        title: "Smart homes in Ras Al Khaimah",
        description: "Lighting, climate, curtains, security and more, designed into your villa and maintained by our local RAK team.",
      },
      solutions: {
        title: "Smart home systems",
        description: "Eight systems working as one: lighting, AC, curtains, security, intercom, Wi-Fi, audio-video and building management.",
      },
      projects: {
        title: "Projects",
        description: "Villas, apartments and buildings automated by Ivory Smart Home in the Northern Emirates.",
      },
      carePlans: {
        title: "Care plans · Supported for Life",
        description: "Local maintenance, fast response and system health checks for your smart home, even if another company installed it.",
      },
      professionals: {
        title: "For developers and consultants",
        description: "Send your drawings and receive a smart home system design and BOQ. Design, supply, installation and commissioning.",
      },
      planner: {
        title: "Plan my smart home",
        description: "Six short steps to plan the systems for your villa, apartment or building, and book a free consultation.",
      },
      contact: {
        title: "Contact",
        description: "Call, WhatsApp or visit Ivory Smart Home on Al Salam Street, Ras Al Khaimah. Open daily.",
      },
    },
  },
  brand: {
    name: "Ivory Smart Home",
    nameNote: tbc("Licensed company name still being confirmed"),
    wordmarkSub: "SMART HOME",
    promise: "Smart homes, designed in Ras Al Khaimah and supported for life.",
    promiseEmphasis: "supported for life",
  },
  contact: {
    phone: "+971 56 692 2452",
    phoneHref: "tel:+971566922452",
    whatsappNumber: "971566922452",
    email: "m.abed@ivorysmarthome.com",
    address: "Al Salam Street, next to Al Dahan Park, Ras Al Khaimah, UAE",
    hours: "Open daily",
    emergency: tbc("+971 56 692 2452 · 24/7 for care plan clients"),
    serviceArea: [tbc("Ras Al Khaimah"), tbc("Umm Al Quwain"), tbc("Ajman"), tbc("Sharjah")],
    serviceAreaLabel: "Service area",
    mapCaption: "Map: Al Salam Street, next to Al Dahan Park (replace with live map)",
    geo: { lat: 25.7895, lng: 55.9432 },
  },
  ui: {
    menu: "Menu",
    close: "Close",
    plan: "Plan my smart home",
    whatsappUs: "WhatsApp us",
    switchLanguage: "Switch to Arabic",
    switchLanguageShort: "ع",
    skipToContent: "Skip to content",
    tbc: "To be confirmed",
    arPending: "AR pending",
    pendingConfirmation: "pending confirmation",
    room: "Room",
    roomsNav: "Rooms in the walkthrough",
    goToRoom: "Go to",
    learnMore: "Learn more",
    viewProject: "View project",
    viewAll: "View all",
    previous: "Previous",
    next: "Next",
    call: "Call",
    email: "Email",
    address: "Address",
    hours: "Hours",
    replacePhoto: "replace",
    whatsappFloat: "Chat with Ivory on WhatsApp",
    whatsappTemplate: "Hello Ivory, I'm on your website looking at {topic} and I'd like to know more.",
    topics: {
      home: "the villa walkthrough",
      solutions: "your smart home systems",
      projects: "your projects",
      carePlans: "your care plans",
      professionals: "the professionals page",
      planner: "the smart home planner",
      contact: "the contact page",
    },
    propertyTypes: {
      villa: "Villa",
      apartment: "Apartment",
      office: "Office",
      hotel: "Hotel",
      building: "Building",
    },
  },
  nav: {
    links: [
      { label: "Solutions", path: "/solutions" },
      { label: "Projects", path: "/projects" },
      { label: "Care Plans", path: "/care-plans" },
      { label: "For Professionals", path: "/professionals" },
      { label: "Contact", path: "/contact" },
    ],
    floorPlanTitle: "Walk to a room",
    floorPlanHint: "Choose a room on the plan to jump to it in the walkthrough.",
    otherPages: "Pages",
  },
  home: {
    hero: {
      subline: "Lighting, climate, curtains, security and more – designed into your home and maintained by our local team.",
      proLink: "Developer or consultant?",
      scrollPrompt: "Walk through the villa",
    },
    walkthrough: {
      title: "A day in a smart villa",
      intro: "Six rooms, from dawn to night. Watch what happens in each one.",
      systemsLabel: "Systems in this room",
    },
    systems: {
      title: "Everything we automate",
      intro: "Eight systems, designed together and controlled as one, from a keypad, your phone or a schedule.",
    },
    why: {
      title: "Why families choose Ivory",
      intro: "A smart home is only as good as the people who design it, install it and answer the phone afterwards.",
      pullQuote: "The best time to call us is before the walls are closed.",
      pillars: [
        {
          title: "Designed with you",
          text: "We join at the design and construction stage, sit with you, your architect and your interior designer, and plan every keypad, curtain pocket and cable before the plaster goes on.",
        },
        {
          title: "Engineered properly",
          text: "Wired and wireless automation, security, intercom and networking as one integrated system. We install several trusted brands, choosing what suits each room rather than one catalogue.",
        },
        {
          title: "Supported locally",
          text: "Our team is here in Ras Al Khaimah. We train your family at handover, offer maintenance plans, and come back when you need us.",
        },
      ],
      image: {
        alt: "Ivory engineer reviewing a villa floor plan with homeowners",
        caption: "Photo: design meeting with a homeowner (replace)",
        tone: "stone",
      },
    },
    how: {
      title: "How we work",
      intro: "Five steps, one team, from the first conversation to years of support.",
      steps: [
        { title: "Consult", text: "A free visit to understand your home, your family and your plans." },
        { title: "Design", text: "System drawings, keypad positions and a clear quotation." },
        { title: "Install", text: "Our own team wires, installs and programs everything." },
        { title: "Train", text: "A handover session for the family and staff, with a simple guide." },
        { title: "Support", text: "Local maintenance, updates and help whenever you need it." },
      ],
    },
    projects: {
      title: "Selected projects",
      intro: "Villas, apartments and buildings across the Northern Emirates.",
    },
    care: {
      title: "Supported for Life",
      intro: "Your system keeps working because we keep looking after it: scheduled visits, remote updates and a local team that answers.",
      healthCheck: "Request a system health check – even if another company installed it.",
      healthCheckCta: "Request a health check",
      plansCta: "Compare care plans",
      emergencyLabel: "Emergency support",
    },
    brands: {
      title: "Brands we install",
      intro: "We are an integrator, not a single-brand dealer. We choose the right equipment for each home and make it work as one system.",
      protocolsTitle: "Protocols we work with",
    },
    testimonials: { title: "What homeowners say" },
    pros: {
      title: "Working on a development?",
      text: "Send us your drawings and receive a system design and BOQ.",
      cta: "Send your drawings",
      profile: "Download company profile",
    },
    final: {
      title: "Plan your smart home",
      text: "Tell us about your home in a few short steps and we will visit, listen and design it with you.",
      cta: "Plan your smart home",
    },
  },
  rooms: [
    {
      id: "entrance",
      name: "Entrance",
      time: "6:30 AM",
      light: "dawn",
      moment: "The driver arrives early. You see him on your phone and open the gate from bed.",
      detail: "The video intercom rings your phone, the smart lock clicks open, and the entrance lights welcome him in.",
      systems: ["intercom-access", "smart-lighting", "security-cctv"],
    },
    {
      id: "kitchen",
      name: "Kitchen",
      time: "1:00 PM",
      light: "noon",
      moment: "Lunch for the family. Only the rooms in use are being cooled.",
      detail: "Presence sensors tell the AC the kitchen and dining room are busy, while empty bedrooms rest – saving energy through the hottest hours.",
      systems: ["climate-control", "curtains-shades", "building-management"],
    },
    {
      id: "living",
      name: "Living & Majlis",
      time: "7:00 PM",
      light: "golden",
      moment: "Guests at the door. One touch: \"Welcome guests\".",
      detail: "The majlis brightens, the curtains close for privacy and soft music starts – all from a single keypad button.",
      systems: ["smart-lighting", "curtains-shades", "audio-video"],
    },
    {
      id: "bedroom",
      name: "Bedroom",
      time: "10:30 PM",
      light: "dusk",
      moment: "\"Goodnight\" from the bedside.",
      detail: "Curtains close, the lights in the rest of the house fade out, and the AC settles to sleep temperature.",
      systems: ["curtains-shades", "smart-lighting", "climate-control"],
    },
    {
      id: "outdoor",
      name: "Outdoor & Security",
      time: "11:15 PM",
      light: "night",
      moment: "The garden lights dim. The cameras keep watch.",
      detail: "The gate is closed, path lights glow low, and you only get an alert if a person – not a cat – crosses the garden.",
      systems: ["security-cctv", "intercom-access", "smart-lighting"],
    },
    {
      id: "night",
      name: "Whole home at night",
      time: "11:45 PM",
      light: "night",
      moment: "Everything is secured. Travelling tomorrow? One touch sets \"Away\".",
      detail: "Doors locked, cameras armed, lights off, AC on standby. In Away mode, lights and curtains change through the day so the villa looks lived in.",
      systems: ["security-cctv", "networking-wifi", "building-management"],
    },
  ],
  systems,
  services: [
    {
      title: "Consulting & Design",
      text: "We visit, listen, and design the system with you, your architect and your interior designer.",
    },
    {
      title: "Programming & Installation",
      text: "Our own team installs, programs and tests every device, then trains your family.",
    },
    {
      title: "After-Sales Support",
      text: "Care plans, remote updates and a local team in Ras Al Khaimah for years after handover.",
    },
  ],
  solutions: {
    title: "Eight systems, one home",
    intro: "Each system works on its own, and works better with the others. We design them together so one keypad, one app and one team look after everything.",
    servicesTitle: "From the first sketch to years of support",
    labels: {
      whatItDoes: "What it does",
      worksWith: "Works with the rest of your home",
      worksWithIntro: "Nothing in a smart home works alone. This is how this system talks to the others.",
      wiredVsWireless: "Wired or wireless?",
      wired: "Wired",
      wiredFor: "For new builds, during construction",
      wireless: "Wireless",
      wirelessFor: "For finished homes, no rewiring",
      related: "Related project",
      brands: "Brands we install for this",
      faq: "Questions homeowners ask",
      ctaTitle: "Plan this for your home",
      ctaText: "Start the planner with this system already selected.",
      ctaButton: "Plan my smart home",
      allSystems: "All systems",
    },
  },
  projects,
  projectsPage: {
    title: "Projects",
    intro: "A selection of homes and buildings we have designed, installed and still support.",
    filterType: "Property type",
    filterSystem: "System",
    all: "All",
    empty: "No projects match these filters yet.",
    labels: {
      location: "Location",
      type: "Property",
      size: "Size",
      timeline: "Timeline",
      systems: "Systems",
      challenge: "Challenge",
      solution: "Solution",
      result: "Result",
      gallery: "Inside the project",
      similar: "Similar projects",
      ctaTitle: "Planning something similar?",
      ctaButton: "Plan my smart home",
    },
  },
  carePlans: [
    {
      name: "Essential",
      forWhom: tbc("Apartments and smaller systems"),
      price: tbc("AED 1,500 / year"),
      response: tbc("Next-day response"),
      features: [tbc("One preventive visit a year"), tbc("Remote support during working hours"), tbc("Software updates")],
    },
    {
      name: "Plus",
      forWhom: tbc("Most villas"),
      price: tbc("AED 3,500 / year"),
      response: tbc("Same-day response"),
      features: [
        tbc("Two preventive visits a year"),
        tbc("Remote support seven days a week"),
        tbc("Scene and schedule changes included"),
        tbc("Priority booking"),
      ],
      featured: true,
    },
    {
      name: "Premium",
      forWhom: tbc("Large villas, palaces and buildings"),
      price: tbc("On request"),
      response: tbc("4-hour emergency response, 24/7"),
      features: [
        tbc("Quarterly preventive visits"),
        tbc("24/7 emergency line"),
        tbc("Dedicated engineer"),
        tbc("Annual system review and upgrade plan"),
      ],
    },
  ],
  carePage: {
    title: "Supported for Life",
    intro: "Smart homes need looking after, like any other system in your villa. Our local team keeps yours working, updated and easy to use for years after handover.",
    promiseTitle: "Our promise",
    promises: [
      { title: "A local team", text: "Engineers based in Ras Al Khaimah, not a call centre abroad." },
      { title: "Fast response", text: tbc("Same-day response for Plus and Premium clients in Ras Al Khaimah.") },
      { title: "Warranty", text: tbc("Two years on workmanship, plus each manufacturer's equipment warranty.") },
      { title: "Training whenever you need it", text: "New staff or family members? We will show them how everything works." },
    ],
    tiersTitle: "Care plans",
    responseLabel: "Response",
    choose: "Ask about this plan",
    healthTitle: "System health check",
    healthText: "Lights not responding, scenes forgotten, Wi-Fi dropping? We will inspect your system, even if another company installed it, and give you a clear report and options.",
    healthCta: "Request a health check",
  },
  brands: [
    { name: "LifeSmart", status: "pending confirmation" },
    { name: "CORE", status: "pending confirmation" },
    { name: "Larnitech", status: "pending confirmation" },
  ],
  protocols: ["KNX", "Matter", "Zigbee", "Z-Wave", "Wi-Fi"],
  testimonials: [
    {
      quote: tbc("They came before the plastering and planned everything with our architect. Two years on, nothing has needed changing."),
      name: tbc("Khalid A."),
      place: tbc("Villa owner, Al Hamra"),
    },
    {
      quote: tbc("The curtains alone made the apartment cooler in the afternoon. Installation took less than a week."),
      name: tbc("Sara M."),
      place: tbc("Apartment owner, Mina Al Arab"),
    },
    {
      quote: tbc("When something stops working, someone local picks up the phone. That is why we chose them."),
      name: tbc("Rashid K."),
      place: tbc("Villa owner, Ras Al Khaimah"),
    },
  ],
  prosPage: {
    title: "For developers, consultants and contractors",
    intro: "From a single show villa to a residential tower, we design the smart home and low-current systems, supply the equipment, install it and hand over complete documentation.",
    capabilitiesTitle: "What we deliver",
    capabilities: [
      { title: "Design drawings", text: "System layouts, keypad schedules and riser diagrams for your drawing set." },
      { title: "BOQ", text: "A clear bill of quantities you can price and compare." },
      { title: "Supply", text: "Multi-brand equipment sourced for each project's budget and specification." },
      { title: "Installation", text: "Our own technicians work alongside your MEP and fit-out teams." },
      { title: "Commissioning", text: "Programming, testing and witnessed handover." },
      { title: "Documentation", text: "As-built drawings, manuals and user training for every unit." },
    ],
    sectorsTitle: "Sectors",
    sectors: ["Private villas", "Residential developments", "Hotels and serviced apartments", "Offices", "Retail and hospitality"],
    teamsTitle: "How we work with your team",
    teams: [
      { title: "With MEP consultants", text: "We coordinate power, containment and panel space early, so nothing clashes on site." },
      { title: "With interior designers", text: "Keypad finishes, curtain pockets and speaker positions agreed with the design, not added later." },
      { title: "With contractors", text: "Clear first-fix and second-fix stages that fit your programme." },
    ],
    profileTitle: "Company profile",
    profileText: tbc("Capabilities, references and certifications in one PDF (to be supplied)."),
    profileCta: "Download company profile",
    formTitle: "Request a design and BOQ",
    formIntro: "Upload your drawings and we will reply with a system proposal.",
  },
  forms: {
    name: "Full name",
    mobile: "Mobile number",
    email: "Email",
    company: "Company name",
    message: "Message",
    visitDate: "Preferred visit date",
    notes: "Anything else we should know?",
    upload: "Upload drawings",
    uploadHint: "PDF or DWG, up to 25 MB (upload is a preview in this version)",
    uploadChosen: "Selected:",
    projectType: "Project type",
    submit: "Send",
    sending: "Sending…",
    sent: "Thank you – we have your message.",
    sentText: "Our team will contact you within one working day.",
    error: "Something went wrong. Please try again or message us on WhatsApp.",
    required: "Please fill in this field.",
    invalidEmail: "Please enter a valid email address.",
    invalidMobile: "Please enter a valid mobile number, for example +971 50 123 4567.",
    optional: "optional",
  },
  planner: {
    title: "Plan my smart home",
    intro: "Walk through your future home in six short steps. It takes about two minutes.",
    stepLabel: "Step",
    of: "of",
    back: "Back",
    next: "Next",
    submit: "See my plan",
    steps: {
      who: {
        title: "Who are you?",
        options: [
          { value: "homeowner", label: "Homeowner" },
          { value: "professional", label: "Developer or contractor" },
          { value: "designer", label: "Architect or interior designer" },
          { value: "business", label: "Hotel or business" },
        ],
      },
      property: {
        title: "What kind of property?",
        options: [
          { value: "villa", label: "Villa" },
          { value: "apartment", label: "Apartment" },
          { value: "office", label: "Office" },
          { value: "hotel", label: "Hotel" },
          { value: "building", label: "Building" },
        ],
      },
      stage: {
        title: "What stage is it at?",
        options: [
          { value: "planning", label: "Planning", note: "Drawings or design stage" },
          { value: "construction", label: "Under construction", note: "Walls going up" },
          { value: "finished", label: "Finished home", note: "Already living there" },
        ],
      },
      location: {
        title: "Where is it?",
        options: [
          { value: "rak", label: "Ras Al Khaimah" },
          { value: "uaq", label: "Umm Al Quwain" },
          { value: "ajman", label: "Ajman" },
          { value: "sharjah", label: "Sharjah" },
          { value: "other", label: "Other" },
        ],
      },
      systems: {
        title: "Which systems interest you?",
        hint: "Choose as many as you like. Watch the house light up.",
      },
      contact: {
        title: "How can we reach you?",
        hint: "We will call or WhatsApp to arrange a free consultation.",
      },
    },
    errors: {
      choose: "Please choose one option to continue.",
      chooseSystems: "Please choose at least one system.",
    },
    summary: {
      title: "Your plan",
      lead: "Your smart {property} in {location}",
      otherLocation: "the UAE",
      systemsCount: "{count} systems",
      systemsCountOne: "1 system",
      answerLabels: {
        who: "I am",
        property: "Property",
        stage: "Stage",
        location: "Location",
        systems: "Systems",
        visit: "Preferred visit",
      },
      stageNotes: {
        planning: "design-stage advantage: wiring can be planned now, saving rework later.",
        construction: "construction-stage advantage: cables can still go in before the walls close.",
        finished: "finished-home approach: wireless systems, no rewiring or broken walls.",
      },
      yourAnswers: "Your answers",
      book: "Book my free consultation",
      whatsapp: "Send to Ivory on WhatsApp",
      edit: "Change answers",
      bookedTitle: "Thank you – your request is in.",
      bookedText: "We will contact you within one working day to arrange your free consultation.",
      waIntro: "Hello Ivory, here is my smart home plan:",
    },
  },
  contactPage: {
    title: "Contact Ivory",
    intro: "Call, WhatsApp or visit our office on Al Salam Street. We are open every day.",
    whatsappText: "The fastest way to reach us.",
    formTitle: "Send a message",
    emergencyTitle: "Emergency support",
    openDaily: "Open daily",
  },
  footer: {
    quickLinks: "Explore",
    contact: "Contact",
    supportedBadge: "Supported for Life",
    rights: "All rights reserved.",
    concept: "Website concept 1 of 4 · The Villa Walkthrough",
  },
};
