### Airdrop Script

First, clone this project

```
git clone https://github.com/anuraglol/airdrop-script
```

Then, install the dependencies

```
pnpm install # or npm install
```

Then, create a `.env` file and populate it with the following

```
PAYER_SECRET_KEY="WALLET_PRIVATE_KEY"
RPC_URL="YOUR_RPC_URL"
```

Now, the `./src/utils.ts` file is where all the constants are present. By convention, you should store the JSON file with all the addresses in the `./data/` directory.

For example

```ts
export const METADATA_URI = "METADATA_URI_FOR_YOUR_NFT";
export const CURRENT_PATH = "./data/{YOUR_JSON_FILE_NAME}.json";
```

This script works on 50 elements at a time, but you can customize it in the `./src/utils.ts` file.

```ts
export const BATCH_SIZE = 50;
```

Now, you're all set to run the script

```
pnpm build
```

```
pnpm run
```

Also, do note that after every successful batch completion, you must change the `start` constant in `./src/index.ts` file. (L:13)
