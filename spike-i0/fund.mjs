import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import fs from "fs";

const ENDPOINTS = [
  "https://api.devnet.solana.com",
  "https://rpc.ankr.com/solana_devnet",
];
const load = (n) => Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(`keys/${n}.json`, "utf8"))));
const userHot = load("user_hot");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const target = 2 * LAMPORTS_PER_SOL;
for (let attempt = 1; attempt <= 12; attempt++) {
  for (const url of ENDPOINTS) {
    const conn = new Connection(url, "confirmed");
    let bal = 0;
    try { bal = await conn.getBalance(userHot.publicKey); } catch { continue; }
    if (bal >= target) {
      console.log(`FUNDED ${bal / LAMPORTS_PER_SOL} SOL via ${url}`);
      process.exit(0);
    }
    const amount = attempt <= 4 ? 2 : attempt <= 8 ? 1 : 0.5;
    try {
      const sig = await conn.requestAirdrop(userHot.publicKey, amount * LAMPORTS_PER_SOL);
      const bh = await conn.getLatestBlockhash();
      await conn.confirmTransaction({ signature: sig, ...bh }, "confirmed");
      console.log(`attempt ${attempt} ${url} amount=${amount}: OK sig=${sig}`);
    } catch (e) {
      console.log(`attempt ${attempt} ${url} amount=${amount}: ${String(e.message).slice(0, 90)}`);
    }
  }
  const conn = new Connection(ENDPOINTS[0], "confirmed");
  const bal = await conn.getBalance(userHot.publicKey);
  if (bal >= target) { console.log(`FUNDED ${bal / LAMPORTS_PER_SOL} SOL`); process.exit(0); }
  await sleep(6000);
}
const conn = new Connection(ENDPOINTS[0], "confirmed");
console.log(`FINAL balance: ${(await conn.getBalance(userHot.publicKey)) / LAMPORTS_PER_SOL} SOL`);
