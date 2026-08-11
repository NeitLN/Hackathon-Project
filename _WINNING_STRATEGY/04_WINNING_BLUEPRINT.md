# 04 — WINNING BLUEPRINT: BÙA

*Selected concept. Decision rationale and audits: `03_OPUS_FINAL_DECISION.md`. Competition facts: `01_OPUS_COMPETITION_BRIEF.md`. Execution: `05_BUILD_DEMO_AND_PITCH_PLAN.md`. Not repeated here.*

> ⚠️ **CORRECTED BY STAGE 4 — read `06_TECHNICAL_REALITY_CHECK.md` first.**
> `06_…` supersedes this file wherever they conflict, specifically: **§4.2** (custom-program design — replaced by a Squads 2-of-3 topology), **§4/§6** (the "escape timelock" does not exist in Squads and is retracted), **§9** (demo redesigned around a SAFE and a RISKY *proposal*), and **§10** (claim list tightened).
> Three corrections apply throughout: **(1)** BÙA protects **only assets held inside the BÙA vault**, never assets in an ordinary external wallet; **(2)** the AI does **not** simulate transactions — Solana RPC simulates, deterministic decoders extract, the AI interprets and explains, the policy engine decides, the Guardian Service signs; **(3)** the signer topology is **2-of-3**, not 2-of-2.

---

## 1. Identity

**Name:** **BÙA** (Vietnamese: a protective amulet). Backups: *Khiên* ("shield"), *Bùa Ví*.
**Slogan (VN):** *"Scam gõ cửa. Bùa đóng cửa."*
**Slogan (EN):** *"Warnings inform. Bùa protects."*

**Product category (binding, Stage 4):** **AI-assisted protected Solana vault for Vietnamese crypto users.**

**One sentence (corrected, Stage 4.1 — binding wording):** *BÙA is an AI-assisted protected Solana vault for Vietnamese crypto users. In its normal protected flow, supported outgoing proposals are simulated, decoded and explained before the Guardian decides whether to co-approve; Squads requires two of three approvals, while a separately stored offline recovery key provides an explicit emergency bypass.*

**Do not say** "every vault transaction requires Guardian approval" or "cannot execute without the Guardian" — the user's hot wallet plus the offline recovery key are two Almighty members and can reach threshold without BÙA. That path is the deliberate break-glass bypass (`06_…` §4).

**Boundary (must always be stated):** BÙA protects **only assets held inside the BÙA vault**. It cannot see or stop a transaction signed directly from an ordinary external wallet.

---

## 2. Problem, insight, users

**Problem.** Vietnam ranks #4 worldwide in crypto adoption (~$220B annual on-chain value, Chainalysis 2025 via the official Idea Pool). From 2026 licensed exchanges will onboard newcomers en masse. Every protection layer that exists — Blowfish, Blockaid, wallet warning banners — is **English-only and advisory**. A first-time Vietnamese user faces a hex-string approval dialog in a language they do not read, and one click permanently grants a stranger control of everything they own.

**Core insight.** *A warning asks a frightened novice to make an expert decision, and it can always be dismissed. The failure is not that people are uninformed — it is that comprehension and authority sit in the same pair of hands.* Bùa separates them: it explains in the user's language, and it holds a second key so that understanding is no longer the last line of defence.

**Target users.**
- *Primary:* Vietnamese first-time digital-asset holders, 18–30, onboarding through licensed exchanges from 2026 — students, freelancers, young office workers. Reachable on campus **this week** (official filter criterion #5).
- *Secondary (the payer):* Vietnamese wallets, exchanges and fintechs needing a local-language safety layer for compliance and support-cost reasons.
- *Tertiary:* families protecting an elderly or non-technical member, by holding that member's offline recovery key on their behalf.

**UVP.** The only wallet protection built for Vietnamese users that **refuses** rather than warns — non-custodial, so neither we nor a thief can take your funds, and time-locked, so we can never lock you out either.

**Why now.** [FACT, per brief §3.7] Vietnam's Law on Digital Technology Industry took effect 1 Jan 2026 and Resolution 05/2025 opened a five-year licensed-exchange pilot; the first legal mass-onboarding wave is arriving now with zero Vietnamese-language protection built for it. [FACT, brief §6] Two consecutive Colosseum grand champions were security/privacy projects — international judges are actively rewarding this category.

---

## 3. AI — necessity and specification

**Exact necessity.** Two jobs no rule engine performs:
1. **Grounded consequence narration.** Turning raw simulated state deltas and decoded instructions into a correct, plain-Vietnamese sentence a novice can act on — *"Giao dịch này chuyển toàn bộ 250 USDC của bạn tới một địa chỉ bạn chưa từng gửi, và cho phép địa chỉ đó rút thêm không giới hạn trong tương lai."*
2. **Zero-day generalization.** Recognising a malicious *shape* never seen before. Blocklists are structurally incapable of this; it is the entire coverage advantage over incumbents.

Remove AI and Bùa collapses into a blocklist with an English debug dump — i.e. the status quo it exists to replace. **Gate 2 passes on job (2) alone.**

| Aspect | Specification |
|---|---|
| **Inputs** | Decoded instruction list (program IDs, accounts, data); `simulateTransaction` **post-state balance deltas per account** and inner-instruction trace; destination-address history (has this owner ever sent here?); program reputation (known/verified/unknown); threat-DB hits; token metadata **marked untrusted** |
| **Outputs** | Strict JSON: `{verdict: ALLOW \| FRICTION \| BLOCK, risk_score: 0–100, reasons: [{claim, evidence_ref}], vi_explanation, confidence}`. Every `claim` must cite an `evidence_ref` pointing at a simulation fact. Uncited claims are dropped by the validator before display. |
| **Data sources** | Solana Devnet RPC simulation (primary, authoritative); public scam-address lists; a team-built corpus of Vietnamese-context scam patterns; SPL Token / System / ATA program IDLs for decoding |
| **Model approach** | Claude with structured output + a strict system contract: *reason only from the supplied simulation facts; never infer intent from token names or memos*. Deterministic rules run first and independently. |
| **Evaluation** | Labelled corpus ≥60 transactions (≥25 malicious across ≥5 families, ≥35 benign everyday). Report **precision, recall, and false-positive rate on the benign set**. These numbers go on a slide — they are the credibility asset. |
| **Confidence handling** | `confidence < threshold` → **FRICTION**, never a silent ALLOW. FRICTION = delay + explicit typed acknowledgement. |
| **Failure behaviour** | AI unavailable → deterministic tier still governs; anything unclassified routes to FRICTION. **The system never fails open on an unclassified high-value transfer, and never fails into a state worse than an unguarded wallet.** |
| **Adversarial handling** | All on-chain strings (token names, memos, metadata URIs) are treated as **untrusted data, never as instructions**. Verdicts derive from structure and deltas, not text. |

**AI authority limit (non-negotiable):** *AI never has unilateral authority over funds.* Deterministic rules hard-block structurally catastrophic patterns; AI can add friction and explanation. This is what makes an enforcement product defensible despite imperfect classification.

---

## 4. Solana — necessity and specification

**Exact necessity.** Bùa needs **binding dual control without custody**. Only an on-chain construction gives all four simultaneously:

*Corrected to the frozen 2-of-3 topology (`06_…` §3). Members: user hot wallet (Almighty), BÙA Guardian Service (**Voter only**), user's offline recovery key (Almighty). Threshold 2, `config_authority = None`.*

| Property | Enforced by |
|---|---|
| A compromised user device **cannot** move vault funds alone | Threshold 2 — the hot key is one vote; the recovery key is offline; autonomous config blocks threshold tampering |
| The guardian **cannot** steal | Voter-only permission: it cannot propose, cannot execute, cannot reach threshold alone |
| The guardian **cannot** lock the user out | User hot key + user's offline recovery key reach threshold **without** the guardian |
| A lost hot key is recoverable **without** a custodian | Guardian + the user's offline recovery key — requires the user's physical cold key, so the guardian cannot act alone |

### 4.1 On-chain vs off-chain responsibilities

| On-chain (trust-critical, verifiable) | Off-chain (fast, replaceable) |
|---|---|
| Custody of funds in a program-owned vault | Transaction simulation |
| The approval threshold itself (2 of 3) | Deterministic rule engine |
| Escape timelock and its expiry | AI risk scoring and Vietnamese narration |
| Trustee recovery threshold and delay | Threat database |
| Pause/kill switch state | Notification delivery, UI |
| Immutable record of every executed and every **failed** attempt | Guardian signing service |

**Precise claim boundary:** the chain does **not** decide whether a transaction is malicious — that judgment is off-chain. The chain enforces that **no single party can move funds, and that no party can be locked out.** Every public claim must respect this line (§10).

### 4.2 Program instructions and state model — ⚠️ SUPERSEDED

> **This subsection is retained for history only. The custom Anchor program below is NOT being built.**
> The frozen design composes **Squads v4** (audited, already deployed) with a 2-of-3 multisig. See `06_…` §3 for the binding topology, permissions, fail-closed behaviour, replay protection, rate limiting, rotation, outage and recovery semantics — and note that the `request_escape` / `execute_escape_transfer` instructions below **do not exist in Squads**; guardian-outage escape is provided instead by the user's offline recovery key. A custom program is only revived under spike Cut A (`07_…` §3).

**Accounts**
- `GuardianConfig` PDA `["guardian", owner]` — `owner`, `guardian`, `vault_bump`, `escape_timelock_secs`, `escape_requested_at: Option<i64>`, `paused: bool`, `policy_version`
- `Vault` PDA `["vault", guardian_config]` — holds SOL, owns the associated token accounts
- `RecoveryConfig` PDA `["recovery", guardian_config]` — `trustees: Vec<Pubkey>` (≤5), `threshold: u8`, `recovery_delay_secs`, `pending: Option<{new_owner, approvals, requested_at}>`

**Instructions**

| # | Instruction | Signers | Effect |
|---|---|---|---|
| 1 | `initialize_guardian` | owner | Creates config + vault, sets guardian, timelocks, trustees |
| 2 | `execute_transfer` | **owner + guardian** | CPI SPL/SOL transfer from vault. The normal path. |
| 3 | `request_escape` | owner | Starts the anti-censorship timer; emits a loud event |
| 4 | `execute_escape_transfer` | owner | Valid **only** after `escape_requested_at + escape_timelock_secs` |
| 5 | `cancel_escape` | **owner only** | Guardian may not cancel — that would restore censorship power |
| 6 | `rotate_guardian` | owner + guardian, *or* owner alone post-timelock | Guardian replacement / exit |
| 7 | `initiate_recovery` / `approve_recovery` | trustee | Accumulates approvals |
| 8 | `execute_recovery` | any | After threshold + delay: rotates `owner` |
| 9 | `pause` | owner **or** guardian | Fail-safe direction — either may stop |
| 10 | `unpause` | owner only | Only the user restarts |

### 4.3 External requirements
Wallet: any standard Solana wallet adapter (Phantom/Solflare) on **Devnet**. Signing: the user approves the proposal in-wallet; the **Guardian Service** casts its Voter approval server-side; either the user or the recovery key executes. **Oracle: none — deliberately.** No price feed means no oracle attack surface and no valuation dependency. Identity: pseudonymous keys only; the recovery key is user-generated and user-held, **no KYC, no personal data on-chain**. APIs: Solana Devnet RPC (`simulateTransaction` with `sigVerify: false`, `replaceRecentBlockhash`, `accounts`, `innerInstructions`), Squads v4 SDK, Claude API, SPL/System IDLs.

---

## 5. Web2 Replacement Test — conclusion

**PASSES.** A Web2 guardian has exactly two forms, and both fail: (a) it holds the keys → it is a **custodian**, which reintroduces the trust the product exists to remove and lands squarely in Vietnamese licensed-activity territory; or (b) it is advisory → **dismissible**, i.e. today's failing status quo. Neither delivers binding, non-custodial dual control with a censorship escape hatch. The simulation and AI layers are legitimately Web2 and are *not* claimed as blockchain contributions.

---

## 6. Threat model and trust assumptions

| Adversary / event | Outcome under Bùa | Residual risk |
|---|---|---|
| Phishing site gets user to sign a drainer | Guardian refuses; transaction fails on-chain | None for this vector |
| Malware fully owns the user's device (hot key stolen) | **Cannot reach threshold at all.** The hot key is one vote of two; the guardian refuses; the recovery key is offline and not on the device; autonomous config prevents adding a member or lowering the threshold | Attacker can spam proposals (rate-limited, not eliminated). **If the attacker also obtains the offline recovery key, they win — disclosed, not hidden.** *(This replaces the retracted `request_escape` hole; 2-of-3 is strictly stronger here.)* |
| Guardian service compromised or malicious | Cannot move funds — Voter-only, cannot propose or execute, cannot reach threshold alone | Can withhold approval; the user routes around it with the recovery key |
| Guardian service disappears (team quits) | User hot key + user's offline recovery key reach threshold without BÙA | Funds never frozen — **provided the user has actually stored the recovery key.** Onboarding must enforce this |
| User loses their hot key | Guardian + the user's offline recovery key reach threshold and move funds to a fresh vault | Requires the user to physically produce the cold key; if that key was never stored, funds are unrecoverable — onboarding must enforce storage |
| Adversarial token metadata / prompt injection via on-chain strings | Strings are untrusted data; verdicts derive from deltas and structure | Model still sees the text; contract-level rule plus output validator |
| Novel scam family (zero-day) | AI generalization may catch it; if not, FRICTION on unknown high-value | **False negatives are possible and must be disclaimed** |

**Trust assumptions stated plainly:** the user trusts (1) the correctness of the Squads v4 program (audited by Neodyme and OtterSec), (2) that they have genuinely stored their offline recovery key somewhere the attacker cannot reach, (3) that a false negative may occur. They do **not** need to trust the Bùa team with custody — the guardian can only vote.

**Legal / abuse:** non-custodial and Devnet-only for the competition, therefore outside custody and payment-intermediation licensing. No token is issued, no yield promised, no exchange operated — clear of all three official red lines. Privacy: no KYC, no personal data on-chain; the guardian service sees transaction contents and must say so. Abuse: griefing via spurious FRICTION, and liability for false positives/negatives → **disclaimers from day one, in-product.**

---

## 7. System architecture

```
[Vietnamese-language dApp]  ──build unsigned tx──►  [Simulation Service]
   wallet adapter (Devnet)                            simulateTransaction
        │                                             + instruction decoder
        │ user signature                                      │
        ▼                                          ┌──────────┴──────────┐
[Guardian Signing Service]  ◄──verdict, evidence── │ Tier A: deterministic│
   holds guardian key                              │   rules (hard block) │
   co-signs ONLY if allowed                        │ Tier B: AI score +   │
        │                                          │   Vietnamese reasons │
        │ co-signature (or refusal)                └──────────────────────┘
        ▼                                                    ▲
[Solana Devnet — Squads v4 multisig + vault PDA]        [Threat DB]
   2-of-3 threshold 2 · guardian = Voter only · config_authority = None
        │
        └──► Explorer: executed transfers AND on-chain rejections (permanent evidence)
```

---

## 8. User journey

1. **Onboard (60s).** Open Bùa in Vietnamese → connect wallet → create the 2-of-3 vault → **generate and store the offline recovery key** (onboarding must not continue until the user confirms it is written down) → move test funds into the vault.
2. **Everyday.** Pay a friend: Bùa simulates, shows *"Chuyển 20 USDC tới ví Minh. Không có quyền nào khác được cấp."* → user approves → guardian co-signs → done in seconds.
3. **Attack.** A phishing link produces a drainer. Bùa shows the true consequence in Vietnamese, marks it **BLOCK**, and the guardian refuses to co-sign. The attempt is recorded on-chain as a failed transaction.
4. **Key loss.** Trustees approve recovery; after the on-chain delay, ownership rotates to a new key.
5. **Exit.** User rotates or removes the guardian at any time; if Bùa vanishes, the timelock escape returns full unilateral control.

---

## 9. Live demo — the exact judge-facing sequence

**Earliest wow moment: ~60 seconds in.** Do not build to it slowly.

> ⚠️ **REPLACED BY `06_…` §5.** The demo is now **two proposals against the same vault** — a SAFE proposal that the guardian approves and that executes with a visible vault-balance change, and a RISKY proposal (unlimited SPL `Approve` delegation) that the guardian rejects on-chain, that never reaches threshold, and after which the vault balance and delegate field are shown unchanged.
>
> Two retractions: the judge does **not** trigger a drainer from their own external wallet (BÙA protects only vault assets), and the risky transfer must **not** be described as "a failed on-chain transaction" unless a real submitted signature and confirmed program error were actually captured in I0 item 7. The `skipPreflight` technique described here does not apply — in the Squads design the risky transfer is a proposal that never reaches threshold, not a submitted user transaction.

*The argument the demo makes is unchanged and still correct: it refuses the dangerous one and it does not get in your way — back to back, both with on-chain evidence.*

**Never mocked:** the simulation call, the AI verdict, the guardian's refusal, the failed on-chain transaction, the successful transfer.
**May be transparently simplified:** wallets and vault pre-funded; the recovery path described rather than performed (say so aloud); threat DB seeded rather than crowd-sourced.

**Fallback ladder** (rehearse all four):
1. Devnet RPC degraded → switch to a second RPC endpoint, then to a **local validator** with the same program deployed.
2. Claude API down → cached verdicts for the scripted transactions + deterministic tier live (say: *"the AI layer is served from cache; the rules and the on-chain refusal are live"*).
3. Wallet extension fails → pre-configured keypair in the demo app.
4. Internet fails entirely → the mandatory 60–90s backup video (screen-recorded live, per submission rules).

---

## 10. Claim discipline

**May be stated (each is enforced or measured):**
- "A compromised phone cannot move **funds held in the BÙA vault** by itself." *(threshold 2 of 3, on-chain)*
- "In the normal protected flow, a proposal our policy denies does not get the Guardian's vote, so it does not reach threshold by that path." *(precise — not "can never execute")*
- "Your offline recovery key is a deliberate emergency bypass: it reaches threshold with your hot key and skips our analysis entirely. That is the price of never being able to lock you out." *(states the bypass openly)*
- "We cannot take your money — the guardian can only vote; it cannot propose or execute, and it cannot reach the threshold alone." *(Voter-only permission, on-chain)*
- "We cannot lock you out — your hot key plus your own offline recovery key reach the threshold without us." *(2-of-3, on-chain)*
- "Solana simulates the transaction; our decoders extract what it does; the AI explains it in Vietnamese, and every sentence is tied to a decoded fact." *(evidence_ref validator)*
- "The guardian rejected this proposal on Devnet — here is the rejection signature, and the vault balance is unchanged." *(Explorer + balance read)*
- "On our frozen set of 40 transactions: precision X, recall Y, false-positive rate Z." *(only if the set was frozen before the demo)*

**Must NOT be stated without evidence — and some not at all:**
- ❌ "Blockchain prevents scams" / "the chain detects malicious transactions" — **false**; the chain enforces dual control, it does not judge.
- ❌ "100% protection", "you cannot be scammed", "guaranteed" — false negatives exist.
- ❌ "AI detects all scams" / any claim implying zero FP or FN.
- ❌ Any user, revenue, or partner number that does not exist. If there are no users, say *"no users yet; here is our campus test plan."*
- ❌ "Insured", "guaranteed returns", or any investment framing — violates the program's academic-safety rules.
- ❌ **"BÙA protects your wallet"** — it protects **only assets inside the BÙA vault**. Never imply blanket protection of external holdings.
- ❌ **"Our AI simulates the transaction"** — Solana RPC simulates; the AI interprets and explains.
- ❌ **"Every vault proposal is analysed by BÙA"** / **"every vault transaction requires Guardian approval"** / **"a vault transaction can never execute without Guardian approval"** / **"on-chain logic forces AI analysis or simulation"** — all false: Squads enforces only the 2-of-3 threshold, and hot key + offline recovery key reach it without BÙA (`06_…` §4).
- ❌ "We support any Solana transaction" — the MVP supports six decodable instruction types and fails closed on everything else (`06_…` §2.1).
- ❌ Describing the risky transfer as "a failed on-chain transaction" unless a real signature and confirmed program error were captured (`07_…` item 7).
- ❌ Claiming the guardian protects a stolen hot key **without** disclosing that an attacker holding **both** the hot key and the offline recovery key succeeds (`06_…` §3.3).

---

## 11. Moat and duplication

**Duplication risk: HIGH for the category, MEDIUM for this construction.** Pool 09's first example idea is a phishing-warning extension; expect several. Differentiation, in the order a judge will register it:
1. **It refuses instead of warning** — on-chain dual control, not a dismissible dialog. No warning-app competitor can show a *failed transaction on Explorer*.
2. **Explanations are evidence-bound** — visibly derived from simulation deltas; the anti-hallucination story that wins technical Q&A.
3. **Vietnamese-first** — incumbents are English-only; the panel is Vietnamese-speaking.
4. **Protection *and* recovery** — theft and key-loss in one product; warning apps address neither.
5. **Honest limits** — a team that names its own residual risk (§6) outscores one claiming perfection.

**Hard to copy inside the competition:** the two-tier authority split plus the escape/recovery design is architecture, not a feature — a team that started with a warning banner cannot retrofit it in the final days.

**Sponsor and track fit** — declare **Track 1: Best Product & Business** (scores 87.5 vs ~77 on Technical Build, per `03_…` §6) and theme **Consumer dApps** [INFERENCE: blockchain sits behind a consumer safety product, and this theme is likely less crowded than AI × Web3, which will attract the trend-followers]. **MEXC Ventures:** a proven B2B security-API business (Blowfish/Blockaid model) serving the licensed exchanges onboarding users from 2026 — never framed as promoting any exchange. **Solana Foundation:** real program logic, PDAs, CPI, composability with Squads. **Open Campus:** the interactive safety-training module (simulated phishing → badge) is a natural, honest Education-layer tie. **Minds:** no forced fit — do not bolt on an agent (see `05_…` "do not build").

---

*Execution, scope tiers, pitch and checklists: `05_BUILD_DEMO_AND_PITCH_PLAN.md`.*
