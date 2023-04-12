import { keypairIdentity, Metaplex } from "@metaplex-foundation/js";
import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import base58 from "bs58";
import fs from "fs";

require("dotenv").config();

const payer = anchor.web3.Keypair.fromSecretKey(
  base58.decode(process.env.PAYER_SECRET_KEY!)
);

const connection = new Connection(
  "https://rpc.helius.xyz/?api-key=bacd4e64-46e5-4e39-9e55-1970e5836e59",
  // "https://rpc-devnet.helius.xyz/?api-key=bacd4e64-46e5-4e39-9e55-1970e5836e59",
  {
    commitment: "confirmed",
  }
);
const metaplex = new Metaplex(connection).use(keypairIdentity(payer));

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const airdropOne = async (owner: string) => {
  console.log("Airdropping to", owner);
  const uri =
    "https://res.cloudinary.com/dtzqgftjk/raw/upload/v1679508094/nas-solana-3_q2dbam.json"; // for 2nd batch

  // "https://res.cloudinary.com/dtzqgftjk/raw/upload/v1679508093/nas-solana-6_minqtg.json"; // for 1st batch

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

const airdropAll = async () => {
  const path = "./data/csvjson1-left.json";
  const data = fs.readFileSync(path, "utf8");
  const json = JSON.parse(data.toString());

  const batch1 = json.slice(10, 20);

  await Promise.all(
    batch1.map(async (item: any) => {
      if (item["POAP Sent?"] === "TRUE") {
        return;
      }
      const nft = await airdropOne(item.wallet_address);

      for (let i = 0; i < batch1.length; i++) {
        if (
          batch1[i]["wallet_address"] === item.wallet_address &&
          nft?.uri ===
            "https://res.cloudinary.com/dtzqgftjk/raw/upload/v1679508094/nas-solana-3_q2dbam.json"
        ) {
          batch1[i]["POAP Sent?"] = "TRUE";
          json[i]["POAP Sent?"] = "TRUE";
        }
      }

      fs.writeFileSync(path, JSON.stringify(json, null, 2), "utf-8");
      console.log("Updated " + item.wallet_address);
    })
  );
};

airdropAll();

const howManyLeft = async () => {
  const path = "./data/csvjson1.json";
  const data = fs.readFileSync(path, "utf8");
  const json = JSON.parse(data.toString());

  const batch1 = json.filter((item: any) => item["POAP Sent?"] === "FALSE");

  // write it in a new file
  fs.writeFileSync(
    "./data/csvjson1-left.json",
    JSON.stringify(batch1, null, 2),
    "utf-8"
  );

  console.log(batch1.length);
};

// howManyLeft();
