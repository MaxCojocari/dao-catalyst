import { importer } from "ipfs-unixfs-importer";
import { MemoryBlockstore } from "blockstore-core/memory";
import { pinata } from "./provider";

export async function predictIpfsUriJson(
  json: Object | null,
  version: 0 | 1 = 1
) {
  if (!json) return;

  const jsonString = JSON.stringify(json);
  console.log(jsonString);

  const blob = new Blob([jsonString]);
  const file = new File([blob], "metadata.json");

  return predictIpfsUriFile(file, version);
}

export async function predictIpfsUriFile(
  file: File | null,
  version: 0 | 1 = 1
) {
  if (!file) return;

  console.log("file name", file.name);

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

    return pinata.gateways.public.convert(rootCid.toString());
  } catch (err) {
    console.error(err);
  }
}
