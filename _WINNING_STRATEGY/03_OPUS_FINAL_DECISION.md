# 03 — OPUS FINAL DECISION (Stage 3, Part A/B)

**Stage gate verified:** `00_STATE.md` read `CURRENT_STAGE: FABLE_HANDOFF_COMPLETE_READY_FOR_OPUS` before this stage began.
**Inputs read in full:** workflow, `00_STATE.md`, `01_OPUS_COMPETITION_BRIEF.md`, `02_FABLE_ONE_SHOT_HANDOFF.md`.
**Independence:** finalists were re-derived from first principles and re-scored **before** Fable's ranking was consulted. **My ranking differs from Fable's** (see §6). Fable's scores were not used as inputs.
**New verification performed this stage** (only where decision-critical): Vietnamese hụi law; Squads v4 capability. Results in §2–§3.

---

## 1. Method

For each finalist I asked, in order: (1) is the problem real and urgent; (2) does AI carry load-bearing weight; (3) does Solana enforce something, or merely record it; (4) would a competent Web2 team achieve the same outcome; (5) can this be *built* and *shown live* by an unknown-capability student team; (6) what does a hostile expert judge say in Q&A. A concept fails on (6) as surely as on (1).

---

## 2. Audit — MANDATE (agent policy wallet)

| Audit question | Finding |
|---|---|
| Does an on-chain policy wallet genuinely reduce prompt-injection damage? | **Partially — it bounds damage, it does not prevent it.** [INFERENCE, high confidence] Funds in a program-owned PDA vault can only move via a program instruction that validates caps/allowlist/rate/kill-switch. Injection can still extract **up to the cap**, repeatedly, and an attacker controlling an allowlisted destination extracts the full window. The honest claim is *bounded loss*, not *no loss*. |
| Enforceable at signing time? | **Yes, and stronger than "signing time" — enforced at execution time by validators.** [FACT, Solana execution model] A policy violation aborts the instruction and the transaction fails atomically. Client-side bypass is impossible. |
| What remains vulnerable off-chain? | Agent keypair exfiltration (loss still bounded); non-financial harm (data leakage, actions in other systems) entirely unprotected; **the policy-update path is the crown jewel** — if the agent can sign policy changes, injection defeats the whole design. Requires owner-only key + timelock. |
| Meaningful gain over a Web2 policy engine, multisig, session key, or wallet spending limit? | **This is where the concept weakens.** A well-built Web2 policy server is *equally* injection-resistant (it accepts structured calls, not prose). The genuine on-chain gains are **non-custody, operator-independence, and third-party auditability** — real Gate-3 properties, but *not* the injection-resistance the name and pitch imply. Against multisig: real gain (multisig destroys autonomy by requiring a human per transaction). Against wallet spending limits: **see next row.** |
| Novelty check | **[FACT, verified this stage]** Squads Protocol v4 already ships **spending limits, time locks, roles, sub-accounts, session keys, policy enforcement, direct debits and a developer REST API**, is audited by Neodyme and OtterSec, and secures ~$10B on Solana. MANDATE is substantially a re-implementation of an existing, battle-tested Solana primitive. A Solana Foundation judge will know this intimately. **This is a severe Q&A landmine and a material novelty deduction.** |
| Contract / key-management / replay / bypass / malicious-policy risks | Replay: needs per-window counters keyed to `Clock`, easy to get wrong. Bypass: any instruction path that touches the vault without policy checks voids everything. Malicious policy: an owner-signed bad policy is honored — no protection. Key management: three keys (owner, agent, upgrade authority) in a student codebase. Cumulatively **high** for an unaudited student program. |
| Buildable without an experienced Anchor developer? | **No, not at full scope.** [INFERENCE] Time-windowed rate limits + allowlist + CPI transfers + owner-gated upgrades is genuinely intermediate Anchor. **Explicit feasibility penalty applied (U5 unresolved).** |
| Can the demo show a real rejected and a real permitted transaction? | **Yes.** A transaction that fails *during execution* is recorded on-chain and visible on Explorer with its error (requires `skipPreflight` so the wallet does not silently drop it client-side). Genuinely strong evidence. |

**Additional structural weakness:** the target user is a foreign developer/agent operator. The official idea filter's criterion #5 — *first customers interviewable within 4 weeks* — cannot be satisfied domestically. No Vietnamese validation is possible before Demo Day.

---

## 3. Audit — HỤI MINH (on-chain rotating savings circle)

| Audit question | Finding |
|---|---|
| Is removing the trusted organizer technically and socially credible? | **Technically yes; socially only for the young.** A PDA holds the pot and rotation is deterministic. But hụi's social function *includes* the chủ hụi — vetting members, chasing late payers, absorbing shortfalls. Code cannot do the chasing. Realistic user is students, not the households the pitch invokes. |
| Identity, missed payments, default, disputes, off-chain money? | **The unsolved core.** Identity: pseudonymous wallets cannot be pursued for default — a defaulter simply walks, and the remaining members eat the loss. Missed payments: the contract can penalize a *deposit*, but the deposit is the very capital at issue. Disputes: no mechanism. Off-chain money: if members top up with VND, someone converts it — reintroducing the custodian the product claims to abolish. |
| Does Solana enforce the important parts or merely record them? | **Enforces the easy half** (custody of the pot, rotation order, payout timing). **Cannot enforce the hard half** (that a member actually pays, or is findable if they do not). The headline "impossible to steal" applies to the organizer only; the dominant real-world failure — member default — is untouched. |
| Legal/regulatory exposure | **[FACT, verified this stage]** Hụi is expressly regulated by **Nghị định 19/2019/NĐ-CP** (in force 5 Apr 2019), covering organizing principles, membership and chủ hụi conditions, written agreements, withdrawal order, and an interest ceiling of **20%/year**. So the activity is legal but *regulated* — a compliance surface, not a green field. **[UNKNOWN — could not verify]** whether *phần họ* may be denominated in anything other than VND; the authoritative texts returned HTTP 403 / unresolvable DNS this session. **Per instruction, uncertainty is penalized, not assumed away.** Compounding it: the organizers' own **red line #1** — crypto is not a means of payment domestically. A hụi settled in USDC between Vietnamese residents is a domestic value transfer in crypto and sits at or across that line. |
| Adoption / wallet friction / privacy | High: five people must hold funded wallets simultaneously. Privacy: every contribution, payout and *late payment* is permanently public — socially corrosive in exactly the tight-knit groups being targeted. |
| **Does Hard Gate 2 genuinely pass?** | **NO — FAIL.** Strike the AI and you have a configuration form plus a contract; the product is ~95% intact. Natural-language circle authoring is a UX nicety, "anomaly detection" is speculative, and the explainer is help text. Under the workflow's own wording — *"If AI is removed and the product remains almost unchanged, the concept fails"* — this fails. Fable rated Gate 2 "PASS (soft)"; on strict application it does not pass. |
| Does the demo move real value without unsafe financial claims? | Yes on Devnet with test tokens — safe. But that safety is exactly what exposes the GTM gap: the demo is compliant *because* it is not the product. |

**Verdict: ineligible for selection (Gate 2 FAIL).** The legal exposure is reinforcing, not decisive — the AI-necessity failure alone disqualifies it. Emotionally it is the most resonant of the three; that is not enough.

---

## 4. Audit — BÙA (AI-explained, on-chain-enforced wallet guardian)

| Audit question | Finding |
|---|---|
| Is AI scam classification reliable enough for an *enforcement* product? | **Not on its own — and it must not be asked to be.** The design that survives audit gives AI **no unilateral authority over funds**: a deterministic tier hard-blocks structurally catastrophic patterns (unlimited SPL delegate to an unknown address, `SetAuthority` on a token account, close-account-and-sweep, full-balance transfer to a never-seen address); AI produces a *risk score and an explanation*, which can add friction (delay, extra confirmation) but never silently authorizes. **This is the single most important architectural decision in the project** and it converts the audit's hardest objection into a strength. |
| False positive / false negative / adversarial / oracle / centralized-model risk | FP: mitigated by tiering — deterministic rules are precise, AI-driven outcomes are advisory + reversible by explicit user override with a warning. FN: unavoidable; disclaimed from day one; the guardian degrades to *no worse than an unguarded wallet*, never worse. Adversarial input: attacker-controlled token metadata/names feed the model → **treat all on-chain strings as untrusted, never as instructions**, and ground verdicts in structure, not text. **Oracle: none — deliberately no price feed, so no oracle risk at all.** Centralized model: the model can be swapped; it is not in the trust path for custody. |
| Materially stronger than existing wallet warnings and simulators? | **Yes, on three axes.** (1) *Enforcement vs advice*: incumbents render a dialog the user can dismiss; here the block is a transaction that cannot execute. (2) *Language*: Blowfish/Blockaid-class tools are English-only; the target user is a Vietnamese novice. (3) *Recovery*: guardian + social recovery addresses key-loss, which no warning tool touches. |
| What does Solana actually enforce? | **2-of-2 dual control over a program-owned vault**, plus a **user-only unilateral exit after a timelock**. Net properties: a fully compromised user device cannot drain the vault alone; and the guardian can neither steal (cannot sign alone) nor censor forever (timelock escape). Both are enforced by validators. |
| Is the AI explanation evidence-based or generated reassurance? | **Must be evidence-based, and the architecture makes it so.** [FACT, Solana RPC] `simulateTransaction` returns post-simulation account states and inner-instruction traces. The explanation is generated **from concrete simulated balance deltas and decoded instructions** — "this transaction moves 100% of your USDC to an address you have never sent to, and grants it unlimited future access." Every sentence traces to a simulated fact. Free-form speculation is prohibited by design. This is the answer that wins the technical Q&A. |
| Can the demo safely show a block + an explanation? | **Yes, entirely on Devnet with test tokens** — no real assets, no third party harmed, fully inside the program's testnet/devnet rule. |
| Web2 Replacement Test | **PASSES, cleanly.** A Web2 guardian must hold keys → it becomes a custodian (trust + Vietnamese licensing exposure), or it is advisory → bypassable. Only an on-chain construction delivers **binding, non-custodial dual control with a censorship escape hatch**. This is the cleanest Gate-3 result of the three finalists. |

**Feasibility de-risking [FACT, verified this stage]:** the dual-control layer does **not** require writing Rust. **Squads v4** already provides audited multisig, time locks and roles on Solana with a developer REST API. A Tier-0 MVP composes Squads for enforcement and spends the team's effort on simulation + AI + Vietnamese UX — which is also where all the differentiation lives. A custom Anchor guardian program is an *upgrade*, not a prerequisite. **This makes BÙA the only finalist whose Must-have scope survives U5 being answered badly.**

---

## 5. Hard Gates — reapplied independently

| Gate | MANDATE | HỤI MINH | BÙA |
|---|---|---|---|
| G1 Competition fit | PASS | **MARGINAL** (red line #1 proximity) | PASS |
| G2 AI necessity | PASS | **FAIL** | PASS |
| G3 Web3 necessity | PASS (non-custody/auditability, *not* injection-resistance) | PASS | **PASS (strongest)** |
| G4 Demonstrable MVP | PASS **with feasibility penalty** (U5) | PASS | PASS (Tier-0 needs no custom Rust) |
| G5 Judge memorability | PASS | PASS | PASS |
| **Eligible** | YES | **NO** | YES |

---

## 6. Independent scoring

### 6.1 Primary rubric (Rubric A — official rules, per declared track)
Declared tracks: MANDATE → Technical Build. BÙA, HỤI MINH → Product & Business.

| Concept | Criterion scores (0–10) | Weighted total |
|---|---|---|
| **BÙA** (P&B 25/30/25/20) | Problem+user clarity **9.5** · Solution+demo+UX **9.0** · Business/GTM **7.5** · Presentation **9.0** | **23.75 + 27.0 + 18.75 + 18.0 = 87.5** |
| **MANDATE** (TB 30/25/25/20) | Depth **8.5** · Architecture/contract quality **7.5** · Solana stack **8.0** · Demo completeness **7.5** | **25.5 + 18.75 + 20.0 + 15.0 = 79.25** |
| **HỤI MINH** (P&B) | Problem **8.5** · Solution+demo **8.5** · Business/GTM **5.0** · Presentation **9.5** | **21.25 + 25.5 + 12.5 + 19.0 = 78.25** *(ineligible)* |

Non-tied reasoning for the largest deductions — MANDATE architecture 7.5: unaudited three-key student program re-implementing an audited primitive. MANDATE demo 7.5: agent loop + external x402 dependency + chain, the most stage-fragile of the three. BÙA business 7.5: the B2B security-API model is proven globally (Blowfish, Blockaid) but pre-revenue here. HỤI MINH business 5.0: no lawful path to real money that preserves the core claim.

### 6.2 Sensitivity — second official rubric (Rubric B, 100 pts, `docs.unihackfest.vn`)
Solana 20 · Digital-Asset justification 15 · AI 15 · Technical execution 10 · Product experience 10 · Market/GTM 10 · Problem clarity 10 · Education impact 5 · Pitch 5.

| Concept | Total | Movement |
|---|---|---|
| **BÙA** | **≈86** | Holds #1 — gains on AI (15%) and UX, modest on Education (safety training for students) |
| **MANDATE** | ≈83 | Holds #2 — gains strongly on Solana + AI, loses on Education and GTM |
| **HỤI MINH** | ≈70 | Falls further — AI 15% punishes the Gate-2 failure directly |

**Ranking does not change under either official rubric.** Therefore **unresolved U2 (which rubric governs) does not affect the decision** — a materially useful result.

### 6.3 Workflow's own 100-point model (§5) — cross-check
BÙA ≈ 85 (novelty 8 is its weakest line); MANDATE ≈ 85 (novelty 12, MVP feasibility 6.5). **Effectively tied**, which correctly isolates the real question: not "which idea is more interesting" but **which team-executable concept survives contact with a hostile judge and an unknown build capacity.** BÙA wins that question decisively.

### 6.4 Comparison with Fable
Fable ranked **MANDATE (85.5) > HỤI MINH (83.25) > BÙA (80)**. I rank **BÙA > MANDATE > HỤI MINH (ineligible)**. Two substantive corrections: (a) Fable under-weighted that MANDATE's headline claim overstates what the chain does and that the primitive already exists in audited form (Squads v4) — both are Q&A-fatal; (b) Fable rated HỤI MINH's Gate 2 "PASS (soft)" where strict application gives FAIL. Fable's creative contribution — the enforcement-over-warning framing, the Vietnamese naming, and the refusal-as-theatre insight — is retained and is what makes BÙA winnable.

---

## 7. Assumptions, unknowns, and decision stability

| Unknown | Assumption used | Effect on confidence | Does the decision change? |
|---|---|---|---|
| **U4** — real submission deadline / remaining build time | ≥72 focused hours remain before the late-Aug qualifier | Largest single driver. If <24h remain, scope drops to the 24h plan (still a complete flow) | **No** — BÙA is the only finalist with a credible 24h variant |
| **U5** — team composition / Anchor capability | Unknown; must not be assumed | Penalizes MANDATE heavily, BÙA barely (Tier-0 needs no Rust) | **No — and this is the decisive unknown.** Had U5 confirmed two strong Anchor devs, MANDATE would close much of the gap but would still lose on the overclaim and Squads-duplication problems |
| **U6** — partner-school vs Open pool | Unknown | Shifts the qualifier date/format only | **No** |
| **U2** — governing rubric | Unknown | None — ranking stable under both (§6.2) | **No** |
| Hụi denomination legality | UNKNOWN, penalized | Reinforces HỤI MINH rejection | **No** — rejection rests on Gate 2, not on law |

**Stability statement:** the selection is unchanged under every reasonable alternative assumption tested. The only scenario that would reopen it is U5 revealing a genuinely expert Anchor team *and* U4 revealing a long runway — in which case MANDATE becomes viable, though still second on judge-credibility grounds.

---

## 8. Final decision

| Designation | Concept | Reasoning |
|---|---|---|
| **Safest for a high placement** | **BÙA** | Lowest execution risk (Tier-0 requires no custom Rust), highest problem-clarity score, demo the organizers themselves called "extremely convincing" |
| **Most breakthrough** | **MANDATE** | Strongest funded narrative, least student competition, genuinely global startup path |
| **Strongest live demo** | **BÙA** | A wallet-drainer dying on stage while an AI explains it in Vietnamese, with both the refusal and the clean payment on Explorer |
| **FINAL SELECTION** | **BÙA** | Wins under both official rubrics, has the cleanest Web2-replacement result, is the only finalist robust to U5, and is the only one whose headline claim exactly matches what the architecture enforces |

**Independent final score: 87.5 / 100** (Rubric A, Product & Business track).
**Confidence: 72%** — high conviction in the concept given the evidence; the residual 28% is almost entirely U4 (runway) and U5 (team), neither of which I may fabricate.
**Verdict: CONDITIONAL GO.**

**Conditions (all three must be satisfied within 48 hours):**
1. Confirm the actual submission deadline (U4) and select the matching 24/48/72h plan in `05_…`.
2. Confirm at least one developer can integrate a wallet + Squads-style multisig + an RPC simulation call. If not, the Tier-0 scope drops further to simulation + AI + a **pre-configured** 2-of-2 vault — still a complete verifiable flow.
3. Confirm track = **Best Product & Business** and theme = **Consumer dApps** at registration (see `04_…` §Sponsor/track fit).

### Why the other two finalists were rejected

**HỤI MINH — rejected on Hard Gate 2 (AI necessity), reinforced by three further defects.** Removing the AI leaves the product ~95% intact: NL circle-authoring is a form, anomaly detection is speculative, the explainer is help text. Beyond the gate: Solana enforces only the *organizer* failure while the dominant real failure (member default by a pseudonymous wallet) is untouched; the honest version of the pitch cannot say "impossible to steal"; the lawful path to real money is unresolved (Nghị định 19/2019/NĐ-CP compliance surface + red line #1 on domestic crypto settlement, with the denomination question UNKNOWN and therefore penalized); and public late-payment records are socially corrosive in precisely the tight groups it targets. It is the most emotionally resonant concept and the one I most regret cutting.

**MANDATE — rejected on judge-credibility and execution risk, not on merit of idea.** Three specific defeats: (1) **the headline overclaims** — an on-chain policy wallet bounds injection loss, it does not prevent injection, and a competent Web2 policy server is equally injection-resistant; the chain's real contribution is non-custody and auditability, which is a quieter story than the name promises, and the workflow forbids claiming blockchain prevents an off-chain event it does not enforce; (2) **the primitive already exists** — Squads v4 ships audited spending limits, time locks, roles and session keys securing ~$10B, and a Solana Foundation judge will ask why this is not a Squads integration; (3) **it is the most Rust-dependent finalist with U5 unresolved**, mandating a feasibility penalty. Its target user is also unreachable for domestic validation within four weeks, failing the organizers' own filter criterion #5. **Preserved for reuse:** if U5 later reveals expert Anchor capability, MANDATE's policy-PDA pattern is the natural post-hackathon extension of BÙA's guardian — the same architecture, aimed at agents instead of novices.

---

*Blueprint: `04_WINNING_BLUEPRINT.md`. Execution: `05_BUILD_DEMO_AND_PITCH_PLAN.md`.*
