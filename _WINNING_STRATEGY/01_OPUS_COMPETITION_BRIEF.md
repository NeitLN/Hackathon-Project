# 01 — OPUS COMPETITION BRIEF (Stage 1)

**Competition:** UniHackfest 2026 — national Vietnamese student hackathon on Web3, AI and digital assets.
**Prepared by:** Opus, acting as Chief Hackathon Judge / Competition Researcher / Winning Strategist.
**Online sources accessed:** 12 August 2026 (Asia/Ho_Chi_Minh).
**Purpose:** compact, evidence-based input for exactly one cost-constrained Fable creative session. This file does **not** select a concept.

---

## 1. Executive summary

- **[FACT]** This is **not** a generic "AI × Web3/Bitcoin" hackathon. It is a **Solana-based** program sponsored by **Solana Foundation, MEXC Ventures and Minds**, organized by **Corelia Academy × UEF**, incubated by **Open Campus (EDU Chain)**. Bitcoin appears **nowhere** in any official source inspected.
- **[FACT]** Judging is **track-based**, with two tracks: *Best Product & Business* and *Best Technical Build*. There are **4 product themes**: RWA & Tokenization, Consumer dApps, DeFi & Digital Asset, **AI × Web3**.
- **[FACT]** The hard technical bar for the Technical Build track is explicit and low-ambiguity: **wallet connect + a Devnet transaction verifiable on Solana Explorer**, plus a public repo with real commit history and a 60–90s live-screen backup video.
- **[FACT]** The organizers published an **official Idea Pool of 10 pools / 80 example ideas** (updated Aug 2026), with **3 legal red lines** and a **5-criteria idea filter**. Anything a team builds is implicitly measured against this document, because judges and mentors read from it.
- **[INFERENCE]** The single highest-leverage strategic insight: the Idea Pool is *public*, *recommended-tagged*, and *very specific*. Pools 01, 02, 03 carry a "⭐ Recommended" badge. Therefore **duplication risk is concentrated exactly where the organizers pointed**, and the winning move is to take an organizer-blessed *territory* but attack it from an angle the 80 listed example ideas do not name.
- **[INFERENCE]** The rubric rewards **evidence over ambition**. Both published rubrics allocate ~30% to "solution + working demo" or "Solana integration + technical execution", and both track descriptions warn against mockups. A narrow, live, verifiable flow beats a broad simulated one.
- **[UNKNOWN — decision-relevant]** Final Demo Day date/venue conflict, total prize pool conflict (100M vs 115M VND), and which of the **two published rubrics** governs the national rounds. See §8.

---

## 2. Source inventory

### 2.1 Local project files (all read directly)

| File | Type | Status | Value |
|---|---|---|---|
| `Fable_Opus_Hackathon_Workflow_15USD.md` | Workflow spec | **Read in full** | Defines this staged process, gates, scoring model |
| `Thể lệ UniHackfest 2026.md` | Official rules (quick-reference, last updated 21/07/2026) | **Read in full** | Tracks, themes, rubric weights, prizes, submission rules, integrity rules |
| `Lịch học online, Mentor Workshop & Lộ trình vòng thi sau Unitour.md` | Official schedule/roadmap | **Read in full** | 5 courses, mentor workshops, qualification + final timing |
| `detail_program.pdf` (76.8 MB, slide deck) | Official program deck | **Text extracted in full** (diacritics mangled by extractor, content legible) | Sponsor profiles, 4 themes in depth, track criteria, prize table, badges, Academic Safety Assurance |

### 2.2 Official online sources (accessed 12 Aug 2026)

| Source | URL | Status |
|---|---|---|
| Official Idea Pool (EN) | `https://unihackfest.vn/idea-pools/` | **Accessed in full via browser** (10 pools, 80 ideas, red lines, filter, winner archive, suggestion matrix) |
| Learning Track / Capstone docs | `https://docs.unihackfest.vn` | **Accessed in full** — sponsor track prizes, capstone layer requirements, 100-point capstone rubric, team composition |
| Comprehensive guide article | `https://unihackfest.vn/articles/unihackfest-2026-comprehensive-guide` (22 Jul 2026) | **Accessed in full** — registration, submission checklist, prize update |
| Official rules Google Doc | `docs.google.com/document/d/1gveC_I-KCVGpC9PP94D2TDx_vEP3TXbBHKY0dgvxw5M` | **NOT accessible** (fetcher returned header/nav only). Title matches the local `Thể lệ` file → **[INFERENCE]** local file mirrors it |
| Schedule Google Doc | `docs.google.com/document/d/16oljHtigTgidk1Lz4IbRxOLjl1fSQV_8moXRTIdeDsY` | **Not opened** (local schedule file is the presumed mirror) |
| `unihackfest.vn/idea-pools/` via plain HTTP fetch | — | **403 Forbidden**; succeeded only through a real browser session |

**Not consulted (out of Stage 1 scope):** Luma events page, Corelia e-learning platform, Facebook/Telegram channels, `detail_program_en.pdf`.

---

## 3. Verified competition facts

### 3.1 Organizers, sponsors, incentives
**[FACT]** Organizer: Corelia Academy (Corelia Education Technology Co. Ltd, tax ID 3703446516) + **UEF**. Incubated by **Open Campus**. Sponsors: **MEXC Ventures, Solana Foundation, Minds** (personal-AI-agent platform, Animoca Brands ecosystem). Strategic partners: **Open Campus (EDU Chain), Olym3**. Coordinating unit: UNESCO-TESDICO. Program runs **June–September 2026** across **15+ universities**.

### 3.2 Structure
**[FACT]** Three filtering tiers: (1) campus qualifier *or* Open/"Vãng Lai" online qualifier via Zoom mid-Aug 2026 (5 min pitch + 2 min Q&A, max 8 teams advance); (2) **National Online Qualifier, late Aug 2026**, ~70 teams → 10–12 finalists + 25 extended prizes; sessions split by theme, ~18 teams/session, **7 min per team (4 pitch + 2 Q&A + 1 transition)**, presented **in Vietnamese**; (3) **Final Demo Day**, offline, 5 min pitch + 3 min Q&A on main stage **plus an Expo booth where judges use the live product** (Expo score folds into the product criterion).

**[FACT]** One team = **one track + one theme**. Max **one prize per team**. Free entry. **[FACT]** Recommended team: 5–6 people — Dev Lead, AI Engineer, Frontend/Product Engineer, Product Lead, Business/GTM Lead, optional Research/Ops.

### 3.3 Judging rubrics (two published, different)

**A. Rules-document rubric (per track, 0–10 × weight; ≥3 judges; high/low dropped if ≥5 judges)** — **[FACT]**

| Best Product & Business | % | Best Technical Build | % |
|---|--:|---|--:|
| Market problem + target-user clarity | 25 | Technical difficulty and depth | 30 |
| Solution, working demo, product experience | 30 | On-chain/off-chain architecture, smart-contract quality | 25 |
| Business model, revenue, GTM | 25 | Solana stack utilization, composability, performance | 25 |
| Presentation, persuasion, rebuttal | 20 | Demo completeness + presentation | 20 |

**B. Learning-Track/Capstone rubric on `docs.unihackfest.vn` (100 pts, judges from MEXC Ventures, Solana Foundation, OpenCampus)** — **[FACT]**
Solana Integration 20 · Digital Asset Design 15 · AI Integration 15 · Technical Execution 10 · Product Experience 10 · Market & GTM 10 · Problem Clarity 10 · Education/Community Impact 5 · Pitch Quality 5.

**[INFERENCE]** Rubric B is the *capstone/sponsor-prize* rubric; Rubric A governs the national rounds. **[ASSUMPTION for planning]** A concept should score well on **both**, since sponsor judges sit on the Demo Day panel. Rubric B is strategically informative because it explicitly prices **"why a token/credential/on-chain proof is justified" (15%)** and **AI (15%)** — i.e. the organizers themselves penalize decorative Web3.

### 3.4 Submission requirements — **[FACT]**
Live demo or Devnet link accessible (not video only) · public repo with genuine commit history · **mandatory** 60–90s backup demo video, screen-recorded live, no staged mockups · pitch deck submitted in advance · registration info (track, theme, members). Technical Build additionally: Devnet deployment / wallet connection / **Explorer transaction proof**.

### 3.5 Capstone product requirement — **[FACT]** (`docs.unihackfest.vn`)
Each team must cover **at least 3 of 5 layers**: Digital Asset · Solana · AI · Education · Business. Eight suggested capstone directions (A–H) all sit in the education/credential/campus-economy space.

### 3.6 Prizes — **[FACT + CONFLICT]**
Rules doc: **100,000,000 VND** total — 1st 12M ×2, 2nd 8M ×2, 3rd 5M ×2 (one per track); extended: 12 × Encouragement 2M, 8 × Special 2M, 5 × Community 2M (community prize by public online vote). Guide article (22 Jul 2026): **115,000,000 VND**. `docs.unihackfest.vn`: **$2,000 USDT MEXC + $2,000 USDT Solana Foundation = $4,000 USDT + merch + fast-track MEXC partnership intro**. On-chain certificates/badges via EDU Chain for all participants.

### 3.7 Legal and integrity constraints — **[FACT]**
- Crypto is **not** legal tender in Vietnam; "pay for coffee in crypto" flows are non-compliant.
- **Do not issue your own stablecoin**; fiat-backed stablecoins and tokenized securities sit outside the crypto-asset definition.
- **Do not operate an exchange** (MoF license required; applications open 20 Jan 2026). Position as application layer / tech partner.
- Program-level: no exchange-signup QR/referral/affiliate content, no KYC/deposit/trading mini-games, no investment-solicitation language ("buy", "hold", "profit", "invest now"). **Technical demos must use testnet/devnet, simulated data, or test wallets.**
- Teams retain full IP. Staged/dishonest demos are penalized or disqualified.
- Legal frame: Law on Digital Technology Industry effective 1 Jan 2026 (crypto assets = property); Resolution 05/2025 opens a 5-year licensed-exchange pilot.

### 3.8 Official idea-filter — **[FACT]**
Every idea should: (1) sit in a funded lane (AI × crypto, stablecoins & payments, RWA, revenue-generating consumer/tooling); (2) be legal under the 2026 framework; (3) ship a **14-week MVP on Solana Devnet** with Explorer-verifiable transactions; (4) have an identifiable paying customer; (5) have first customers interviewable within 4 weeks.

---

## 4. Judge and sponsor incentive analysis

| Actor | What they want | Strategic implication |
|---|---|---|
| **Solana Foundation** (judge + $2k track sponsor) | Real Devnet programs, PDAs, SPL/cNFT, composability, Explorer proof, ecosystem-useful primitives. **[FACT]** their rubric line is "Solana stack utilization, composability, performance" at 25% | On-chain logic must be *load-bearing*, not a hash-write. A PDA-based state machine beats an NFT mint. **[INFERENCE]** |
| **MEXC Ventures** (judge + $2k track sponsor) | Commercially viable digital-asset products, market sizing, GTM for VN/SEA, partnership pipeline. **[FACT]** offers "fast-track partnership intro" | Rewards a named paying customer and a defensible revenue line — but **[FACT]** program rules forbid any exchange-promotion framing, so never build *for* MEXC |
| **Minds** (sponsor, AI agents / Animoca) | **[FACT]** deck states Minds broadens the program's AI depth "especially in AI × Web3, Consumer dApps, product research" | **[INFERENCE]** an agentic-AI concept has a named sponsor with a reason to champion it — currently the least crowded sponsor affinity |
| **Open Campus / EDU Chain** (incubator, capstone judge) | Education on-chain, credentials, student ownership of learning data | **[INFERENCE]** an education/credential angle is a cheap scoring bonus (5% explicit) — but as a *layer*, not as the whole product |
| **UEF / Corelia / UNESCO-TESDICO** | Academic legitimacy, no speculation, employable student outcomes | **[INFERENCE]** anything smelling of trading, yield, or gambling is a scoring liability regardless of technical quality |
| **Panel composition** | **[FACT]** 5–7 judges at Demo Day, different from qualifier panel; includes non-technical business judges | **[INFERENCE]** the wow moment must be legible to a non-engineer in <60 seconds, while surviving an engineer's Q&A |

---

## 5. Competitor-pattern forecast — **[INFERENCE]**

Derived from the 80 published example ideas, the 8 suggested capstone tracks, the student audience, and the fact that C4 (Solana Dev) teaches wallet/SPL/cNFT/PDA to everyone.

**Very high duplication risk (expect 5–20 teams each):**
1. cNFT student credential / certificate verifier (Pool 05 + capstone tracks A, C, F — taught in-course, easiest possible build).
2. Campus loyalty / learn-to-earn SPL points app (capstone track B).
3. AI learning assistant + on-chain milestone NFT (capstone track C).
4. Crypto tax calculator / portfolio tracker in Vietnamese (Pool 02, ⭐, "Low–medium" difficulty — the single most attractive low-effort recommended pool).
5. Anti-scam "warn before you sign" wallet extension (Pool 09, first bullet, very quotable).
6. USDC freelancer invoice/payment gateway (Pool 01, ⭐, ranked first on the page).

**Medium duplication risk:** micro gold-accumulation app (Pool 04 bullet 1), group-savings smart contract (Pool 10 bullet 1), esports/fantasy consumer app (Pool 07).

**Low duplication risk (skill-gated):** x402 / agent-payment infrastructure (Pool 03, "High" difficulty), Solana devtools (Pool 08, "High", needs ≥2 Rust devs), DePIN with real hardware (Pool 06).

**Predicted failure modes of the crowd** — each is an opening:
- **Explorer-proof theatre:** a working app whose only on-chain act is minting a badge. Fails Gate 3 under any honest reading of the "Digital Asset Design 15%" criterion.
- **Bolt-on AI:** GPT wrapper labelled "AI assistant". Fails Gate 2.
- **Pitch-only RWA:** Pool 04 is officially flagged "highest legal risk … pitch story + simulated demo" — teams taking it will arrive with nothing live.
- **No paying customer:** "the community will use it" — explicitly named as a failure in the official filter.
- **Slow demos:** 4 minutes total at the qualifier. Any flow needing wallet install + faucet + confirmations on stage will die.

---

## 6. Idea Pool screening (all 10 official pools)

Official page: `https://unihackfest.vn/idea-pools/` (10 pools, 80 example ideas, updated Aug 2026, accessed 12 Aug 2026). Screening verdicts are Opus **[INFERENCE]**; track/difficulty/funding-signal labels are **[FACT]** from the page.

| # | Pool (official title) | Track / Difficulty / Signal | Demo-ability on stage | Duplication risk | Web2-replacement risk | Opus screening verdict |
|---|---|---|---|---|---|---|
| 01 ⭐ | Stablecoin payout for Vietnamese freelancers | Both / Medium / Very strong | High — QR + payment link is visual | **High** | Medium — escrow/streaming variants are genuinely on-chain | **Advance** (only via escrow/streaming/factoring angles, not "another gateway") |
| 02 ⭐ | Tax & compliance tools for the licensed-exchange era | Both / Low–med / Strong (VN-specific) | Medium — dashboards don't move | **Very high** | **High** — a CSV importer is pure Web2 | **Advance only as a component**, not as the product |
| 03 ⭐ | AI agent commerce & x402 tooling on Solana | Technical Build / High / Strongest narrative | **Very high** — "the AI pays for itself" | **Low** | **Very low** — machine-speed micropayments have no Web2 equal | **Advance — highest-priority territory** |
| 04 | RWA application layer: Vietnamese gold & savings | Product & Business / Medium / Strong | Low — organizers themselves say simulated | Medium | Medium | **Hold** — officially flagged highest legal risk; weak live proof |
| 05 | Verifiable credentials & talent infrastructure | Both / Low–med / **Medium** | Medium | **Very high** | High — a signed PDF/DB does most of it | **Advance only as a supporting layer** (Open Campus affinity) |
| 06 | Consumer × DePIN: community data & infrastructure | Technical Build / Med–high / Strong | High — physical contribution → reward | Low–medium | Low — contributor payouts + provenance are natively on-chain | **Advance** (scoped to one data type, one campus) |
| 07 | Consumer & digital entertainment apps | Both / Medium / Medium–strong | High | Medium | High — most games need no chain | **Hold** unless ownership/escrow is the mechanic |
| 08 | Developer tooling & infrastructure | Technical Build / High / Very strong with judges | **Low for non-technical judges** (page says so) | Low | Low | **Advance** — pair with a visual artifact to fix the demo weakness |
| 09 | Security, privacy & anti-scam | Both / Med–high / Strong | **Very high** — "blocking a scam live" | High (the obvious variants) | Medium–high for pure detection; low for on-chain policy enforcement | **Advance** via *enforcement*, not *warning* |
| 10 | On-chain personal finance | Both / Medium / Strong | High — a group fund auto-disbursing | Medium | Medium — escrowed multi-party pots are hard in Web2 | **Advance** (closed-group, simulated assets, never yield) |

**Also on the page (context, not ideas):** a Solana winner archive (STEPN, Dialect, Ore, Reflect, TapeDrive, Unruggable, CrowdBrain, Seer, IDL Space, CargoBill, MCPay/Latinum, Vanish, Yumi…), 6 tactics for original ideas, a team-profile → pool suggestion matrix, and 4 cross-pool principles (market memo first; legal fluency is an advantage; one complete flow > five unfinished features; plan for "week 15" from week 1).

---

## 7. Eight opportunity territories for Fable

These are **territories, not concepts**. Fable must invent the actual products. No territory below is a verbatim copy of any of the 80 published example ideas.

**T1 — Programmable spending authority for AI agents.**
*User:* a person or small team letting an AI agent act with money/resources. *Why it matters:* agents are gaining autonomy faster than anyone's ability to bound them; the failure mode is unbounded spend. *AI:* the agent is the actor and the risk source; AI also classifies intent and justifies each spend. *Web3:* a PDA-enforced policy (caps, allowlist, rate limit, kill-switch) is a rule the agent **cannot** talk its way past — enforcement, not a suggestion. *Web2 risk:* **very low** — a server-side rule is one prompt-injection away from bypass; on-chain it is not. *Demo:* agent spends, then is refused mid-demo, with the refusal visible on Explorer. *Fit:* Track 2, theme AI × Web3; Solana Foundation + Minds. *Duplication:* **low** (Pool 03 is "High" difficulty). *Risks:* x402 integration depth, foreign-first GTM, Rust complexity.

**T2 — Machine-payable Vietnamese data/service endpoints.**
*User:* Vietnamese devs/institutions holding local data (prices, regulations, place data) with no way to sell it in small units. *Pain:* per-call billing to non-human buyers is impossible with cards/invoices. *AI:* agents are the buyers; AI does quality scoring and packaging. *Web3:* per-call USDC settlement + on-chain usage receipts. *Web2 risk:* low at micro-amounts. *Demo:* an agent buys three calls live; the seller's revenue counter ticks. *Fit:* Track 2 / AI × Web3; MEXC (revenue model), Solana. *Duplication:* low. *Risks:* early market, two-sided cold start, needs a real dataset by Demo Day.

**T3 — Signature-time consequence enforcement (not warnings).**
*User:* newcomers onboarded by licensed exchanges from 2026. *Pain:* Vietnamese-language scam losses; warnings get clicked through. *AI:* simulates a transaction and explains its actual consequence in Vietnamese; classifies novel scam patterns. *Web3:* the protective layer is itself on-chain policy (co-signer / guardian program), so a compromised device cannot override it. *Web2 risk:* high for a warning banner, **low** for on-chain co-signing. *Demo:* a live drainer transaction blocked on stage. *Fit:* both tracks; theme Consumer dApps or AI × Web3. *Duplication:* **high for the obvious version** — Fable must differentiate on enforcement + social recovery. *Risks:* false-positive liability, threat-DB freshness, disclaimers required.

**T4 — Verifiable provenance for AI-generated work.**
*User:* students, creators, universities facing "was this AI-made, and by whom?" *Pain:* credential and coursework integrity collapses when output is indistinguishable; the program itself issues on-chain credentials. *AI:* generation + contribution analysis. *Web3:* an append-only, third-party-verifiable attestation trail the author cannot backdate. *Web2 risk:* medium — a trusted DB works *if* you trust the issuer; the point is not trusting it. *Demo:* verify a real artifact live; then show a forged one failing. *Fit:* both tracks; Open Campus/EDU Chain affinity, Education layer 5%. *Duplication:* **high** if framed as "credential NFT" — must be framed as provenance of *work*, not of *courses*. *Risks:* solution-looking-for-problem; needs a committed issuer.

**T5 — Multi-party escrowed commitments for small Vietnamese groups.**
*User:* student clubs, class treasuries, friend savings circles, small cooperatives. *Pain:* treasurer distrust is a real, daily, universally recognized Vietnamese pain. *AI:* natural-language rule authoring, anomaly detection, plain-Vietnamese explanation of what the contract will do. *Web3:* the pot is held by code, disbursement is conditional and public — nobody can be the trusted holder. *Web2 risk:* medium — Web2 can hold money but cannot remove the trusted party. *Demo:* a 5-person fund hits its goal and auto-disburses on stage. *Fit:* both tracks; DeFi & Digital Asset or Consumer dApps. *Duplication:* medium (Pool 10 bullet 1 is explicit). *Risks:* **legal red line** — must stay closed-group, simulated assets, no yield, no lending, no fundraising language.

**T6 — Contribution-metered community data networks (campus-scoped DePIN).**
*User:* students/residents holding smartphones; buyers are businesses needing hyperlocal data Big Tech lacks. *Pain:* local data is expensive to collect and impossible to trust. *AI:* fraud detection on submissions (the make-or-break), plus normalization. *Web3:* transparent contribution accounting and instant micro-rewards to thousands of small contributors. *Web2 risk:* medium — the reward rail and auditability are the on-chain part. *Demo:* physical act → verified → reward lands, all in <60s. *Fit:* Track 2, Consumer dApps; Colosseum's most-decorated category. *Duplication:* low–medium. *Risks:* farming/fraud, two-sided cold start, must ship non-speculative rewards (vouchers) to stay inside academic-safety rules.

**T7 — Instrumentation for Solana builders, with a visible artifact.**
*User:* Solana developers (global, pays, reachable free through open communities). *Pain:* debugging, testing, monitoring gaps; Vietnamese-language onboarding is nonexistent. *AI:* explains failures, generates test cases, classifies transactions. *Web3:* the subject matter *is* the chain; zero Vietnamese legal exposure. *Web2 risk:* low. *Demo:* **the page itself warns devtools rarely wow non-technical judges** — the required innovation is a legible visual artifact (e.g. a live failure/latency wall) plus 5–10 real external users. *Fit:* Track 2; Solana Foundation's clearest affinity. *Duplication:* low. *Risks:* needs ≥2 strong Rust devs; judge legibility.

**T8 — Conditional cross-border payout rails for Vietnamese earners.**
*User:* freelancers and outsourcing agencies paid by international clients. *Pain:* 3–7% fees, multi-day waits, fragmented reporting. *AI:* invoice/deliverable parsing, acceptance evidence, tax-report generation. *Web3:* milestone escrow / streaming release — payment logic neither party controls. *Web2 risk:* **high for a plain gateway, low for escrow**. *Demo:* deliverable accepted → escrow releases → Explorer confirms in seconds. *Fit:* both tracks; MEXC affinity, RWA/DeFi themes. *Duplication:* **high** — Pool 01 is the page's headline pool. *Risks:* off-ramp legal boundary — must be positioned as income *management*, never a domestic payment gateway.

**Cross-cutting instruction to Fable:** the officially recommended pools (01, 02) are also the most crowded. Distinctiveness must come from the *mechanism* (what the chain is forced to enforce), not from the *sector*.

---

## 8. Open questions and unknowns

| # | Unknown | Why it matters | Resolution path |
|---|---|---|---|
| U1 | **Final Demo Day: 26/9/2026 at SIHUB (rules doc) vs 23/09/2026 at UEF (schedule doc)** | Build deadline | Confirm with BTC; treat **23/09/2026** as the conservative planning date |
| U2 | **Which rubric governs national rounds** — per-track (A) or 100-point capstone (B) | Changes weighting of AI vs GTM vs Solana | Ask BTC; design to satisfy both |
| U3 | Total prize pool: 100M VND (rules) vs 115M VND (article, 22 Jul) | Low decision impact | Non-blocking |
| U4 | Exact submission deadline for the late-Aug qualifier; registration reportedly open "to end of August" | Determines real build time — possibly **<3 weeks from 12 Aug 2026** | **Blocking for Stage 3 roadmap** — confirm immediately |
| U5 | Team status: does the user have a team, and does it meet the 5–6 person Dev/Non-Dev composition? | Gates T1/T7 (Rust-heavy) entirely | User must answer before Stage 3 |
| U6 | Partner-school vs Open ("Vãng Lai") pool for this user | Different qualifier date (mid-Aug vs late-Aug) and format | User must confirm |
| U7 | Whether the "14-week MVP" framing on the Idea Pool is compatible with a late-Aug qualifier | The Idea Pool assumes a 14-week runway that may already be gone | Scope must be sized to the *real* remaining time, not 14 weeks |
| U8 | Whether Minds / x402 tooling has any official integration support | Affects T1/T2 feasibility | Check mentor channels |
| U9 | Community-prize voting mechanism details | Secondary prize path (5 × 2M VND) | Non-blocking |

**Explicitly not established by any source: Bitcoin.** No official material mentions Bitcoin, Lightning, Ordinals, or BTC L2s. **[FACT]** The workflow file's "AI × Web3/Bitcoin" framing is generic; **the actual competition is Solana-only.** Fable must not propose Bitcoin-native concepts.

---

## 9. Direct source references

- `Thể lệ UniHackfest 2026.md` (local; official rules quick-reference, updated 21/07/2026) — tracks, themes, rubrics A, prizes, submission rules, integrity/academic-safety rules, Demo Day 26/9/2026 @ SIHUB.
- `Lịch học online, Mentor Workshop & Lộ trình vòng thi sau Unitour.md` (local) — 5 courses, mentor workshops, qualifier late Aug 2026, final 23/09/2026 @ UEF.
- `detail_program.pdf` (local, 76.8 MB) — sponsor profiles (MEXC Ventures, Solana Foundation, Minds, Open Campus, Olym3, UNESCO-TESDICO), 4 themes, 2 tracks, prize tables, badges, Academic Safety Assurance, partner-content control rules.
- `https://unihackfest.vn/idea-pools/` (accessed 12 Aug 2026) — 10 pools / 80 example ideas, 3 legal red lines, 5-criteria filter, Solana winner archive, suggestion matrix, 4 principles.
- `https://docs.unihackfest.vn` (accessed 12 Aug 2026) — sponsor track prizes ($2,000 USDT each), Technical Build requirements, capstone 3-of-5 layers, capstone tracks A–H, 100-point rubric B, team composition.
- `https://unihackfest.vn/articles/unihackfest-2026-comprehensive-guide` (22 Jul 2026; accessed 12 Aug 2026) — registration, submission checklist, 115M VND figure, 10–12 finalists.
- **Inaccessible:** official rules Google Doc (`1gveC_I-…`) — returned navigation chrome only. Schedule Google Doc (`16oljHtigTgidk1Lz4IbRxOLjl1fSQV_8moXRTIdeDsY`) — not opened.

---

*End of brief. No concept has been selected. Stage 2 (single Fable run) may now proceed.*
