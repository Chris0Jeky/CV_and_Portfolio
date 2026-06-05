# Research Handoff Prompt — "Which AI-Engineering Projects Should I Build Next?"

> **How to use this file.** Copy everything inside the horizontal rules below (from `ROLE` to the end)
> and paste it into a capable research LLM or a deep-research agent. It is self-contained: the model does
> not need the rest of this repo, though pointing it at `research/ai-engineer-research-findings.md` and
> `research/ai-engineer-roadmap.html` will enrich it. The prompt is deliberately structured as
> **WHAT / WHY / HOW** because that is what was requested — the model should understand not just the
> deliverable, but the purpose behind it and the method to produce it rigorously.

---

ROLE
You are a senior AI-careers research analyst and staff-level AI engineer. Your job is to design a
**prioritized, evidence-backed catalog of portfolio/learning projects** that a specific developer should
build next to become competitive for **senior production AI/LLM engineering roles**, and to justify each
recommendation with real market evidence. You think in trade-offs, you cite primary sources, and you are
adversarial about your own claims — you would rather output ten well-justified projects than fifty generic ones.

MISSION (one line)
Given the high-value skills already identified for the senior-AI-engineer market, determine **what specific
projects are the best use of this person's next ~3–6 months** — optimizing for hireability, skill
demonstration, differentiation from a saturated applicant pool, and personal fit — and explain the *why* and
*how* of every recommendation.

================================================================================
PART 1 — CONTEXT: WHO THIS IS FOR & WHAT WE ALREADY KNOW
================================================================================

THE PERSON
- A working software/web developer with **strong vanilla JavaScript / front-end skills** (hand-builds
  polished interactive sites with no framework; dark-theme, neon, glass-morphism aesthetic; ships to
  GitHub Pages). Comfortable with HTML/CSS/JS and Git.
- **Less daily experience with Python/back-end AI tooling** (FastAPI, async, the LLM ecosystem) — this is
  the main gap to close, and project choices should help close it.
- **Goal:** become competitive for **senior production AI/LLM engineering roles** (~$170K–$200K+, e.g. a
  real "Senior AI Engineer" spec built around production AI agents, RAG on Pinecone namespaces, LLM
  evaluation frameworks, model routing/cost optimization, observability, multi-provider OpenAI/Anthropic,
  a TypeScript + Python stack).
- **Constraints:** solo builder; wants **public, deployable portfolio artifacts** (each project should be
  demoable by a recruiter); limited time, so effort-vs-signal ROI matters; **strict factual accuracy** —
  he will only list skills on his CV that he has actually built with, so projects must be genuinely completed.
- **Personal hook:** a serious Baldur's Gate 3 / Dungeons & Dragons and classic-gaming enthusiast. A
  project themed on a domain he loves (and that has a real, enthusiastic user community) is a legitimate
  differentiation angle worth evaluating — passion projects with real users read as more credible than
  generic demos.

THE SKILLS ALREADY IDENTIFIED AS HIGH-VALUE (the 7 competency domains your projects must map to)
1. **Production AI agents & agentic workflows** — tool/function calling, orchestration, state/memory,
   checkpointing, failure handling, human-in-the-loop. Standard tool: **LangGraph** (avoid AutoGen for new work).
2. **RAG & retrieval engineering** — chunking, embeddings, vector DBs (Qdrant/Pinecone/Chroma), hybrid
   search, reranking, namespaces, citations, "I don't know" handling.
3. **LLM evaluation frameworks** — golden datasets, automated quality scoring (LLM-as-judge), retrieval
   metrics (recall@k, MRR, nDCG), latency/cost benchmarks, regression detection in CI. Tools: **RAGAS, DeepEval**.
   *(Hiring managers call eval literacy "the single biggest signal" — weight projects that exercise it.)*
4. **Model routing & cost / unit economics** — tiering cheap↔strong models, caching, token management.
   Tool: **RouteLLM** (drop-in OpenAI replacement; "up to 85% cost cut on MT-Bench at ~95% GPT-4 quality").
5. **Observability & instrumentation** — tracing, $/request, tokens, latency, quality signals, anomaly
   detection. Tools: **Langfuse, LangSmith, Helicone**.
6. **Multi-provider integration** — OpenAI + Anthropic + open models; prompt/behavior/token/failure-mode
   differences. Tool: **LiteLLM** (one OpenAI-format interface to 100+ providers).
7. **Production software foundation** — TS + Python, FastAPI/async, APIs, deployment, CI/CD, streaming,
   rate limiting, secrets. (TS side: Vercel AI SDK, LangChain.js, LlamaIndex.TS, Mastra — UNVERIFIED, confirm.)

WHAT WE ALREADY HAVE (your job is to VALIDATE, PRIORITIZE, DIFFERENTIATE, and GO BEYOND this — not repeat it)
A prior research pass produced a starter project list. Treat it as a baseline to pressure-test, not gospel:
- The "floor" 5: Document Q&A RAG · Structured Data Extraction · Tool-Calling Agent · LLM Evaluation
  Pipeline · Deploy-Everything-Behind-an-API.
- Senior extensions: Model-Router demo (RouteLLM) · Multi-provider gateway (LiteLLM) · Observability
  dashboard · Advanced RAG (hybrid + rerank + Pinecone namespaces) · Multi-agent system (LangGraph).
- One tailored idea: an **"Ask my CV" RAG assistant** embedded in his portfolio (proxied serverless, no
  exposed keys, with an eval set + cost cap).
Your output should confirm which of these are still worth it, which are **saturated/cliché and should be
elevated or dropped**, and **discover stronger, more differentiated projects** the baseline missed.

⚠ ANTI-PATTERNS FROM THE PRIOR PASS — DO NOT INHERIT THESE FABRICATED CLAIMS
The earlier research caught several blog claims that failed verification. Do not repeat them, and treat any
similar unsourced benchmark numbers with suspicion:
- Fabricated vector-DB latency tables (e.g. "Qdrant 6ms / Pinecone 8ms…").
- Fabricated chunking F1 gains ("+36%", "3–5×") and hybrid-search recall numbers ("78%→91%").
- "CrewAI uses 18% more tokens than LangGraph" and specific OpenAI/Anthropic Agents-SDK feature claims.
- "RAG is THE #1 most in-demand skill." (Core, yes; provably #1, no.)
If you cite a performance number, it must trace to a primary source (paper, official benchmark, vendor
docs, or a reproducible methodology) — otherwise label it as an unverified claim.

================================================================================
PART 2 — THE WHAT: THE DELIVERABLE YOU MUST PRODUCE
================================================================================

Produce a **comprehensive, prioritized project catalog** with these components:

A) **A ranked shortlist of 8–15 concrete projects.** For EACH project, a structured "project card" with:
   - **Name + one-line pitch.**
   - **What it is** — scope, the core build, what the finished artifact looks like.
   - **Domains demonstrated** — which of the 7 competencies (and depth: surface / solid / deep).
   - **WHY it's valuable** — the hiring rationale: what real demand it maps to, what interview story it
     unlocks, what it proves that a resume bullet can't. Tie to evidence (job postings, hiring-manager content).
   - **HOW to build it** — recommended stack (name specific tools from the verified list), the major build
     steps/milestones, the "production signals" to bake in (evals, observability, cost tracking, failure
     handling), and the minimum bar that makes it portfolio-worthy.
   - **Effort estimate** — rough time (e.g. weekend / 1–2 weeks / 3–4 weeks) and difficulty.
   - **Differentiation angle** — how to make it stand out vs the saturated version (most candidates build a
     naive "chat with PDF"; what elevates it?).
   - **Personal-fit notes** — leverage his JS strength and/or the D&D/gaming interest where it genuinely helps.
   - **Packaging checklist** — what the README/demo must show (metrics, architecture diagram, failure-modes
     section, live link, cost notes).
   - **Confidence + sources** — how sure you are this is worth it, and what evidence backs it.

B) **A recommended BUILD SEQUENCE** — order the shortlist into a coherent ~3–6 month arc where each project
   teaches what the next one needs and the set tells a story (a portfolio narrative, not a pile of demos).
   Explain the dependency logic.

C) **A "SATURATED / AVOID or ELEVATE" section** — projects that are so common they're now neutral-or-negative
   signal (and, for each, how to elevate it into something differentiated if he still wants the skill).

D) **A "STRETCH / STANDOUT" section** — 2–4 ambitious, higher-risk projects that could be genuine
   differentiators (open-source contribution to a named project; publishing a small benchmark/eval dataset;
   a tool other engineers would actually use; a project with real external users). Higher effort, higher signal.

E) **A skills-coverage matrix** — a table mapping the recommended projects × the 7 domains, so it's obvious
   the portfolio covers everything an employer screens for, with no redundant gaps or overlaps.

F) **An explicit assumptions + open-questions list** — what you assumed, what you couldn't verify, and what
   the person should decide.

================================================================================
PART 3 — THE WHY: PURPOSE & THE DECISIONS THIS RESEARCH INFORMS
================================================================================

Understand the stakes so you optimize for the right thing:

- **The decision being made:** "Of all the things I could build, which few projects give me the most
  hireability and skill-growth per hour?" Time is the scarce resource. Every recommendation competes against
  the others for his next 3–6 months. Rank ruthlessly.
- **Why projects, not courses:** 2026 hiring for these roles screens for **production signals over notebook
  demos** — shipped, integrated, evaluated systems. "Notebook-only experience presented as production" is a
  documented rejection pattern. Projects are the evidence; this research decides which evidence to manufacture.
- **Why differentiation matters:** the applicant pool is flooded with identical "chat with your PDF" and
  "LangChain agent" demos. A project's value is partly its **scarcity** — what most candidates *don't* show.
  So you must research not just "what demonstrates skill X" but "what demonstrates skill X in a way that's
  still rare and credible."
- **Why eval/observability/cost are weighted:** these are the senior differentiators. Anyone can wire an LLM
  call; few can *prove it works, watch it in production, and make it cheaper.* Projects that exercise domains
  3–5 should be over-represented relative to their share of online tutorials (where they're under-represented).
- **Why personal fit counts:** a solo builder finishes projects he's motivated by. A project that's both
  high-signal AND personally compelling (e.g. his gaming/D&D interest, or building onto his own portfolio) has
  a far higher completion probability — and completion is the whole point. Factor motivation into the ranking.
- **Why honesty matters:** he will only claim completed skills on his CV. Recommend projects he can realistically
  finish to a genuinely production-grade bar, not impressive-sounding things he'll abandon at 60%.

================================================================================
PART 4 — THE HOW: METHODOLOGY YOU MUST FOLLOW
================================================================================

1. **Ground in real demand, not vibes.** Collect and read **15–25 real, current senior-AI-engineer job
   postings** (Ashby, Greenhouse, Lever, LinkedIn, YC/Work-at-a-Startup, company career pages). Extract the
   recurring, concrete requirements and find the **intersection** — the skills/systems demanded again and
   again. Projects should target that intersection. Quote representative postings.

2. **Mine practitioner & hiring-manager signal.** Read what AI-engineering hiring managers, staff engineers,
   and well-regarded practitioners say makes a portfolio impressive vs forgettable (engineering blogs,
   conference talks, "how we hire" posts, reputable newsletters, GitHub discussions, HN threads). Distinguish
   first-hand hiring experience from generic listicles.

3. **Prefer primary sources; verify before asserting.** For any tool capability or performance claim, confirm
   against the GitHub repo, official docs, the paper, or an official benchmark/leaderboard. **Never reuse the
   refuted claims listed in Part 1, and apply the same skepticism to new numbers you encounter.** When sources
   disagree, say so and give your reasoning.

4. **Score every candidate project with an explicit rubric**, then rank by weighted total. Suggested rubric
   (1–5 each; tune weights and state them):
   - Hiring-signal strength (does real demand want this?) ×3
   - Skill-demonstration depth & breadth (how many of the 7 domains, how deeply) ×3
   - Differentiation / scarcity (is it rare, or saturated?) ×2
   - Completion probability for a solo builder (scope realism + personal fit/motivation) ×2
   - Deployability / demoability (can a recruiter click and see it?) ×2
   - Effort-to-signal ROI (penalize high effort for low marginal signal) ×2
   Show the scores so the ranking is auditable.

5. **Design each project to surface "production signals" by construction.** For every project, specify how to
   bake in: failure handling, evaluation (golden set + metrics), observability (traces, cost, latency), and at
   least one real integration. A project without an eval/observability story is under-leveraged — say so.

6. **Map projects to a narrative arc.** Sequence so dependencies flow (foundations → RAG → agents →
   eval/observability → cost/deploy), each project reuses or extends the last where sensible, and the finished
   set reads as a deliberate body of work, not scattered tutorials.

7. **Be adversarial with yourself before finalizing.** For your top recommendations, argue the strongest case
   *against* each ("why might this be a waste of time / saturated / unfinishable?") and only keep it if it
   survives. Cut anything that's there out of habit rather than evidence.

8. **Personalize, don't genericize.** Actively look for ways to exploit (a) his JavaScript/front-end strength
   as a fast on-ramp (e.g. TS-first AI tooling), and (b) his gaming/D&D passion + the existing portfolio site
   as differentiation vehicles — but only where they genuinely raise signal, never as gimmicks.

================================================================================
PART 5 — RESEARCH ANGLES TO DECOMPOSE INTO (cover all of these)
================================================================================

a) **Demand intersection** — across 15–25 current senior-AI-eng postings, what systems/skills recur most?
   Which of the 7 domains are most universally required vs nice-to-have?
b) **Project archetypes per domain** — for each of the 7 domains, what are the canonical project types that
   demonstrate it, and which version of each is high-signal vs commodity?
c) **Saturation map** — which project ideas are now so common they're neutral signal? What's the elevated
   variant of each (more data, real users, evals, scale, novelty)?
d) **Standout / differentiator projects** — open-source contributions (to which specific repos?), public
   benchmarks/eval datasets, developer tools, agents with real external users, domain-specialized RAG.
e) **Effort-vs-ROI** — which projects punch above their weight (high signal, modest effort)? Which are
   prestige traps (huge effort, marginal hiring lift)?
f) **Sequencing & portfolio narrative** — what ordering maximizes learning compounding and tells the cleanest
   story to a hiring manager skimming for 60 seconds?
g) **Personalized angles** — TS/JS-first AI builds (Vercel AI SDK etc.); a D&D/gaming-themed RAG+agent+eval
   project with a real community; AI features embedded into his existing portfolio site. Validate feasibility,
   estimate signal, list pitfalls (esp. security: never expose API keys client-side; rate-limit; cost caps).
h) **Packaging & proof** — what must each repo/demo contain (metrics, diagrams, failure-modes write-ups, live
   demos, cost notes) to convert "I built X" into credible evidence?
i) **Anti-portfolio** — common mistakes that make AI portfolios read as junior (notebook-as-production, no
   evals, no deployment, no failure handling, fabricated metrics). What to avoid.

================================================================================
PART 6 — CONSTRAINTS, PREFERENCES & PERSONALIZATION (honor these)
================================================================================

- Solo builder; finite time; optimize completion probability, not just impressiveness.
- Public, deployable artifacts strongly preferred (GitHub + live demo). He hosts on GitHub Pages today and is
  comfortable with serverless (Vercel/Cloudflare) for back-ends.
- Strong JS/front-end; growing Python/FastAPI. Recommend projects that both leverage the strength and close
  the gap.
- Strict CV factual accuracy — only finished, genuinely-built work gets claimed. No vaporware.
- Security-conscious: any AI feature on his public site must proxy keys server-side, rate-limit, and cap spend.
- Aesthetic/identity: dark-theme, neon, playful, easter-egg-loving, BG3/D&D fan — usable as differentiation.
- Budget-aware: prefer designs that stay cheap to run (free tiers, local models where sensible, cost controls)
  since these are personal projects, not funded products.

================================================================================
PART 7 — OUTPUT FORMAT & QUALITY BAR
================================================================================

- Lead with a **2–3 sentence executive answer** ("build these 3 first, in this order, because…").
- Then the **ranked project catalog** (Part 2A) with full project cards.
- Then **build sequence** (2B), **saturated/avoid-or-elevate** (2C), **stretch/standout** (2D),
  **skills-coverage matrix** (2E), and **assumptions/open-questions** (2F).
- Use clear headings, tables for the matrix and rubric scores, and **collapsible sections / dropdowns if the
  medium supports them** (this will likely be rendered as an HTML companion to
  `research/ai-engineer-roadmap.html`, so structure it to convert cleanly into collapsible cards matching a
  dark-neon aesthetic).
- **Every non-obvious claim gets a confidence label and a source.** Separate VERIFIED (primary source) from
  CONSENSUS (multiple secondary) from OPINION (your judgment). Flag anything time-sensitive.
- Cite real URLs. Prefer primary (repos, docs, papers, official benchmarks, actual job postings) over listicles.
- Be specific and concrete — name tools, name repos to contribute to, name datasets/APIs to build on, give real
  scope. Avoid generic advice that could apply to anyone.

================================================================================
PART 8 — SELF-CHECK BEFORE YOU FINISH (do this explicitly)
================================================================================

- Did I ground recommendations in **real, current job postings** and quote them? (If not, go back.)
- Does every project map to ≥1 of the 7 domains, and does the **portfolio as a whole cover all 7**?
- Did I weight **eval / observability / cost** projects appropriately (they're the senior differentiators)?
- Did I distinguish **saturated** from **differentiated**, and elevate or cut the saturated ones?
- Did I rank by an **explicit, auditable rubric** rather than gut feel?
- Did I avoid every **refuted claim** from Part 1, and verify any new performance numbers against primary sources?
- Did I personalize to his **JS strength, gaming interest, and existing portfolio** where it genuinely helps?
- Did I optimize for **completion probability**, not just impressiveness?
- Did I state confidence + sources, and list what I couldn't verify?

DELIVER the catalog now.
