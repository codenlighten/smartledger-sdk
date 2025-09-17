# SmartLedger SDK

A lightweight and powerful JavaScript SDK for interacting with the Bitcoin SV (BSV) blockchain. This SDK provides a comprehensive set of tools for managing keys, signing messages, and performing various cryptographic operations.

## Features

- **BIP39 Mnemonic Support**: Generate and validate 24-word mnemonic phrases.
- **Hierarchical Deterministic (HD) Wallets**: Derive keys using BIP32/BIP44 standards.
- **BSV Key Management**: Generate private keys, public keys, and addresses.
- **Message Signing**: Sign and verify messages using the BSV message standard (BSM).
- **Cryptography**: Includes AES encryption/decryption, SHA hashing, and Base64 encoding.
- **Secure Storage**: Encrypt and store keys and mnemonics securely in the browser's `localStorage`.
- **Utilities**: Includes Shamir's Secret Sharing and UUID generation.

## Installation

```bash
npm install smartledger-sdk
```

## Quick Start

Here's a simple example of how to generate a key pair and sign a message:

```javascript
const SmartLedger = require('smartledger-sdk');

async function runExample() {
  // Generate a new key pair
  const { privateKey, publicKey } = SmartLedger.generateKeyPair();
  console.log('Private Key (WIF):', privateKey.toWif());
  console.log('Public Key:', publicKey.toString());

  // Sign a message
  const message = 'Hello, SmartLedger!';
  const signature = await SmartLedger.signMessage(message, privateKey.toString());
  console.log('Signature:', signature);

  // Verify the signature
  const isValid = await SmartLedger.verifySignature(message, signature, publicKey.toString());
  console.log('Is signature valid?', isValid);
}

runExample();
```

## API Reference

### Wallet Functions
- `generateMnemonic()`: Generates a new 24-word BIP39 mnemonic.
- `validateMnemonic(mnemonic)`: Validates a mnemonic string. Returns `true` or `false`.
- `mnemonicToSeedHex(mnemonic, [passphrase])`: Converts a mnemonic to a 512-bit seed (hex string).
- `derivePath(mnemonic, path)`: Derives a key from a mnemonic using a standard derivation path (e.g., "m/44'/236'/0'/0/0"). Returns an object with `path`, `privateKey`, `publicKey`, and `wif`.
- `deriveStandardPaths(mnemonic)`: Derives keys for a set of standard paths.

### BSV Functions
- `generateKeyPair()`: Generates a new BSV key pair. Returns an object with `privateKey` and `publicKey` objects.
- `signMessage(message, privateKey)`: Signs a string message with a private key (WIF or hex string).
- `verifySignature(message, signature, publicKey)`: Verifies a message signature with a public key string.
- `isValidPrivateKey(privateKey)`: Checks if a private key string is valid.
- `isValidPublicKey(publicKey)`: Checks if a public key string is valid.

### Cryptographic Functions
- `encrypt(message, secret)`: Encrypts a string using AES with the given secret.
- `decrypt(ciphertext, secret)`: Decrypts an AES-encrypted string.
- `hash(data, [algorithm])`: Hashes data. Algorithm can be 'SHA256', 'SHA512', or 'MD5'. Defaults to 'SHA256'.
- `base64Encode(text)` / `base64Decode(base64text)`: Encodes and decodes strings using Base64.
- `getRandomBytes(size)`: Generates a hex string of random bytes of the given size.

### Utility Functions
- `generateUUID(domain)`: Generates a version 5 UUID based on a domain name.
- `splitSecret(secret, numShares, threshold)`: Splits a secret string into a number of shares.
- `combineShares(shares)`: Reconstructs a secret from a sufficient number of shares.

### Secure Storage Functions (Browser Only)
- `storeMnemonic(id, mnemonic, metadata, storageKey)`: Encrypts and stores a mnemonic in `localStorage`.
- `storeKey(id, key, metadata, storageKey)`: Encrypts and stores a private key in `localStorage`.
- `listKeys()`: Lists the IDs of all items stored by the SDK in `localStorage`.
- `retrieveMnemonic(id, storageKey)`: Retrieves and decrypts a stored mnemonic.
- `retrieveKey(id, storageKey)`: Retrieves and decrypts a stored key.
