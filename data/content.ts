// ============================================================
// EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
// This is the SINGLE SOURCE OF TRUTH for all personal content.
// ============================================================

export const personal = {
  name: "Haryshwa Ganesh",
  firstName: "Haryshwa",
  title: "AI Engineer & Builder",
  tagline: "I build AI systems that save businesses real time and real money.",
  bio: [
    "3rd year CS student at SRM University — but most of what matters has happened outside the classroom. I build production AI systems: RAG pipelines, agentic architectures, computer vision models, and the full-stack applications that make them usable.",
    "Currently shipping Voyder, an AI-powered vendor reconciliation platform for freight forwarding companies that turns a 2-hour manual process into 2 minutes. Also building a chess education platform and doing medical AI research with SIMS Hospital. I work with businesses that want AI to actually solve a problem, not just sound impressive.",
  ],
  location: "Chennai, India",
  email: "haryshwa198@gmail.com",
  availability: "Taking on select projects",
}

export const social = {
  github: "https://github.com/haryshwa05",
  linkedin: "https://linkedin.com/in/haryshwa",
  twitter: "",
  email: "mailto:haryshwa198@gmail.com",
}

export const workExperience = [
  {
    company: "Voyder",
    role: "Co-Founder & Technical Lead",
    period: "2026 — Present",
    location: "Chennai, India",
    description: "Building an AI-powered SOA reconciliation platform for freight forwarding and logistics companies.",
    bullets: [
      "Architecting the full product: React/Next.js frontend, FastAPI backend, PostgreSQL, and Claude API integration for unstructured document extraction",
      "Built a 4-pass invoice matching engine that handles direct matches, fuzzy matching, BT dump lookups, and company-only reconciliation — producing output in the exact Excel format clients already use",
      "Designing AI extraction pipeline that parses vendor statements from any format (PDF, Excel, scanned images, email text) with >95% target accuracy",
    ],
    tags: ["Python", "FastAPI", "Next.js", "Claude API", "PostgreSQL", "pandas", "openpyxl"],
    link: "",
  },
  {
    company: "Levarus Solutions Pvt Ltd",
    role: "Software Engineer Intern",
    period: "June 2025 — Present",
    location: "Chennai, India",
    description: "Building AI-powered internal tooling and data infrastructure for enterprise clients.",
    bullets: [
      "Building an internal RAG system end-to-end — chunking strategies, vector retrieval, reranking, and LLM response synthesis — enabling contextual access across company files and databases",
      "Building a data integration platform using Apache Camel, supporting backend services for reliable data flow across internal systems",
      "Working with Oracle DB in banking workflows — SQL/PL-SQL, indexing, performance monitoring, and transactional data reliability",
    ],
    tags: ["Python", "RAG", "Apache Camel", "Oracle DB", "FastAPI", "SQL"],
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
    title: "X-ray Coronary Angiography (XCA) Image Analysis",
    venue: "Collaboration with SIMS Hospital, Chennai",
    period: "2025 — Ongoing",
    description:
      "Computer vision model for automated coronary vessel pattern analysis from angiogram frames. Contributing to data preprocessing, frame selection methodology, and deep learning model experimentation. Working toward clinical-grade reliability benchmarks in collaboration with cardiology specialists.",
    tags: ["Computer Vision", "Medical Imaging", "Deep Learning", "Python"],
    link: "",
    status: "ongoing" as const,
  },
]

export const projects = [
  {
    name: "Voyder",
    description:
      "AI-powered vendor SOA reconciliation platform for freight forwarding companies. Parses vendor statements from any format using Claude's document understanding, runs a multi-pass invoice matching engine, and generates reconciliation reports in the client's existing Excel format — in under 2 minutes instead of 2 hours.",
    tags: ["Python", "FastAPI", "Next.js", "Claude API", "PostgreSQL", "pandas"],
    github: "",
    live: "",
    featured: true,
    year: "2026",
  },
  {
    name: "PharmaSynapse",
    description:
      "Full-stack agentic AI system for pharmaceutical intelligence. Built a Master–Worker multi-agent architecture that orchestrates domain-specific agents across regulatory, clinical, patent, market, and scientific data — producing structured, decision-ready insights.",
    tags: ["Python", "Agentic AI", "Multi-Agent Systems", "FastAPI", "Next.js"],
    github: "https://github.com/haryshwa05/pharmasynapse",
    live: "",
    featured: true,
    year: "2025",
  },
  {
    name: "XCA Image Analysis",
    description:
      "Deep learning model for X-ray coronary angiography analysis, in collaboration with SIMS Hospital Chennai. Focused on coronary vessel pattern recognition from angiogram frames — bridging clinical domain knowledge and computer vision.",
    tags: ["Python", "Computer Vision", "Deep Learning", "Medical AI"],
    github: "https://github.com/haryshwa05/xca-analysis",
    live: "",
    featured: true,
    year: "2025",
  },
  {
    name: "RAG Knowledge System",
    description:
      "Internal AI knowledge system built at Levarus Solutions using Retrieval-Augmented Generation. Replaced keyword search with LLM-powered semantic retrieval over company files and databases — production-deployed.",
    tags: ["Python", "RAG", "LangChain", "Oracle DB", "FastAPI"],
    github: "",
    live: "",
    featured: false,
    year: "2025",
  },
]

export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "SQL"],
  frameworks: ["React", "Next.js", "FastAPI", "Node.js", "Express", "Angular", "Apache Camel"],
  tools: ["Git", "REST APIs", "Oracle DB", "PostgreSQL", "Tailwind CSS", "pandas", "openpyxl", "pdfplumber"],
  domains: ["Agentic AI Systems", "RAG Pipelines", "Computer Vision", "Document Intelligence", "Full-Stack Engineering", "Big Data"],
}

export const education = [
  {
    institution: "SRM University",
    degree: "B.Tech in Computer Science Engineering — Big Data Analytics",
    period: "2023 — 2027",
    description: "CGPA: 8.78 | Coursework: DSA, DBMS, Operating Systems, Web Technologies, Data Analytics",
  },
]

// ============================================================
// BLOG — Add posts here as you write them
// These should target topics your future clients search for
// ============================================================

export const blogPosts = [
  // Example structure — fill in as you publish:
  // {
  //   title: "How we cut vendor reconciliation time from 2 hours to 2 minutes using Claude API",
  //   slug: "voyder-reconciliation-claude-api",
  //   date: "2026-04-15",
  //   summary: "A technical breakdown of how we built the AI extraction layer for Voyder — parsing unstructured vendor statements from PDFs, Excel, and scanned images.",
  //   tags: ["AI", "Document Intelligence", "Freight Tech", "Claude API"],
  //   featured: true,
  // },
]

// ============================================================
// WHAT TO ADD NEXT (remove this section once done)
// ============================================================

// 1. TESTIMONIALS — even one quote from your chess platform client
//    carries enormous weight. Add a testimonials[] array here.
//
// 2. CASE STUDIES — for the chess platform, write 3 paragraphs:
//    - The problem the client had
//    - What you built and how
//    - The measurable result
//    This is what converts visitors into clients far more than projects do.
//
// 3. BLOG POSTS — start with these titles (they target real search intent):
//    - "How RAG actually works in production" (technical credibility)
//    - "What I learned building AI for freight forwarding" (niche authority)
//    - "Automating vendor reconciliation with AI" (client-facing SEO)
//    Write one per month minimum. This is your long game for inbound.
//
// 4. AVAILABILITY/SERVICES SECTION — be explicit about what you offer:
//    - AI workflow automation for businesses
//    - Custom RAG systems
//    - Full-stack AI applications
//    Vague = no inquiries. Specific = real leads.
//
// 5. A CONTACT FORM that actually works — email link alone loses people.
//    Add a simple form with: Name, Company, What they need, Budget range.
//    The budget field alone filters out time-wasters immediately.
