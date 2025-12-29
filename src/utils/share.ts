import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

export function encodeShare(left: string, right: string) {
  return compressToEncodedURIComponent(
    JSON.stringify({ left, right })
  );
}

export function decodeShare(hash: string) {
  const decoded = decompressFromEncodedURIComponent(hash);
  return decoded ? JSON.parse(decoded) : null;
}
