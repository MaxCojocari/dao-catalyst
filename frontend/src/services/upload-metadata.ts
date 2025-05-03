import { nanoid } from "nanoid";
import { pinata } from "../utils/provider";
import { toDashedName } from "../utils";

export async function uploadJson(json: Object | null, name: string) {
  if (!json || !name) return;

  const jsonString = JSON.stringify(json);
  const blob = new Blob([jsonString]);
  const file = new File([blob], nanoid() + "-" + toDashedName(name));

  try {
    const upload = await pinata.upload.public.file(file);
    return pinata.gateways.public.convert(upload.cid);
  } catch (error) {
    console.error(error);
  }
}

export async function uploadLogo(logo: File | null) {
  if (!logo) return;

  try {
    const upload = await pinata.upload.public.file(logo);
    return pinata.gateways.public.convert(upload.cid);
  } catch (error) {
    console.error(error);
  }
}
