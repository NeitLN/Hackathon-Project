# 02 — FABLE ONE-SHOT HANDOFF

**Session:** the single planned Fable run. **Inputs:** `00_STATE.md` (stage confirmed `READY_FOR_SINGLE_FABLE_RUN`), `01_OPUS_COMPETITION_BRIEF.md`, workflow core rules / Hard Gates / scoring / Stage-2 sections. No web browsing performed; no brief facts required re-verification that would invalidate all candidates. Unresolved U4 (deadline), U5 (team), U6 (pool eligibility) are carried as constraints, not assumed away.

---

## A. The competitive opening

- The crowd will build what the organizers pointed at: credential cNFTs, campus loyalty points, tax calculators, "warn-before-you-sign" banners, freelancer gateways (brief §5). These share one weakness: **the chain observes but never decides**. Their Explorer proof is a badge mint.
- Both official rubrics price exactly that weakness: Rubric A-TB gives 50% to depth+architecture; Rubric B gives 15% to "why the token/on-chain proof is justified".
- **The opening: concepts where the on-chain program is the *enforcer* — where the demo's climax is the chain saying NO to a human or an AI trying to cheat.** A refusal is more memorable than a confirmation, and no Web2 stack can refuse its own operator.
- Second opening: AI and Solana made *mutually* necessary — AI as the fallible/creative actor, Solana as the incorruptible boundary. Sponsor Minds (AI agents) has no crowded concept lane yet (brief §4).
- Vietnamese cultural specificity (hụi, chợ, scam fear) beats generic global clones for memorability with a Vietnamese-speaking judge panel.

---

## B. Five candidate concepts

### C1 — MANDATE (Dây Cương)
**Slogan:** *"Agent có thể bị dụ. Ví của nó thì không."* — Your agent can be fooled; its wallet can't.
**Value prop:** A Solana policy-wallet that lets anyone hand real spending power to an AI agent with mathematically enforced limits, allowlists and a kill-switch the agent cannot talk its way past.
**Problem/user:** People and small teams (Pool 03 lane) want agents that buy APIs/data/services autonomously, but one prompt injection turns an agent into a drainer. Urgent pain: you cannot delegate money to something gullible.
**Existing solutions insufficient:** API-key budgets and server-side rules run *in the same runtime the attacker prompts*; x402 gives agents a way to pay, not a way to be bounded.
**AI role (core):** the agent *is* the user — it negotiates, selects services, pays via x402-style USDC flows, and writes a machine-readable justification for each spend; a second AI layer classifies spend intent against policy. Remove AI → there is no autonomous spender → no product. 
**Solana role (core):** policy lives in a program (PDA: caps, rate limits, allowlist, human co-sign threshold, kill-switch). Validators enforce it; the agent's compromised runtime is irrelevant. Every allowed/refused spend is Explorer-auditable.
**Web2 Replacement Test:** **survives.** A Web2 policy engine sits in the blast radius of the injected agent; the chain does not.
**MVP flow:** owner sets policy in plain Vietnamese → AI compiles to on-chain params → agent completes a real paid task on Devnet (buys an API call) → owner dashboard shows spend + justification + Explorer link.
**Real state changes in demo:** policy PDA creation; successful USDC Devnet transfer; **a rejected transaction** visible on Explorer.
**Wow moment:** a judge reads a prompt-injection aloud; the agent audibly *agrees* to drain the wallet, attempts it, and the program refuses on-chain, live. "The AI fell for it. The wallet didn't."
**Distinctiveness:** Pool 03 lists "policy-based agent wallet" as a bullet, but the *injection-proof refusal as theatre* + Vietnamese-language policy authoring + justification receipts is not among the 80 ideas. Hard to copy in-hackathon (Anchor + agent loop + x402 plumbing).
**Fit:** Track 2 (Technical Build), theme AI × Web3. Solana Foundation (program depth, composability) + Minds (agent narrative) + MEXC (SaaS for agent operators).
**Risks:** Rust/Anchor depth (**gated by U5**); x402 ecosystem maturity; demo complexity → mitigate with scripted agent task. Legal: none domestic (global dev market). Duplication: **Low.**
**Gates:** G1 PASS · G2 PASS · G3 PASS · G4 PASS (conditional on U5 — one competent Anchor dev) · G5 PASS.

### C2 — BÙA (Amulet)
**Slogan:** *"Scam gõ cửa. Bùa đóng cửa."* — Scams knock; Bùa bolts the door.
**Value prop:** A Vietnamese-language guardian for new crypto users: AI simulates every transaction and explains its real consequence in plain Vietnamese; a Solana guardian program co-signs — or refuses — so even a phished user on a compromised device cannot be drained.
**Problem/user:** Millions of newcomers onboarding via licensed exchanges from 2026; scammers' #1 target (Pool 09). Pain: one wrong signature = life savings gone; no Vietnamese protection layer exists.
**Existing insufficient:** Blowfish/Blockaid-style warnings are English, advisory, and click-through-able. A warning you can ignore is not protection.
**AI role (core):** transaction simulation → consequence narration in Vietnamese ("this gives a stranger permanent control of all your USDC"); zero-day scam-pattern classification beyond static blocklists. Remove AI → static blocklist, which already exists → product collapses.
**Solana role (core):** protection is a 2-of-2 guardian program + social-recovery PDA, not a UI banner. The refusal is enforced at the validator, so malware on the user's phone cannot override it.
**Web2 Replacement Test:** **survives** for the enforcement layer (a Web2 co-signer is a custodian = trust re-introduced + licensing exposure); the warning layer alone would fail — hence enforcement is the product.
**MVP flow:** onboard test wallet → guardian attached → user receives a real drainer tx on Devnet → AI explains → guardian refuses → legit payment passes seconds later.
**Real state changes:** guardian PDA setup; refused malicious tx; approved clean tx — all on Explorer.
**Wow moment:** live drainer blocked on stage, narrated by the AI in Vietnamese ("blocking a scam on stage is extremely convincing" — the organizers' own words, brief §6).
**Distinctiveness:** the 80 ideas list "explain before sign" and "social recovery" separately; fusing explanation + on-chain refusal + recovery into one consumer story is the unclaimed middle. Duplication of the *obvious* warning variant: **High**; of this enforcement variant: **Medium.**
**Fit:** Track 1 (P&B) or 2 — declare Track 1, theme Consumer dApps. B2B API for wallets/exchanges + freemium (MEXC story), real Solana program (Solana story).
**Risks:** false-positive liability (disclaimers day one); threat-DB freshness; simulating enough scam classes in time. Duplication risk as noted.
**Gates:** G1 PASS · G2 PASS · G3 PASS · G4 PASS · G5 PASS.

### C3 — HỤI MINH
**Slogan:** *"Hụi ngàn đời — lần đầu không thể giật."* — The age-old hụi, for the first time impossible to steal.
**Value prop:** Vietnam's rotating savings circles (hụi/họ) run by a smart contract instead of a trusted organizer, with an AI that turns aunties' plain-Vietnamese rules into on-chain terms and explains every đồng.
**Problem/user:** Hụi is a massive informal institution and "giật hụi" (organizer absconding) is a recurring national news story; students, families, clubs all run pooled funds on trust and Excel. Pain: the entire institution depends on one person not running away.
**Existing insufficient:** banking apps don't do multi-party conditional pots; Web2 hụi apps still have an operator who holds the money — the exact failure being solved.
**AI role (core):** natural-language circle authoring ("10 người, 2 triệu/tháng, trễ 3 ngày phạt 2%") → contract parameters; anomaly/risk detection on member behavior; plain-Vietnamese explainer of what the contract will and won't allow. This is what makes contracts usable by non-crypto users — flagged honestly as the weakest AI-necessity of the Top 3 for Opus to audit.
**Solana role (core):** the pot is held and disbursed by a program; rotation order, penalties and payouts are public state. **Nobody is the trusted holder** — the chủ hụi role is abolished, not digitized.
**Web2 Replacement Test:** **survives.** Any Web2 version re-creates the custodian; custody of members' money is also a licensing problem a contract-held simulated pot avoids.
**MVP flow:** create circle in Vietnamese → members join with test wallets → contributions in → round winner auto-paid → an "organizer" attempts an early withdrawal and is refused.
**Real state changes:** circle PDA; N contribution txs; auto-disbursement; refused theft attempt — Explorer-visible.
**Wow moment:** five phones on stage run a full hụi round in 90 seconds; then the organizer tries to grab the pot and *the chain says no*. Every Vietnamese judge knows someone burned by hụi.
**Distinctiveness:** Pool 10 lists "goal-based group savings" and "club treasuries" — nobody names **hụi**, the culturally exact instrument. The framing is un-copyable in a weekend because it is product-cultural, not technical.
**Fit:** Track 1 (P&B), theme Consumer dApps (blockchain hidden behind a familiar ritual); DeFi & Digital Asset also viable. MEXC: clear fee-per-circle model; Solana: real program logic (PDA state machine, scheduled payouts).
**Risks:** legal red line proximity (keep closed-group, Devnet, simulated assets, zero yield language — the brief's academic-safety rules); Gate-2 softness; auntie-onboarding friction (mitigate: students first). Duplication: **Medium** (savings-circle variants likely; hụi framing likely unique).
**Gates:** G1 PASS · G2 PASS (soft — see above) · G3 PASS · G4 PASS · G5 PASS.

### C4 — NGUỒN
**Slogan:** *"Prove the making, not just the made."*
**Value prop:** A creation-provenance trail for the AI-homework era: the editing *process* of student/creator work is fingerprinted as it happens and anchored on-chain, so originality claims become verifiable instead of arguable.
**Problem/user:** universities (UEF!) can no longer tell authored work from generated work; students can no longer *prove* honesty. **AI role:** contribution analysis, human-vs-AI segmentation, summary of process. **Solana role:** append-only timeline the author cannot backdate.
**Web2 Replacement Test:** **FAILS.** The verifier (the university) is already the trusted party; a university-signed timestamp log delivers ~90% of the value without a chain. The chain adds portability across institutions — real, but not load-bearing at MVP scale. Gate 3 honesty > cleverness.
**Other fields (abridged given ineligibility):** demo = forged essay fails verification live (good, not great — a database demo could look identical, which is precisely the Gate-3 problem). Fit: Open Campus affinity, Education 5%. Duplication: **High** (credential-adjacent, capstone tracks A/C/F). Risks: solution-seeking-problem; needs committed issuer.
**Gates:** G1 PASS · G2 PASS · **G3 FAIL** · G4 PASS · G5 PASS → **ineligible for Top 3.**

### C5 — GIÁ CHỢ
**Slogan:** *"Ngàn chiếc điện thoại. Một bảng giá thật."* — A thousand phones, one true price board.
**Value prop:** A campus-scoped DePIN where students photograph wet-market/canteen/fuel prices, AI verifies the submissions, contributors get instant on-chain micro-rewards, and F&B businesses buy the only fresh hyperlocal price feed in Vietnam.
**Problem/user:** businesses lack trustworthy hyperlocal price data (Big Tech doesn't cover chợ); contributors need instant, auditable micro-payouts. 
**AI role (core):** photo/price plausibility + fraud detection — the pool itself calls anti-fraud the make-or-break; without AI the network drowns in farming.
**Solana role (core):** instant micro-settlement to hundreds of small contributors + public contribution/reward accounting that buyers can audit.
**Web2 Replacement Test:** **survives, narrowly.** Voucher points in a DB could pay contributors; what a DB can't give buyers is an auditable, tamper-evident contribution ledger backing feed quality. Weaker than C1–C3's necessity.
**MVP flow:** submit price photo → AI verdict → USDC Devnet reward lands → buyer dashboard updates a live price map.
**Real state changes:** reward transfers per accepted submission; slashing/reject events; Explorer-auditable payout log.
**Wow moment:** a judge photographs a price card at the Expo booth; reward lands on Explorer before they sit down.
**Distinctiveness:** Pool 06 lists a "smartphone price-data network" bullet → duplication **Medium**; campus scoping + AI-fraud emphasis differentiates partially.
**Fit:** Track 2, Consumer dApps / AI × Web3; Colosseum's most-decorated category (judge affinity).
**Risks:** two-sided cold start (no real buyer by Demo Day = the fatal Q&A question); reward farming; rewards must stay non-speculative (vouchers/USDC-test) for academic safety.
**Gates:** G1 PASS · G2 PASS · G3 PASS (narrow) · G4 PASS · G5 PASS.

---

## C. Hard Gates summary

| Gate | C1 MANDATE | C2 BÙA | C3 HỤI MINH | C4 NGUỒN | C5 GIÁ CHỢ |
|---|---|---|---|---|---|
| G1 Competition fit | PASS | PASS | PASS | PASS | PASS |
| G2 AI necessity | PASS | PASS | PASS (soft) | PASS | PASS |
| G3 Web3 necessity | PASS | PASS | PASS | **FAIL** | PASS (narrow) |
| G4 Demonstrable MVP | PASS* | PASS | PASS | PASS | PASS |
| G5 Judge memorability | PASS | PASS | PASS | PASS | PASS |
| **Eligible for Top 3** | YES | YES | YES | **NO** | YES |

\* C1's G4 is conditional on U5 (≥1 solid Anchor/Rust dev). It does not depend *entirely* on U5 — a scoped Anchor program with pre-built policy checks is junior-feasible — but Opus must verify before freezing.

## D. Scoring — primary rubric (Rubric A, per declared track)

0–10 per criterion × official weights (brief §3.3-A). Declared tracks: C1, C5 = Technical Build; C2, C3, C4 = Product & Business.

| Concept | Cr.1 | Cr.2 | Cr.3 | Cr.4 | **Total /100** | Largest deductions |
|---|---|---|---|---|---|---|
| **C1 MANDATE** (TB: depth 30/arch 25/solana 25/demo 20) | 9→27 | 8→20 | 9→22.5 | 8→16 | **85.5** | Demo has many moving parts (agent loop + chain) → stage-failure risk; architecture unproven until U5 resolved |
| **C3 HỤI MINH** (P&B: problem 25/demo 30/biz 25/present 20) | 9→22.5 | 8→24 | 7.5→18.75 | 9→18 | **83.25** | Business model modest (per-circle fees); AI necessity softest of Top 3 |
| **C2 BÙA** (P&B) | 9→22.5 | 8→24 | 7→17.5 | 8→16 | **80** | Monetization vaguer (B2B API is pre-revenue); crowded security lane blurs differentiation in a 4-minute pitch |
| **C5 GIÁ CHỢ** (TB) | 7→21 | 7→17.5 | 8→20 | 8→16 | **74.5** | Technical depth modest (transfers + oracle, little program logic); no provable buyer by Demo Day |
| **C4 NGUỒN** (P&B) | 8→20 | 6→18 | 6→15 | 8→16 | **69** | Gate-3 failure is the story: demo indistinguishable from a database product |

**Sensitivity check — Rubric B (100-pt capstone: Solana 20 / DigitalAsset 15 / AI 15 / Tech 10 / UX 10 / GTM 10 / Problem 10 / Edu 5 / Pitch 5):** C1 gains (Solana+AI = 35% both maximal) → stays **#1**. C2 gains on AI/Solana, C3 loses a little (AI softer, Solana simpler) → **#2 and #3 swap under Rubric B** (C2 ≈ 82, C3 ≈ 79). C5 and C4 stay #4/#5. **Conclusion: the top choice is rubric-robust; the 2/3 order depends on which rubric governs (open U2) — Opus should treat C2 vs C3 as track-strategy dependent, not quality dependent.**

---

## E. Top 3 refinement

### 🥇 C1 — MANDATE
| Field | Content |
|---|---|
| Names | **MANDATE**; backups: *Dây Cương* (VN: "the reins"), *KeeperKey* |
| Slogan | "Agent có thể bị dụ. Ví của nó thì không." |
| Core insight | Agent autonomy is limited by trust, not capability — people won't delegate money to something that can be sweet-talked. Make the boundary incorruptible and delegation becomes safe. |
| UVP | The only wallet an AI agent can hold that its owner never has to worry about. |
| Before → after | Before: agent with an API key = your card in a stranger's phone. After: agent with a Mandate = an intern with exact-change and a receipt for every đồng. |
| AI necessity | The autonomous spender *is* AI; intent classification + justification receipts are AI. No AI → no product. |
| Solana necessity | Enforcement outside the attackable runtime; validator-level refusal; public audit trail of an autonomous economy. |
| vs Web2 | Any Web2 policy engine can be reached by the same injection that owns the agent. The program cannot be prompted. |
| Minimal demo journey | (1) Speak policy in Vietnamese → (2) AI compiles to PDA → (3) agent buys a real API call on Devnet → (4) judge injects malicious instruction → (5) chain refuses → Explorer proof. |
| Earliest wow | Minute 2: the refusal. |
| 30-sec pitch | "AI agents are the internet's newest users — with no credit cards and no self-control. Mandate gives your agent a Solana wallet with rules it physically cannot break: caps, allowlists, a kill-switch. Watch: we just tricked our own agent into draining itself — and the chain said no. Agents do the work; Mandate keeps the money." |
| Must-have evidence | Live Devnet spend + live on-chain refusal + both on Explorer. No mocked chain calls. |
| Cut | x402 marketplace ambitions, multi-agent fleets, mainnet anything, browser extension — one agent, one policy, one refusal. |
| Opus must verify | U5 (Anchor capability); x402/agent-payment plumbing effort on Devnet; whether refusal can be made *visually legible* in ≤10s; U4 runway. |
| Wins if | Technical Build judges see the deepest program logic in the room fused with the clearest one-line story. |
| Loses if | Team can't ship the Anchor program (U5) or the live agent flakes on stage without a rehearsed fallback. |

### 🥈 C3 — HỤI MINH
| Field | Content |
|---|---|
| Names | **HỤI MINH**; backups: *HụiChain*, *Minh Hụi* |
| Slogan | "Hụi ngàn đời — lần đầu không thể giật." |
| Core insight | Vietnam already runs a giant peer-finance network on pure social trust; its only failure mode is the trusted human. Remove the human, keep the ritual. |
| UVP | Hụi exactly as your mother knows it — minus the person who can run away with it. |
| Before → after | Before: chủ hụi's notebook, prayers, news stories about giật hụi. After: the pot is code, the order is public, the payout is automatic. |
| AI necessity | Vietnamese natural-language → contract terms; risk anomaly alerts; plain-language explanation of every rule. (Softest of the three — Opus audit.) |
| Solana necessity | Custody without a custodian: multi-party conditional pot no participant controls. |
| vs Web2 | A Web2 hụi app is a chủ hụi with a server — same theft surface, plus money-holding licensing exposure. |
| Minimal demo journey | (1) Author circle in Vietnamese → (2) 5 wallets join → (3) contributions land → (4) winner auto-paid → (5) organizer's theft attempt refused. |
| Earliest wow | Minute 1: five phones, real txs, live pot. Climax minute 3: the refused theft. |
| 30-sec pitch | "Every Vietnamese family knows hụi — and every Vietnamese family knows someone whose hụi was stolen. Hụi Minh keeps the tradition and deletes the risk: the pot lives in a Solana contract, the rules are written by speaking Vietnamese, and no one — not even us — can touch the money out of turn. Watch a full round happen in 90 seconds." |
| Must-have evidence | Full contribution→disbursement cycle on Devnet + refused early-withdrawal, Explorer-verifiable; 20-student savings-behavior survey (the P&B market memo). |
| Cut | Yield/interest anything (legal), open public circles, credit scoring, fiat ramps — closed groups, simulated assets only. |
| Opus must verify | Gate-2 depth (is the AI layer core or garnish? consider AI dispute-mediator to harden); legal framing vs academic-safety rules; scheduled-payout mechanics on Devnet. |
| Wins if | P&B judges reward the sharpest problem-market-culture fit in the room + a flawless live ritual. |
| Loses if | Judges read it as "another savings dApp" because the hụi framing wasn't carried by the pitch, or AI necessity gets punctured in Q&A. |

### 🥉 C2 — BÙA
| Field | Content |
|---|---|
| Names | **BÙA**; backups: *Khiên* ("shield"), *GuardianVN* |
| Slogan | "Scam gõ cửa. Bùa đóng cửa." |
| Core insight | Warnings fail because they ask a frightened novice to make an expert decision; protection must be enforced, not suggested. |
| UVP | The first Vietnamese-language wallet guardian that refuses scams instead of describing them. |
| Before → after | Before: grandma clicks "confirm" on a drainer she can't read. After: the drainer arrives, Bùa narrates it in Vietnamese, and it dies at the co-signer. |
| AI necessity | Consequence simulation + narration in Vietnamese + zero-day pattern classification; a blocklist alone is the status quo. |
| Solana necessity | 2-of-2 guardian program: refusal at validator level; social recovery via PDA — protection that survives a fully compromised device. |
| vs Web2 | A Web2 co-signer is a custodian (trust + license); a banner is advisory. Only an on-chain guardian is both non-custodial and binding. |
| Minimal demo journey | (1) Newcomer wallet + guardian → (2) drainer arrives → (3) AI explains in Vietnamese → (4) refusal on-chain → (5) legit tx passes in seconds. |
| Earliest wow | Minute 2: the live blocked drainer. |
| 30-sec pitch | "From 2026, licensed exchanges will onboard a million first-time Vietnamese crypto users — and scammers are waiting. Bùa is their amulet: an AI that explains every transaction in plain Vietnamese, and a Solana guardian that refuses the bad ones outright. We'll show you a real wallet-drainer stopped live on stage. Warnings inform. Bùa protects." |
| Must-have evidence | Real drainer tx refused on Devnet + clean tx approved + Vietnamese AI narration, all live; seed threat DB with real scam patterns. |
| Cut | Browser extension, multi-chain, audit services, scam-DB API business — one wallet, one guardian, one blocked drain. |
| Opus must verify | Differentiation vs the predictable wave of Pool-09 warning apps; simulation coverage feasible by U4; false-positive story for Q&A. |
| Wins if | Rubric B governs (AI+Solana 35%) and the stage demo lands — organizers themselves called this demo "extremely convincing". |
| Loses if | Three other teams show scam-warning demos first and judges pattern-match before the enforcement distinction registers. |

---

## F. Handoff verdicts

| Designation | Concept | Why |
|---|---|---|
| **Safest high placement** | **HỤI MINH** | Lowest technical risk of the Top 3, deepest cultural resonance, cleanest P&B rubric fit, demo nearly failure-proof |
| **Most breakthrough** | **MANDATE** | Rides the strongest funded narrative (Pool 03, "strongest narrative", ⭐), skill-gated lane with the least student competition, post-hackathon startup path is genuinely global |
| **Strongest live demo** | **MANDATE**, with **BÙA** a close second | An AI being fooled while its wallet holds firm is theatre no credential app can match; a blocked drainer is the organizer-endorsed crowd-pleaser |
| **Fable's non-binding recommendation** | **MANDATE if U5 confirms real Anchor capability; HỤI MINH otherwise.** BÙA is the swap-in if the team wants P&B track but Opus finds hụi's Gate-2 too soft. |

**Unresolved assumptions Opus must audit:** U5 first (it decides C1 vs C3); U4 runway (all three demos are scoped to ~2–3 weeks, but confirm); U6 (affects qualifier date only); U2 rubric governance (decides C2 vs C3 ordering); x402 Devnet plumbing effort (C1); legal framing review of C3 against academic-safety rules; C2 differentiation risk vs Pool-09 crowd.

**Cut first if time runs short (any finalist):** all dashboards beyond one screen; onboarding flows (pre-provisioned wallets); any second user persona; mainnet talk; token-economics slides.

**Skeptical judge questions to prepare:** "Why can't a database do this?" (each finalist's §vs-Web2 line is the answer — rehearse it); "Who pays, how much?" (C1: agent operators SaaS; C3: per-circle fee; C2: wallet/exchange API); "What if the AI is wrong?" (C1/C2: AI never has final authority — the program does); "Is this legal in Vietnam?" (C3: closed-group simulated assets, no yield; C1: no domestic payment exposure); "What's real in this demo?" (answer must be: everything on Explorer).

**Must run live, never mocked:** C1 — the refusal transaction; C3 — the full contribute→disburse cycle and the refused withdrawal; C2 — the blocked drainer. Everything else may be transparently simplified; these three moments must be on Devnet with Explorer proof or the concept's entire premise collapses.

---
*Fable session complete. Opus owns the final decision. No further Fable spend is planned or needed.*
