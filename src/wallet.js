// smartledger-sdk/src/wallet.js

const { Bip39, Bip32, PrivKey, PubKey } = require('bsv');

function generateMnemonic() {
  // Explicitly request 256 bits for a 24-word mnemonic
  return Bip39.fromRandom(256).toString();
}

function validateMnemonic(mnemonic) {
  return Bip39.fromString(mnemonic).isValid();
}

async function mnemonicToSeedHex(mnemonic, passphrase = '') {
  const bip39 = Bip39.fromString(mnemonic);
  const seed = await bip39.toSeed(passphrase);
  return seed.toString('hex');
}

async function derivePath(mnemonic, path) {
  const bip39 = Bip39.fromString(mnemonic);
  const seed = await bip39.toSeed();
  const master = Bip32.fromSeed(seed);
  const child = master.derive(path);

  const privKey = child.privKey;
  const pubKey = PubKey.fromPrivKey(privKey);

  return {
    path: path,
    privateKey: privKey.toString(),
    publicKey: pubKey.toString(),
    wif: privKey.toWif(),
  };
}

async function deriveStandardPaths(mnemonic) {
  const paths = [
    "m/44'/236'/0'/0/0",
    "m/44'/236'/0'/0/1",
    "m/44'/236'/0'/1/0",
    "m/44'/236'/0'/1/1",
  ];

  const derivedKeys = [];
  for (const path of paths) {
    const key = await derivePath(mnemonic, path);
    derivedKeys.push(key);
  }
  return derivedKeys;
}

module.exports = {
  generateMnemonic,
  validateMnemonic,
  mnemonicToSeedHex,
  derivePath,
  deriveStandardPaths,
};
