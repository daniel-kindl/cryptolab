/**
 * xor.ts
 * Pure utilities for XOR cipher operations.
 * Used by EncryptionLab.
 * DO NOT add UI-specific logic here. Keep it pure and deterministic.
 */

import { stringToBytes, bytesToHex, hexToBytes, bytesToString } from './encoding';

/**
 * XOR Cipher implementation.
 * Educational demo only.
 */

/**
 * Encrypts/Decrypts text using a repeating key XOR cipher.
 * Returns the result as a Hex string (since ciphertext is often not valid UTF-8).
 */
export function xorEncrypt(text: string, key: string): string {
  const textBytes = stringToBytes(text);
  const keyBytes = stringToBytes(key);

  if (keyBytes.length === 0) return bytesToHex(textBytes);

  const result = new Uint8Array(textBytes.length);

  for (let i = 0; i < textBytes.length; i++) {
    result[i] = textBytes[i] ^ keyBytes[i % keyBytes.length];
  }

  return bytesToHex(result);
}

/**
 * Decrypts a Hex string using a repeating key XOR cipher.
 * Returns the result as a UTF-8 string.
 */
export function xorDecrypt(hex: string, key: string): string {
  const textBytes = hexToBytes(hex);
  if (!textBytes) return 'Invalid Hex';

  const keyBytes = stringToBytes(key);
  if (keyBytes.length === 0) return bytesToString(textBytes);

  const result = new Uint8Array(textBytes.length);

  for (let i = 0; i < textBytes.length; i++) {
    result[i] = textBytes[i] ^ keyBytes[i % keyBytes.length];
  }

  return bytesToString(result);
}
