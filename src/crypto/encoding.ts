/**
 * encoding.ts
 * Pure utilities for string/bytes/Base64/URL encoding.
 * Used by EncodingLab, HashingLab (for display), and Pitfalls.
 * DO NOT add UI-specific logic here. Keep it pure and deterministic.
 */

/**
 * Converts a UTF-8 string to a Uint8Array of bytes.
 */
export function stringToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

/**
 * Converts a Uint8Array of bytes to a UTF-8 string.
 */
export function bytesToString(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

/**
 * Converts a Uint8Array of bytes to a Hex string.
 */
export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Converts a Hex string to a Uint8Array of bytes.
 * Returns null if the string is not valid hex.
 */
export function hexToBytes(hex: string): Uint8Array | null {
  const cleanHex = hex.replace(/\s/g, '');
  if (cleanHex.length % 2 !== 0 || !/^[0-9a-fA-F]*$/.test(cleanHex)) {
    return null;
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Converts a string to Base64.
 * Handles UTF-8 characters correctly by converting to bytes first.
 */
export function stringToBase64(str: string): string {
  const bytes = stringToBytes(str);
  const binary = Array.from(bytes)
    .map((b) => String.fromCharCode(b))
    .join('');
  return btoa(binary);
}

/**
 * Converts Base64 to a string.
 * Handles UTF-8 characters correctly.
 */
export function base64ToString(base64: string): string {
  try {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytesToString(bytes);
  } catch {
    return 'Invalid Base64';
  }
}

/**
 * URL Encodes a string.
 */
export function urlEncode(str: string): string {
  return encodeURIComponent(str);
}

/**
 * URL Decodes a string.
 */
export function urlDecode(str: string): string {
  try {
    return decodeURIComponent(str);
  } catch {
    return 'Invalid URL Encoding';
  }
}

/**
 * Converts a Uint8Array of bytes to a binary string (0s and 1s).
 * Each byte is separated by a space for readability.
 */
export function bytesToBinaryString(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(2).padStart(8, '0'))
    .join(' ');
}
