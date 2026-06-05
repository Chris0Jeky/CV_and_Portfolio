# AI Engineer — Research Findings (durable record)

> Distilled, portable copy of the deep-research outcome. The pretty/interactive version is
> `research/ai-engineer-roadmap.html`. This file is the machine-readable source-of-truth so the
> findings survive after the temp workflow output is cleaned.
>
> **Generated:** 2026-06-04 · **Method:** deep-research workflow (105 agents · 23 sources fetched ·
> 109 claims extracted · 25 fact-checked with 3-vote adversarial verification · 19 confirmed · 6 killed).
> **Original question:** core skills, tools, project types & career directions for senior production
> AI/LLM engineering roles (agents, RAG, evals, model routing, observability, multi-provider, TS+Python),
> reverse-engineered from a real "Senior AI Engineer $170K–$200K" spec.

## Confidence legend
- **VERIFIED** — confirmed against primary sources (GitHub, official docs, arXiv, leaderboards).
- **CONSENSUS** — multiple independent sources agree; opinionated but mainstream.
- **CAVEAT** — time-sensitive or single-source; directionally right, treat numbers loosely.
- **ADDED** — general-knowledge addition beyond the verified research (flagged).
- **AVOID** — refuted or a known trap.

---

## Verified findings

1. **Role definition [VERIFIED].** An AI Engineer *deploys/integrates pretrained LLMs into production
   products* (prompt eng, RAG, agents, LLM APIs) rather than training models from scratch. Distinct from
   ML Engineer (model building/training/MLOps) and Data Scientist (insight). Fundamentally a
   software-engineering discipline. Fine-tuning (LoRA) *adapts* rather than trains-from-zero.

2. **Agent frameworks [VERIFIED].** Learn **LangGraph** (production standard; graph-based — nodes=ops,
   edges=transitions; typed state, auditability, built-in checkpointing + time-travel replay; v1.0 GA
   Oct 2025), **CrewAI**, **PydanticAI**. **AVOID AutoGen for new projects** — Microsoft moved it to
   maintenance mode, superseded by Microsoft Agent Framework (preview Oct 2025, GA ~Apr 2026).

3. **RAG tool stack [VERIFIED].** Vector DBs Qdrant + Pinecone (Qdrant first), Chroma for local dev;
   embeddings `text-embedding-3-large` (~64.6 MTEB) + BGE-M3 (~63.0); reranking Cohere Rerank (API) +
   BGE Reranker (self-host). Valid alternatives: FAISS, Weaviate, Milvus, pgvector.

4. **Model routing [VERIFIED — strongest-evidenced finding].** **RouteLLM** (lm-sys, open-source) serves
   & evaluates LLM routers; drop-in replacement for OpenAI's client; routes simple→`weak_model`,
   complex→`strong_model` via a cost-threshold. Advertised: *up to 85% cost reduction on MT-Bench while
   keeping ~95% of GPT-4 performance* (quote as "up to … on MT-Bench", not universal). Sources: GitHub
   repo, LMSYS blog, arXiv (ICLR 2025).

5. **Multi-provider gateway [VERIFIED].** **LiteLLM** (BerriAI, 47k+★) = one unified OpenAI-format
   interface to 100+ providers. Proxy adds spend/cost tracking, load balancing, routing/fallbacks,
   caching, virtual keys, guardrails, admin dashboard; observability callbacks to Lunary, MLflow,
   Langfuse. Covers multi-provider + cost + observability in one tool.

6. **Evaluation [VERIFIED — "the single biggest hiring signal"].** Learn **RAGAS** (RAG metrics:
   faithfulness, answer relevancy, context precision/recall) + **DeepEval** (pytest-style LLM testing for
   CI gates). A real eval framework = golden dataset (~100 ex) + automated quality scoring (LLM-as-judge)
   + retrieval metrics (recall@k, MRR, nDCG) + latency/cost benchmarks + regression detection in CI.
   Valid alternatives: LangSmith, Braintrust, Arize Phoenix, TruLens.

7. **Observability [VERIFIED].** LangSmith, Langfuse, Helicone (+ Arize Phoenix, OpenLLMetry/OTel).
   Instrument: full request tracing, $/request + tokens, p50/p95/p99 latency, quality signals, anomaly
   alerts on cost/latency/quality.

8. **Portfolio = 5-project sequence [VERIFIED, with caveat].** (1) Document Q&A RAG, (2) Structured Data
   Extraction, (3) Tool-Calling Agent, (4) LLM Evaluation Pipeline, (5) Deploy-Everything-Behind-an-API.
   *Caveat:* source targets devs breaking INTO AI eng (not "senior") — treat as the floor. 2026 hiring
   screens for production signals (failure handling, system integration, **eval literacy**, shipping)
   over notebook demos. "Notebook-only presented as production" = a rejection pattern.

9. **6-month roadmap [VERIFIED].** M1 Foundations (async Python + types, 2+ LLM APIs, prompting) ·
   M2 RAG + vector DBs · M3 Agents (tools: search/retrieval/calculator/code-exec) · M4 Fine-tuning
   (~1,000 pairs, LoRA Llama 3.3 8B via `trl`) · M5 LLMOps + eval (Langfuse/LangSmith tracing, 100-ex
   golden set, RAGAS, cost-per-request dashboard) · M6 Production deploy (A/B two prompts, cost-per-1k
   tracking, real-world debugging).

10. **Compensation [CAVEAT — medium confidence, time-sensitive].** Senior (~6–9 yrs) ~$180K–$280K base /
    $220K–$350K+ total; staff/principal $250K–$400K+ base / $350K–$600K+ total. AI Eng median base ~$175K
    (> ML Eng ~$155K > Data Scientist ~$130K). LLM/GenAI specialization = highest premium (~40–60% above
    baseline ML). Frontier ceiling: OpenAI SWE median ~$590K total (Levels.fyi, 2026-06-04). The pasted
    ACQ role ($170–200K base) sits at the entry of the senior band.

---

## ⚠ Refuted claims — DO NOT cite (killed by adversarial verification)

The techniques are real; the **numbers** are unsupported. Never repeat these in an interview/README:

- **[0-3]** Vector-DB p50 latency "Qdrant 6ms / Pinecone 8ms / Weaviate 12ms / Chroma 18ms." Benchmark yourself.
- **[0-3]** "Semantic chunking +36% F1; hierarchical 3–5×." Chunking matters; these deltas are fabricated-seeming.
- **[1-2]** "Hybrid search lifts recall@10 78% → 91%." Hybrid helps; specific numbers unverified.
- **[0-3]** "CrewAI uses ~18% more tokens than LangGraph." Ignore.
- **[0-3]** Specific OpenAI/Anthropic Agents-SDK feature claims (handoffs, "model-locked", "most robust error handling"). Verify against current docs.
- **[0-3]** "RAG is THE #1 most in-demand AI skill for 2026." RAG is core but not provably ranked first.

**Meta-lesson:** the AI-content ecosystem is full of confident, unsourced benchmark numbers. Treat every
"X% improvement" as a hypothesis to test on your own data — which is itself the eval mindset that gets hired.

---

## Open questions (research gaps to close)

- **TypeScript AI stack** — research was Python-centric. Unverified-but-known: Vercel AI SDK, LangChain.js,
  LlamaIndex.TS, Mastra, Genkit. The ACQ role uses TS + Python.
- **Empirical RAG numbers** — real primary benchmarks for chunking & hybrid-vs-dense (Anthropic contextual
  retrieval, Qdrant/Pinecone studies).
- **Vector-DB / eval-tool head-to-heads** — FAISS, Weaviate, Milvus, Braintrust, Arize Phoenix named but not compared.
- **Eval implementation depth** — exact metrics + CI-gating patterns (go to RAGAS/DeepEval docs).
- **Comp precision** — firm up with Levels.fyi raw filings / H1B / BLS.

---

## Sources

**Primary / high-value (★):**
- RouteLLM — https://github.com/lm-sys/routellm · https://lmsys.org/blog/2024-07-01-routellm/ · https://arxiv.org/abs/2406.18665
- LiteLLM — https://github.com/BerriAI/litellm · https://docs.litellm.ai/docs/observability/callbacks
- LangGraph persistence — https://docs.langchain.com/oss/python/langgraph/persistence
- MTEB leaderboard — https://huggingface.co/spaces/mteb/leaderboard
- Levels.fyi OpenAI — https://www.levels.fyi/companies/openai/salaries/software-engineer

**Secondary / blog:**
- AI Engineer Roadmap 2026 — https://letsdatascience.com/blog/ai-engineer-roadmap-2026-skills-tools-and-career-path
- Kore1 salary guide — https://www.kore1.com/ai-engineer-salary-guide/
- U. Manchester ML vs AI Eng — https://research-it.manchester.ac.uk/news/2025/10/14/ml-engineer-vs-ai-engineer
- 5 AI Portfolio Projects — https://dev.to/klement_gunndu/5-ai-portfolio-projects-that-actually-get-you-hired-in-2026-5bpl
- AI Developer Hiring Signals 2026 — https://www.digitalapplied.com/blog/ai-developer-hiring-skills-that-matter-2026
- LLM Eval Tools compared — https://dev.to/ultraduneai/eval-006-llm-evaluation-tools-ragas-vs-deepeval-vs-braintrust-vs-langsmith-vs-arize-phoenix-3p11
- 10 AI Agent Frameworks 2026 (treat per-framework numbers skeptically) — https://medium.com/@atnoforgenai/10-ai-agent-frameworks-you-should-know-in-2026-langgraph-crewai-autogen-more-2e0be4055556
- Agent Portfolio Projects 2026 — https://agenticcareers.co/blog/ai-agent-portfolio-projects-get-hired-2026
