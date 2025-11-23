/**
 * blocks.ts
 * Pure utilities for splitting data into blocks for block cipher visualization.
 * Used by EncryptionLab (AES/Block modes).
 * DO NOT add UI-specific logic here. Keep it pure and deterministic.
 */

import { stringToBytes } from './encoding';

/**
 * Utilities for working with data blocks (for ECB/CBC visualization).
 */

export interface Block {
  id: string;
  bytes: Uint8Array;
  hex: string;
  color?: string; // For visualization matching
}

/**
 * Splits a string into fixed-size blocks (16 bytes for AES-like visualization).
 * Pads the last block with PKCS#7-like padding (conceptually).
 */
export function splitIntoBlocks(text: string, blockSize: number = 16): Block[] {
  const bytes = stringToBytes(text);
  const blocks: Block[] = [];

  // Calculate padding needed
  const paddingNeeded = blockSize - (bytes.length % blockSize);
  const totalLength = bytes.length + paddingNeeded;
  const paddedBytes = new Uint8Array(totalLength);

  paddedBytes.set(bytes);
  // Fill padding with the byte value equal to the number of padding bytes (PKCS#7)
  paddedBytes.fill(paddingNeeded, bytes.length);

  for (let i = 0; i < totalLength; i += blockSize) {
    const blockBytes = paddedBytes.slice(i, i + blockSize);
    const hex = Array.from(blockBytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    blocks.push({
      id: `block-${i / blockSize}`,
      bytes: blockBytes,
      hex: hex,
    });
  }

  return blocks;
}

/**
 * Generates a color based on the hex content of a block.
 * Identical blocks will have identical colors.
 */
export function getBlockColor(hex: string): string {
  // Simple hash of the hex string to a hue
  let hash = 0;
  for (let i = 0; i < hex.length; i++) {
    hash = hex.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 80%)`;
}
