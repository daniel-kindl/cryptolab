/**
 * hash.ts
 * Pure utilities for hashing (MD5, SHA family) and avalanche calculation.
 * Used by HashingLab and Pitfalls.
 * DO NOT add UI-specific logic here. Keep it pure and deterministic.
 */

import CryptoJS from 'crypto-js';
import { bytesToHex } from './encoding';

/**
 * Hashing utilities for Cryptolab.
 * Includes wrappers for Web Crypto (SHA-256) and crypto-js (MD5, SHA-1).
 */

export type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

/**
 * Computes the hash of a string using the specified algorithm.
 * Returns the hash as a hex string.
 */
export async function computeHash(text: string, algorithm: HashAlgorithm): Promise<string> {
  if (algorithm === 'SHA-256') {
    // Use Web Crypto API for SHA-256 (Modern/Secure)
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return bytesToHex(new Uint8Array(hashBuffer));
  } else if (algorithm === 'SHA-512') {
    // Use Web Crypto API for SHA-512 (Modern/Secure)
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-512', data);
    return bytesToHex(new Uint8Array(hashBuffer));
  } else if (algorithm === 'MD5') {
    // Use crypto-js for MD5 (Legacy/Insecure)
    return CryptoJS.MD5(text).toString(CryptoJS.enc.Hex);
  } else if (algorithm === 'SHA-1') {
    // Use crypto-js for SHA-1 (Legacy/Insecure)
    return CryptoJS.SHA1(text).toString(CryptoJS.enc.Hex);
  }
  return '';
}

/**
 * Compares two hex strings bit by bit.
 * Returns an array of booleans where true indicates a difference at that bit position.
 */
export function compareHashesBits(hex1: string, hex2: string): boolean[] {
  // Ensure same length for comparison (pad with zeros if needed, though hashes of same algo should match)
  const len = Math.max(hex1.length, hex2.length);
  const h1 = hex1.padEnd(len, '0');
  const h2 = hex2.padEnd(len, '0');

  const diffs: boolean[] = [];

  for (let i = 0; i < len; i += 2) {
    const byte1 = parseInt(h1.substring(i, i + 2), 16) || 0;
    const byte2 = parseInt(h2.substring(i, i + 2), 16) || 0;

    // XOR to find differing bits
    const xor = byte1 ^ byte2;

    // Check each bit (8 bits per byte)
    for (let bit = 7; bit >= 0; bit--) {
      diffs.push(((xor >> bit) & 1) === 1);
    }
  }

  return diffs;
}

/**
 * Calculates the percentage of bits that are different between two hex strings.
 */
export function calculateAvalanchePercentage(hex1: string, hex2: string): number {
  const diffs = compareHashesBits(hex1, hex2);
  if (diffs.length === 0) return 0;
  const changedCount = diffs.filter((d) => d).length;
  return (changedCount / diffs.length) * 100;
}
