/**
 * bits.ts
 * Pure utilities for bitwise operations and binary visualization.
 * Used by HashingLab (BitGrid) and EncryptionLab (XOR).
 * DO NOT add UI-specific logic here. Keep it pure and deterministic.
 */

/**
 * Converts a byte (number) to an array of 8 bits (0 or 1).
 */
export function byteToBits(byte: number): number[] {
  const bits: number[] = [];
  for (let i = 7; i >= 0; i--) {
    bits.push((byte >> i) & 1);
  }
  return bits;
}

/**
 * Converts a Uint8Array to a flat array of bits.
 */
export function bytesToBitArray(bytes: Uint8Array): number[] {
  const allBits: number[] = [];
  bytes.forEach((byte) => {
    allBits.push(...byteToBits(byte));
  });
  return allBits;
}
