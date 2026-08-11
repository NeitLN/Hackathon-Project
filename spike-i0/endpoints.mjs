import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import fs from "fs";
const load = (n) => Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(`keys/${n}.json`, "utf8"))));
const userHot = load("user_hot");

const urls = [
  "https://api.devnet.solana.com",
  "https://rpc.ankr.com/solana_devnet",
  "https://solana-devnet.g.alchemy.com/v2/demo",
  "https://devnet.helius-rpc.com/?api-key=demo",
  "https://solana-devnet-rpc.publicnode.com",
  "https://endpoints.omniatech.io/v1/sol/devnet/public",
];

for (const url of urls) {
  let ver = "-", air = "-";
  const conn = new Connection(url, "confirmed");
  try {
    const v = await conn.getVersion();
    ver = v["solana-core"];
  } catch (e) { ver = "ERR " + String(e.message).slice(0, 40); }
  if (ver.startsWith("ERR")) { console.log(`${url}\n   version=${ver}\n`); continue; }
  try {
    const sig = await conn.requestAirdrop(userHot.publicKey, 1 * LAMPORTS_PER_SOL);
    air = "OK " + sig;
  } catch (e) { air = String(e.message).slice(0, 70).replace(/\s+/g, " "); }
  console.log(`${url}\n   version=${ver}\n   airdrop=${air}\n`);
}
const c = new Connection(urls[0], "confirmed");
console.log("user_hot balance:", (await c.getBalance(userHot.publicKey)) / LAMPORTS_PER_SOL, "SOL");
