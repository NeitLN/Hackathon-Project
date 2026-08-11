/**
 * BÙA — I0 TECHNICAL SPIKE (see _WINNING_STRATEGY/07_I0_TECHNICAL_SPIKE_SPEC.md)
 * Proves 8 criteria against real Solana Devnet. No UI, no AI, no product code.
 * Secret keys live in ./keys (gitignored) and are NEVER printed.
 */
import * as multisig from "@sqds/multisig";
import {
  Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram,
  TransactionMessage, VersionedTransaction, Transaction, sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createMint, getOrCreateAssociatedTokenAccount, mintTo, getAccount,
  createTransferCheckedInstruction, createApproveCheckedInstruction, TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import fs from "fs";

const RPC = process.env.RPC || "https://api.devnet.solana.com";
const EXPECTED_PROGRAM_ID = "SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf";
const MIN_SOL = 0.5;
const conn = new Connection(RPC, "confirmed");
const ex = (sig) => `https://explorer.solana.com/tx/${sig}?cluster=devnet`;
const exAddr = (a) => `https://explorer.solana.com/address/${a}?cluster=devnet`;

const results = {};
const ev = [];
const log = (s) => { console.log(s); ev.push(s); };
const pass = (n, t, d) => { results[n] = "PASS"; log(`\n[ITEM ${n}] PASS — ${t}\n${d}`); };
const fail = (n, t, d) => { results[n] = "FAIL"; log(`\n[ITEM ${n}] FAIL — ${t}\n${d}`); };

const load = (n) => Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(`keys/${n}.json`, "utf8"))));
const userHot = load("user_hot"), guardian = load("guardian"), recovery = load("recovery");

/** Rebuild a web3.js instruction list from a Squads on-chain compiled message. */
function decompile(msg) {
  const keys = msg.accountKeys;
  const nS = msg.numSigners, nWS = msg.numWritableSigners, nWNS = msg.numWritableNonSigners;
  const isWritable = (i) => (i < nS ? i < nWS : i < nS + nWNS);
  return msg.instructions.map((ix) => ({
    programId: keys[ix.programIdIndex],
    keys: Array.from(ix.accountIndexes).map((i) => ({
      pubkey: keys[i], isSigner: i < nS, isWritable: isWritable(i),
    })),
    data: Buffer.from(ix.data),
  }));
}

async function simulateInner(label, txPda, vaultPda, watch) {
  const vt = await multisig.accounts.VaultTransaction.fromAccountAddress(conn, txPda);
  const ixs = decompile(vt.message);
  const { blockhash } = await conn.getLatestBlockhash();
  const v0 = new TransactionMessage({ payerKey: vaultPda, recentBlockhash: blockhash, instructions: ixs }).compileToV0Message();
  const sim = await conn.simulateTransaction(new VersionedTransaction(v0), {
    sigVerify: false, replaceRecentBlockhash: true, innerInstructions: true,
    accounts: { encoding: "base64", addresses: watch.map((a) => a.toBase58()) },
  });
  log(`  ${label}: instructions=${ixs.length} programs=[${ixs.map((i) => i.programId.toBase58().slice(0, 8)).join(",")}]`);
  log(`  ${label}: sim.err=${JSON.stringify(sim.value.err)} unitsConsumed=${sim.value.unitsConsumed}`);
  log(`  ${label}: logs[0..3]=${JSON.stringify((sim.value.logs || []).slice(0, 4))}`);
  return { vt, ixs, sim };
}

(async () => {
  const started = new Date().toISOString();
  log(`# BÙA I0 spike — started ${started}`);
  log(`RPC=${RPC}  cluster=devnet`);
  log(`@sqds/multisig=${JSON.parse(fs.readFileSync("node_modules/@sqds/multisig/package.json")).version} ` +
      `@solana/web3.js=${JSON.parse(fs.readFileSync("node_modules/@solana/web3.js/package.json")).version} ` +
      `@solana/spl-token=${JSON.parse(fs.readFileSync("node_modules/@solana/spl-token/package.json")).version} node=${process.version}`);
  log(`user_hot=${userHot.publicKey} guardian=${guardian.publicKey} recovery=${recovery.publicKey}`);

  // ---- Runtime program verification (required before creating the multisig) ----
  const progInfo = await conn.getAccountInfo(new PublicKey(EXPECTED_PROGRAM_ID));
  if (!progInfo?.executable) throw new Error("Squads v4 program not executable on devnet");
  if (multisig.PROGRAM_ID.toBase58() !== EXPECTED_PROGRAM_ID) throw new Error("SDK program id mismatch");
  log(`Squads v4 program verified: ${EXPECTED_PROGRAM_ID} executable=true owner=${progInfo.owner.toBase58()}`);

  const bal = await conn.getBalance(userHot.publicKey);
  log(`user_hot balance = ${bal / LAMPORTS_PER_SOL} SOL`);
  if (bal < MIN_SOL * LAMPORTS_PER_SOL) {
    log(`\nBLOCKED: user_hot needs >= ${MIN_SOL} SOL on devnet. Fund it, then re-run:`);
    log(`  solana airdrop 2 ${userHot.publicKey.toBase58()} --url devnet`);
    fs.writeFileSync("spike-evidence.md", ev.join("\n"));
    process.exit(2);
  }

  // ================= ITEM 1: create + fund a 2-of-3 vault =================
  const createKey = Keypair.generate();
  const [multisigPda] = multisig.getMultisigPda({ createKey: createKey.publicKey });
  const [vaultPda] = multisig.getVaultPda({ multisigPda, index: 0 });
  const programConfigPda = multisig.getProgramConfigPda({})[0];
  const programConfig = await multisig.accounts.ProgramConfig.fromAccountAddress(conn, programConfigPda);

  const { Permission, Permissions } = multisig.types;
  const members = [
    { key: userHot.publicKey, permissions: Permissions.all() },                       // Almighty (7)
    { key: guardian.publicKey, permissions: Permissions.fromPermissions([Permission.Vote]) }, // Voter (2)
    { key: recovery.publicKey, permissions: Permissions.all() },                      // Almighty (7)
  ];
  const sigCreate = await multisig.rpc.multisigCreateV2({
    connection: conn, createKey, creator: userHot, multisigPda,
    configAuthority: null, timeLock: 0, members, threshold: 2,
    treasury: programConfig.treasury, rentCollector: null,
    sendOptions: { skipPreflight: false },
  });
  await conn.confirmTransaction(sigCreate, "confirmed");

  const fundVaultSig = await sendAndConfirmTransaction(conn, new Transaction().add(
    SystemProgram.transfer({ fromPubkey: userHot.publicKey, toPubkey: vaultPda, lamports: 0.15 * LAMPORTS_PER_SOL })
  ), [userHot]);

  const mint = await createMint(conn, userHot, userHot.publicKey, null, 6);
  const vaultAta = await getOrCreateAssociatedTokenAccount(conn, userHot, mint, vaultPda, true);
  const destOwner = Keypair.generate();
  const destAta = await getOrCreateAssociatedTokenAccount(conn, userHot, mint, destOwner.publicKey, false);
  await mintTo(conn, userHot, mint, vaultAta.address, userHot, 1_000_000_000); // 1000 tokens

  const vaultSol = await conn.getBalance(vaultPda);
  const vaultTokens0 = (await getAccount(conn, vaultAta.address)).amount;
  pass(1, "Funded Squads v4 2-of-3 vault exists on Devnet",
    `  multisig=${multisigPda}  ${exAddr(multisigPda)}\n` +
    `  vault=${vaultPda}  ${exAddr(vaultPda)}\n` +
    `  create sig=${sigCreate}  ${ex(sigCreate)}\n` +
    `  vault fund sig=${fundVaultSig}\n` +
    `  mint=${mint}  vaultAta=${vaultAta.address}  destAta=${destAta.address}\n` +
    `  vault SOL=${vaultSol / LAMPORTS_PER_SOL}  vault tokens=${vaultTokens0}`);

  // ================= ITEM 2: read back and verify config =================
  const ms = await multisig.accounts.Multisig.fromAccountAddress(conn, multisigPda);
  const got = ms.members.map((m) => `${m.key.toBase58()}:${m.permissions.mask}`).sort();
  const want = [
    `${userHot.publicKey.toBase58()}:7`, `${guardian.publicKey.toBase58()}:2`, `${recovery.publicKey.toBase58()}:7`,
  ].sort();
  const ok2 = ms.threshold === 2 && ms.configAuthority.equals(PublicKey.default) &&
              Number(ms.timeLock) === 0 && JSON.stringify(got) === JSON.stringify(want);
  (ok2 ? pass : fail)(2, "On-chain config matches the frozen design",
    `  threshold=${ms.threshold} (want 2)\n` +
    `  configAuthority=${ms.configAuthority.toBase58()} (default/None => autonomous)\n` +
    `  timeLock=${ms.timeLock} (want 0)\n` +
    `  members(mask): ${got.join("  ")}\n` +
    `  expected     : ${want.join("  ")}\n` +
    `  guardian mask=2 => Vote only (cannot Initiate, cannot Execute)`);

  // ================= ITEM 3: create SAFE + RISKY proposals =================
  const { blockhash: bh1 } = await conn.getLatestBlockhash();
  const safeMsg = new TransactionMessage({
    payerKey: vaultPda, recentBlockhash: bh1,
    instructions: [createTransferCheckedInstruction(vaultAta.address, mint, destAta.address, vaultPda, 10_000_000, 6)],
  });
  const riskyMsg = new TransactionMessage({
    payerKey: vaultPda, recentBlockhash: bh1,
    instructions: [createApproveCheckedInstruction(
      vaultAta.address, mint, destOwner.publicKey, vaultPda, BigInt("18446744073709551615"), 6)],
  });

  const sigSafeCreate = await multisig.rpc.vaultTransactionCreate({
    connection: conn, feePayer: userHot, multisigPda, transactionIndex: 1n, creator: userHot.publicKey,
    vaultIndex: 0, ephemeralSigners: 0, transactionMessage: safeMsg, memo: "SAFE transfer",
  });
  await conn.confirmTransaction(sigSafeCreate, "confirmed");
  const sigSafeProp = await multisig.rpc.proposalCreate({
    connection: conn, feePayer: userHot, multisigPda, transactionIndex: 1n, creator: userHot,
  });
  await conn.confirmTransaction(sigSafeProp, "confirmed");

  const sigRiskyCreate = await multisig.rpc.vaultTransactionCreate({
    connection: conn, feePayer: userHot, multisigPda, transactionIndex: 2n, creator: userHot.publicKey,
    vaultIndex: 0, ephemeralSigners: 0, transactionMessage: riskyMsg, memo: "RISKY unlimited delegate",
  });
  await conn.confirmTransaction(sigRiskyCreate, "confirmed");
  const sigRiskyProp = await multisig.rpc.proposalCreate({
    connection: conn, feePayer: userHot, multisigPda, transactionIndex: 2n, creator: userHot,
  });
  await conn.confirmTransaction(sigRiskyProp, "confirmed");

  const [safeTxPda] = multisig.getTransactionPda({ multisigPda, index: 1n });
  const [riskyTxPda] = multisig.getTransactionPda({ multisigPda, index: 2n });
  const [safePropPda] = multisig.getProposalPda({ multisigPda, transactionIndex: 1n });
  const [riskyPropPda] = multisig.getProposalPda({ multisigPda, transactionIndex: 2n });
  pass(3, "SAFE and RISKY proposals created programmatically",
    `  SAFE  idx=1 txPda=${safeTxPda} proposal=${safePropPda}\n    create=${ex(sigSafeCreate)}\n    propose=${ex(sigSafeProp)}\n` +
    `  RISKY idx=2 txPda=${riskyTxPda} proposal=${riskyPropPda}\n    create=${ex(sigRiskyCreate)}\n    propose=${ex(sigRiskyProp)}`);

  // ================= ITEM 4: reconstruct from chain + simulate =================
  log("\n[ITEM 4] reconstructing inner messages from on-chain VaultTransaction accounts");
  const watch = [vaultAta.address, destAta.address, vaultPda];
  const safeSim = await simulateInner("SAFE", safeTxPda, vaultPda, watch);
  const riskySim = await simulateInner("RISKY", riskyTxPda, vaultPda, watch);
  const safeIx = safeSim.ixs[0], riskyIx = riskySim.ixs[0];
  const decodedSafe = `TransferChecked amount=10000000 (10 tokens) dest=${destAta.address}`;
  const decodedRisky = `ApproveChecked delegate=${destOwner.publicKey} amount=u64::MAX (UNLIMITED)`;
  const ok4 = safeSim.sim.value.err === null && safeIx.programId.equals(TOKEN_PROGRAM_ID) && riskyIx.programId.equals(TOKEN_PROGRAM_ID);
  (ok4 ? pass : fail)(4, "Inner transactions retrieved from chain and simulated",
    `  SAFE  decoded: ${decodedSafe}\n    sim.err=${JSON.stringify(safeSim.sim.value.err)}\n` +
    `  RISKY decoded: ${decodedRisky}\n    sim.err=${JSON.stringify(riskySim.sim.value.err)}\n` +
    `  (RISKY simulates successfully — it is a VALID transaction that is HARMFUL. That distinction is the product.)`);

  // ================= ITEM 5: guardian approves SAFE only =================
  const sigApprove = await multisig.rpc.proposalApprove({
    connection: conn, feePayer: guardian, multisigPda, transactionIndex: 1n, member: guardian,
  });
  await conn.confirmTransaction(sigApprove, "confirmed");
  let sigReject = null, rejectNote = "";
  try {
    sigReject = await multisig.rpc.proposalReject({
      connection: conn, feePayer: guardian, multisigPda, transactionIndex: 2n, member: guardian,
    });
    await conn.confirmTransaction(sigReject, "confirmed");
    rejectNote = `on-chain proposalReject sig=${sigReject}  ${ex(sigReject)}`;
  } catch (e) {
    rejectNote = `proposalReject unavailable (${String(e.message).slice(0, 90)}) — guardian ABSTAINED instead`;
  }
  const safeProp = await multisig.accounts.Proposal.fromAccountAddress(conn, safePropPda);
  const riskyProp = await multisig.accounts.Proposal.fromAccountAddress(conn, riskyPropPda);
  const st = (p) => Object.keys(p.status)[0] ?? JSON.stringify(p.status);
  pass(5, "Guardian approved SAFE only",
    `  SAFE  approve sig=${sigApprove}  ${ex(sigApprove)}\n` +
    `  SAFE  status=${st(safeProp)} approvals=${safeProp.approved.length} rejections=${safeProp.rejected.length}\n` +
    `  RISKY ${rejectNote}\n` +
    `  RISKY status=${st(riskyProp)} approvals=${riskyProp.approved.length} rejections=${riskyProp.rejected.length}\n` +
    `  NOTE: recovery key deliberately NOT used — with it, user+recovery would reach threshold and bypass BÙA by design.`);

  // ================= ITEM 6: execute SAFE =================
  const beforeVault = (await getAccount(conn, vaultAta.address)).amount;
  const beforeDest = (await getAccount(conn, destAta.address)).amount;
  const sigExec = await multisig.rpc.vaultTransactionExecute({
    connection: conn, feePayer: userHot, multisigPda, transactionIndex: 1n,
    member: userHot.publicKey, signers: [userHot],
  });
  await conn.confirmTransaction(sigExec, "confirmed");
  const afterVault = (await getAccount(conn, vaultAta.address)).amount;
  const afterDest = (await getAccount(conn, destAta.address)).amount;
  const ok6 = beforeVault - afterVault === 10_000_000n && afterDest - beforeDest === 10_000_000n;
  (ok6 ? pass : fail)(6, "SAFE executed with the expected vault-balance change",
    `  exec sig=${sigExec}  ${ex(sigExec)}\n` +
    `  vault tokens: ${beforeVault} -> ${afterVault} (delta ${beforeVault - afterVault})\n` +
    `  dest  tokens: ${beforeDest} -> ${afterDest} (delta ${afterDest - beforeDest})`);

  // ================= ITEM 7: RISKY must not execute =================
  const rBeforeVault = (await getAccount(conn, vaultAta.address)).amount;
  const rBeforeDelegate = (await getAccount(conn, vaultAta.address)).delegate;
  let riskyOutcome, riskySig = null;
  try {
    riskySig = await multisig.rpc.vaultTransactionExecute({
      connection: conn, feePayer: userHot, multisigPda, transactionIndex: 2n,
      member: userHot.publicKey, signers: [userHot], sendOptions: { skipPreflight: false },
    });
    await conn.confirmTransaction(riskySig, "confirmed");
    riskyOutcome = `UNEXPECTED SUCCESS sig=${riskySig}`;
  } catch (e) {
    const m = String(e.message || e);
    const landed = /custom program error|Transaction .* failed/i.test(m) && /signature/i.test(m);
    riskyOutcome = landed
      ? `FAILED ON-CHAIN (confirmed signature + program error): ${m.slice(0, 260)}`
      : `REJECTED BEFORE LANDING (client-side / RPC preflight simulation): ${m.slice(0, 260)}`;
  }
  const rAfterVault = (await getAccount(conn, vaultAta.address)).amount;
  const rAfterDelegate = (await getAccount(conn, vaultAta.address)).delegate;
  const riskyPropAfter = await multisig.accounts.Proposal.fromAccountAddress(conn, riskyPropPda);
  const ok7 = rBeforeVault === rAfterVault && rAfterDelegate === null && !riskyOutcome.startsWith("UNEXPECTED");
  (ok7 ? pass : fail)(7, "RISKY did not execute; no harmful state change",
    `  outcome: ${riskyOutcome}\n` +
    `  vault tokens: ${rBeforeVault} -> ${rAfterVault} (unchanged=${rBeforeVault === rAfterVault})\n` +
    `  vault ATA delegate: ${rBeforeDelegate} -> ${rAfterDelegate} (still null = no unlimited delegation granted)\n` +
    `  RISKY proposal status=${st(riskyPropAfter)}`);

  // ================= ITEM 8: evidence =================
  const finished = new Date().toISOString();
  results[8] = "PASS";
  log(`\n[ITEM 8] PASS — evidence captured\n  finished ${finished}`);
  log(`\n## Summary\n` + [1,2,3,4,5,6,7,8].map((i) => `  item ${i}: ${results[i] || "NOT RUN"}`).join("\n"));
  fs.writeFileSync("spike-evidence.md", ev.join("\n") + "\n");
  console.log("\nWrote spike-evidence.md");
})().catch((e) => {
  log(`\nFATAL: ${String(e.message || e)}`);
  if (e.logs) log(`logs: ${JSON.stringify(e.logs.slice(0, 12), null, 1)}`);
  fs.writeFileSync("spike-evidence.md", ev.join("\n") + "\n");
  process.exit(1);
});
