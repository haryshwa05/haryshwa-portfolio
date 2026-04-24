// ============================================================
// EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
// This is the SINGLE SOURCE OF TRUTH for all personal content.
// ============================================================

export const personal = {
  name: "Haryshwa Ganesh",
  firstName: "Haryshwa",
  title: "AI Engineer & Product Builder",
  tagline: "I build AI systems that solve real problems — from research papers to production products.",
  bio: [
    "3rd year CS student at SRM University — but most of what matters has happened outside the classroom. I build production AI systems: RAG pipelines, agentic architectures, computer vision models, and the full-stack applications that make them usable.",
    "Currently building RAG-based knowledge infrastructure at Levarus Solutions and shipping Voyder, an AI-powered vendor reconciliation platform for freight forwarding companies. On the research side, I've published work on medical image segmentation and spectral inference in deep learning.",
  ],
  location: "Chennai, India",
  email: "haryshwa198@gmail.com",
  availability: "Open to the right projects",
}

export const social = {
  github: "https://github.com/haryshwa05",
  linkedin: "https://www.linkedin.com/in/haryshwa-ganesh-7a771027b/",
  twitter: "",
  email: "mailto:haryshwa198@gmail.com",
}

export const workExperience = [
  {
  company: "Levarus Solutions Pvt Ltd",
  role: "Software Engineer Intern",
  period: "June 2025 — Present",
  location: "Chennai, India",
  description: "Building production AI systems and data infrastructure for enterprise clients.",
  bullets: [
    "Building an internal RAG system end-to-end — document ingestion, chunking strategies, vector retrieval, reranking, and LLM response synthesis over company files and databases",
    "Working with Oracle DB in banking workflows — SQL/PL-SQL, indexing, performance monitoring, and transactional data reliability at production scale",
    "Optimizing query performance and data access patterns to support AI retrieval pipelines in a high-reliability banking environment",
  ],
  tags: ["Python", "RAG", "LangChain", "Oracle DB", "FastAPI", "SQL", "Vector Search"],
  link: "",
},
  {
    company: "Freelance",
    role: "AI & Full-Stack Developer",
    period: "2024 — Present",
    location: "Remote",
    description: "Building custom web applications and AI-powered tools for businesses.",
    bullets: [
      "Building a full chess education platform for a client — course creation, video delivery, payment integration, and student progress tracking",
      "Built custom web applications and websites for small businesses, handling everything from design to deployment",
      "Implemented digital marketing and SEO for client sites, driving measurable traffic growth",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "Node.js", "Payment Integration"],
    link: "",
  },
]

export const research = [
  {
    title: "FreqLoRA-SAM: A Visual Prompt-Driven Interactive Segmentation Model for Detecting Colorectal Cancer",
    venue: "SRM Institute of Science and Technology · NIT Rourkela · Jadavpur University",
    period: "2025 — 2026",
    description:
      "First author. Proposed FreqLoRA-SAM, a parameter-efficient adaptation of MobileSAM for polyp segmentation in colonoscopy images. Introduced a dual-domain low-rank adapter combining spatial and frequency-aware LoRA branches with a learnable per-layer sigmoid gate — achieving Dice 0.927 on Kvasir-SEG with only 255K trainable parameters, outperforming methods trained on nearly twice the data. Cross-dataset evaluation on CVC-ClinicDB, CVC-ColonDB, and ETIS-LaribPolypDB demonstrates generalisation without retraining.",
    tags: ["Medical Image Segmentation", "LoRA", "MobileSAM", "Computer Vision", "PyTorch", "FFT"],
    link: "",
    status: "submitted" as const,
  },
  {
    title: "Spectrally Motivated Dynamic Inference: An Empirical Study of Frequency Truncation in Early-Exit Neural Networks",
    venue: "SRM Institute of Science and Technology",
    period: "2025 — 2026",
    description:
      "Second author. Empirical study of inference-time low-pass filtering on CNN classification accuracy and its application to early-exit architectures. Demonstrated that moderate frequency truncation preserves discriminative capacity while random coefficient retention causes catastrophic degradation — motivating a spectrally-informed early-exit framework using teacher-student distillation and temperature scaling. Achieves 1.60× MAC reduction with under 3% accuracy drop on CIFAR-100.",
    tags: ["Dynamic Inference", "Early-Exit Networks", "Spectral Analysis", "Knowledge Distillation", "CNNs"],
    link: "",
    status: "submitted" as const,
  },
]

export const projects = [
  // ── Tier 1: Original research ────────────────────────────
  {
    name: "FreqLoRA-SAM — Polyp Segmentation",
    description:
      "Novel dual-pathway LoRA adapter for MobileSAM. Each attention layer gets two parallel low-rank branches — one spatial, one frequency-domain (FFT) — with a learned gate balancing them. Dice 0.927 on Kvasir-SEG with 255K trainable params. Generalises to 3 unseen colonoscopy datasets without retraining. Full-stack app: Next.js point-click UI + FastAPI backend with TTA.",
    tags: ["PyTorch", "MobileSAM", "LoRA", "Medical AI", "Computer Vision", "FastAPI", "Next.js"],
    github: "",
    live: "",
    featured: true,
    status: "built",
    year: "2026",
  },
 
  // ── Tier 2: Production systems ───────────────────────────
  {
    name: "Voyder — AI Vendor Reconciliation",
    description:
      "Turns a 2-hour manual accounts payable process into 2 minutes. Parses vendor statements from any format (PDF, Excel, scanned images) using AI, runs a 4-pass invoice matching engine, and outputs reports in the client's existing Excel format. Live client in freight forwarding.",
    tags: ["FastAPI", "Next.js", "Claude API", "PostgreSQL", "Python"],
    github: "",
    live: "",
    featured: true,
    status: "building",
    year: "2026",
  },
  {
    name: "DataRAG — Enterprise RAG System",
    description:
      "Production RAG backend built end-to-end. Hybrid retrieval: BM25 + Qdrant vector search merged and reranked by a cross-encoder. Provider-agnostic — embedder, LLM, and vector store swap via config. Streaming SSE responses, conversation history compression, PDF vision parsing, live financial chart generation, JWT auth with role-based access.",
    tags: ["FastAPI", "Qdrant", "BM25", "Cross-Encoder", "PostgreSQL", "SSE", "Python"],
    github: "",
    live: "",
    featured: true,
    status: "built",
    year: "2026",
  },
  {
    name: "XCA Vessel Classification & Segmentation",
    description:
      "Two-model pipeline for coronary angiography analysis on the ARCADE dataset. YOLOv8n-seg identifies 25 anatomical vessel classes (SYNTAX scoring system). UNet++ with EfficientNet-B3 handles dense vessel segmentation. Full-stack diagnostic UI with annotated overlays and clinical descriptions per detected segment. Ongoing research.",
    tags: ["YOLOv8", "UNet++", "Medical AI", "Computer Vision", "FastAPI", "Python"],
    github: "",
    live: "",
    featured: true,
    status: "built",
    year: "2026",
  },
 
  // ── Tier 3: Full-stack AI ────────────────────────────────
  {
    name: "PharmaSynapse",
    description:
      "Agentic AI for pharma intelligence. NLP intent classifier routes queries to specialist agents — clinical trials, patents, market data, trade trends, web intelligence — running in parallel. Outputs are synthesised by Gemini into SWOT, executive summary, and Go/No-Go recommendations.",
    tags: ["Python", "Agentic AI", "Multi-Agent", "Gemini API", "FastAPI", "Next.js"],
    github: "https://github.com/haryshwa05/pharmasynapse",
    live: "",
    featured: true,
    status: "built",
    year: "2025",
  },
  {
    name: "CleanBites AI — Food Label Analyzer",
    description:
      "Scans food packaging against your personal health profile. Computes BMI, BMR, TDEE on signup. Sends label text to GPT-3.5 with a 20-category prompt — NOVA processing level, hidden sweeteners, allergen flags, gut health impact. Risk warnings adjust to your specific medical conditions.",
    tags: ["Next.js", "Node.js", "MongoDB", "OpenAI API", "Full-Stack"],
    github: "",
    live: "",
    featured: false,
    status: "built",
    year: "2025",
  },
 
  // ── Tier 4: Range ────────────────────────────────────────
  {
    name: "Event Booking DApp",
    description:
      "Decentralised event ticketing on Ethereum. ERC-721 smart contract mints tickets as NFTs (metadata on IPFS), enforces a 10% organiser royalty on every resale at the contract level, and caps resale prices to prevent scalping. MetaMask frontend, Node/Express backend via Alchemy RPC.",
    tags: ["Solidity", "ERC-721", "Ethereum", "IPFS", "ethers.js", "Next.js", "Hardhat"],
    github: "",
    live: "",
    featured: false,
    status: "built",
    year: "2025",
  },
]

export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "SQL"],
  frameworks: ["React", "Next.js", "FastAPI", "Node.js", "Express", "Angular", "Apache Camel"],
  tools: ["Git", "REST APIs", "Oracle DB", "PostgreSQL", "Tailwind CSS", "pandas", "openpyxl", "pdfplumber", "PyTorch"],
  domains: ["Agentic AI Systems", "RAG Pipelines", "Computer Vision", "Medical AI", "Document Intelligence", "Full-Stack Engineering"],
}

export const education = [
  {
    institution: "SRM University",
    degree: "B.Tech in Computer Science Engineering — Big Data Analytics",
    period: "2023 — 2027",
    description: "CGPA: 8.78 | Coursework: DSA, DBMS, Operating Systems, Web Technologies, Data Analytics",
  },
]

export const blogPosts = [
  // {
  //   title: "How we cut vendor reconciliation time from 2 hours to 2 minutes using Claude API",
  //   slug: "voyder-reconciliation-claude-api",
  //   date: "2026-04-15",
  //   summary: "A technical breakdown of how we built the AI extraction layer for Voyder.",
  //   tags: ["AI", "Document Intelligence", "Freight Tech", "Claude API"],
  //   featured: true,
  // },
]
