export function getRandomString(size = 50, chars?: string) {
  const possibleCharacters = chars || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = new Uint32Array(size);
  crypto.getRandomValues(values);
  return Array.from(values, (value) => possibleCharacters[value % possibleCharacters.length]).join("");
}

export const ID_CHARS = "1234567890qwertyuiopasdfhjklzxcvbnmQWERTYUIOPASDFHJKLZXCVBNM";
