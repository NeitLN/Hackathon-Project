# 00_STATE

CURRENT_STAGE: I0_SPIKE_PARTIAL_BLOCKED

---

## Competition
UniHackfest 2026 — Corelia Academy × UEF. Solana-based, AI × Web3. **No Bitcoin component exists in any official source.**

## Selected project
**BÙA** — *"Scam gõ cửa. Bùa đóng cửa." / "Warnings inform. Bùa protects."*
**Product category (Stage 4, binding):** *AI-assisted protected Solana vault for Vietnamese crypto users.*
Every transfer out of the BÙA vault is simulated by Solana RPC, decoded deterministically, explained in plain Vietnamese by an AI risk engine, and cannot execute unless the guardian releases its approval.
**Track:** Best Product & Business · **Theme:** Consumer dApps · **Score:** 87.5/100 (Rubric A) · **Confidence:** 72% · **Verdict: CONDITIONAL GO**

### Stage 4 architecture freeze
- **Signer topology: Squads v4 2-of-3, threshold 2** — user hot wallet (Almighty), BÙA Guardian Service (**Voter only**), user's offline recovery key (Almighty); `config_authority = None`; `timeLock = 0` for the MVP.
- **Protection boundary:** BÙA protects **only assets held inside the BÙA vault** — never assets in an ordinary external wallet.
- **Responsibility split:** Solana RPC simulates · deterministic decoders extract · the AI risk engine interprets and explains in Vietnamese · the policy engine decides · the Guardian Service signs. **The AI never holds or uses a private key.**
- **Enforcement claim (corrected, Stage 4.1):** the AI detects and explains risk off-chain; **Squads enforces on-chain only that two of the three members approved.** In the normal protected flow the second approval is the Guardian's, released only after simulation, decoding, risk analysis and policy approval. The offline recovery key is an **explicit emergency bypass** — hot key + recovery key reach threshold without BÙA and without any analysis. **The blockchain does not detect scams.** Retracted as false: "every proposal is analysed by BÙA", "every vault transaction requires Guardian approval", "can never execute without Guardian approval", "on-chain logic forces AI analysis".
- **Supported MVP transaction types (fail-closed on all others):** System `Transfer`; SPL `Transfer`/`TransferChecked`, `Approve`/`ApproveChecked`, `SetAuthority`, `CloseAccount`; ATA `Create`.
- **Retracted overclaims:** the "escape timelock" (does not exist in Squads — replaced by the user's offline recovery key), universal wallet protection, "AI simulates the transaction", and describing the risky transfer as a failed on-chain transaction.

## Stage log

| Stage | Status | Date | Output |
|---|---|---|---|
| Stage 1 — Opus competition research & compact brief | **COMPLETE** | 2026-08-12 | `01_OPUS_COMPETITION_BRIEF.md` (3,900 words) |
| Stage 2 — Single Fable run (one-shot creative synthesis) | **COMPLETE** | 2026-08-12 | `02_FABLE_ONE_SHOT_HANDOFF.md` (3,837 words; 5 concepts, gates, dual-rubric scoring, Top 3 refined) |
| Stage 3 — Opus red team, final decision, blueprint, build plan | **COMPLETE** | 2026-08-12 | `03_OPUS_FINAL_DECISION.md`, `04_WINNING_BLUEPRINT.md`, `05_BUILD_DEMO_AND_PITCH_PLAN.md` |
| Stage 4 — Technical reality check & architecture freeze | **COMPLETE** | 2026-08-12 | `06_TECHNICAL_REALITY_CHECK.md`, `07_I0_TECHNICAL_SPIKE_SPEC.md`; targeted corrections applied to `04_…` and `05_…` |
| Stage 4.1 — Semantic correction (Guardian is not mandatory on-chain) | **COMPLETE** | 2026-08-12 | Absolute "requires Guardian approval" claims retracted across `04_…`–`07_…` and `00_STATE.md` |
| Stage 5 — I0 technical spike | **PARTIAL — BLOCKED** | 2026-08-12 | `08_I0_SPIKE_RESULTS.md`, `spike-i0/spike.mjs`, `spike-i0/spike-evidence.md`. Pre-chain checks all PASS; 8 on-chain criteria unexecuted — Devnet faucet refuses this host (IP-scoped 429) |
| Stage 5 attempt 2 — post-funding re-run | **PARTIAL — BLOCKED** | 2026-08-12 | Funding reported but **did not arrive**: balance 0 on devnet/testnet/mainnet at all commitments, empty signature history, `getAccountInfo → null`. Keypair identity verified unchanged; deps intact; spike exited at the funding guard with zero on-chain side effects |

## Stage 3 final audit — verified before approval

- [x] **AI essential** — zero-day scam generalization + grounded Vietnamese narration; a blocklist cannot do either
- [x] **Solana essential** — binding non-custodial dual control, escape timelock, trustee recovery; no Web2 equivalent without custody
- [x] **All five Hard Gates pass** (independently re-applied; see `03_…` §5)
- [x] **Web2 Replacement Test passes** — cleanest result of the three finalists
- [x] **MVP buildable within the timebox** — a 24h Tier-0 variant exists that needs no custom Rust (composes Squads v4)
- [x] **Live demo contains genuine verifiable evidence** — a failed transaction and a successful transfer, both on Solana Explorer
- [x] **Claims match architecture** — claim discipline fixed in `04_…` §10; the chain is never said to detect scams
- [x] **Critical risks have fallbacks** — four-tier fallback ladder + 12-item risk register
- [x] **Nothing unresolved makes the project misleading or unsafe** — the escape-timelock limitation is disclosed, not concealed

## Independent ranking (Opus, differs from Fable)
1. **BÙA 87.5** (selected) · 2. MANDATE 79.25 (rejected: overclaims what the chain enforces; Squads v4 already ships the primitive; most Rust-dependent with U5 open) · 3. HỤI MINH 78.25 (**ineligible — Hard Gate 2 FAIL**; AI is removable without changing the product).
Ranking is **stable under both official rubrics**, so open question U2 does not affect the decision.

## Conditions attached to the GO (satisfy within 48h)
1. Confirm the real submission deadline (**U4**) and select the matching 24/48/72h plan.
2. Confirm one developer can wire wallet + Squads 2-of-3 + an RPC simulation call (**U5**); if not, drop to the pre-configured-vault variant.
3. Register **Track 1 — Best Product & Business**, theme **Consumer dApps**.

## Open unknowns (do not fabricate)
- **U4** submission deadline / remaining build time · **U5** team composition and capability · **U6** partner-school vs Open pool · **U2** governing rubric (no decision impact) · hụi denomination legality (moot — HỤI MINH rejected on Gate 2).

## Fable budget
USD 15 authorized; **one session used**. No further Fable run is planned or needed. Reserve intact.

## Next action — ONE human action unblocks everything

The I0 spike is written, verified and ready. It has now stopped at its funding guard **twice**. Funding was reported as sent, but direct RPC verification shows **the wallet has never been touched on any cluster** — balance 0 on devnet/testnet/mainnet at every commitment level, empty signature history, and `getAccountInfo → null`.

**Fund the wallet, then confirm the balance is non-zero BEFORE re-running:**
```bash
solana airdrop 2 F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg --url devnet
solana balance F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg --url devnet   # MUST print > 0
cd "Hackathon AI & Web3/spike-i0" && node spike.mjs
```
If the faucet returns `429`, use `https://faucet.solana.com` in a browser or transfer from an existing devnet wallet. **0.5 SOL is enough.** The likeliest explanation for attempt 2 is that the airdrop failed with the same IP-scoped `429` and left no on-chain trace; a destination typo is the other candidate (check the exact casing: `F1fA4WPrb…`).

On a clean run, set `CURRENT_STAGE: I0_TECHNICAL_SPIKE_PASSED_BUILD_GO`.

**Squads v4 is confirmed live on Devnet** (`SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf`, `executable: true`) — risk R5 retired, **Cut A not needed**. `proposalReject` confirmed present — **Cut E not needed**. No scope cuts are triggered.

Still unresolved and still not to be fabricated: **U4** deadline · **U5** team capability · **U6** qualifier pool.
