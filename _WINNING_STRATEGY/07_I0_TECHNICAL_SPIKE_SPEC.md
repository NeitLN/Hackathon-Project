# 07 — I0 TECHNICAL SPIKE SPECIFICATION

**Purpose:** empirically settle every unverified assumption in `06_TECHNICAL_REALITY_CHECK.md` before any product work begins.
**Hard time box: 3 hours.** One or two people. **No UI. No AI. No styling. No product code.**
**Rule:** if the spike has not passed at 3:00, stop and apply the scope cut for whichever item failed. Do not extend the box.

**Deliverable:** a single throwaway script plus `spike-evidence.md` recording, for every item, the command run, the output, the transaction signatures, the Explorer URLs, and the observed balances. This file is the input to the go/no-go on the full build and is later reused as demo scaffolding.

---

## Setup (0:00–0:20, not itself a PASS item)

Devnet RPC endpoint (plus one backup) · three keypairs generated and saved (`user_hot`, `guardian`, `recovery`) · `user_hot` and `recovery` airdropped Devnet SOL · `@sqds/multisig` TypeScript SDK installed · a Devnet SPL test mint created with a supply minted to the vault once it exists.

**Setup abort condition:** if the Squads v4 program cannot be located on Devnet within 20 minutes, go directly to **Cut A** (§3) — this is the single highest-risk assumption in the project (`06_…` §0 marks it INFERENCE).

---

## 1. The eight PASS items

| # | Item | Objective PASS criterion | Budget |
|---|---|---|---|
| **1** | **A funded Squads vault exists on Devnet** | A multisig account is created on Devnet with `threshold = 2`, three members (`user_hot` Almighty, `guardian` **Voter-only**, `recovery` Almighty), `config_authority = None`, `timeLock = 0`. The derived vault PDA holds **> 0 SOL and > 0 test-SPL**. Multisig address, vault PDA and creation signature are recorded with an Explorer link, and the on-chain member/permission/threshold values are **read back and printed** to confirm they match what was set. | 0:20–0:50 |
| **2** | **A vault transaction proposal can be created programmatically** | Two proposals are created from code (not the Squads UI): **P-SAFE** = SPL `Transfer` of a small amount from the vault to a known address; **P-RISKY** = SPL `Approve` granting unlimited delegate authority over the vault's token account to an unrelated address. Both `vaultTransactionCreate` + `proposalCreate` signatures recorded. Both proposal accounts fetched and printed with their `transaction_index` and initial status. | 0:50–1:15 |
| **3** | **The proposal can be simulated or reconstructed for simulation** | For each proposal, the **inner transaction message is read back from the on-chain `VaultTransaction` account** (not from local memory), reconstructed, and simulated via `simulateTransaction` with `sigVerify: false`, `replaceRecentBlockhash: true`, `innerInstructions: true`, and `accounts.addresses` covering the vault and its token accounts. PASS requires the simulation to return **pre/post balances that differ correctly for P-SAFE**, and for P-RISKY to return a decodable `Approve` with its delegate and amount. Raw simulation JSON saved. | 1:15–1:50 |
| **4** | **A service-controlled second member can approve a safe proposal** | The `guardian` keypair — held only by the script, never by the proposer — submits `proposalApprove` for **P-SAFE**. Signature recorded. Proposal re-fetched; approval count/status reflects two approvals. | 1:50–2:05 |
| **5** | **A risky proposal remains unapproved** | The guardian submits `proposalReject` for **P-RISKY** (preferred, signature recorded) **or**, if reject is unavailable for this configuration, casts no vote at all. Proposal re-fetched: status is **not** approved. **Which of the two paths occurred must be written down verbatim** — the demo script in `05_…` depends on it. | 2:05–2:20 |
| **6** | **The safe proposal can execute** | `vaultTransactionExecute` on **P-SAFE** succeeds. Signature + Explorer link recorded. **Vault balance re-read and confirmed changed by exactly the expected amount.** | 2:20–2:35 |
| **7** | **The risky transfer does not execute while the Guardian withholds its vote** *(the recovery key is deliberately NOT used here — with it, the user could reach threshold and bypass BÙA by design; see `06_…` §4)* | `vaultTransactionExecute` is **deliberately attempted** on **P-RISKY**. PASS = it does not succeed. Record which of the two occurred: **(a)** the transaction was submitted, confirmed, and **failed with a Squads program error** — capture the signature **and** the exact error, this is the strongest demo artifact; or **(b)** it was rejected client-side/at preflight and never landed. **Vault balance and the token account's delegate field are re-read and confirmed unchanged.** | 2:35–2:50 |
| **8** | **Evidence can be captured** | `spike-evidence.md` exists containing: multisig address, vault PDA, both proposal indices, every signature with its Explorer URL, both proposals' final statuses, the raw simulation JSON for both, and before/after vault balances **and** delegate state. | 2:50–3:00 |

**Overall PASS = items 1–8 all pass.** Items 1, 3, 6 and 7 are load-bearing: a failure in any one of them changes the architecture, not merely the schedule.

---

## 2. What the spike deliberately does not do

No frontend, no wallet-adapter integration, no AI call, no Vietnamese copy, no threat database, no styling, no deployment, no custom Anchor program, no error handling beyond printing. Every one of these is cheaper to build **after** the spike proves the substrate, and building any of them first is the classic way to lose a hackathon.

---

## 3. Scope cuts — exact response to each failure

| Failed item | Diagnosis | **Cut** |
|---|---|---|
| **1** — Squads v4 unusable on Devnet | The Tier-0 substrate does not exist | **Cut A — architecture change.** Fall back to a **minimal custom Anchor 2-of-3 program**: one `Vault` PDA, `propose` / `approve` / `execute`, threshold 2, no timelock, no recovery flow. This costs roughly 8–12 hours and **requires the 72h plan plus a capable Rust dev (U5)**. If neither is available, **Cut A′**: demonstrate enforcement with an SPL **multisig-owned token account** (2-of-3 signers) — weaker and token-only, but real on-chain threshold enforcement. Escalate to the decision owner before choosing. |
| **2** — proposals cannot be created from code | SDK/API friction only | **Cut B.** Create both proposals **by hand in the Squads UI** before the demo and drive only approve/reject/execute from code. Costs realism in the pitch; costs nothing in evidence quality. Say so on stage. |
| **3** — inner message cannot be reconstructed and simulated | Simulation fidelity lost | **Cut C.** Simulate the **equivalent standalone instruction** with the vault PDA as fee payer and `sigVerify: false`, and state plainly that the simulation is of an equivalent constructed transaction rather than the vault-wrapped one. **Do not claim to simulate the proposal itself.** If even this fails, drop to decoding the on-chain instruction data only, present *decoded intent* rather than *simulated effect*, and remove every "we simulate" claim from the pitch. |
| **4** — guardian cannot approve programmatically | Signing/permission problem | Re-check that `guardian` holds Voter permission and is a member. If unfixable in 15 minutes, **Cut D**: guardian approves via the Squads UI on a second screen — visually *better* for the audience, worse for the "automated policy engine" story. Adjust the pitch, do not adjust the claim. |
| **5** — reject unavailable | Cosmetic | **Cut E.** Guardian abstains; the evidence becomes *proposal never reached threshold* + *balance unchanged*. Remove "the guardian submits an on-chain rejection" from the script. |
| **6** — safe proposal cannot execute | The happy path is broken — **most serious failure of all** | **Stop.** Do not proceed to product work. Debug within a fresh 60-minute box; if still failing, invoke **Cut A**. A demo with no successful transaction has nothing to show. |
| **7** — the risky transfer *does* execute | The core security claim is false | **Stop immediately and escalate.** Almost certainly a misconfiguration (threshold ≠ 2, guardian wrongly permissioned, or `config_authority` set). Re-verify item 1's read-back. If the risky transfer genuinely executes without a second approval, the enforcement claim is void and `CURRENT_STAGE` returns to `BLOCKED_ARCHITECTURE_REVISION_REQUIRED`. |
| **8** — evidence not captured | Discipline failure | No cut — **spend the last 10 minutes capturing it.** Undocumented evidence is indistinguishable from no evidence in front of judges. |

---

## 4. On completion

1. Record overall PASS/FAIL and each item's result in `spike-evidence.md`.
2. On **PASS** — proceed to `05_…` phase P1, reusing the spike script as the demo backbone; the two proposals become the SAFE/RISKY demo pair (`06_…` §5).
3. On **FAIL** — apply the cut above, re-time-box, and re-run only the failed items. Report the architecture change before building on it.
4. Either way, paste the SAFE execution signature and the RISKY rejection/failure signature into the demo README immediately. They are the two artifacts the entire pitch rests on.
