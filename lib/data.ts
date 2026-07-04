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
  phone: "+91 81087 09605",
  socials: {
    github: "https://github.com/parkky21",
    linkedin: "https://linkedin.com/in/parkky",
  },
  // A short, hand-written intro shown near the top of the home page.
  introHome:
    "Hey — I'm Parth. My work lives at the intersection of machine learning, distributed systems, and human interaction. I enjoy building things from first principles, pushing models beyond demos, and crafting AI that feels less like software and more like intelligence",

  // The intro shown on the About page — separate from introHome so each can be tuned independently.
  introAbout:
    "Hey — I'm Parth. My work lives at the intersection of machine learning, distributed systems, and human interaction. I enjoy building things from first principles, pushing models beyond demos, and crafting AI that feels less like software and more like intelligence",

  introCircle:"Let's cook !",

  // A tighter, professional summary used on the printable resume page.
  resumeSummary:
    "AI Engineer building production-grade voice agents, language models, and multimodal systems. Experience shipping fault-tolerant AI services handling 60,000+ calls/day, fine-tuning multilingual speech models, and owning the full lifecycle from prototype to cloud deployment.",
};

// ----------------------------------------------------------------------------
//  Hero section — the home page's opening scrapbook collage. Layout,
//  rotation, and color stay in components/home/Hero.tsx; only the copy lives
//  here so it can be edited without touching JSX.
// ----------------------------------------------------------------------------

export const hero = {
  kicker: "✂️ pasted fresh into the scrapbook —",

  // top-left torn note: crossed-out "old" approaches + the punchline
  oldApproaches: ["rule engines", "if / else forever", "regex sorcery"],
  realization: "1 realization: just teach the machine ✨",

  // bottom-right torn note: a hand-written motto
  quote:
    "the best AI feels less like software and more like someone listening.",

  airmailLabel: "PAR AVION",

  stickers: {
    modelTrain: { text: "model.train()", emoji: "🧠" },
    gpuBrrr: { text: "gpu go brrr", emoji: "🔥" },
    shipIt: { text: "ship it", emoji: "🚀" },
    lossVibes: { text: "loss ↓ vibes ↑", emoji: "📉" },
    attention: { text: "attention is all you need", emoji: "📎" },
  },

  annotations: {
    neurons: "↑ neurons, doing their thing",
    hiHuman: "hi, human 👋",
    exhibitA: "↑ exhibit A",
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
  // Featured projects show up on the home page (and the resume).
  featured?: boolean;
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
  },
  {
    name: "LocalMind — Local Agentic RAG",
    date: "Jul 2025",
    blurb:
      "Open-source, fully local conversational AI with LlamaIndex + LangGraph. Agentic RAG via dual tools (docs + web) and persistent memory. Q5-M quantized Jan-nano LLM (~60% VRAM savings).",
    tags: ["LlamaIndex", "LangGraph", "RAG", "FastAPI"],
    color: "green",
    repo: "https://github.com/parkky21/LocalMind",
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
  },
];

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
//  Rule book — the philosophies written across the open book on the home page.
//  First half lands on the left page, second half on the right.
// ----------------------------------------------------------------------------

export const rulebook: string[] = [
  "build it from scratch at least once — that's the only way I trust that I understand it.",
  "a demo is a promise, not a product. ship the boring parts too.",
  "speed is a feature — nobody wants an AI that pauses to think.",
  "own the whole thing: the prototype, the prod deploy, and the 3am logs.",
  "small models + sharp constraints beat big models + vibes.",
  "stay a student — this field reinvents itself every six months.",
];

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
];
