# 06 — TECHNICAL REALITY CHECK AND ARCHITECTURE FREEZE

**Scope:** correct technical overclaims in `04_WINNING_BLUEPRINT.md` / `05_BUILD_DEMO_AND_PITCH_PLAN.md` and freeze the smallest provable architecture. **The selected concept is not reconsidered.**
**Authority:** this file **supersedes** `04_…` §4.2, §5–§6 (escape-timelock claims), §9 (demo), and §10 (claim list) wherever they conflict.

## 0. Evidence status of the technical claims used here

| Claim | Status |
|---|---|
| `simulateTransaction` supports `sigVerify`, `replaceRecentBlockhash`, `accounts` (post-simulation state), `innerInstructions`; a transaction need **not** be signed unless `sigVerify: true`; `replaceRecentBlockhash` conflicts with `sigVerify` | **FACT** — Solana RPC docs |
| Squads v4 supports: create multisig, add member, spending limits, create vault transaction, create proposal, **approve**, **reject**, **cancel**, execute | **FACT** — Squads docs (TypeScript overview) |
| Member permissions: Proposer=1, Voter=2, Executor=4, Almighty=7 | **FACT** — Squads docs |
| `timeLock` = seconds between voting settlement and execution; 0 = no delay | **FACT** — Squads docs |
| `config_authority` null ⇒ multisig is **autonomous**; config changes otherwise require `config_authority` | **FACT** — Squads docs |
| `ProposalStatus` includes approved / rejected / cancelled | **FACT**, but the **complete enum list is not published** — Squads docs explicitly say so |
| Squads v4 deployed on Devnet at **`SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf`** | **FACT** — listed in the official Squads Protocol v4 repository, and **verified live on Devnet during Stage 5**: `getAccountInfo` returns `executable: true`, owner `BPFLoaderUpgradeab1e11111111111111111111111`. Risk R5 is retired. The program account is nonetheless re-checked at runtime before the multisig is created. |

Anything not in this table is design, not fact.

---

## 1. Correction — protected asset boundary

**Product category (binding):** **"AI-assisted protected Solana vault for Vietnamese crypto users."**

**Corrected product claim (binding, Stage 4.1 — use this wording):**
> "BÙA is an AI-assisted protected Solana vault for Vietnamese crypto users. In its normal protected flow, supported outgoing proposals are simulated, decoded and explained before the Guardian decides whether to co-approve; Squads requires two of three approvals, while a separately stored offline recovery key provides an explicit emergency bypass."

**BÙA protects only assets held inside the BÙA Squads vault.** It has no visibility into and no authority over transactions the user signs directly from an ordinary external wallet. If a user keeps funds in Phantom and signs a drainer there, BÙA cannot stop it — the user has not delegated anything to protect.

**What this changes:** BÙA is not a universal wallet shield. It is a protected *account* that a user deliberately moves value into — the on-chain equivalent of a savings account with a co-signer, versus the cash in your pocket. Adoption therefore requires a funding step, and the pitch must own that instead of implying blanket protection.

**Consequently retired** (these were wrong in `04_…` and must not be spoken):
- ❌ "A compromised phone cannot move funds by itself." → only true **for vault assets**.
- ❌ Any framing where a judge's own external wallet is protected by BÙA.
- ❌ Any implication that installing BÙA protects existing holdings without moving them into the vault.

---

## 2. Correction — component responsibilities

The phrase **"AI simulates the transaction" is false and is removed everywhere.** The correct division:

| Component | Responsibility | Trust level |
|---|---|---|
| **Solana RPC** | Executes `simulateTransaction`. Sole source of execution truth. | Authoritative |
| **Deterministic decoders** | Extract programs, instructions, authorities, recipients, token movements, balance effects, inner instructions, and logs from the simulation result into a structured evidence object. No judgment. | Deterministic, testable |
| **AI risk engine** | Interprets the structured evidence, flags semantic and unfamiliar risk patterns, and explains consequences in Vietnamese. **Produces an opinion, never an action.** | Advisory |
| **Guardian policy engine** | Decides whether the guardian's approval vote may be released, using deterministic rules first and the AI verdict second. | Decisive (off-chain) |
| **Guardian Service (signer)** | Holds the guardian member key and casts the approve/reject vote as instructed by the policy engine. | Signer |
| **Squads program (on-chain)** | Enforces that the approval threshold is met before a vault transaction may execute. | Enforcing |

**The AI model never possesses, touches, or uses a private key.** The signer is the Guardian Service operating under a restricted policy; the AI is one input to that policy.

### 2.1 Supported MVP transaction types (fail-closed on everything else)

The MVP decodes and reasons about exactly these. **No claim of general Solana coverage is permitted.**

| # | Program | Instruction | Why included |
|---|---|---|---|
| 1 | System | `Transfer` | SOL leaving the vault |
| 2 | SPL Token | `Transfer` / `TransferChecked` | Token leaving the vault |
| 3 | SPL Token | `Approve` / `ApproveChecked` | **Delegation — the classic drainer** |
| 4 | SPL Token | `SetAuthority` | Account takeover |
| 5 | SPL Token | `CloseAccount` | Sweep-and-close |
| 6 | Associated Token Account | `Create` | Benign, required alongside transfers |

Anything else — unknown program, undecodable instruction, unexpected CPI depth — resolves to **UNSUPPORTED → guardian abstains**. The user is told plainly: *"Bùa chưa hỗ trợ loại giao dịch này nên không phê duyệt."*

---

## 3. Signer topology — comparison and binding recommendation

### 3.1 Comparison

| | **2-of-2** (user + guardian) | **2-of-3** (user + guardian + offline recovery) |
|---|---|---|
| Normal operation | user + guardian | user + guardian |
| Attacker holds hot key only | Blocked ✓ | Blocked ✓ |
| **Guardian outage / team disappears** | **Funds permanently frozen ✗** — Squads has no threshold-lowering escape; `timeLock` delays execution, it does not reduce the threshold | user + recovery key executes without the guardian ✓ |
| Hot key lost | Unrecoverable ✗ | guardian + recovery key ✓ (requires the user's physical cold key) |
| Guardian acting alone | Impossible ✓ | Impossible ✓ |
| New collusion risk | — | guardian + recovery — but the recovery key is held **by the user**, offline, so this requires compromising the user's cold storage |

**`04_…` claimed an "escape timelock" that let the user exit unilaterally if BÙA disappeared. That feature belonged to the abandoned custom Anchor program and does not exist in Squads. Under 2-of-2 the honest answer to "what if you disappear?" would have been "your funds are frozen forever." That claim is retracted.**

### 3.2 Binding recommendation: **2-of-3, threshold = 2**

| Member | Key held by | Storage | Squads permissions |
|---|---|---|---|
| **User hot wallet** | User | Phantom/Solflare on device | Almighty (7) |
| **BÙA Guardian Service** | BÙA | Server-side signer, Devnet-only for the hackathon | **Voter (2) only** — cannot propose, cannot execute |
| **Offline recovery key** | **User** | Cold: paper/hardware, stored separately from the phone | Almighty (7) |

Granting the guardian **Voter only** is deliberate and is the strongest answer to "aren't you a custodian?" — the guardian's entire on-chain power is one bit, cast on a proposal it cannot create and cannot execute.

**Config:** `config_authority = None` (**autonomous multisig**) so that adding members or changing the threshold itself requires a threshold-approved proposal. Without this, a config-authority key is a complete bypass of every guarantee below. **`timeLock = 0` for the MVP demo** (the demo must run in 90 seconds); **production sets `timeLock > 0`** so that an approved-but-unwanted proposal can be cancelled inside the delay window.

### 3.3 Operational properties

- **Propose:** user hot wallet, or recovery key. **Guardian cannot propose.**
- **Approve / reject:** all three members may vote; guardian votes per policy.
- **Execute:** user hot wallet or recovery key, once threshold is met. **Guardian cannot execute.**
- **Guardian key protection — hackathon:** keyfile/env var on the signing service only; never in the frontend, never in the repo (pre-push secret scan); Devnet keypair with no mainnet value. **Production (not built):** HSM/KMS custody, isolated signing service, mTLS, per-request audit log, separate approval quorum for key export.
- **Fail-closed:** the guardian **abstains** (casts no approval) whenever simulation fails, decoding fails, the instruction set is UNSUPPORTED, the AI is unavailable *and* deterministic rules do not clear it, confidence is below threshold, the on-chain proposal content does not match what the client claimed, or a rate limit is exceeded. Fail-closed here means *not approved* — **not** frozen: the user + recovery path remains open. This is the second reason to prefer 2-of-3.
- **Replay / duplicate-request protection:** the guardian re-reads the `VaultTransaction` account **from chain** and re-derives the message itself — client-supplied payloads are never trusted, because a malicious dApp could describe a benign transfer while the on-chain object drains the vault. Decisions are keyed idempotently on `(multisig_pda, transaction_index, on-chain message hash)`; the guardian votes at most once per index and never re-votes on altered content.
- **Rate limiting:** per-multisig proposal rate (e.g. ≤10/hour), rolling aggregate outflow cap per window, and a global service limit. Breach → abstain + notify the user.
- **Key rotation:** guardian rotation is a config-change proposal approved by user + recovery. Documented; **not implemented in the MVP.**
- **Guardian outage:** user + recovery key proceed without BÙA. No freeze.
- **Recovery (hot key lost):** guardian + recovery key approve a transfer to a fresh vault, or a config change adding a new hot key. Requires the user's physical cold key, so the guardian cannot act alone.
- **Why a compromised device cannot immediately bypass protection:** the hot key is one vote of the two required; the recovery key is offline and not on the device; the guardian applies policy and withholds approval; and because the multisig is autonomous, the attacker cannot rewrite the threshold or add themselves as a member without — again — a second approval.
- **Honest residual risks:** an attacker who obtains **both** the hot key and the offline recovery key wins outright. An attacker with the hot key can spam proposals (mitigated by rate limiting, not eliminated). A guardian false negative approves a harmful proposal. **These are disclosed, not concealed.**

**Hackathon vs production.** *Built:* 2-of-3 vault with autonomous config, guardian Voter-only, policy engine with deterministic + AI tiers, fail-closed abstention, idempotent vote records, basic rate limiting. *Production work, explicitly not built:* HSM key custody, guardian key rotation flow, non-zero `timeLock` with cancel UX, monitoring/alerting, threat-DB operations, formal audit, incident response, multi-tenant scaling.

---

## 4. Correction — the enforcement claim *(revised, Stage 4.1)*

**Squads enforces exactly one thing: the 2-of-3 threshold.** It does not know what BÙA is, does not require simulation, does not require AI analysis, and does not privilege the guardian's vote over any other member's. Because the user hot wallet and the offline recovery key both hold Almighty (which includes Vote), **those two keys can reach threshold on their own — without the guardian, and therefore without any BÙA analysis at all.**

**Binding formulation:**

> **The AI detects and explains risk off-chain. Squads enforces on-chain only that two of the three members have approved. In the normal protected flow the second approval is the Guardian's, and the Guardian Service releases its vote only after simulation, deterministic decoding, risk analysis and policy approval. The separately stored offline recovery key is an explicit emergency bypass of that flow.**

### 4.1 The two flows, stated precisely

| Flow | Approvers | BÙA analysis performed? |
|---|---|---|
| **Normal protected flow** | user hot wallet + **Guardian** | **Yes** — the Guardian will not release its vote without it |
| **Emergency recovery / break-glass** | user hot wallet + **offline recovery key** | **No** — deliberate, user-initiated bypass requiring physical possession of the cold key |

**Recovery is a break-glass bypass, not an AI-approved path.** It exists so that a guardian outage or a BÙA shutdown cannot freeze the user's funds; the price is that it also bypasses protection, which is precisely why the key must be stored offline and separately.

### 4.2 Prohibited absolute claims (retracted)

- ❌ "Every vault proposal is analysed by BÙA."
- ❌ "Every vault transaction requires Guardian approval."
- ❌ "A vault transaction can never execute without Guardian approval."
- ❌ "On-chain logic forces AI analysis / Solana simulation."
- ❌ Any sentence implying the chain evaluates, judges, understands or detects a transaction.

### 4.3 Claims that remain exactly true

- ✅ **A compromised hot wallet alone cannot reach threshold** — one vote of two, and the autonomous config blocks threshold tampering.
- ✅ **A compromised Guardian alone cannot initiate or execute** a vault transaction — Voter-only permission.
- ✅ In the normal protected flow, a proposal the policy engine denies **does not receive the Guardian's vote**, and therefore does not reach threshold **by that path**.
- ✅ **The blockchain does not detect scams. It only enforces the approval condition.**

---

## 5. Correction — demo evidence

`04_…` §9 is replaced. The demo is **two proposals against the same vault**, shown back to back.

### 5.1 SAFE PROPOSAL
1. Vault balance captured **before** (on screen, and via Explorer).
2. Proposal created on Devnet (vault transaction + proposal).
3. Guardian service reads it from chain, simulates, decodes, scores.
4. Vietnamese explanation shown beside the decoded evidence.
5. Guardian **approves** → threshold reached.
6. `vaultTransactionExecute` succeeds.
7. **Evidence shown:** execution transaction signature on Explorer; proposal status = executed; **vault balance changed** by exactly the expected amount.

### 5.2 RISKY PROPOSAL
1. Vault balance captured **before**.
2. Malicious proposal created on Devnet — recommended: SPL `Approve` granting unlimited delegate authority to an unknown address (decodable, unmistakably harmful, and the real-world drainer pattern).
3. Guardian simulates and decodes; harmful consequence displayed in Vietnamese, each sentence tied to a decoded fact.
4. Guardian **submits an on-chain `proposalReject`** (preferred — a real transaction with a real signature), or abstains if reject is unavailable for the configuration.
5. Threshold is **not** reached.
6. `vaultTransactionExecute` **cannot** succeed.
7. **Evidence shown:** the rejection transaction signature on Explorer; proposal status (rejected / not approved); **vault balance unchanged**, verified live.

**Optional strong addition — the unauthorized execution attempt.** Deliberately submit `vaultTransactionExecute` against the unapproved proposal. This produces a **real submitted transaction with a real signature that fails with a confirmed Squads program error**, and is the single most persuasive artifact available. **Only claim it if the signature and the confirmed error actually exist** — capture both in I0.

**Retracted:** `04_…` §9's "the drainer is submitted with `skipPreflight` so it lands and fails on-chain, the centrepiece proof." In the Squads architecture the risky transfer is never submitted as a user transaction at all — it is a proposal that never reaches threshold. **Do not describe the risky transfer as a failed on-chain transaction** unless the optional execution attempt above was genuinely performed and confirmed.

---

## 6. AI necessity and safety envelope

AI remains essential — it performs semantic and unfamiliar-pattern risk interpretation and Vietnamese consequence explanation, neither of which the decoders or the rule tier can do — while holding **zero** unilateral authority over funds.

| Element | Specification |
|---|---|
| **Structured input** | `{instructions[]: {program_id, name, decoded_args, accounts[]}, balance_effects[]: {account, mint, pre, post, delta}, authorities_granted[], recipients[]: {address, is_known_to_user, first_seen}, simulation_logs[], threat_db_hits[], unsupported_flags[]}` — all machine-produced from the simulation. |
| **Structured output** | `{verdict: SAFE \| RISKY \| UNKNOWN, risk_score: 0–100, confidence: 0–1, reasons[]: {claim, evidence_ref}, vi_explanation, unsupported: bool}` |
| **Confidence score** | Required on every verdict. `confidence < 0.7` → treated as UNKNOWN. |
| **Evidence references** | Every `claim` cites an `evidence_ref` into the structured input. An output validator **drops any uncited claim before display** and, if a dropped claim was load-bearing, downgrades the verdict to UNKNOWN. |
| **Deterministic hard-deny rules** (run first, independent of AI; any hit ⇒ no approval) | (a) `Approve`/`ApproveChecked` with unlimited or near-balance delegation to an address with no prior history; (b) `SetAuthority` on a vault-owned token account; (c) `CloseAccount` with a non-vault destination; (d) outflow ≥ 90% of vault balance to a first-seen address; (e) any instruction outside the supported set. |
| **AI risk threshold** | `risk_score ≥ 60` ⇒ no approval. `30 ≤ risk_score < 60` ⇒ no approval + friction message. `< 30` **and** confidence ≥ 0.7 **and** no hard-deny ⇒ approval permitted. |
| **UNKNOWN / UNSUPPORTED** | Both resolve to **no approval**, with a plain-Vietnamese explanation of why. Never a silent approval. |
| **Prompt-injection boundaries** | Token names, symbols, metadata URIs, memo text, dApp descriptions and any webpage content are **untrusted data, never instructions**. They are passed in a quarantined field, never in the system prompt, and the model is contractually restricted to reasoning from `instructions[]` and `balance_effects[]`. A verdict may **never** be justified by a string field alone. |
| **False positives** | The user is never locked out: they may proceed via the recovery key, and the FP is logged for rule tuning. FP rate is measured on the frozen benign set and published on the slide. |
| **False negatives** | Possible and disclaimed in-product. The system degrades to *no worse than an unguarded vault*. `timeLock > 0` in production adds a cancel window. |
| **Frozen evaluation dataset** | **40 transactions — 20 risky (≥4 of the 5 supported harmful patterns) and 20 benign** — frozen and hashed into the repo **before** the demo, never edited afterwards. Reported: precision, recall, FP rate on the benign set. If it is not frozen before the demo, the metrics slide is dropped (`05_…` gate C3). |
| **Requires recovery or human review** | Repeated hard-deny hits on one vault; rate limit breached; on-chain content mismatching the client's description; guardian outage; any suspected hot-key compromise. |

---

## 7. Architecture coherence verdict

The corrected architecture is **technically coherent**: every enforcement claim maps to a Squads mechanism confirmed in official documentation; every AI claim is advisory and bounded; the protected-asset boundary is stated; the demo produces artifacts that genuinely exist; and the two properties that `04_…` overclaimed (universal wallet protection, unilateral escape timelock) have been retracted and replaced with weaker true statements — with the 2-of-3 topology actually *strengthening* the compromised-device story relative to the retracted design.

**Remaining dependency:** every unverified item is empirically settled by the I0 spike (`07_…`) before any UI work begins. **Proceed to I0.**
