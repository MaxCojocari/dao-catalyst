import { importer } from 'ipfs-unixfs-importer';
import { MemoryBlockstore } from 'blockstore-core/memory';
import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

export const predictCID = async (file: File, version: 0 | 1 = 1) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const blockstore = new MemoryBlockstore();

    let rootCid: any;

    for await (const result of importer([{ content: buffer }], blockstore, {
      cidVersion: version,
      rawLeaves: version === 1,
    })) {
      rootCid = result.cid;
    }

    return rootCid.toString();
  } catch (err) {
    return err;
  }
};

async function main() {
  //   const file = new File([fs.readFileSync('./metadata/dao/pikachu__.jpg')], 'test_img.jpg');

  const daoInfo = {
    name: 'PikaDAO',
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
    logo: 'https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreihbik6lvzagahquz52qcyxqhuiaafumepejtsfof56gkmglojkjie',
  };
  const jsonString = JSON.stringify(daoInfo);
  console.log(jsonString);

  const blob = new Blob([jsonString]);
  const file = new File([blob], 'ethora_dao.json');

  const cid = await predictCID(file, 1);
  console.log(cid);
  const ipfsLink = await pinata.gateways.public.convert(cid);
  console.log(ipfsLink);
}

main().catch(console.error);
