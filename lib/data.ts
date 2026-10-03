// ============================================================================
//  Portfolio content — everything here is editable. Change text, add items,
//  reorder things, and the site updates automatically. No component edits needed.
// ============================================================================

export const profile = {
  nickname: "parkky",
  name: "Parth Kale",
  title: "AI Engineer",
  tagline: "Building what comes after us - the age of artificial intelligence.",
  location: "Mumbai, India",
  // Path to your photo in /public (e.g. "/profile.jpg"). Empty = sketch placeholder.
  photo: "/profile.jpeg",
  photoCaption: "that's me! 👋",
  email: "parth.kale.dev@gmail.com",
  socials: {
    github: "https://github.com/parkky21",
    linkedin: "https://linkedin.com/in/parkky",
  },
  // A short, hand-written intro shown near the top of the home page.
  introHome:
    "Hey — I'm Parth. I don’t chase AI hype—I build what works. AI Engineer focused on shipping fast, scalable LLM applications and voice agents with an obsession for performance and clean engineering.",

  // The intro shown on the About page — separate from introHome so each can be tuned independently.
  introAbout:
    "AI Engineer obsessed with understanding things from first principles and turning ideas into products. I build fast, production-ready LLM applications, voice agents, and scalable AI systems, with a focus on performance, simplicity, and shipping things that actually work.",

  introCircle:"Let's cook !",

};

// ----------------------------------------------------------------------------
//  Hero section — the home page's opening scrapbook collage. Layout,
//  rotation, and color stay in components/home/Hero.tsx; only the copy lives
//  here so it can be edited without touching JSX.
// ----------------------------------------------------------------------------

export const hero = {
  kicker: "✂️ torn out of my lab notebook —",

  // the four sketch sheets stitched around the photo (fig. order = reading order)
  sheets: {
    robot: {
      fig: "fig. 01",
      title: "robot blueprint",
      caption: "v0.3 — still arguing with the servos.",
    },
    transformer: {
      fig: "fig. 02",
      title: "transformer, redrawn",
      caption: "attention was all we needed. I want more.",
    },
    brain: {
      fig: "fig. 03",
      title: "brain, under construction",
      caption: "wiring it one neuron at a time.",
    },
    ground: {
      fig: "fig. 04",
      title: "eyes in the ground",
      caption: "the soil reports back. the crops don't know yet.",
    },
  },

  // "currently building" sticky note — the punch list behind the sketches
  buildLog: {
    title: "on the bench:",
    items: [
      { text: "voice agents that actually listen", done: true },
      { text: "a robot that sketches itself", done: false },
      { text: "fields that watch themselves grow", done: false },
      { text: "a brain from scratch", done: false },
    ],
  },

  // two stickers patched onto the board's corners
  stickers: {
    gpuBrrr: { text: "gpu go brrr", emoji: "🔥" },
    attention: { text: "attention is all you need", emoji: "📎" },
  },
};

// ----------------------------------------------------------------------------
//  Career path — the milestones, drawn out in order (earliest → now).
//  `kind` controls the color/icon: "education" | "work".
// ----------------------------------------------------------------------------

export type Milestone = {
  kind: "education" | "work";
  period: string;
  title: string;
  org: string;
  detail: string;
  highlights?: string[];
};

export const milestones: Milestone[] = [
  {
    kind: "education",
    period: "2019 — 2020",
    title: "Where it started",
    org: "Navodaya English High School",
    detail: "SSC — 92.80%. The first dots on the page.",
  },
  {
    kind: "education",
    period: "2021 — 2022",
    title: "HSC · Science",
    org: "KJ Somaiya College of Science & Commerce",
    detail: "HSC Science — 80%. Started leaning hard into computers.",
  },
  {
    kind: "education",
    period: "2022 — 2026",
    title: "B.Tech · IT + Honors in AI/ML",
    org: "Vidyalankar Institute of Technology",
    detail: "CGPA 8.81. Where the AI obsession really took shape.",
  },
  {
    kind: "work",
    period: "Apr — Jun 2025",
    title: "AI Developer Intern",
    org: "AlgoRoots Pvt Ltd",
    detail: "First production system, straight into the deep end.",
    highlights: [
      "Built a production-scale call agent with RAG, function calling, prompt engineering & SIP + LiveKit — handling 60,000+ automated calls/day.",
      "Implemented fault-tolerant, scalable backend services for high uptime.",
      "Built logging & monitoring pipelines for real-time analytics.",
    ],
  },
  {
    kind: "work",
    period: "Jul 2025 — May 2026",
    title: "AI Researcher Intern",
    org: "AlgoRoots Pvt Ltd",
    detail: "Pushed into research — multilingual speech synthesis.",
    highlights: [
      "Designed & preprocessed a custom multilingual dataset for fine-tuning open-source TTS models.",
      "Improved Hindi–English code-switching via fine-tuning an open-source model.",
      "Enhanced speech quality & NLP performance for multilingual voice systems.",
    ],
  },
  {
    kind: "work",
    period: "Jun 2026 — Present",
    title: "AI Engineer",
    org: "AlgoRoots Pvt Ltd",
    detail: "Where the line reaches today.",
    highlights: [
      "Build & deploy production-grade AI agents for voice interviewing, proctoring & candidate assessment.",
      "Develop full-stack AI systems across LLMs, speech recognition, speech synthesis & real-time comms.",
      "Design automated evaluation frameworks that generate structured interview feedback.",
      "Own the full lifecycle — prototyping, model integration, cloud deployment & monitoring.",
    ],
  },
];

// ----------------------------------------------------------------------------
//  Projects — rendered as sticky notes on the board.
//  `color` picks a sticky-note color: yellow | pink | blue | green | orange | purple
// ----------------------------------------------------------------------------

export type Project = {
  name: string;
  date: string;
  blurb: string;
  tags: string[];
  color: "yellow" | "pink" | "blue" | "green" | "orange" | "purple";
  // Replace "#" with the real GitHub URL, e.g. "https://github.com/parkky21/slm"
  repo?: string;
  link?: string;
  // Featured projects show up on the home page.
  featured?: boolean;
  // Which engraved sketch to paste on the note (see components/projects/plates).
  plate?: "openbee" | "alice" | "marathi-slm" | "localmind" | "memorysearch" | "draupadi";
};

export const projects: Project[] = [
  {
    name: "SLM — Marathi Language Model",
    date: "Dec 2024",
    blurb:
      "Pretrained an 84M-parameter GPT-2-inspired Marathi LM from scratch (6 layers, 6 heads, 384 dim). Built a custom 32K Marathi tokenizer and a 66K+ story dataset by translating TinyStories.",
    tags: ["PyTorch", "GPT-2", "Tokenizer", "Pretraining"],
    color: "orange",
    repo: "https://github.com/parkky21/Marathi-SLM",
    plate: "marathi-slm",
    featured: true,
  },
  {
    name: "OpenBee — Offline Voice Assistant",
    date: "Mar 2026",
    blurb:
      "Fully offline voice AI (Speech → LLM → Voice) with zero cloud dependency. Whisper + Gemma 1B + Kokoro on LiveKit. TTFT < 80ms, TTS < 500ms on consumer hardware, with a React control dashboard.",
    tags: ["Whisper", "Gemma", "Kokoro", "LiveKit", "React"],
    color: "yellow",
    repo: "https://github.com/parkky21/OpenBee",
    plate: "openbee",
    featured: true,
  },
  {
    name: "MemorySearch — Semantic Image Search",
    date: "Jan 2026",
    blurb:
      "Modular image retrieval using BLIP captioning + configurable embeddings (Qwen0.6B, GTE, Gemma). Config-driven, incremental indexing and multi-model similarity ranking without full re-indexing.",
    tags: ["BLIP", "Embeddings", "Retrieval", "Multimodal"],
    color: "blue",
    repo: "https://github.com/parkky21/MemorySearch",
    plate: "memorysearch",
  },
  {
    name: "LocalMind — Local Agentic RAG",
    date: "Jul 2025",
    blurb:
      "Open-source, fully local conversational AI with LlamaIndex + LangGraph. Agentic RAG via dual tools (docs + web) and persistent memory. Q5-M quantized Jan-nano LLM (~60% VRAM savings).",
    tags: ["LlamaIndex", "LangGraph", "RAG", "FastAPI"],
    color: "green",
    repo: "https://github.com/parkky21/LocalMind",
    plate: "localmind",
    featured: true,
  },
  {
    name: "Alice — Home Surveillance System",
    date: "Feb — May 2025",
    blurb:
      "Low-latency AI security using QwenVL-2.5 4B for real-time threat detection, quantized for ~43% VRAM reduction. Evaluation loop cut false positives ~35%; LiveKit + Twilio SIP calls homeowners with context-aware alerts.",
    tags: ["QwenVL", "Quantization", "LiveKit", "Twilio"],
    color: "purple",
    repo: "https://github.com/parkky21/Alice",
    plate: "alice",
    featured: true,
  },
  {
    name: "Draupadi — AI Safety App",
    date: "Nov 2024",
    blurb:
      'Real-time distress detection app (React Native + TensorFlow + Twilio) that detects voice cues like "help" or screams. GPS tracking + auto-SMS alerts and an "I\'m Safe" mode for user control.',
    tags: ["React Native", "TensorFlow", "Twilio", "GPS"],
    color: "pink",
    repo: "#",
    plate: "draupadi",
  },
];

// ----------------------------------------------------------------------------
//  Indie product — the side hustle, shown as a wide spread above the board.
//  Update `stats` as the numbers move. The screenshot lives in /public/btwinus.
// ----------------------------------------------------------------------------

export const indieProduct = {
  name: "Btwinus",
  tagline: "a little atelier for love letters",
  blurb: [
    "You write slowly, choose the paper and the wax, and send one quiet link. They break the seal; the words unfold.",
    "This Ganpati season, three people paid for it. No ads. Someone told someone, which is the oldest kind of letter there is.",
  ],
  url: "https://btwinus.vercel.app/",
  links: [
    { label: "Write one they'll keep", href: "https://btwinus.vercel.app/" },
    { label: "Ganpati invitations", href: "https://btwinus.vercel.app/ganpati" },
  ],
  stats: [
    { label: "3 sales", color: "yellow" },
    { label: "0 ads", color: "green" },
    { label: "Ganpati 2026", color: "blue" },
  ] satisfies { label: string; color: Project["color"] }[],
  statsLabel: "Three sales, zero ads, Ganpati season 2026",
  postscript: "p.s. built for one reader first. she read it.",
  shot: {
    src: "/btwinus/desktop.jpg",
    alt: "The Btwinus homepage: 'Some feelings deserve more than a text', beside a pink envelope with a wax seal.",
    width: 2160,
    height: 1350,
  },
};

// ----------------------------------------------------------------------------
//  The Field — the someday project, drawn as an animated terrace landscape.
// ----------------------------------------------------------------------------

export const fieldNote = {
  kicker: "the next quest — someday soon",
  title: "The Field",
  pull: "The bloom gets the photographs. The agents do the work.",
  someday: "Next: an AI revolution in the field. The bulb is in the ground.",
};

// ----------------------------------------------------------------------------
//  Skills — grouped, rendered as marker-circled clusters.
// ----------------------------------------------------------------------------

export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Programming",
    items: ["Python", "JavaScript / TypeScript", "C++", "DSA"],
  },
  {
    label: "AI & Machine Learning",
    items: [
      "LLMs",
      "Generative AI",
      "AI Agents",
      "RAG",
      "Fine-Tuning (LoRA, PEFT)",
      "Quantization",
      "Computer Vision",
      "Multimodal AI",
    ],
  },
  {
    label: "Frameworks & Tools",
    items: ["Hugging Face", "LangChain", "LlamaIndex", "LangGraph", "PyTorch", "TensorFlow", "vLLM"],
  },
  {
    label: "Web & Backend",
    items: ["React.js", "Next.js", "Node.js", "FastAPI", "REST APIs", "Realtime (Twilio, SIP)"],
  },
  {
    label: "Cloud & Deployment",
    items: ["AWS", "Azure", "Docker", "Vercel", "CI/CD (GitHub Actions, Jenkins)"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL / NeonDB", "MongoDB"],
  },
];

// ----------------------------------------------------------------------------
//  Blood blossom — the open book on the home page. A red spider lily is pressed
//  on the left page; the Red Rising line it stands in for is on the right.
// ----------------------------------------------------------------------------

export const bloodBlossom = {
  pageLabel: "the flower on Mars",
  specimen: "Lycoris radiata · my stand-in",
  // quoted verbatim from Red Rising; keep the credit with it
  paragraphs: [
    "“There is a flower that grows on Mars. It is red and harsh and fit for our soil. It is called haemanthus. It means ‘blood blossom.’”",
  ],
  credit: "— Pierce Brown, Red Rising",
  rule: "Every time I look at this flower, it tells me the same thing: still, I rise.",
  signoff: "— parkky 🌺",
};

// ----------------------------------------------------------------------------
//  Open source + writing
// ----------------------------------------------------------------------------

export const openSource = [
  "Fixed an SDK bug in LiveKit affecting worker functionality — PR submitted, reviewed with maintainers & merged into the official repo.",
  "Active contributor to open-source AI and voice-agent ecosystems.",
];

// `sticker` is a little die-cut label slapped on the card; `emoji` and `tint`
// (yellow | pink | blue | green | orange | purple) style it. All optional.
export const blogs: {
  title: string;
  link?: string;
  sticker?: string;
  emoji?: string;
  tint?: "yellow" | "pink" | "blue" | "green" | "orange" | "purple";
}[] = [
  {
    title: "GPT Architecture — a simple explanation",
    link: "https://medium.com/@parkky/inside-the-magic-box-of-gpt-bde3bae13752",
    sticker: "start here",
    emoji: "🧠",
    tint: "blue",
  },
  {
    title: "Causal Attention & Multi-head Attention",
    link: "https://medium.com/@parkky/inside-the-magic-box-2-causal-attention-and-multi-head-attention-0a9366da1d50",
    sticker: "deep dive",
    emoji: "🔍",
    tint: "pink",
  },
  {
    title: "Paged Attention in vLLM",
    link: "https://medium.com/@parkky/paged-attention-71875548de74?sharedUserId=parkky",
    sticker: "save memory?",
    emoji: "🔍",
    tint: "yellow",
  },
];
