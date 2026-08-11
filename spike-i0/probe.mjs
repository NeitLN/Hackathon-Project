import * as multisig from "@sqds/multisig";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import fs from "fs";

const RPC = "https://api.devnet.solana.com";
const PROGRAM_ID = "SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf";
const conn = new Connection(RPC, "confirmed");

console.log("=== SDK surface ===");
console.log("top-level:", Object.keys(multisig).join(", "));
console.log("rpc:", Object.keys(multisig.rpc).slice(0, 40).join(", "));
console.log("accounts:", Object.keys(multisig.accounts).join(", "));
console.log("types keys:", Object.keys(multisig.types).slice(0, 30).join(", "));
console.log("PROGRAM_ID const:", multisig.PROGRAM_ID?.toBase58?.());
console.log("Permission enum:", JSON.stringify(multisig.types.Permission));

console.log("\n=== program account check ===");
const info = await conn.getAccountInfo(new PublicKey(PROGRAM_ID));
console.log("executable:", info?.executable, "owner:", info?.owner?.toBase58());

console.log("\n=== keys ===");
fs.mkdirSync("keys", { recursive: true });
function loadOrCreate(name) {
  const p = `keys/${name}.json`;
  if (fs.existsSync(p)) return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(p, "utf8"))));
  const kp = Keypair.generate();
  fs.writeFileSync(p, JSON.stringify(Array.from(kp.secretKey)));
  return kp;
}
const userHot = loadOrCreate("user_hot");
const guardian = loadOrCreate("guardian");
const recovery = loadOrCreate("recovery");
console.log("user_hot :", userHot.publicKey.toBase58());
console.log("guardian :", guardian.publicKey.toBase58());
console.log("recovery :", recovery.publicKey.toBase58());

console.log("\n=== airdrop test (user_hot) ===");
try {
  const bal0 = await conn.getBalance(userHot.publicKey);
  console.log("balance before:", bal0 / LAMPORTS_PER_SOL, "SOL");
  if (bal0 < 1 * LAMPORTS_PER_SOL) {
    const sig = await conn.requestAirdrop(userHot.publicKey, 2 * LAMPORTS_PER_SOL);
    console.log("airdrop sig:", sig);
    const bh = await conn.getLatestBlockhash();
    await conn.confirmTransaction({ signature: sig, ...bh }, "confirmed");
  }
  console.log("balance after:", (await conn.getBalance(userHot.publicKey)) / LAMPORTS_PER_SOL, "SOL");
} catch (e) {
  console.log("AIRDROP FAILED:", e.message);
}
