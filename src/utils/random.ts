import { randomInt } from "node:crypto";

const ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/** Cryptographically secure random id (server only). */
export function randomId(size = 35, alphabet: string = ALPHANUMERIC): string {
  let out = "";
  for (let i = 0; i < size; i += 1) out += alphabet.charAt(randomInt(alphabet.length));
  return out;
}
