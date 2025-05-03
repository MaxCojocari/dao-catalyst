import { PinataSDK } from 'pinata';
import 'dotenv/config';

import fs from 'fs';
import path from 'path';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

const directoryPath = path.join(__dirname, '../metadata/proposals');

const daoInfo = {
  name: 'PikaDAO',
  logo: 'https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreihbik6lvzagahquz52qcyxqhuiaafumepejtsfof56gkmglojkjie',
  summary:
    'PikaDAO ⚡ is a decentralized autonomous organization that fosters collaborative decision-making within a vibrant community, using transparent governance to shape initiatives, fund projects, and drive collective actions. With its Pikachu-inspired emblem, PikaDAO empowers members to propose, debate, and vote on key decisions, ensuring a truly democratic and community-led ecosystem.',
  links: [
    {
      label: 'Pikachu X',
      url: 'https://twitter.com/Pikachu_',
    },
    {
      label: '⚡Pikachu Nation⚡',
      url: 'https://discord.com/invite/8JPUrN6GRy',
    },
  ],
};

async function uploadSingleFile() {
  const jsonString = JSON.stringify(daoInfo);
  console.log(jsonString);
  const blob = new Blob([jsonString]);
  const file = new File([blob], 'test_uplaod_json.json');

  try {
    const upload = await pinata.upload.public.file(file);
    console.log(upload);
  } catch (error) {
    console.log(error);
  }
}

async function uploadMultipleFromDirectory() {
  const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stream = fs.readFileSync(filePath, 'utf-8');
    const blob = new Blob([stream]);

    try {
      const upload = await pinata.upload.public.file(
        new File([blob], file, { type: 'text/plain' }),
      );
      console.log(upload);
    } catch (error) {
      console.log(error);
    }
  }
}

async function main() {
  await uploadSingleFile();
}

main().catch(console.error);
