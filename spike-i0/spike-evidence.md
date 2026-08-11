# BÙA — I0 TECHNICAL SPIKE EVIDENCE

**Attempt 1:** 2026-08-11T22:10:04Z — blocked (faucet 429, IP-scoped)
**Attempt 2:** 2026-08-11T22:30:00Z — **blocked again: the reported funding has not reached the wallet on any cluster**
**Outcome:** **PARTIAL — BLOCKED ON DEVNET FUNDING.** All pre-chain verification passes. The eight on-chain criteria remain unexecuted.

---

## 1. Environment (unchanged, dependencies intact — not reinstalled)

| Item | Value |
|---|---|
| Node | v24.12.0 |
| `@sqds/multisig` | 2.1.4 |
| `@solana/web3.js` | 1.98.4 |
| `@solana/spl-token` | 0.4.15 |
| RPC | `https://api.devnet.solana.com` — devnet, `solana-core 4.2.0-rc.0` |
| Squads v4 program | `SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf` |

`require('@sqds/multisig')` and `require('@solana/spl-token')` both load → **dependency installation is healthy; no reinstall performed.**

## 2. Keypair identity — VERIFIED, NOT REGENERATED

The existing gitignored keypairs were loaded and their public keys derived. **No keypair was regenerated or replaced.**

```
user_hot  -> F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg
guardian  -> BGCAHV1uFrmq5BKC5SjPuX9xMgZLJjSAcasMwXz6ycCG
recovery  -> 39rnoEKddPebD32tw5rUn2J9oF2QZNK4zYGcudGQRMgu
MATCHES EXPECTED: true
```

✅ `keys/user_hot.json` resolves to exactly `F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg`.

## 3. Balance verification — the funding did not arrive

### 3.1 Balance across clusters and commitment levels

```
devnet /processed: 0      testnet/processed: 0      mainnet/processed: 0
devnet /confirmed: 0      testnet/confirmed: 0      mainnet/confirmed: 0
devnet /finalized: 0      testnet/finalized: 0      mainnet/finalized: 0
```

### 3.2 Transaction history — empty
```
getSignaturesForAddress(F1fA4WPrb…nBsmg, limit 10)
-> {"jsonrpc":"2.0","result":[],"id":1}
```

### 3.3 Account existence — the account does not exist
```
getAccountInfo(F1fA4WPrb…nBsmg)
-> {"result":{"context":{"slot":483027497},"value":null}}
```

**`value: null` plus an empty signature history means this address has never been touched by any transaction on any cluster.** This is not a propagation delay or a stale-RPC artifact: a confirmed transfer would appear in signature history immediately at `processed` commitment, and the account would exist with a non-zero lamport balance.

Re-checked at slot 483027561 after a delay → still `0`.
Second-opinion RPC (Ankr devnet) → `Unauthorized: API key required`, so it could not corroborate; the three official cluster endpoints are conclusive on their own.

### 3.4 Explorer
`https://explorer.solana.com/address/F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg?cluster=devnet`
→ account not found / zero balance.

## 4. Spike execution — halted at the funding guard, nothing created on-chain

```
# BÙA I0 spike — started 2026-08-11T22:30:00.241Z
RPC=https://api.devnet.solana.com  cluster=devnet
@sqds/multisig=2.1.4 @solana/web3.js=1.98.4 @solana/spl-token=0.4.15 node=v24.12.0
user_hot=F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg
  guardian=BGCAHV1uFrmq5BKC5SjPuX9xMgZLJjSAcasMwXz6ycCG
  recovery=39rnoEKddPebD32tw5rUn2J9oF2QZNK4zYGcudGQRMgu
Squads v4 program verified: SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf
  executable=true owner=BPFLoaderUpgradeab1e11111111111111111111111
user_hot balance = 0 SOL

BLOCKED: user_hot needs >= 0.5 SOL on devnet.
```

No multisig, vault, mint, proposal, or transaction was created. **Zero on-chain side effects.**

## 5. Pre-chain verification — all still PASS

| Fact | Evidence |
|---|---|
| Squads v4 live on Devnet | `getAccountInfo` → `executable:true`, owner `BPFLoaderUpgradeab1e…`; re-verified at runtime this attempt |
| SDK program ID matches | `multisig.PROGRAM_ID` = `SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf` |
| Permission encoding | `{Initiate:1, Vote:2, Execute:4}` → Almighty 7, guardian Vote-only 2 |
| `ProposalStatus` set | `{Active, Approved, Rejected, Cancelled, Executed}` |
| `proposalReject` available | present in `multisig.rpc` |
| Simulation params available | `sigVerify`, `replaceRecentBlockhash`, `accounts`, `innerInstructions` |

## 6. Eight-criteria status — unchanged

| # | Criterion | Status | Cause |
|---|---|---|---|
| 1 | Create + fund Squads v4 2-of-3 vault | **BLOCKED** | wallet has 0 SOL and does not exist on-chain |
| 2 | Read back config | **BLOCKED** | depends on 1 |
| 3 | Create SAFE + RISKY proposals | **BLOCKED** | depends on 1 |
| 4 | Reconstruct inner txs + simulate | **BLOCKED** | depends on 3 |
| 5 | Guardian approves SAFE only | **BLOCKED** | depends on 3 |
| 6 | Execute SAFE + balance change | **BLOCKED** | depends on 5 |
| 7 | RISKY does not execute | **BLOCKED** | depends on 3 |
| 8 | Capture evidence | **PARTIAL** | this file; on-chain artifacts pending |

**PASS 0 · FAIL 0 · BLOCKED 7 · PARTIAL 1.** No criterion failed on technical grounds.

## 7. Likely causes of the missing funding

1. **The airdrop silently failed.** The public faucet returns `429` from many IPs; `solana airdrop` prints an error but leaves no on-chain trace — consistent with the empty history observed here.
2. **Wrong cluster.** Ruled out — testnet and mainnet are also 0.
3. **Wrong destination address.** Possible: an address typo would fund a different account. This wallet shows *no* history at all.
4. **Transaction never confirmed.** A dropped transaction leaves no trace, matching what is observed.

**To confirm on your side:** if you have the airdrop transaction signature, look it up at
`https://explorer.solana.com/tx/<SIGNATURE>?cluster=devnet` and check the destination matches `F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg` exactly (note the capital `F1fA4`, and `WPrb`). If the faucet returned an error rather than a signature, the airdrop did not happen.

## 8. To complete the spike

Fund the wallet with **≥ 0.5 SOL on devnet** (2 SOL recommended), verify it landed, then re-run:

```bash
solana airdrop 2 F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg --url devnet
solana balance F1fA4WPrbkeX1jmmiLDNFWSPJ7mcwvu5fqb5WManBsmg --url devnet   # must be > 0
cd "Hackathon AI & Web3/spike-i0" && node spike.mjs
```

Alternative if the CLI faucet is rate-limited: paste the address into `https://faucet.solana.com`, or transfer from any existing devnet wallet you control.

`spike.mjs` then runs all eight criteria unattended and rewrites this file with signatures, Explorer links, proposal states, simulation output and before/after balances.

## 9. Security posture — re-verified

- No keypair regenerated or replaced this attempt.
- `keys/` remains gitignored (`.gitignore` line 1); `git ls-files` reports no tracked key material.
- No secret-key material printed, logged, committed, or embedded in any file.
- Nothing committed.
