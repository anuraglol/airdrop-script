import { keypairIdentity, Metaplex } from "@metaplex-foundation/js";
import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import "dotenv/config";
import fs from "fs";

const payer = anchor.web3.Keypair.fromSecretKey(
  base58.decode(process.env.PAYER_SECRET_KEY!)
);

// enum URIS {
//   SESSION_4 = "https://res.cloudinary.com/dtzqgftjk/raw/upload/v1679508093/nas-solana-4_m1o3ed.json",
//   SESSION_5 = "https://res.cloudinary.com/dtzqgftjk/raw/upload/v1679508093/nas-solana-5_hqaqq5.json",
//   SESSION_8 = "https://res.cloudinary.com/dtzqgftjk/raw/upload/v1679508093/nas-solana-8_m1rqky.json",
// }

export const METADATA_URI =
  "https://res.cloudinary.com/dtzqgftjk/raw/upload/v1679508093/nas-solana-8_m1rqky.json";
export const CURRENT_PATH = "./data/session-8.json";
export const BATCH_SIZE = 50;

export interface Item {
  "HIGHLIGHT IN PINK - NEW ADDITION": string;
  "": string;
  __1: string;
  __2: string;
  __3: string;
  __4: string;
  __5: string;
}

const connection = new Connection(
  process.env.RPC_URL || "https://api.devnet.solana.com",
  {
    commitment: "confirmed",
  }
);
const metaplex = new Metaplex(connection).use(keypairIdentity(payer));

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const airdropOne = async (owner: string) => {
  try {
    sleep(300);
    const { nft } = await metaplex.nfts().create({
      uri: METADATA_URI,
      name: "NAS x Solana Developer Course",
      sellerFeeBasisPoints: 0,
      tokenOwner: new PublicKey(owner),
    });

    return nft;
  } catch (error) {
    console.log(error);
  }
};

const length = () => {
  const data = fs.readFileSync(CURRENT_PATH, "utf8");
  const json: Item[] = JSON.parse(data.toString());

  return json.filter((item) => item.__4 === "TRUE").length;
};

console.log(length());

export { airdropOne, sleep };
