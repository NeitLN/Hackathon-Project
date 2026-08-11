# 08 — I0 TECHNICAL SPIKE RESULTS

**Spec:** `07_I0_TECHNICAL_SPIKE_SPEC.md` · **Raw evidence:** `spike-i0/spike-evidence.md` · **Runner:** `spike-i0/spike.mjs`
**Attempt 1** 2026-08-11T21:58Z–22:11Z · **Attempt 2** 2026-08-11T22:30Z · **Elapsed ≈ 35 min of the 3-hour box**
**Result: PARTIAL — BLOCKED ON DEVNET FUNDING. No criterion failed on technical grounds.**

> ### ⚠️ Attempt 2 (post-funding-report): the funding did not arrive
> Funding was reported as provided to `F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg`. Direct RPC verification shows it did not land:
> - **Balance 0** on **devnet, testnet and mainnet**, at `processed`, `confirmed` and `finalized`.
> - **`getSignaturesForAddress` → `[]`** — no transaction has ever touched this address.
> - **`getAccountInfo` → `value: null`** — the account does not exist on-chain.
>
> `value: null` plus empty history is conclusive: this is not RPC lag or a stale node. A confirmed transfer appears in history immediately at `processed` commitment.
>
> **Verified and unchanged:** `keys/user_hot.json` resolves to exactly `F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg` (**no keypair regenerated**); dependencies load cleanly (**no reinstall**). `spike.mjs` ran, verified the Squads program at runtime, hit its funding guard at `balance = 0 SOL`, and exited with **zero on-chain side effects**.
>
> **Most likely cause:** the airdrop silently failed with the same IP-scoped `429` seen in attempt 1 — a failed airdrop leaves no on-chain trace, exactly matching the empty history. Second possibility: a destination-address typo. Wrong-cluster is ruled out. If you have an airdrop transaction signature, check it at `https://explorer.solana.com/tx/<SIG>?cluster=devnet` and confirm the destination matches the address exactly.

---

## 1. Headline

Two things happened, and they point in opposite directions.

**The good:** the project's single highest-risk assumption is now **FACT**. Squads v4 is live and executable on Solana Devnet at `SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf`, the SDK exposes every instruction the architecture depends on — **including `proposalReject`** — and the permission model encodes the frozen 2-of-3 topology exactly. Risk **R5 is retired** and spike contingency **Cut A (custom Anchor fallback) is not needed**.

**The blocker:** the Solana Devnet faucet refuses this host. Airdrops fail with `429 — "You've either reached your airdrop limit today or the faucet has run dry"`, and a **freshly generated address is refused too**, which proves the limit is IP-scoped rather than address-scoped. Six alternative RPC endpoints were tried; none serves airdrops without an API key. There is no `~/.config/solana/id.json` on this machine. `https://faucet.solana.com` requires third-party sign-in and/or a CAPTCHA, which I will not complete on the user's behalf.

Without ~0.5 Devnet SOL, **no on-chain criterion can be executed** — account rent and transaction fees are unavoidable. `spike.mjs` detected this at its funding guard and exited cleanly at exit code 2 **without creating anything on-chain**.

This is a ~30-second fix requiring one human action (§5).

## 2. Environment

Node v24.12.0 · npm 11.6.2 · `@sqds/multisig` 2.1.4 · `@solana/web3.js` 1.98.4 · `@solana/spl-token` 0.4.15 · no Solana CLI.
RPC `https://api.devnet.solana.com` (devnet, `solana-core 4.2.0-rc.0`).

**Ephemeral Devnet addresses (public only):** `user_hot` `F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg` · `guardian` `BGCAHV1uFrmq5BKC5SjPuX9xMgZLJjSAcasMwXz6ycCG` · `recovery` `39rnoEKddPebD32tw5rUn2J9oF2QZNK4zYGcudGQRMgu`.

## 3. Eight-criteria table

| # | Criterion | Status | Exact cause |
|---|---|---|---|
| 1 | Create and fund a Squads v4 2-of-3 vault | **BLOCKED** | `user_hot` = 0 SOL; cannot pay rent or fees. **Precondition proven:** program executable on Devnet, re-verified at runtime |
| 2 | Read back members, permissions, threshold, config authority, vault address | **BLOCKED** | depends on 1 |
| 3 | Create SAFE and RISKY proposals programmatically | **BLOCKED** | depends on 1 |
| 4 | Retrieve/reconstruct each inner transaction and simulate | **BLOCKED** | depends on 3 |
| 5 | Guardian approves SAFE only | **BLOCKED** | depends on 3. *`proposalReject` confirmed available in the SDK* |
| 6 | Execute SAFE, confirm expected vault-balance change | **BLOCKED** | depends on 5 |
| 7 | Attempt RISKY execution; verify no harmful state change | **BLOCKED** | depends on 3 |
| 8 | Capture signatures, Explorer links, states, simulations, balances | **PARTIAL** | environment/pre-chain evidence captured; on-chain artifacts pending |

**PASS: 0 · FAIL: 0 · BLOCKED: 7 · PARTIAL: 1.** Nothing was disproven.

## 4. What *was* proven (pre-chain, all PASS)

| Fact | Evidence | Doc impact |
|---|---|---|
| Squads v4 live on Devnet | `getAccountInfo` → `executable:true`, owner `BPFLoaderUpgradeab1e…`, 36-byte upgradeable-loader account | **R5 retired**; `06_…` §0 upgraded INFERENCE → FACT |
| SDK program ID matches the specified address | `multisig.PROGRAM_ID` = `SQDS4ep65…52pCf` | confirms the address recorded in Stage 4.1 |
| Permission encoding | `{Initiate:1, Vote:2, Execute:4}` | Almighty = 7, guardian Vote-only = 2 — the frozen topology is expressible exactly |
| **Full `ProposalStatus` set** | `isProposalStatus{Active,Approved,Rejected,Cancelled,Executed}` | `06_…` §0 previously recorded this as **undocumented**; now FACT |
| **`proposalReject` exists** | present in `multisig.rpc` | the demo's on-chain rejection artifact is achievable; **Cut E not needed** |
| Account readers + PDA helpers | `accounts.{Multisig,Proposal,VaultTransaction,ProgramConfig}`, `get*Pda` | item 4's read-back-from-chain design is supported |
| Devnet RPC reachable, simulation params available | `getVersion` OK; `sigVerify`/`replaceRecentBlockhash`/`accounts`/`innerInstructions` supported | item 4's simulation approach is sound |

## 5. The one action required

Fund the wallet **and verify the balance actually landed before re-running** — attempt 2 failed because the funding never arrived:

```bash
solana airdrop 2 F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg --url devnet
solana balance F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg --url devnet   # MUST print > 0
cd "Hackathon AI & Web3/spike-i0" && node spike.mjs
```

If the CLI faucet returns `429`, use `https://faucet.solana.com` in a browser, or transfer from any existing devnet wallet you control. **0.5 SOL is enough.** Do not re-run `spike.mjs` until the balance query returns non-zero — it will simply hit the funding guard again.

`spike.mjs` is complete and runs all eight criteria unattended: creates the 2-of-3 multisig (threshold 2, `configAuthority = null`, `timeLock = 0`), funds the vault, mints a Devnet SPL test token, creates the SAFE proposal (`TransferChecked` 10 tokens) and the RISKY proposal (`ApproveChecked` with `u64::MAX` unlimited delegation), reads both `VaultTransaction` accounts **back from chain**, decompiles the Squads message format into web3.js instructions, simulates both with `sigVerify:false` + `replaceRecentBlockhash:true`, has the guardian approve SAFE and reject RISKY, executes SAFE and asserts the exact token delta, attempts RISKY execution and classifies the outcome, then rewrites `spike-evidence.md` with every signature and Explorer link.

**Outcome classification is built in** per the Stage 4.1 requirement: the RISKY attempt is labelled *"FAILED ON-CHAIN (confirmed signature + program error)"* only when a signature and confirmed program error genuinely exist; otherwise it is labelled *"REJECTED BEFORE LANDING (client-side / RPC preflight simulation)"*. No overclaim is possible from the script's own output.

## 6. Security posture — verified

- Keys ephemeral, Devnet-only, generated locally in `spike-i0/keys/`.
- `.gitignore` line 1 = `keys/`; `git check-ignore -v` confirms all three files ignored.
- `git ls-files --error-unmatch keys/` → *"did not match any file(s) known to git"* — **no key material tracked**.
- `git status --porcelain` → only `?? "Downloads/Hackathon AI & Web3/spike-i0/"`. Nothing committed.
- No secret key material in any source file, log, evidence file, or Markdown.
- Guardian approval is produced by a service-controlled signer (`keys/guardian.json` loaded by the Node process), **never by an AI model**.
- Unsupported transaction types are not exercised in the spike; fail-closed handling remains a P2 build item.
- **Cut A (custom Anchor fallback) was NOT started**, per instruction.

## 7. Scope cuts required

**None.** No `07_…` §3 cut is triggered: every cut is keyed to a *technical* failure, and no technical failure occurred. Specifically **Cut A is not needed** (Squads confirmed on Devnet) and **Cut E is not needed** (`proposalReject` confirmed available). The blocker is an external service quota, resolved by §5.

## 8. Risk-register update for `05_…`

- **R5 — "Squads v4 not usable on Devnet" → RETIRED** (proven live).
- **R5b — "rejection evidence weaker than expected" → DOWNGRADED** (`proposalReject` confirmed present; final confirmation still needs the funded run).
- **NEW R13 — Devnet faucet quota.** *Likelihood M, Impact M.* The public faucet is IP-rate-limited and periodically dry. **Mitigation:** fund a long-lived Devnet keypair early and keep a reserve of ≥5 SOL; never depend on an airdrop succeeding on demo day; keep the demo vault pre-funded well in advance.
