import { keypairIdentity, Metaplex } from "@metaplex-foundation/js";
import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import "dotenv/config";
import fs from "fs";

const payer = anchor.web3.Keypair.fromSecretKey(
  base58.decode(process.env.PAYER_SECRET_KEY!)
);

enum URIS {
  SESSION_4 = "https://res.cloudinary.com/dtzqgftjk/raw/upload/v1679508093/nas-solana-4_m1o3ed.json",
  SESSION_5 = "https://res.cloudinary.com/dtzqgftjk/raw/upload/v1679508093/nas-solana-5_hqaqq5.json",
  SESSION_8 = "https://res.cloudinary.com/dtzqgftjk/raw/upload/v1679508093/nas-solana-8_m1rqky.json",
}

const connection = new Connection(
  "https://rpc.helius.xyz/?api-key=bacd4e64-46e5-4e39-9e55-1970e5836e59",
  {
    commitment: "confirmed",
  }
);
const metaplex = new Metaplex(connection).use(keypairIdentity(payer));

export const uri = URIS.SESSION_8;

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const airdropOne = async (owner: string) => {
  try {
    sleep(300);
    const { nft } = await metaplex.nfts().create({
      uri,
      name: "NAS x Solana Developer Course",
      sellerFeeBasisPoints: 0,
      tokenOwner: new PublicKey(owner),
    });

    return nft;
  } catch (error) {
    console.log(error);
  }
};

interface Item {
  "HIGHLIGHT IN PINK - NEW ADDITION": string;
  "": string;
  __1: string;
  __2: string;
  __3: string;
  __4: string;
  __5: string;
}

const length = () => {
  const path = "./data/session-5.json";
  const data = fs.readFileSync(path, "utf8");
  const json: Item[] = JSON.parse(data.toString());

  return json.filter((item) => item.__4 === "TRUE").length;
};

console.log(length());

export { airdropOne, sleep };
