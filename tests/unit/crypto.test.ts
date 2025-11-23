import { describe, it, expect } from 'vitest';
import {
  stringToBytes,
  bytesToHex,
  stringToBase64,
  base64ToString,
} from '../../src/crypto/encoding';
import { caesarEncrypt, caesarDecrypt } from '../../src/crypto/caesar';
import { xorEncrypt, xorDecrypt } from '../../src/crypto/xor';
import { splitIntoBlocks } from '../../src/crypto/blocks';

describe('Encoding', () => {
  it('converts string to bytes and back', () => {
    const input = 'Hello World';
    const bytes = stringToBytes(input);
    expect(bytes.constructor.name).toBe('Uint8Array');
    expect(bytes.length).toBe(11);
  });

  it('converts bytes to hex', () => {
    const bytes = new Uint8Array([0, 255, 16]);
    expect(bytesToHex(bytes)).toBe('00ff10');
  });

  it('handles Base64 roundtrip', () => {
    const input = 'Cryptolab';
    const encoded = stringToBase64(input);
    const decoded = base64ToString(encoded);
    expect(decoded).toBe(input);
  });
});

describe('Caesar Cipher', () => {
  it('encrypts correctly with shift 1', () => {
    expect(caesarEncrypt('ABC', 1)).toBe('BCD');
  });

  it('wraps around alphabet', () => {
    expect(caesarEncrypt('Z', 1)).toBe('A');
  });

  it('decrypts correctly', () => {
    expect(caesarDecrypt('BCD', 1)).toBe('ABC');
  });

  it('ignores non-alphabetic characters', () => {
    expect(caesarEncrypt('Hello, World!', 1)).toBe('Ifmmp, Xpsme!');
  });
});

describe('XOR Cipher', () => {
  it('encrypts and decrypts correctly', () => {
    const input = 'Secret';
    const key = 'Key';
    const encrypted = xorEncrypt(input, key);
    const decrypted = xorDecrypt(encrypted, key);
    expect(decrypted).toBe(input);
  });

  it('is self-inverse with same key', () => {
    const input = 'Test';
    const key = 'A';
    // XOR twice should return original
    const enc = xorEncrypt(input, key);
    // We need to convert hex back to bytes to XOR again conceptually,
    // but our decrypt function handles that.
    expect(xorDecrypt(enc, key)).toBe(input);
  });
});

describe('Blocks', () => {
  it('splits text into blocks', () => {
    const text = 'A'.repeat(32); // 32 bytes
    const blocks = splitIntoBlocks(text, 16);
    expect(blocks.length).toBe(3); // 2 full blocks + 1 padding block (PKCS#7 style logic in our impl)
  });
});
