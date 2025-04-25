import { PinataSDK } from 'pinata';
import 'dotenv/config';

import fs from 'fs';
import path from 'path';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

const directoryPath = path.join(__dirname, '../metadata/proposals');

async function main() {
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

main().catch(console.error);
