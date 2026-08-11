# 05 — BUILD, DEMO AND PITCH PLAN: BÙA

*Concept and architecture: `04_WINNING_BLUEPRINT.md`. Decision rationale: `03_OPUS_FINAL_DECISION.md`. Not repeated here.*

> ⚠️ **CORRECTED BY STAGE 4.** Read `06_TECHNICAL_REALITY_CHECK.md` (architecture freeze) and `07_I0_TECHNICAL_SPIKE_SPEC.md` (the mandatory 3-hour spike) before executing this plan. Corrections applied throughout: **2-of-3** Squads topology (not 2-of-2), the demo is a **SAFE proposal + a RISKY proposal** (not a `skipPreflight` failed transaction), BÙA protects **only vault assets**, and **Solana RPC simulates — the AI interprets and explains.**

**Roles** (per the official recommended composition): **DEV** Dev Lead · **AI** AI Engineer · **FE** Frontend/Product Engineer · **PM** Product Lead · **GTM** Business/GTM Lead · **RES** Research/Ops. A smaller team merges FE→DEV and RES→GTM; the plan still holds.

**Governing rule:** the Must-have scope is **one complete verifiable flow — a blocked transaction and a permitted transaction, both on Explorer.** Everything else is upside. Integration starts in hour 3, not at the end.

---

## 1. Scope — MoSCoW

| | Scope | Completion criterion |
|---|---|---|
| **MUST** | Vietnamese UI + wallet connect (Devnet) | A user connects and sees a balance |
| **MUST** | Transaction simulation + instruction decoding | Balance deltas and decoded instructions printed for any unsigned tx |
| **MUST** | Deterministic rule tier (≥4 hard-block patterns) | Correct verdict on 4 crafted malicious txs |
| **MUST** | **Squads 2-of-3 vault** (threshold 2; guardian = Voter only; `config_authority = None`) + guardian signing service | Vault transactions require two approvals; on-chain read-back confirms config |
| **MUST** | **SAFE proposal executes + RISKY proposal rejected, both on Explorer** | Execution signature, rejection signature, and before/after vault balances in the README (`06_…` §5) |
| **MUST** | AI Vietnamese explanation, evidence-bound | Every displayed sentence maps to a simulation fact |
| **MUST** | Backup video 60–90s, live screen recording | File submitted |
| **MUST** | Public repo with genuine commit history, pitch deck | Submission form complete |
| **SHOULD** | Confidence → FRICTION tier | Low-confidence tx demands typed acknowledgement |
| **SHOULD** | Evaluation corpus + precision/recall/FP slide | Numbers on a slide, corpus in repo |
| **SHOULD** | Escape-timelock path demonstrated | Config visible; behaviour explained |
| **SHOULD** | 15–20 user interviews (market memo) | Written memo, quotes |
| **COULD** | Trustee social recovery | Working, or a recorded clip |
| **COULD** | Custom Anchor guardian program (replaces Squads) | Deployed to Devnet, program ID public |
| **COULD** | Safety-training module (simulated phishing → badge) | Open Campus tie-in |
| **WON'T** | Mobile app · browser extension · multi-chain · own token · DAO · mainnet · KYC · crowdsourced threat-DB UI · leaderboards · AI-agent integration | — |

**Real vs simulated in the demo** — *Real:* the RPC simulation, deterministic decoding, the AI verdict, the guardian's on-chain rejection, the SAFE execution, the vault balance change, Explorer links. *Transparently simplified (say so aloud):* pre-funded wallets and vault, seeded threat DB, recovery flow described rather than performed. *Never faked:* anything on Explorer, any number on a slide, and — per `06_…` §5 — never call the risky transfer "a failed on-chain transaction" unless I0 item 7 actually captured a signature and a confirmed program error.

---

## 2. Master plan — 72 hours

| Phase | Hours | Work (owner) | Checkpoint |
|---|---|---|---|
| **P0 Setup + I0 SPIKE** | 0–3 | Lock scope; register **Track 1 / Consumer dApps** (PM); repo (DEV); **run the I0 spike exactly as specified in `07_I0_TECHNICAL_SPIKE_SPEC.md`** (DEV) | **I0: all 8 spike items PASS**, `spike-evidence.md` written. **No UI work begins before this passes.** On failure apply the matching cut in `07_…` §3 |
| **P1 Parallel build** | 3–14 | Decoder + simulation service (DEV); deterministic rules (AI); Vietnamese UI shell + wallet connect (FE); craft 4 malicious + 4 benign txs (RES); begin 15–20 interviews (GTM) | **I1 (h14):** skeleton end-to-end — connect → build tx → simulate → deterministic verdict → Vietnamese display (hardcoded strings acceptable) |
| **P2 Enforcement** | 14–26 | Guardian signing service reading proposals **from chain** (DEV); policy engine with deterministic hard-deny tier (AI); SAFE path → guardian approves → execute; RISKY path → guardian submits on-chain `proposalReject`; vault funding flow (FE) | **I2 (h26) — MVP CHECKPOINT: SAFE proposal executed with a vault-balance change, RISKY proposal rejected on-chain with balance unchanged.** Must-have complete. If missed, invoke cut-scope C1 |
| **P3 AI layer** | 26–38 | Structured-output contract + `evidence_ref` validator (AI); Vietnamese narration (AI+PM); confidence→FRICTION (AI); corpus labelling (RES) | **I3 (h38):** AI verdicts live on ≥5 scripted txs; zero uncited sentences |
| **P4 Evidence** | 38–46 | Evaluation run → precision/recall/FP (AI+RES); threat-DB seed (RES); UI polish, Vietnamese copy review (FE+PM); market memo written (GTM) | **I4 (h46):** eval numbers exist and are on a slide |
| **P5 Hardening** | 46–54 | Failure-path testing: kill RPC, kill AI API, disconnect wallet, malformed tx, adversarial token names (DEV+AI); security checklist (§8); rehearse the full fallback ladder | **I5 (h54):** all four fallbacks demonstrated working |
| **P6 Package** | 54–62 | **Backup video** (60–90s, live screen recording, no staged mockups); README with Explorer links; deck built (PM+GTM); repo hygiene; submit early | **I6 (h62): CODE FREEZE.** No features after this point |
| **P7 Rehearse** | 62–70 | Pitch script memorised; **3 full timed run-throughs**; Q&A drilling against §10; demo-day machine rehearsal on the real network | **I7:** three consecutive clean runs inside the time limit |
| **P8 Buffer** | 70–72 | Sleep, contingency, final submission verification | Submission confirmed received |

**Cut-scope decision gates**
- **C1 — if I2 is not met by h30:** abandon the custom flow, use Squads UI to pre-configure the vault by hand, hard-code the two demo transactions, and spend the remaining time making the *block* and the *transfer* flawless. A perfect two-transaction demo beats a broken five-feature one.
- **C2 — if the AI layer is not stable by h42:** ship deterministic verdicts with **pre-generated** Vietnamese explanations for the scripted transactions, and state plainly on stage that the narration is cached. Never present cached output as live.
- **C3 — if evaluation is not done by h50:** drop the metrics slide entirely and say *"we have 8 hand-checked cases, not a benchmark."* **Never invent numbers.**

---

## 3. 48-hour plan (compression)

Same phase order, reduced targets. P0 0–2 · P1 2–10 (**I1 by h10**) · P2 10–20 (**I2 by h20**) · P3 20–28 (single narration path, **no** confidence tiering) · P4 28–33 (corpus of 30, not 60) · P5 33–38 · P6 38–43 (**freeze h43**) · P7 43–47 · P8 47–48.
**Dropped:** the recovery flow (explained verbally from the on-chain member list), safety-training module, custom Anchor program.

## 4. 24-hour plan (Tier-0, survives a bad answer to U5)

| Hours | Work | Gate |
|---|---|---|
| 0–1 | **Abbreviated I0** (`07_…` items 1, 2, 6, 7 only): Squads **2-of-3** vault created by hand in the Squads app, guardian = Voter only, `config_authority = None`; wallets funded; RPC + API keys | Vault live on Devnet with config read back and confirmed |
| 1–7 | Simulation + decoder + 4 deterministic rules; minimal Vietnamese UI (DEV+FE+AI in parallel) | Verdict printed for a crafted drainer |
| 7–12 | Guardian co-sign service; **blocked tx lands failed on Explorer; clean transfer succeeds** | **MVP CHECKPOINT — the whole competition rests here** |
| 12–16 | AI Vietnamese narration on 3 scripted transaction types, evidence-bound | Explanations displayed live |
| 16–19 | Failure-path testing + fallback ladder; 8 hand-checked cases (**not** presented as a benchmark) | Fallbacks work |
| 19–21 | Backup video, README with Explorer links, 8-slide deck, submit | Submitted |
| 21–24 | Three timed rehearsals + Q&A drill | Clean runs |

**Not built at 24h:** custom program, recovery, escape UI, FRICTION tier, evaluation corpus, training module. **Still delivered:** one complete, verifiable, honest end-to-end flow.

---

## 5. Dependencies

`Devnet RPC + funded wallets` → *everything*. `Simulation service` → `deterministic rules` → `guardian service` → **`I2`**. `Guardian service` → `AI layer` (AI consumes simulation output, so AI can be built in parallel against fixtures — **do not serialise it behind the chain work**). `I2` → backup video → submission. `Eval corpus` → metrics slide (droppable). **Critical path is I0 → I1 → I2. Protect it; everything else is negotiable.**

---

## 6. Prizes and sponsor technology

**Target, in order:** (1) **Track 1 — Best Product & Business, First Prize (12,000,000 VND)**; (2) **Giải Cộng Đồng** (community vote, 2M VND) — needs a shareable public demo link and a coordinated campus push from day one, cheap to pursue in parallel; (3) sponsor track prizes on `docs.unihackfest.vn` (**$2,000 USDT MEXC / $2,000 USDT Solana Foundation**) — **[UNKNOWN, U2]** whether these run alongside the main tracks; confirm with the organizers, do not assume.

**Sponsor technology that genuinely strengthens the product:** Solana Devnet, PDAs, CPI, SPL Token, **Squads v4** (audited enforcement primitive — composability is an explicit Rubric-A-TB criterion and a credibility asset), Solana Explorer as the proof surface, Claude for structured grounded output, and — honestly — **cNFT badges only if the safety-training module is actually built** (Open Campus tie).

**Do not add for sponsor appeasement:** an AI-agent integration (Minds) with no product reason; an issued token; a DAO; staking or yield of any kind; EDU Chain credentials bolted onto a security product; multi-chain support; NFT collectibles. Each costs build hours, dilutes the demo, and invites the Gate-3 question the project currently answers cleanly.

---

## 7. Pitch

### 30 seconds
> "From 2026, Vietnam's licensed exchanges will onboard millions of first-time crypto users — and every tool that protects them is in English and can be clicked away. Bùa is a protected vault on Solana. Your vault needs two of three approvals. In everyday use the second one is ours — and before we give it, the network simulates the transaction, we decode exactly what it does, and we explain it to you in plain Vietnamese. If it's a drainer, we simply don't vote, and it doesn't go through. We can't take your money — we can only vote. And we can't lock you out either: your own offline key is the third member, so you can always get out without us. Warnings inform. Bùa protects."

### 4-minute script (qualifier: 4 pitch + 2 Q&A). Demo Day: expand §3 and §5 by 30s each for 5 minutes.

| Time | Section | Content |
|---|---|---|
| 0:00–0:25 | **Hook** | "This is a real transaction sent to a real Vietnamese student last month. It says: approve. It doesn't say it takes everything. She clicked. That's the whole problem." |
| 0:25–0:50 | **Problem** | Vietnam #4 in global crypto adoption; licensed exchanges onboarding newcomers from 2026; every protection layer is English-only and advisory. |
| 0:50–2:10 | **LIVE DEMO** (`06_…` §5) | **SAFE proposal:** created on Devnet → simulated → explained in Vietnamese → guardian approves → executes → **Explorer signature + vault balance changed**. **RISKY proposal** (unlimited delegate `Approve`): created → simulated → harmful consequence shown → **guardian rejects on-chain** → threshold not reached → **vault balance and delegate unchanged, verified live**. *Say: "Both are real Devnet proposals. Here are the signatures."* |
| 2:10–2:45 | **How** | Your vault needs two of three approvals. Your phone alone is one — not enough. In everyday use the second is the Guardian, and it can only vote: it cannot propose and cannot execute. Before it votes, Solana simulates the transaction, our decoders extract what it actually does, and the AI explains it in Vietnamese. Your own offline key is the third member — a deliberate emergency bypass so we can never lock you out, and we'll tell you plainly that it skips our checks. **Squads enforces one thing: two of three approved. It does not detect scams — we do that off-chain, and we simply withhold our vote.** |
| 2:45–3:15 | **Evidence** | Precision / recall / false-positive rate on the labelled set. State the limits: "false negatives are possible; we degrade to no worse than an unguarded wallet." |
| 3:15–3:50 | **Market & business** | Users reachable on campus today; the payer is wallets and exchanges needing a Vietnamese safety layer — the proven Blowfish/Blockaid model. Interviews: N people, key quote. |
| 3:50–4:00 | **Close** | "Warnings inform. Bùa protects. We'd like to be the reason the next student doesn't lose everything." |

### Deck outline (8–10 slides)
1 Title + slogan · 2 The click that costs everything (hook) · 3 Why now — 2026 legal window, #4 adoption, zero Vietnamese tooling · 4 What Bùa does (one diagram) · 5 **Live demo** (placeholder slide with Explorer links) · 6 Architecture: what the chain enforces vs what AI decides · 7 Evidence: eval metrics + honest limits · 8 Market, users, who pays · 9 Roadmap + team · 10 Ask.

---

## 8. Judge Q&A — hard questions, evidence-based answers

| Question | Answer |
|---|---|
| "Why can't a database do this?" | "A Web2 guardian either holds your keys — then it's a custodian and you're trusting us with your money — or it's advisory, and you can click past it. On-chain two-of-two gives binding control *without* custody. That combination has no Web2 equivalent." |
| "Blockchain doesn't detect scams — your AI does. So why Solana?" | "Correct, and we're careful about this: the chain doesn't judge anything. It enforces that no single party can move funds and that no party can be locked out. The judgment is off-chain. We never claim otherwise." |
| "You hold a co-signing key. Aren't you a custodian?" | "No. Our member has **Voter permission only** — we cannot create a proposal and we cannot execute one. Our entire on-chain power is a single vote on a transaction someone else proposed, and one vote is never enough." |
| "So BÙA protects my whole wallet?" | "No, and we're explicit about that: BÙA protects **only what's inside the BÙA vault**. If you sign a drainer from your ordinary wallet, we can't see it and can't stop it. It's a protected savings account, not a shield over everything you own." |
| "Which transactions do you support?" | "Six decodable instruction types in this MVP — SOL transfer, SPL transfer, SPL approve/delegate, set-authority, close-account, and ATA create. Anything else is marked unsupported and we withhold approval. We'd rather fail closed than pretend to understand a transaction we can't decode." |
| "What if your team disappears?" | "Your hot key plus your own offline recovery key are two of three — you reach the threshold and move your funds without us. That's exactly why we chose 2-of-3 over 2-of-2: with 2-of-2, our disappearance would freeze your funds forever." |
| "My phone gets hacked — attacker has my key." | "One key is one vote of the two required. The guardian refuses, your recovery key is offline and not on the phone, and because the multisig is autonomous they can't add themselves or lower the threshold either — so they're stuck. The honest limit: if they get your offline recovery key **as well**, they win. We'd rather name that than pretend it isn't there." |
| "Your AI will produce false positives and block legitimate payments." | "That's why AI never has final authority over funds. Deterministic rules hard-block structurally catastrophic patterns; the AI produces a score and an explanation, and low confidence adds friction, not a silent decision. Here's our false-positive rate on the benign set." |
| "Isn't this Blowfish in Vietnamese?" | "Blowfish warns; we refuse. No warning tool can show you a failed transaction on Explorer — we just did. Plus Vietnamese, plus recovery, which none of them address." |
| "Squads already does multisig. What's new?" | "We use Squads deliberately rather than rebuilding audited infrastructure. The product is the layer above: grounded simulation, Vietnamese explanation, and the policy that decides when the second signature is withheld." |
| "Zero-day you miss?" | "It executes, and we're no worse than an unguarded wallet. We never claim total coverage — that would be the dishonest version of this product." |
| "Is this legal in Vietnam?" | "We're non-custodial, we issue no token, promise no yield, and operate no exchange — clear of all three red lines. The demo is entirely on Devnet with test tokens." |
| "How many users?" | *If none:* "None yet. We interviewed N people; here's the campus rollout plan and our first committed test group." **Never inflate.** |
| "Who pays, how much, why?" | "Wallets and exchanges onboarding Vietnamese newcomers — the Blowfish/Blockaid B2B API model, proven globally. Consumer freemium on top. From 2026, licensed venues have a support-cost and compliance reason to buy." |

---

## 9. Risk register

| # | Risk | L | I | Mitigation / trigger |
|---|---|---|---|---|
| R1 | **U4:** deadline shorter than assumed | M | **H** | Confirm within 24h; switch to the 24h plan on discovery |
| R2 | **U5:** no dev able to wire the guardian service | M | **H** | Tier-0: hand-configured Squads vault + hard-coded demo txs (gate C1) |
| R3 | Devnet RPC unstable during demo | M | H | Two endpoints + local validator; rehearsed in P5 |
| R4 | Claude API failure on stage | L | M | Cached verdicts + live deterministic tier, disclosed aloud (gate C2) |
| R5 | **Squads v4 not usable on Devnet** (INFERENCE, not confirmed in docs) | L | **CRITICAL** | Settled empirically by **I0 item 1**; failure triggers `07_…` **Cut A** (minimal custom Anchor 2-of-3, needs 72h + a Rust dev) |
| R5b | Rejection evidence weaker than expected (`proposalReject` unavailable, or the execution attempt never lands) | M | M | I0 items 5 and 7 record which artifact actually exists; the demo script uses only what was captured (`07_…` Cuts E) |
| R6 | Several teams pitch scam-warning apps | **H** | M | Lead with the failed-transaction-on-Explorer proof in the first 90 seconds |
| R7 | False positive during the live demo | L | M | Scripted transactions rehearsed; FRICTION path shown as a feature, not an error |
| R8 | Judge punctures an overclaim | M | **H** | Claim discipline (`04_…` §10) drilled in P7 |
| R9 | Backup video missing/late | L | **H** | Mandatory submission item; recorded at I6, before code freeze |
| R10 | Repo shows no genuine commit history | L | H | Commit from hour 0, small and often |
| R11 | **U6:** wrong qualifier pool/date | M | M | Confirm eligibility this week |
| R12 | Time lost to non-scoring polish | M | M | Freeze at I6; MoSCoW is binding |

---

## 10. Checklists

**Submission** — ☐ track (Product & Business) + theme (Consumer dApps) + member list ☐ live demo/Devnet link reachable from a clean machine ☐ public repo, genuine commit history ☐ **backup video 60–90s, live screen recording, no staged mockups** ☐ pitch deck submitted in advance ☐ README with both Explorer links ☐ submitted **early**, receipt confirmed.

**Demo** — ☐ vault funded, balances checked 30 min prior ☐ both scripted txs dry-run on the actual network ☐ Explorer tabs pre-opened ☐ SAFE execution signature and RISKY rejection signature captured and pasted into the README ☐ vault balance read live before **and** after each proposal ☐ backup RPC one keystroke away ☐ local validator ready ☐ backup video on the local disk ☐ phone hotspot ☐ screen resolution and font size legible from the back ☐ Vietnamese copy proofread ☐ laptop charged, notifications off.

**Security** — ☐ no mainnet keys anywhere ☐ no secrets in the repo (scan before pushing) ☐ guardian key never in the frontend ☐ all on-chain strings treated as untrusted data ☐ AI output validated against `evidence_ref` before display ☐ AI cannot authorize unilaterally ☐ fail-safe: unclassified → FRICTION, never silent ALLOW ☐ disclaimers visible in-product ☐ no personal data collected or placed on-chain ☐ failure paths tested (RPC, API, wallet, malformed tx).

**Pitch** — ☐ under time with 15s spare ☐ wow moment before 90s ☐ every claim maps to `04_…` §10 "may be stated" ☐ no forbidden claim spoken ☐ limits stated voluntarily ☐ eval numbers real or omitted ☐ Q&A drilled against §8 ☐ one person owns the demo, another the narration ☐ Vietnamese delivery, English terms on slides ☐ in the Zoom waiting room 5 minutes early.

**Backup video** — ☐ 60–90 seconds ☐ live screen recording of real operation ☐ shows the block **and** the successful transfer ☐ Explorer visible on screen ☐ no staged mockups ☐ Vietnamese narration or subtitles ☐ legible at small size ☐ file named clearly, submitted with the package.

---

## 11. The three immediate actions

1. **Confirm U4, U5, U6 with the organizers and the team today** — deadline, who can build, which qualifier pool. These select the plan; nothing else should start before the answers are in hand.
2. **Run the I0 spike exactly as specified in `07_I0_TECHNICAL_SPIKE_SPEC.md` — 3-hour hard box, no UI, no AI.** All eight items must pass before any product code is written. This single step de-risks the entire project and its output becomes the demo backbone.
3. **Book the first 10 user interviews on campus this week** (GTM) — they satisfy the organizers' own filter criterion #5, they populate the market memo worth 25% of the Product & Business rubric, and they are the only work that cannot be compressed later.
