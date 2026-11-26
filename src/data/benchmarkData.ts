export type ProductId = "notion" | "perplexity" | "elevenlabs";

export type ChecklistStatus = "pass" | "partial" | "fail";

export type DimensionKey =
  | "onboarding"
  | "grounding"
  | "latency"
  | "pricing"
  | "naturalness";

export interface DimensionMeta {
  key: DimensionKey;
  label: string;
  shortLabel: string;
  description: string;
}

export interface ProductProfile {
  id: ProductId;
  name: string;
  subtitle: string;
  category: string;
  evaluatedBuild: string;
  accentHex: string;
  badgeBg: string;
  badgeText: string;
  borderAccent: string;
  headlineScores: {
    usability: number;
    transparency: number;
    pricingTrust: number;
  };
  dimensionScores: Record<DimensionKey, number>;
  keyFriction: string;
  primaryStrength: string;
  crossCulturalRisk: string;
}

export interface ChecklistItem {
  id: string;
  index: number;
  criterion: string;
  category:
    | "AI Capability & Nuance"
    | "Transparency & Grounding"
    | "Interaction & Latency"
    | "Pricing & Enterprise";
  description: string;
  results: Record<
    ProductId,
    {
      status: ChecklistStatus;
      note: string;
    }
  >;
  failureExample: {
    productId: ProductId;
    scenario: string;
    observedOutput: string;
  };
}

export interface WalkthroughItem {
  id: string;
  productId: ProductId;
  title: string;
  severity: "Critical" | "High";
  frictionArea: string;
  beforeState: {
    label: string;
    userExperience: string;
    uiSnippetTitle: string;
    uiSnippetLines: string[];
  };
  afterState: {
    label: string;
    userExperience: string;
    uiSnippetTitle: string;
    uiSnippetLines: string[];
  };
  rootCause: string;
  productFix: string;
  impactMetric: string;
  impactDetail: string;
}

export const DIMENSIONS: DimensionMeta[] = [
  {
    key: "onboarding",
    label: "Onboarding Friction",
    shortLabel: "Onboarding",
    description:
      "Inverse friction score (higher = smoother time-to-value and lower setup cognitive load).",
  },
  {
    key: "grounding",
    label: "Evidence Grounding",
    shortLabel: "Grounding",
    description:
      "Claim-to-source verifiability, exact span attribution, and hallucination containment.",
  },
  {
    key: "latency",
    label: "Latency & Turn-taking",
    shortLabel: "Latency",
    description:
      "Response cadence, streaming responsiveness, barge-in handling, and multi-turn stability.",
  },
  {
    key: "pricing",
    label: "Pricing Predictability",
    shortLabel: "Pricing",
    description:
      "Pre-execution cost visibility, credit/usage transparency, and enterprise budget control.",
  },
  {
    key: "naturalness",
    label: "AI-ness / Tone Naturalness",
    shortLabel: "Naturalness",
    description:
      "Pragmatic nuance, sarcasm comprehension, prosodic warmth, and cross-cultural tone fit.",
  },
];

export const PRODUCTS: ProductProfile[] = [
  {
    id: "notion",
    name: "Notion AI",
    subtitle: "2026 Credit Pricing & Custom Agents",
    category: "Workspace Knowledge & Agent Suite",
    evaluatedBuild: "Q4 2026 Enterprise Tier",
    accentHex: "#18181B",
    badgeBg: "bg-zinc-900",
    badgeText: "text-white",
    borderAccent: "border-zinc-900",
    headlineScores: {
      usability: 7.2,
      transparency: 4.5,
      pricingTrust: 3.8,
    },
    dimensionScores: {
      onboarding: 7.6,
      grounding: 6.4,
      latency: 7.1,
      pricing: 3.8,
      naturalness: 6.2,
    },
    keyFriction:
      "Opaque credit burn rate, forced AUTO model routing, and sarcasm/nuance misses in workspace summarization.",
    primaryStrength:
      "Deep inline document context and zero-migration adoption inside existing team wikis.",
    crossCulturalRisk:
      "Flattens indirect feedback and deadpan critique in global Slack/doc threads into misleadingly positive summaries.",
  },
  {
    id: "perplexity",
    name: "Perplexity Pro",
    subtitle: "Deep Research & Citation UX",
    category: "Answer Engine & Research Synthesis",
    evaluatedBuild: "Deep Research v2.4",
    accentHex: "#0D9488",
    badgeBg: "bg-teal-600",
    badgeText: "text-white",
    borderAccent: "border-teal-600",
    headlineScores: {
      usability: 8.9,
      transparency: 8.6,
      pricingTrust: 8.2,
    },
    dimensionScores: {
      onboarding: 9.2,
      grounding: 8.8,
      latency: 8.7,
      pricing: 8.2,
      naturalness: 8.1,
    },
    keyFriction:
      "Occasional citation-to-claim drift on niche non-English queries; strong answer speed but weak enterprise audit export.",
    primaryStrength:
      "Fast multi-step synthesis with inline numbered citations and clear research plan visibility.",
    crossCulturalRisk:
      "Over-indexes on English-language sources when answering regional regulatory or local-market queries.",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    subtitle: "Voice Agent & Conversational AI",
    category: "Real-Time Conversational Voice Platform",
    evaluatedBuild: "Conversational AI 2.0",
    accentHex: "#4F46E5",
    badgeBg: "bg-indigo-600",
    badgeText: "text-white",
    borderAccent: "border-indigo-600",
    headlineScores: {
      usability: 8.4,
      transparency: 7.8,
      pricingTrust: 7.5,
    },
    dimensionScores: {
      onboarding: 8.1,
      grounding: 7.4,
      latency: 7.2,
      pricing: 7.5,
      naturalness: 7.9,
    },
    keyFriction:
      "Turn-taking latency spikes on accented English / noisy audio; robotic emotional flattening on sarcastic customer complaints ('AI-ness').",
    primaryStrength:
      "Industry-leading voice fidelity, expressive baseline prosody, and low-code agent telephony setup.",
    crossCulturalRisk:
      "VAD endpointing misclassifies non-native cadence pauses as turn completion, causing premature interruptions.",
  },
];

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "chk-01",
    index: 1,
    criterion: "Handles Sarcasm & Pragmatic Nuance",
    category: "AI Capability & Nuance",
    description:
      "Correctly interprets irony, understatement, and indirect dissent without taking literal phrasing at face value.",
    results: {
      notion: {
        status: "fail",
        note: "Summarizes sarcastic retrospective comments as literal praise.",
      },
      perplexity: {
        status: "partial",
        note: "Recognizes sarcasm in quoted forums, occasionally flattens nuance in synthesis.",
      },
      elevenlabs: {
        status: "fail",
        note: "Responds cheerfully to sarcastic customer frustration ('Oh great, another 40-minute wait').",
      },
    },
    failureExample: {
      productId: "elevenlabs",
      scenario:
        "Caller says with flat, sarcastic intonation: 'Yeah, waiting three weeks for a refund is honestly my favorite hobby.'",
      observedOutput:
        "Agent replies in upbeat prosody: 'I'm so glad to hear you're enjoying the experience! Let me check your ticket status.'",
    },
  },
  {
    id: "chk-02",
    index: 2,
    criterion: "Shows Exact Source Span",
    category: "Transparency & Grounding",
    description:
      "Links claims to the exact paragraph, timestamp, or quote rather than only a top-level page URL.",
    results: {
      notion: {
        status: "partial",
        note: "Links parent Notion page, but omits block-level anchor for long specs.",
      },
      perplexity: {
        status: "pass",
        note: "Inline numbered citations with hover snippet previews and direct URLs.",
      },
      elevenlabs: {
        status: "partial",
        note: "Logs RAG chunk IDs in developer console, but exposes no live citation cue to QA reviewers.",
      },
    },
    failureExample: {
      productId: "notion",
      scenario:
        "Executive asks Custom Agent for Q3 EMEA churn drivers across a 42-page product wiki.",
      observedOutput:
        "Agent cites 'Q3 Operating Review' root page without highlighting which table or comment thread produced the 4.2% figure.",
    },
  },
  {
    id: "chk-03",
    index: 3,
    criterion: "Graceful Fallback on Low Confidence",
    category: "AI Capability & Nuance",
    description:
      "Explicitly signals uncertainty, requests clarification, or escalates instead of fabricating an authoritative answer.",
    results: {
      notion: {
        status: "partial",
        note: "Fills missing workspace fields with plausible-sounding assumptions unless constrained.",
      },
      perplexity: {
        status: "pass",
        note: "Surfaces conflicting sources and notes data recency gaps in Deep Research.",
      },
      elevenlabs: {
        status: "pass",
        note: "Supports deterministic transfer-to-human tool triggers when confidence rules fail.",
      },
    },
    failureExample: {
      productId: "notion",
      scenario:
        "PM runs an agent to summarize an unfinalized pricing memo missing APAC tier numbers.",
      observedOutput:
        "Agent extrapolates APAC pricing from US tiers without flagging the region as 'TBD' in the summary table.",
    },
  },
  {
    id: "chk-04",
    index: 4,
    criterion: "Clear Token / Credit Cost Preview",
    category: "Pricing & Enterprise",
    description:
      "Communicates estimated credit or unit consumption before triggering expensive multi-step agent runs.",
    results: {
      notion: {
        status: "fail",
        note: "No pre-run credit estimate; batch database autofills silently burn monthly allowance.",
      },
      perplexity: {
        status: "pass",
        note: "Clearly displays remaining Deep Research quota and Pro search tier boundaries.",
      },
      elevenlabs: {
        status: "partial",
        note: "Shows per-minute voice rate in billing docs, but lacks live per-call LLM + TTS cost meter in test studio.",
      },
    },
    failureExample: {
      productId: "notion",
      scenario:
        "Ops lead triggers a Custom Agent across 180 CRM rows to draft account briefs.",
      observedOutput:
        "Run executes with zero credit preview and exhausts 68% of the workspace's monthly credit pool in 90 seconds.",
    },
  },
  {
    id: "chk-05",
    index: 5,
    criterion: "Accent & Background Noise Robustness",
    category: "Interaction & Latency",
    description:
      "Maintains low WER and stable turn-taking across non-native accents and realistic ambient noise.",
    results: {
      notion: {
        status: "pass",
        note: "Text-first workflow; meeting transcription handles moderate accents reliably offline.",
      },
      perplexity: {
        status: "pass",
        note: "Voice search handles diverse accents cleanly with editable query confirmation.",
      },
      elevenlabs: {
        status: "fail",
        note: "Latency spikes (+650–950ms) and premature VAD cutoffs on Indian/East Asian English in café noise.",
      },
    },
    failureExample: {
      productId: "elevenlabs",
      scenario:
        "Accented English caller pauses 450ms mid-sentence while reading an order number in a noisy transit hub.",
      observedOutput:
        "Endpointing fires early, agent speaks over the last 4 digits, then stalls 1.4s recovering context.",
    },
  },
  {
    id: "chk-06",
    index: 6,
    criterion: "Zero-Friction Enterprise Audit Export",
    category: "Pricing & Enterprise",
    description:
      "Exports verifiable transcripts, citations, prompts, and timestamps into compliance-ready PDF/CSV/JSON bundles.",
    results: {
      notion: {
        status: "partial",
        note: "Exports page markdown/PDF cleanly, but strips agent execution trace and source bindings.",
      },
      perplexity: {
        status: "fail",
        note: "Markdown/PDF export drops citation verification metadata, retrieval timestamps, and query chain.",
      },
      elevenlabs: {
        status: "pass",
        note: "Provides structured call JSON, audio recordings, tool-call logs, and webhook export.",
      },
    },
    failureExample: {
      productId: "perplexity",
      scenario:
        "Strategy analyst exports a Deep Research report on EU AI Act obligations for legal sign-off.",
      observedOutput:
        "Exported PDF renders flat footnotes without source retrieval dates, excerpt spans, or verification status.",
    },
  },
  {
    id: "chk-07",
    index: 7,
    criterion: "Explicit Model Routing Visibility",
    category: "Transparency & Grounding",
    description:
      "Shows which underlying model handled a task and lets power users pin or override routing.",
    results: {
      notion: {
        status: "fail",
        note: "Forced AUTO model routing hides model downgrades and blocks deterministic pinning.",
      },
      perplexity: {
        status: "pass",
        note: "Explicit model picker with visible active model indicator per thread.",
      },
      elevenlabs: {
        status: "pass",
        note: "Full LLM + TTS model selection exposed per agent configuration.",
      },
    },
    failureExample: {
      productId: "notion",
      scenario:
        "Product team notices sudden drop in PRD critique depth between Monday and Thursday runs.",
      observedOutput:
        "UI displays only 'Auto' with no indication that routing silently shifted to a lighter model tier.",
    },
  },
  {
    id: "chk-08",
    index: 8,
    criterion: "Natural Barge-In & Interruption Recovery",
    category: "Interaction & Latency",
    description:
      "Allows users to interrupt mid-stream or mid-utterance and cleanly pivot without repeating stale state.",
    results: {
      notion: {
        status: "pass",
        note: "Stop-generation control is immediate with clean inline edit continuation.",
      },
      perplexity: {
        status: "pass",
        note: "Instant stop and follow-up refinement preserve prior retrieved sources.",
      },
      elevenlabs: {
        status: "partial",
        note: "Barge-in works in quiet rooms, but echo/noise triggers false interruptions or 1s silence gaps.",
      },
    },
    failureExample: {
      productId: "elevenlabs",
      scenario:
        "Customer interrupts a 12-second policy disclaimer with 'Skip that—just tell me the cancellation fee.'",
      observedOutput:
        "Agent halts, pauses 1.1s, then restarts the policy disclaimer from sentence two before answering.",
    },
  },
  {
    id: "chk-09",
    index: 9,
    criterion: "Cross-Lingual Citation Fidelity",
    category: "Transparency & Grounding",
    description:
      "Preserves factual alignment between non-English primary sources and synthesized English/local-language claims.",
    results: {
      notion: {
        status: "partial",
        note: "Adequate for major European languages; drops nuance in Japanese/Chinese workspace docs.",
      },
      perplexity: {
        status: "partial",
        note: "Occasional citation-to-claim drift when translating niche Japanese/German regulatory filings.",
      },
      elevenlabs: {
        status: "partial",
        note: "Strong multilingual TTS, but cross-lingual KB retrieval drifts on localized SKU names.",
      },
    },
    failureExample: {
      productId: "perplexity",
      scenario:
        "User queries 2026 Japanese FSA stablecoin reserve thresholds in English.",
      observedOutput:
        "Synthesis cites a 2024 Nikkei summary to support a 2026 statutory amendment that the linked article never mentions.",
    },
  },
  {
    id: "chk-10",
    index: 10,
    criterion: "Predictable Rate-Limit & Overage Guardrails",
    category: "Pricing & Enterprise",
    description:
      "Provides soft warnings, configurable workspace caps, and non-disruptive degradation before hard lockouts.",
    results: {
      notion: {
        status: "fail",
        note: "Hard workspace credit wall disrupts active workflows without per-user soft caps.",
      },
      perplexity: {
        status: "pass",
        note: "Gracefully steps down from Deep Research to standard Pro search with clear reset timer.",
      },
      elevenlabs: {
        status: "pass",
        note: "Concurrency caps, character alerts, and webhook budget thresholds are configurable.",
      },
    },
    failureExample: {
      productId: "notion",
      scenario:
        "Two analysts hit the shared team credit ceiling mid-sprint.",
      observedOutput:
        "All 45 workspace members see a generic upgrade blocker with no breakdown of which agent caused the burn.",
    },
  },
  {
    id: "chk-11",
    index: 11,
    criterion: "Emotional Prosody & Non-Robotic Cadence",
    category: "AI Capability & Nuance",
    description:
      "Adapts pacing, empathy, and register naturally without over-eager 'AI assistant' clichés.",
    results: {
      notion: {
        status: "partial",
        note: "Defaults to formulaic corporate bullet prose ('Delve', 'Key Takeaways') unless heavily prompted.",
      },
      perplexity: {
        status: "pass",
        note: "Crisp, journalistic register with minimal filler or sycophantic preamble.",
      },
      elevenlabs: {
        status: "partial",
        note: "Natural baseline timbre, but emotionally flattens during escalated complaints or rapid tone shifts.",
      },
    },
    failureExample: {
      productId: "elevenlabs",
      scenario:
        "Angry customer escalates over a double-billed invoice.",
      observedOutput:
        "Voice maintains identical chipper cadence and pitch contour while reading 'I completely understand your frustration.'",
    },
  },
  {
    id: "chk-12",
    index: 12,
    criterion: "Context Window & Memory Transparency",
    category: "Transparency & Grounding",
    description:
      "Makes active workspace scope, retrieved pages, or conversation memory inspectable and editable.",
    results: {
      notion: {
        status: "partial",
        note: "Shows broad workspace scope, but obscures which sub-pages were truncated from context.",
      },
      perplexity: {
        status: "pass",
        note: "Displays step-by-step search queries, read sources, and active Space files.",
      },
      elevenlabs: {
        status: "pass",
        note: "Exposes system prompt, dynamic variables, and KB documents in real-time debug view.",
      },
    },
    failureExample: {
      productId: "notion",
      scenario:
        "User asks Q&A across a 120-page Engineering Handbook.",
      observedOutput:
        "Response silently omits the latest 2026 security addendum without indicating context truncation.",
    },
  },
  {
    id: "chk-13",
    index: 13,
    criterion: "Deterministic Structured Output & Undo",
    category: "Interaction & Latency",
    description:
      "Supports safe preview, diffing, and one-click rollback before mutating production records or docs.",
    results: {
      notion: {
        status: "pass",
        note: "Inline diff preview and 'Discard / Insert below' prevent accidental doc overwrites.",
      },
      perplexity: {
        status: "pass",
        note: "Read-only synthesis with clean copy-table and structured markdown blocks.",
      },
      elevenlabs: {
        status: "partial",
        note: "Tool calls execute live during calls; dry-run simulation mode requires manual test payloads.",
      },
    },
    failureExample: {
      productId: "elevenlabs",
      scenario:
        "QA engineer tests a refund-issuing voice agent in staging with a live webhook.",
      observedOutput:
        "No built-in 'Dry-Run Tool Intercept' toggle in the call preview widget to verify arguments before dispatch.",
    },
  },
  {
    id: "chk-14",
    index: 14,
    criterion: "First-Run Time-to-Value (< 60s)",
    category: "Interaction & Latency",
    description:
      "New evaluators achieve a meaningful, high-signal result within 60 seconds without boilerplate setup.",
    results: {
      notion: {
        status: "pass",
        note: "Spacebar invoke inside any existing doc delivers immediate value.",
      },
      perplexity: {
        status: "pass",
        note: "Single search bar yields cited Deep Research report in under a minute.",
      },
      elevenlabs: {
        status: "pass",
        note: "Pre-built voice agent templates launch browser WebRTC calls in ~45 seconds.",
      },
    },
    failureExample: {
      productId: "notion",
      scenario:
        "New team configures a Custom Agent with multi-database permissions.",
      observedOutput:
        "While basic inline AI is instant, Custom Agent permission scoping adds 4–6 minutes of friction before first valid run.",
    },
  },
  {
    id: "chk-15",
    index: 15,
    criterion: "Cross-Cultural Tone & Politeness Calibration",
    category: "AI Capability & Nuance",
    description:
      "Adapts formality, directness, and honorifics appropriately across US, European, and APAC norms.",
    results: {
      notion: {
        status: "partial",
        note: "Biased toward Silicon Valley casual-enthusiastic tone even in German/Japanese memos.",
      },
      perplexity: {
        status: "pass",
        note: "Neutral analytical register translates cleanly across global enterprise audiences.",
      },
      elevenlabs: {
        status: "partial",
        note: "Overly familiar American small-talk defaults clash with DACH and Japanese support expectations.",
      },
    },
    failureExample: {
      productId: "notion",
      scenario:
        "Drafting a formal Japanese client escalation summary from bullet notes.",
      observedOutput:
        "Output mixes casual polite forms with overly upbeat Western framing ('Super excited to align!').",
    },
  },
];

export const WALKTHROUGH_ITEMS: WalkthroughItem[] = [
  {
    id: "wt-notion-1",
    productId: "notion",
    title: "Pre-Flight Credit Meter & Explicit Model Override",
    severity: "Critical",
    frictionArea: "Pricing Trust & Agent Control",
    beforeState: {
      label: "Before: Blind Execution & Forced AUTO",
      userExperience:
        "Users trigger Custom Agents across databases with zero cost preview and a locked 'AUTO' model badge—discovering credit exhaustion only after hitting a hard workspace paywall.",
      uiSnippetTitle: "Run Custom Agent (Current)",
      uiSnippetLines: [
        "Model: AUTO (Managed by Notion)",
        "Target: 180 rows in Enterprise Accounts",
        "[ Run Agent ]  ← No credit estimate shown",
      ],
    },
    afterState: {
      label: "After: Cost-Gated Pre-Flight Drawer",
      userExperience:
        "Before execution, a lightweight pre-flight bar displays estimated credit range, remaining workspace budget %, and a model tier selector (Fast vs. Reasoning) with per-run cap.",
      uiSnippetTitle: "Pre-Flight Check (Redesigned)",
      uiSnippetLines: [
        "Est. Cost: 140–185 credits (12% of monthly pool)",
        "Model: Reasoning Tier (Pinned) · Cap: 200 credits",
        "[ Preview 3 Rows Free ]  [ Confirm & Run ]",
      ],
    },
    rootCause:
      "Enterprise buyers equate unpredictable usage-based metering with hidden vendor lock-in. Removing model visibility breaks user mental models of quality-vs-cost trade-offs and triggers billing anxiety during team rollouts.",
    productFix:
      "Introduce a dry-run estimator (sampling 3 rows to project total credit burn), expose an opt-in Model Pinning toggle for Business/Enterprise tiers, and ship admin-configurable soft spend alerts at 50% / 80%.",
    impactMetric: "Reduce renewal churn risk by 18–24%",
    impactDetail:
      "Directly addresses #1 enterprise procurement objection and lifts Pricing Trust from 3.8 toward 7.5+.",
  },
  {
    id: "wt-notion-2",
    productId: "notion",
    title: "Pragmatic Tone & Dissent-Preserving Summarization",
    severity: "High",
    frictionArea: "AI Capability & Cross-Cultural Nuance",
    beforeState: {
      label: "Before: Flattened 'Happy Path' Summary",
      userExperience:
        "Workspace summarizer treats deadpan critique and indirect team pushback as neutral or positive consensus, hiding real delivery risks from leadership.",
      uiSnippetTitle: "AI Summary Output (Current)",
      uiSnippetLines: [
        "• Team is aligned on the Q4 launch timeline.",
        "• Engineering expressed enthusiasm about scope.",
        "(Misses sarcastic comment: 'Sure, shipping SSO in 4 days sounds totally realistic.')",
      ],
    },
    afterState: {
      label: "After: Sentiment-Calibrated Risk Extraction",
      userExperience:
        "Summarizer runs a pragmatic-intent pass that surfaces hedging, irony, and unresolved dissent in a dedicated 'Unresolved Friction & Dissent' block with direct comment links.",
      uiSnippetTitle: "AI Summary Output (Redesigned)",
      uiSnippetLines: [
        "• Timeline Consensus: Low (2 unresolved objections)",
        "• Flagged Dissent [@alex · L42]: Skepticism on 4-day SSO estimate (ironic phrasing detected)",
        "• Recommended Action: Confirm scope cut with Eng Lead",
      ],
    },
    rootCause:
      "Standard summarization prompts optimize for brevity and positive synthesis, systematically erasing low-context sarcasm and high-context indirect disagreement common in distributed global teams.",
    productFix:
      "Update system prompt architecture with an explicit two-stage extraction rubric: (1) literal decisions, (2) pragmatic risk/dissent detection with mandatory verbatim quote anchoring when irony or hedging is detected.",
    impactMetric: "Cut executive review rework by 32%",
    impactDetail:
      "Prevents silent schedule slippage and improves leadership trust in automated weekly digests.",
  },
  {
    id: "wt-perplexity-1",
    productId: "perplexity",
    title: "Claim-Span Verification & Cross-Lingual Alignment Guard",
    severity: "High",
    frictionArea: "Evidence Grounding & Non-English Fidelity",
    beforeState: {
      label: "Before: Page-Level Citation Drift",
      userExperience:
        "On niche non-English queries (e.g., Japanese/German regulatory updates), inline citations link to tangentially related articles whose text does not actually support the synthesized date or threshold.",
      uiSnippetTitle: "Deep Research Claim (Current)",
      uiSnippetLines: [
        "Under the 2026 amendment, issuers must hold 100% liquid reserves [3].",
        "Hover [3]: Nikkei Asia (2024) — General fintech overview",
        "⚠ Claim-to-source temporal mismatch undetected",
      ],
    },
    afterState: {
      label: "After: Exact Quote Span + Verification Badge",
      userExperience:
        "Each citation runs a lightweight NLI entailment check against the exact translated source span; unverified or dated links are downgraded to 'Context Only' rather than supporting proof.",
      uiSnippetTitle: "Deep Research Claim (Redesigned)",
      uiSnippetLines: [
        "Issuers must hold 100% liquid reserves [3 · Verified Span]",
        "Hover [3]: FSA Japan (2026-04) · Original JP + EN gloss highlighted",
        "Unverified 2024 articles auto-demoted to 'Background Reading'",
      ],
    },
    rootCause:
      "Cross-lingual retrieval compresses non-English chunks into English summaries before citation attachment, causing temporal drift and false attribution when English secondary sources outrank local primary filings.",
    productFix:
      "Add a post-synthesis NLI claim-entailment verifier against native-language source spans, boost primary-domain regional sources (`.go.jp`, `.europa.eu`), and display an inline 'Exact Quote + Native Gloss' popover.",
    impactMetric: "Cut manual citation verification time by 45%",
    impactDetail:
      "Elevates Deep Research from rapid orientation tool to defensible analyst workflow across global markets.",
  },
  {
    id: "wt-perplexity-2",
    productId: "perplexity",
    title: "Compliance-Grade Enterprise Audit Export Bundle",
    severity: "High",
    frictionArea: "Enterprise Workflow & Shareability",
    beforeState: {
      label: "Before: Flat Markdown / PDF Snapshot",
      userExperience:
        "Exporting a Deep Research report strips retrieval timestamps, query iterations, and source excerpts—forcing analysts to manually rebuild appendices in Word or Notion.",
      uiSnippetTitle: "Export Menu (Current)",
      uiSnippetLines: [
        "• Export as PDF (flat layout, URL footnotes only)",
        "• Copy Markdown (no retrieval dates or evidence table)",
        "• Missing: Source archive hash & audit trail",
      ],
    },
    afterState: {
      label: "After: One-Click Audit Evidence Pack",
      userExperience:
        "Enterprise users export a structured PDF/DOCX/JSON bundle containing the executive brief, an auto-generated Claim-to-Source Matrix, retrieval timestamps, and model/search trace.",
      uiSnippetTitle: "Enterprise Audit Export (Redesigned)",
      uiSnippetLines: [
        "✓ Executive Brief + Inline Verified Citations",
        "✓ Appendix A: Claim-to-Excerpt Traceability Table (CSV/PDF)",
        "✓ Metadata: Query Chain, Model Version, UTC Retrieval Stamp",
      ],
    },
    rootCause:
      "Perplexity's consumer heritage prioritizes reading speed inside the web app, overlooking that enterprise knowledge workers are evaluated on the defensibility of artifacts shared with legal, finance, and boards.",
    productFix:
      "Ship a structured 'Audit Bundle' exporter (PDF + JSON/CSV evidence appendix) that serializes the existing Deep Research execution graph, retrieval timestamps, and verified quote spans with zero extra latency.",
    impactMetric: "Increase Enterprise seat expansion by 15–20%",
    impactDetail:
      "Unlocks regulated verticals (consulting, legal, equity research) where audit trails are mandatory.",
  },
  {
    id: "wt-elevenlabs-1",
    productId: "elevenlabs",
    title: "Adaptive Accent-Aware Endpointing & Acoustic Backchannels",
    severity: "Critical",
    frictionArea: "Turn-Taking Latency & Accent Robustness",
    beforeState: {
      label: "Before: Fixed VAD Silence Threshold",
      userExperience:
        "A static silence timer misreads natural phrasing pauses from accented English speakers or noisy environments, triggering awkward barge-ins followed by 900ms+ recovery stalls.",
      uiSnippetTitle: "Voice Pipeline (Current)",
      uiSnippetLines: [
        "VAD Silence Cutoff: Fixed 400ms",
        "Noise Floor: High → False barge-in detected",
        "User hears: Premature interruption + 1.3s dead air",
      ],
    },
    afterState: {
      label: "After: Semantic Turn-Completion + Micro-Acks",
      userExperience:
        "Combine acoustic VAD with a streaming semantic end-of-turn classifier that extends patience on incomplete clauses and emits subtle 250ms acoustic backchannels ('Got it, checking...') during high-latency tool calls.",
      uiSnippetTitle: "Voice Pipeline (Redesigned)",
      uiSnippetLines: [
        "Semantic EOT: Incomplete clause detected → Hold 350ms",
        "Acoustic Profile: Noisy/Accented → Noise-gated ASR boost",
        "Latency Masking: Natural backchannel at 400ms P95",
      ],
    },
    rootCause:
      "Fixed silence thresholds assume native-speaker prosodic pacing in studio-quiet audio. Non-native speakers pause mid-clause more frequently while retrieving digits or terms, causing mechanical turn collisions.",
    productFix:
      "Deploy a lightweight streaming end-of-turn (EOT) prosody + syntax predictor alongside dynamic noise-floor calibration, and expose a 'Conversational Patience' slider + customizable latency-masking fillers in Agent Studio.",
    impactMetric: "Cut mid-call drop-off rate by 28%",
    impactDetail:
      "Directly improves P95 perceived turn-taking latency and containment rates for global support queues.",
  },
  {
    id: "wt-elevenlabs-2",
    productId: "elevenlabs",
    title: "Emotion-Aware Prosody Steering for Sarcastic Escalations",
    severity: "High",
    frictionArea: "AI-ness & Emotional Naturalness",
    beforeState: {
      label: "Before: Flat Cheerful 'AI-ness' Response",
      userExperience:
        "Text-only sentiment misses deadpan vocal sarcasm, causing the TTS engine to respond with upbeat, overly enthusiastic prosody that inflames frustrated customers.",
      uiSnippetTitle: "Escalation Turn (Current)",
      uiSnippetLines: [
        "Caller (flat, sarcastic): 'Oh wonderful, another broken link.'",
        "Text Sentiment: Positive ('wonderful')",
        "TTS Output: Cheerful pitch → 'Awesome! Let's take a look!'",
      ],
    },
    afterState: {
      label: "After: Audio-Prosody + Context De-Escalation",
      userExperience:
        "Multimodal prosody cues (pitch flatness, speech rate, prior turn friction) override literal positive words, switching the LLM + TTS into a calm, grounded, lower-pitch de-escalation register.",
      uiSnippetTitle: "Escalation Turn (Redesigned)",
      uiSnippetLines: [
        "Multimodal Signal: Sarcasm / Frustration (Confidence 0.89)",
        "Prosody Directive: Calm, slower cadence, zero exclamation",
        "TTS Output: 'That's genuinely frustrating—let me fix that link right now.'",
      ],
    },
    rootCause:
      "Cascaded STT -> LLM -> TTS pipelines discard acoustic prosody before reasoning. When an angry user uses ironic positive words, the text-only LLM misclassifies intent and drives an inappropriately cheerful voice synthesis.",
    productFix:
      "Pass lightweight acoustic emotion/prosody tags (pitch variance, energy, speaking rate) from the audio front-end into the LLM turn context, and map detected frustration to a dedicated low-arousal TTS style preset.",
    impactMetric: "Lift post-call CSAT by +14 pts on escalations",
    impactDetail:
      "Eliminates the uncanny 'robotic cheerfulness' gap that triggers immediate 'speak to a human' requests.",
  },
];

export function getProductCompositeScore(product: ProductProfile): number {
  const values = Object.values(product.dimensionScores);
  const avg = values.reduce((acc, v) => acc + v, 0) / values.length;
  return Number(avg.toFixed(1));
}

export function generateExecutiveSummaryMarkdown(): string {
  const dateStr = "2026-11-25";
  const productRows = PRODUCTS.map((p) => {
    const composite = getProductCompositeScore(p);
    return `| **${p.name}** (${p.subtitle}) | ${p.headlineScores.usability.toFixed(1)}/10 | ${p.headlineScores.transparency.toFixed(1)}/10 | ${p.headlineScores.pricingTrust.toFixed(1)}/10 | **${composite.toFixed(1)}/10** |`;
  }).join("\n");

  const dimensionRows = DIMENSIONS.map((d) => {
    const n = PRODUCTS[0].dimensionScores[d.key].toFixed(1);
    const p = PRODUCTS[1].dimensionScores[d.key].toFixed(1);
    const e = PRODUCTS[2].dimensionScores[d.key].toFixed(1);
    return `| ${d.label} | ${n} | ${p} | ${e} |`;
  }).join("\n");

  const checklistSummary = PRODUCTS.map((p) => {
    const pass = CHECKLIST_ITEMS.filter((i) => i.results[p.id].status === "pass").length;
    const partial = CHECKLIST_ITEMS.filter((i) => i.results[p.id].status === "partial").length;
    const fail = CHECKLIST_ITEMS.filter((i) => i.results[p.id].status === "fail").length;
    return `- **${p.name}**: ${pass} Pass / ${partial} Partial / ${fail} Fail (out of 15 criteria)`;
  }).join("\n");

  const recommendations = WALKTHROUGH_ITEMS.map((w) => {
    const prod = PRODUCTS.find((p) => p.id === w.productId)?.name ?? w.productId;
    return `### ${prod} — ${w.title} (${w.severity})
- **Root Cause (User Research Lens):** ${w.rootCause}
- **Product / Prompt Fix (AI PM Lens):** ${w.productFix}
- **Expected Impact:** ${w.impactMetric} (${w.impactDetail})`;
  }).join("\n\n");

  return `# AI UX & Capability Teardown Lab — Executive Benchmark Summary
**Evaluation Date:** ${dateStr} | **Scope:** 3-Way Overseas AI Product Benchmark (Usability Friction, AI Capability Boundary & Cross-Cultural Trust)

## 1. Executive Scorecard
| Product | Usability Score | AI Transparency | Pricing Trust | 5-Dim Composite |
| :--- | :---: | :---: | :---: | :---: |
${productRows}

### Key Findings
- **Notion AI (7.2 / 4.5 / 3.8):** Deepest inline workflow integration, but suffers from severe enterprise trust erosion due to opaque credit burn, forced AUTO model routing, and sarcasm/dissent flattening in workspace summaries.
- **Perplexity Pro (8.9 / 8.6 / 8.2):** Category leader in time-to-value and citation transparency; primary gaps are cross-lingual citation-to-claim drift on niche non-English queries and lack of compliance-grade enterprise audit exports.
- **ElevenLabs (8.4 / 7.8 / 7.5):** Best-in-class baseline voice realism, but real-world global deployments hit turn-taking latency spikes on accented English / noisy audio and robotic emotional flattening ("AI-ness") during sarcastic customer escalations.

## 2. 5-Dimension Benchmark Matrix (0–10, higher is better)
| Dimension | Notion AI | Perplexity Pro | ElevenLabs |
| :--- | :---: | :---: | :---: |
${dimensionRows}

## 3. 15-Point Capability & UX Audit Tally
${checklistSummary}

## 4. Priority Redesign Recommendations (Before -> After)
${recommendations}
`;
}
