// NVISION site data — central source of truth

export type Medium = "website" | "video";

export type ServiceSlug =
  | "web"
  | "video"
  | "brand"
  | "uiux"
  | "direction"
  | "motion";

export interface Service {
  slug: ServiceSlug;
  index: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  gradient: string;
  icon: string;
}

export const SERVICES: Service[] = [
  {
    slug: "web",
    index: "01",
    title: "Premium Website Development",
    tagline: "Code that performs like silk.",
    description:
      "We engineer blazing-fast, deeply animated websites with Next.js, WebGL, and obsessive attention to performance. Every interaction is tuned to 60fps, every transition choreographed to feel inevitable.",
    deliverables: [
      "Next.js / React architecture",
      "WebGL & shader effects",
      "Headless CMS integration",
      "Edge-deployed performance",
      "Accessibility audit (WCAG AAA)",
    ],
    gradient: "linear-gradient(135deg, #22D3EE, #3B82F6)",
    icon: "code",
  },
  {
    slug: "video",
    index: "02",
    title: "Cinematic Video Editing",
    tagline: "Frames that move the soul.",
    description:
      "From brand films to product launches, we cut, color, and compose sequences that pull viewers into a story. Sound design, motion typography, and color grading treated as one continuous gesture.",
    deliverables: [
      "Brand films & product launches",
      "Color grading (DaVinci)",
      "Sound design & mix",
      "Motion typography",
      "Multi-aspect delivery",
    ],
    gradient: "linear-gradient(135deg, #38BDF8, #06B6D4)",
    icon: "film",
  },
  {
    slug: "brand",
    index: "03",
    title: "Brand Identity",
    tagline: "Marks that age like memory.",
    description:
      "Identity systems built to live across decades and devices. Logo suites, typography, color, voice, and motion principles — all governed by a single creative truth.",
    deliverables: [
      "Logo & mark systems",
      "Typography & color systems",
      "Voice & messaging guide",
      "Motion brand principles",
      "Brand book delivery",
    ],
    gradient: "linear-gradient(135deg, #2DD4BF, #0891B2)",
    icon: "sparkles",
  },
  {
    slug: "uiux",
    index: "04",
    title: "UI/UX Design",
    tagline: "Interfaces that disappear.",
    description:
      "We design interfaces that feel less like screens and more like extensions of intent. Research-driven, system-led, and obsessed with the moments between clicks.",
    deliverables: [
      "Discovery & user research",
      "Information architecture",
      "Hi-fi design systems",
      "Interactive prototypes",
      "Usability testing",
    ],
    gradient: "linear-gradient(135deg, #3B82F6, #2DD4BF)",
    icon: "layout",
  },
  {
    slug: "direction",
    index: "05",
    title: "Creative Direction",
    tagline: "Vision, made inevitable.",
    description:
      "A single north star for every pixel, frame, and word. We direct cross-disciplinary teams toward a coherent creative outcome that no individual contributor could have reached alone.",
    deliverables: [
      "Creative strategy & briefs",
      "Art direction",
      "Cross-team alignment",
      "Vendor & talent curation",
      "Quality guardianship",
    ],
    gradient: "linear-gradient(135deg, #0EA5E9, #2563EB)",
    icon: "compass",
  },
  {
    slug: "motion",
    index: "06",
    title: "Motion Graphics",
    tagline: "Movement as language.",
    description:
      "Motion that doesn't decorate — it speaks. Logo reveals, UI transitions, explainers, and loops built in After Effects, Cavalry, and code, all sharing one motion vocabulary.",
    deliverables: [
      "Logo & brand motion",
      "UI & product motion",
      "Explainer animations",
      "Lottie & code delivery",
      "Motion style guide",
    ],
    gradient: "linear-gradient(135deg, #14B8A6, #0EA5E9)",
    icon: "zap",
  },
];

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  medium: Medium; // website | video
  cover: string; // gradient
  accent: string;
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  stack: string[];
  tags: string[];
  testimonial: { quote: string; author: string; role: string };
}

export const PROJECTS: Project[] = [
  {
    slug: "lumen-bank",
    title: "Lumen Bank",
    client: "Lumen Financial",
    category: "Fintech",
    year: "2025",
    medium: "website",
    cover: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    accent: "#38BDF8",
    summary:
      "Reinventing digital banking for a generation that grew up online.",
    overview:
      "Lumen Bank came to us with a single ask: make banking feel less like paperwork and more like a beautifully designed app. We rebuilt their entire digital presence from the ground up — a Next.js front end, a custom motion system, and a brand language that feels calm even when money is moving fast.",
    challenge:
      "The existing product was technically capable but emotionally cold. Trust scores were dropping among users aged 22–35, and the brand felt like a 1990s bank wearing a 2015 app costume. We needed to rebuild trust through design without losing the regulatory seriousness a bank requires.",
    solution:
      "We crafted a calm, confident visual system: a single accent color, generous whitespace, and motion that always explains what just happened. Every transaction gets a tiny celebration; every error gets a gentle, human explanation. The result is a banking app that feels less like a database and more like a thoughtful assistant.",
    results: [
      { label: "User trust score", value: "+47%" },
      { label: "App store rating", value: "4.9★" },
      { label: "Daily active users", value: "+212%" },
      { label: "Onboarding completion", value: "94%" },
    ],
    stack: ["Next.js", "TypeScript", "Framer Motion", "Stripe", "Vercel"],
    tags: ["Web", "Brand", "Motion"],
    testimonial: {
      quote:
        "NVISION didn't redesign our app — they redesigned the way our customers feel about money. That's a much bigger brief, and they delivered.",
      author: "Sara Lindqvist",
      role: "VP Product, Lumen Financial",
    },
  },
  {
    slug: "atlas-studio",
    title: "Atlas Studio",
    client: "Atlas Architects",
    category: "Architecture",
    year: "2025",
    medium: "website",
    cover: "linear-gradient(135deg, #F59E0B 0%, #06B6D4 100%)",
    accent: "#FBBF24",
    summary:
      "A portfolio for an architecture firm that builds impossible things.",
    overview:
      "Atlas Studio designs buildings that shouldn't structurally work — and then somehow they do. Their old website couldn't carry that weight. We built a portfolio experience that lets each project breathe, with parallax photography, video walkthroughs, and a custom project browser that feels like flipping through a beautiful book.",
    challenge:
      "Architecture portfolios live or die by their photography, but most arch sites treat photos like database rows. We needed to make each project feel monumental — the way the buildings themselves feel when you stand in front of them — while keeping the site fast enough to load on a hotel wifi in Mumbai.",
    solution:
      "A custom image pipeline with progressive loading, parallax layers that respond to scroll velocity, and a horizontal project gallery that lets visitors fly past a decade of work in seconds. We added a subtle audio component: ambient room tone from each building, faded to 8% volume, so browsing feels like visiting.",
    results: [
      { label: "Avg. session duration", value: "6m 42s" },
      { label: "Inbound inquiries", value: "+318%" },
      { label: "Press features", value: "23" },
      { label: "Awwwards score", value: "8.4" },
    ],
    stack: ["Next.js", "GSAP", "Lenis", "Sanity CMS", "Cloudinary"],
    tags: ["Web", "Motion", "Direction"],
    testimonial: {
      quote:
        "It's the first time a website has felt like our buildings. NVISION understood that an architecture site isn't a portfolio — it's a manifesto.",
      author: "Marcus Aurelio",
      role: "Founding Partner, Atlas Architects",
    },
  },
  {
    slug: "nebula-music",
    title: "Nebula Music",
    client: "Nebula Records",
    category: "Music",
    year: "2024",
    medium: "video",
    cover: "linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%)",
    accent: "#38BDF8",
    summary:
      "An interactive album experience that lives in your browser, not your shelf.",
    overview:
      "When Nebula Records released their flagship artist's album, they didn't want a streaming page — they wanted a place. We built an interactive web experience where each track has its own visual world, reactive to the music playing through Web Audio API and shader-driven landscapes.",
    challenge:
      "The label wanted something that felt like a music video, but lived natively on the web and worked on every device. The brief included 12 tracks, each needing a unique visual identity, all under a 4MB initial bundle and 3-second load time on mobile.",
    solution:
      "We split the experience into 12 lazy-loaded scenes, each driven by a custom GLSL shader reacting to real-time audio frequency data. A custom cursor lets users 'conduct' the visuals, and a hidden developer mode unlocks the shader editor so curious fans can remix the experience themselves.",
    results: [
      { label: "Time on site", value: "11m 18s" },
      { label: "Album presaves", value: "284k" },
      { label: "Social shares", value: "67k" },
      { label: "Awwwards SOTD", value: "Yes" },
    ],
    stack: ["Three.js", "GLSL", "Web Audio API", "Next.js", "Tone.js"],
    tags: ["Web", "Motion", "Direction"],
    testimonial: {
      quote:
        "We've made a lot of albums. This is the first time the album format itself felt new again. NVISION gave us a future.",
      author: "Dana Mercer",
      role: "A&R Director, Nebula Records",
    },
  },
  {
    slug: "verde-skincare",
    title: "Verde Skincare",
    client: "Verde Beauty",
    category: "E-commerce",
    year: "2024",
    medium: "website",
    cover: "linear-gradient(135deg, #2DD4BF 0%, #06B6D4 100%)",
    accent: "#34D399",
    summary:
      "A skincare brand that treats its ingredients like characters in a story.",
    overview:
      "Verde came to us with a problem every clean-beauty brand has: how do you make 'transparent ingredients' actually feel transparent? We rebuilt their storefront around an ingredient-led narrative where every product page tells you not just what's inside, but why, where it came from, and who grew it.",
    challenge:
      "The category is crowded and commoditized. Verde's products were genuinely better, but the brand looked like every other clean-beauty startup — soft pastels, leaf icons, the word 'natural' in 48pt. We needed a visual language that signaled rigor without losing warmth.",
    solution:
      "We designed a system around editorial-grade photography and a confident, almost architectural typography. Ingredient pages are written like short essays. The cart experience was redesigned to feel less like checkout and more like packing a bag. Sales went up; returns went down.",
    results: [
      { label: "Conversion rate", value: "+89%" },
      { label: "Avg. order value", value: "+34%" },
      { label: "Return rate", value: "-41%" },
      { label: "Email signups", value: "+526%" },
    ],
    stack: ["Next.js", "Shopify Hydrogen", "Framer Motion", "Sanity"],
    tags: ["Web", "Brand", "UI/UX"],
    testimonial: {
      quote:
        "Our ingredients are the same. The packaging is the same. The only thing that changed was the story NVISION helped us tell — and sales nearly doubled.",
      author: "Priya Anand",
      role: "Founder, Verde Beauty",
    },
  },
  {
    slug: "kinetic-festival",
    title: "Kinetic Festival",
    client: "Kinetic Foundation",
    category: "Event",
    year: "2024",
    medium: "website",
    cover: "linear-gradient(135deg, #38BDF8 0%, #3B82F6 100%)",
    accent: "#7DD3FC",
    summary:
      "A festival site that becomes a different website every time you visit.",
    overview:
      "Kinetic is a four-day festival of motion, sound, and light. Their old site was a static schedule. We rebuilt it as a living organism — the homepage rearranges itself based on the time of day, the lineup shuffles like a deck, and the entire color system shifts as the festival approaches.",
    challenge:
      "Festival audiences are pattern-matched to death — every event site looks like every other event site. We needed something that felt alive and surprising, but still functioned as a real schedule, ticketing funnel, and artist directory across 200+ acts and 12 stages.",
    solution:
      "A modular homepage where sections are reordered by an algorithm weighted toward time-of-day, weather, and proximity to showtime. The artist grid uses a physics-based layout — drag an artist, and the others rearrange around them. The ticketing flow was simplified to three taps from any page.",
    results: [
      { label: "Ticket sales", value: "Sold out 2x faster" },
      { label: "Site traffic", value: "+412%" },
      { label: "Avg. pages per session", value: "11.3" },
      { label: "Press pickups", value: "47" },
    ],
    stack: ["Next.js", "Matter.js", "GSAP", "Contentful", "Stripe"],
    tags: ["Web", "Motion", "Direction"],
    testimonial: {
      quote:
        "People emailed us asking what CMS we were using. They couldn't believe a festival site could feel this alive. NVISION built us a website that's also a manifesto.",
      author: "Theo Bauer",
      role: "Festival Director, Kinetic",
    },
  },
  {
    slug: "halo-ai",
    title: "Halo AI",
    client: "Halo Labs",
    category: "AI / SaaS",
    year: "2025",
    medium: "website",
    cover: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    accent: "#60A5FA",
    summary:
      "An AI product site that explains itself in 12 seconds, not 12 paragraphs.",
    overview:
      "Halo Labs built an AI tool that genuinely defies easy description. Their old homepage was a 2,400-word wall of text that confused everyone. We rebuilt the site around a single interactive demo: visitors land, see the product work in real-time, and can try it themselves within 12 seconds.",
    challenge:
      "AI products live or die by comprehension. If a visitor can't understand what you do in one screen, they leave. Halo's old site buried the product under feature lists. We needed to make the product itself the homepage — not a video of it, not a screenshot, the actual product.",
    solution:
      "We embedded a sandboxed version of Halo directly into the hero section. Visitors can type a prompt, watch Halo respond, and explore three pre-loaded examples — no signup, no email gate, no friction. The rest of the site rewards curiosity: every section is a 30-second interaction, not a paragraph to read.",
    results: [
      { label: "Demo completion rate", value: "78%" },
      { label: "Signup conversion", value: "+267%" },
      { label: "Bounce rate", value: "-54%" },
      { label: "Time to first value", value: "12s" },
    ],
    stack: ["Next.js", "Vercel AI SDK", "Framer Motion", "Postgres"],
    tags: ["Web", "UI/UX", "Motion"],
    testimonial: {
      quote:
        "We spent two years trying to explain what we do. NVISION built a homepage that lets people experience it in 12 seconds. I don't know why we ever did it any other way.",
      author: "Marcus Chen",
      role: "CEO, Halo Labs",
    },
  },
];

export interface VideoProject {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  duration: string;
  cover: string;
  accent: string;
  summary: string;
  overview: string;
  brief: string;
  approach: string;
  results: { label: string; value: string }[];
  gear: string[];
  tags: string[];
  testimonial: { quote: string; author: string; role: string };
}

export const VIDEO_PROJECTS: VideoProject[] = [
  {
    slug: "aurora-launch-film",
    title: "Aurora — Launch Film",
    client: "Aurora Mobility",
    category: "Brand Film",
    year: "2025",
    duration: "2:14",
    cover: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    accent: "#38BDF8",
    summary:
      "A 2-minute cinematic launch film for an electric mobility brand, shot in 5 countries in 9 days.",
    overview:
      "Aurora Mobility was unveiling their first electric scooter and needed a launch film that felt less like a product ad and more like a short documentary about movement itself. We shot across five cities in nine days — Tokyo at dawn, Lisbon at golden hour, Mexico City in rain — and cut the footage to a custom-composed score that builds from a single piano note into a full orchestral swell.",
    brief:
      "The brief was simple on paper: make people feel something about a scooter. The challenge was that scooters are everywhere, and most launch films for them look identical — slow pans, electronic music, models pretending to have fun. Aurora wanted the opposite: something that felt like a Werner Herzog narration of a morning commute.",
    approach:
      "We treated the scooter as a character, not a prop. Every shot was motivated by human motion — a foot stepping on, a hand gripping, a body leaning into a turn. We shot on a combination of RED Komodo, FPV drones, and a vintage 16mm Bolex for the dream sequences. Color was graded in DaVinci with a custom LUT that pushed blues into teal and skin tones into warmth. Sound design layered city ambiance under the score so each location had its own sonic fingerprint.",
    results: [
      { label: "Views in first week", value: "4.2M" },
      { label: "Brand recall lift", value: "+38%" },
      { label: "Pre-orders", value: "12k units" },
      { label: "Press features", value: "31" },
    ],
    gear: ["RED Komodo 6K", "FPV Drones", "Bolex 16mm", "DaVinci Resolve", "Ableton Live"],
    tags: ["Video", "Direction", "Motion"],
    testimonial: {
      quote:
        "It doesn't feel like an ad. It feels like the brand has always existed. That's exactly what we wanted and didn't know how to ask for.",
      author: "Yuki Tanaka",
      role: "CMO, Aurora Mobility",
    },
  },
  {
    slug: "echoes-docuseries",
    title: "Echoes — Docuseries",
    client: "Echoes Foundation",
    category: "Documentary",
    year: "2024",
    duration: "6 × 8min",
    cover: "linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%)",
    accent: "#7DD3FC",
    summary:
      "A six-part documentary series following artists rebuilding their practice after displacement.",
    overview:
      "The Echoes Foundation supports artists who've been forced to rebuild their lives and work in new cities. They wanted a series that didn't reduce these artists to their trauma — instead, the films follow the quiet, daily acts of making: a potter wedging clay in a new studio, a musician tuning an unfamiliar piano, a painter learning how light falls in a northern window for the first time.",
    brief:
      "Documentaries about displaced artists usually follow the same arc: trauma, struggle, redemption. The Foundation had seen too many of those and wanted nothing to do with them. They asked for films that honored the boring, beautiful parts of starting over — the moments nobody films because they don't look like anything is happening.",
    approach:
      "We shot each episode in a single day, with a two-person crew, using only natural light. The camera stays still. The edits are slow. We recorded ambient sound on location and scored each episode with a single instrument chosen by the artist — a kalimba, a frame drum, a thumb piano. The grade is warm but understated; we wanted the work to look like it does in the room, not like a film set.",
    results: [
      { label: "Festival selections", value: "14" },
      { label: "Avg watch time", value: "7m 41s" },
      { label: "Donations raised", value: "$840k" },
      { label: "Artist grants", value: "23 funded" },
    ],
    gear: ["Sony FX6", "Sennheiser MKH 50", "Tascam DR-680", "DaVinci Resolve"],
    tags: ["Video", "Direction"],
    testimonial: {
      quote:
        "These films don't tell our artists' stories. They let our artists tell their own. NVISION understood the difference before we did.",
      author: "Amara Diallo",
      role: "Director, Echoes Foundation",
    },
  },
  {
    slug: "nebula-visualizer",
    title: "Nebula — Visualizer",
    client: "Nebula Records",
    category: "Music Video",
    year: "2024",
    duration: "3:48",
    cover: "linear-gradient(135deg, #2DD4BF 0%, #3B82F6 100%)",
    accent: "#5EEAD4",
    summary:
      "A real-time, WebGL-driven music visualizer that reacts to every frequency in the track.",
    overview:
      "Nebula Records' flagship artist was releasing a 4-minute instrumental and didn't want a traditional music video. We built a real-time WebGL visualizer that runs in the browser and reacts to the track's frequency spectrum — every kick, every hi-hat, every bass note drives a different layer of the visual. The result is a video that's never the same twice.",
    brief:
      "Music videos for instrumental tracks usually default to moody b-roll or abstract 3D renders. Nebula wanted something that felt native to the web — something fans could play with, not just watch. The brief evolved into: build a visual instrument that happens to sync to this song.",
    approach:
      "We built the visualizer in Three.js with custom GLSL shaders. Each layer of the visual — a particle field, a fluid simulation, a wireframe terrain — is driven by a different frequency band isolated from the track via Web Audio API's AnalyserNode. We rendered the final video at 4K using headless Chromium with offscreen canvas, capturing 60fps for the full 3:48. The color grade was baked into the shader itself.",
    results: [
      { label: "Streams in month 1", value: "1.8M" },
      { label: "Shares", value: "67k" },
      { label: "Avg session", value: "4m 12s" },
      { label: "Awwwards SOTD", value: "Yes" },
    ],
    gear: ["Three.js", "GLSL Shaders", "Web Audio API", "Headless Chromium", "DaVinci Resolve"],
    tags: ["Video", "Motion", "Web"],
    testimonial: {
      quote:
        "It's the first music video we've made that fans actually replay to see what they missed. NVISION turned a release into a place.",
      author: "Dana Mercer",
      role: "A&R Director, Nebula Records",
    },
  },
  {
    slug: "atlas-process-film",
    title: "Atlas — Process Film",
    client: "Atlas Architects",
    category: "Process Film",
    year: "2024",
    duration: "5:30",
    cover: "linear-gradient(135deg, #38BDF8 0%, #2DD4BF 100%)",
    accent: "#7DD3FC",
    summary:
      "A meditative short film about how an architectural model becomes a building.",
    overview:
      "Atlas Architects wanted a film that showed the unglamorous, slow, hand-built reality of their work. We followed a single project — a small museum in Portugal — from cardboard model to opening day, across fourteen months. The result is a film about patience, about the gap between an idea and the thing itself.",
    brief:
      "Architecture firms usually want slick showreels with drone shots and dramatic music. Atlas asked for the opposite: a film that showed how slowly and imperfectly buildings actually get made. They were nervous it would look unprofessional. We told them that's what would make it look honest.",
    approach:
      "We visited the site every six weeks for fourteen months, shooting 30–60 seconds of footage each time. The footage is presented in chronological order with no narration, no music for the first three minutes — just the sound of construction. A single cello enters at the midpoint. The final cut is 5:30 because that's how long it takes to walk through the finished building at a slow pace.",
    results: [
      { label: "New client inquiries", value: "+218%" },
      { label: "Press features", value: "19" },
      { label: "Festival selection", value: "Venice Biennale" },
      { label: "Avg watch time", value: "5m 02s" },
    ],
    gear: ["Sony FX3", "RØDE NTG5", "Bolex 16mm", "DaVinci Resolve"],
    tags: ["Video", "Direction"],
    testimonial: {
      quote:
        "We've never shown our work like this. Clients now arrive at the first meeting already understanding how we think. That's worth more than any award.",
      author: "Marcus Aurelio",
      role: "Founding Partner, Atlas Architects",
    },
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Working with NVISION felt less like hiring an agency and more like adding a creative co-founder. They didn't execute our brief — they made the brief better.",
    author: "Elena Vasquez",
    role: "Chief Brand Officer",
    company: "Lumen Financial",
  },
  {
    quote:
      "I've worked with the so-called best studios in the world. NVISION is the only one that made me feel like the work was getting better, not just more expensive.",
    author: "James Okonkwo",
    role: "Founder & CEO",
    company: "Halo Labs",
  },
  {
    quote:
      "They treat every pixel like it has a job. Most agencies treat pixels like decoration. The difference shows up in the metrics within a week.",
    author: "Priya Anand",
    role: "Founder",
    company: "Verde Beauty",
  },
  {
    quote:
      "NVISION doesn't deliver websites. They deliver a point of view, encoded in code. That's worth ten times what they charge.",
    author: "Theo Bauer",
    role: "Festival Director",
    company: "Kinetic Foundation",
  },
  {
    quote:
      "We came in with a brand. We left with a brand that could move, speak, and grow. NVISION gave us a creative operating system, not a deliverable.",
    author: "Marcus Aurelio",
    role: "Founding Partner",
    company: "Atlas Architects",
  },
  {
    quote:
      "Every meeting with them felt like a tiny masterclass. They explain why before they show what. You walk out smarter, not just sold to.",
    author: "Dana Mercer",
    role: "A&R Director",
    company: "Nebula Records",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  accent: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-end-of-static-websites",
    title: "The End of the Static Website",
    excerpt:
      "Why the next decade of web design belongs to interfaces that respond to time, attention, and intent — and what that means for the brands who get there first.",
    category: "Essay",
    date: "Jun 28, 2025",
    readTime: "8 min",
    accent: "#38BDF8",
  },
  {
    slug: "motion-as-brand-language",
    title: "Motion Is the New Typography",
    excerpt:
      "How a coherent motion vocabulary does for a brand what a typeface used to do — and why most companies still treat animation as decoration.",
    category: "Motion",
    date: "Jun 14, 2025",
    readTime: "6 min",
    accent: "#7DD3FC",
  },
  {
    slug: "designing-for-trust",
    title: "Designing for Trust in Low-Trust Markets",
    excerpt:
      "What we learned rebuilding a bank's digital presence — and the five design decisions that lifted trust scores by 47% in six months.",
    category: "Case Note",
    date: "May 30, 2025",
    readTime: "11 min",
    accent: "#34D399",
  },
  {
    slug: "the-shader-economy",
    title: "The Shader Economy Is Coming",
    excerpt:
      "WebGL used to be a flex. Now it's a baseline. A practical look at how shaders are quietly becoming the default medium for premium web experiences.",
    category: "Tech",
    date: "May 16, 2025",
    readTime: "9 min",
    accent: "#60A5FA",
  },
  {
    slug: "what-awwwards-actually-rewards",
    title: "What Awwwards Actually Rewards",
    excerpt:
      "After 30+ SOTD projects, here's what we've learned about the difference between a site that wins awards and a site that wins customers.",
    category: "Insight",
    date: "May 02, 2025",
    readTime: "7 min",
    accent: "#FBBF24",
  },
  {
    slug: "the-quiet-power-of-empty-space",
    title: "The Quiet Power of Empty Space",
    excerpt:
      "Whitespace isn't a design choice — it's a confidence signal. A meditation on why the best brands keep leaving more room.",
    category: "Essay",
    date: "Apr 18, 2025",
    readTime: "5 min",
    accent: "#22D3EE",
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Discovery",
    duration: "Week 1–2",
    description:
      "We start by listening. Workshops, interviews, audits, and a deep read of your category. We're not looking for what you want us to build — we're looking for what your customers will love you for.",
    deliverables: ["Strategy doc", "Audit report", "Creative brief"],
  },
  {
    index: "02",
    title: "Direction",
    duration: "Week 2–4",
    description:
      "We define the creative north star — the single idea everything else orbits. Mood boards, motion principles, voice, and a working prototype that proves the concept before we build the whole thing.",
    deliverables: ["Creative direction", "Mood boards", "Proof of concept"],
  },
  {
    index: "03",
    title: "Design",
    duration: "Week 4–8",
    description:
      "Design system, page-level UX, and high-fidelity interfaces built in a living component library. Everything is interactive from day one — you'll click through real prototypes, not stare at flat mockups.",
    deliverables: ["Design system", "Hi-fi interfaces", "Interactive prototype"],
  },
  {
    index: "04",
    title: "Build",
    duration: "Week 6–12",
    description:
      "Engineering and design happen in parallel, not in sequence. We ship weekly previews to a staging URL so you can watch the site grow. Motion is implemented in code, not handed off as a video.",
    deliverables: ["Production code", "CMS integration", "Weekly previews"],
  },
  {
    index: "05",
    title: "Launch",
    duration: "Week 12–14",
    description:
      "We don't launch until performance, accessibility, and cross-browser behavior all pass our internal bar. Then we launch with you — on call for the first 72 hours, watching the metrics together.",
    deliverables: ["Production launch", "Performance audit", "72h on-call"],
  },
  {
    index: "06",
    title: "Evolve",
    duration: "Ongoing",
    description:
      "A site isn't done when it launches — that's when it starts. We offer ongoing partnerships where we measure, iterate, and ship new chapters quarterly. The best brands treat their site as a living product.",
    deliverables: ["Quarterly iterations", "Analytics review", "New chapters"],
  },
];

export interface Stat {
  value: string;
  label: string;
  sub: string;
}

export const STATS: Stat[] = [
  { value: "120+", label: "Websites shipped", sub: "from fintech to fashion" },
  { value: "85+", label: "Films delivered", sub: "brand, doc, music, process" },
  { value: "30+", label: "Awards", sub: "Awwwards + film festivals" },
  { value: "98%", label: "Client retention", sub: "they keep coming back" },
];

export const CLIENT_LOGOS = [
  "LUMEN", "ATLAS", "NEBULA", "VERDE", "KINETIC", "HALO",
  "ORBIT", "PRISM", "VESPER", "NORTH", "ECHO", "ZENITH",
];

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  accent: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Mira Vance",
    role: "Founder · Creative Director",
    bio: "Former art director at Pentagram. Started NVISION after realizing agencies were optimizing for hours, not outcomes. Believes the best design is the kind you don't notice.",
    accent: "#22D3EE",
  },
  {
    name: "Kenji Ohara",
    role: "Partner · Engineering",
    bio: "Ex-Vercel. Wrote his first shader at 14. Believes performance is a feature, not a constraint. Has shipped production code on six continents.",
    accent: "#60A5FA",
  },
  {
    name: "Lina Reyes",
    role: "Partner · Motion",
    bio: "Studied film before code. Treats every transition like a cut. Has a theory that all motion design can be traced back to three primal gestures.",
    accent: "#7DD3FC",
  },
  {
    name: "Adaeze Okwu",
    role: "Partner · Strategy",
    bio: "Ex-strategist at Wieden+Kennedy. Believes the brief is the most important creative deliverable. Refuses to start designing until she can explain the why in one sentence.",
    accent: "#34D399",
  },
];

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export const VALUES: Value[] = [
  {
    title: "Outcomes over outputs",
    description:
      "We measure success in your business metrics, not our deliverables. If the work doesn't move a number you care about, we didn't do our job.",
    icon: "target",
  },
  {
    title: "Craft as a competitive advantage",
    description:
      "We sweat the details other agencies don't because we believe craft is the last sustainable moat in a world where everyone has the same tools.",
    icon: "gem",
  },
  {
    title: "Curiosity is non-negotiable",
    description:
      "We only hire people who can't stop asking why. The work gets better when the team can't help but dig one layer deeper than the brief asked for.",
    icon: "compass",
  },
  {
    title: "Honesty, even when it's expensive",
    description:
      "We'll tell you when your idea won't work — even if it costs us the project. We've found that honesty is the cheapest thing you can offer a client, and the rarest.",
    icon: "shield",
  },
];
