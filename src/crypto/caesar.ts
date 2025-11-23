/**
 * caesar.ts
 * Pure utilities for Caesar cipher encryption/decryption.
 * Used by EncryptionLab.
 * DO NOT add UI-specific logic here. Keep it pure and deterministic.
 */

/**
 * Encrypts a string using the Caesar cipher.
 * Only affects A-Z and a-z. Preserves case. Other characters are unchanged.
 * Shift is 0-25.
 */
export function caesarEncrypt(text: string, shift: number): string {
  const normalizedShift = ((shift % 26) + 26) % 26; // Handle negative shifts

  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char === char.toUpperCase();
    const base = isUpper ? 65 : 97; // 'A' or 'a'
    const code = char.charCodeAt(0) - base;
    const newCode = (code + normalizedShift) % 26;
    return String.fromCharCode(newCode + base);
  });
}

/**
 * Decrypts a string using the Caesar cipher.
 */
export function caesarDecrypt(text: string, shift: number): string {
  return caesarEncrypt(text, -shift);
}
