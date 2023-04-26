import fs from "fs";
import { airdropOne, uri } from "./utils";

interface Item {
  "HIGHLIGHT IN PINK - NEW ADDITION": string;
  "": string;
  __1: string;
  __2: string;
  __3: string;
  __4: string;
  __5: string;
}

const airdropAll = async () => {
  const path = "./data/session-8.json";
  const data = fs.readFileSync(path, "utf8");
  const json: Item[] = JSON.parse(data.toString());
  const start = 0;

  const batch = json.slice(start, start + 50);

  await Promise.all(
    batch.map(async (item) => {
      if (item["__4"] === "TRUE") {
        return;
      }
      const wallet = item["__3"];
      console.log("Airdropping to", wallet);
      const nft = await airdropOne(wallet);

      for (let i = 0; i < batch.length; i++) {
        if (batch[i]["__3"] === wallet && nft?.uri === uri) {
          batch[i]["__4"] = "TRUE";
          json[i]["__4"] = "TRUE";
        }
      }

      fs.writeFileSync(path, JSON.stringify(json, null, 2), "utf8");
      if (nft?.uri === uri) {
        console.log("Airdropped to", wallet);
      }
    })
  );
};

airdropAll();
