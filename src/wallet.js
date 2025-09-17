// smartledger-sdk/src/wallet.js

const sdk = require('@bsv/sdk');
const { Mnemonic, HD } = sdk;

function generateMnemonic() {
  const mnemonic = Mnemonic.fromRandom();
  return mnemonic.toString();
}

function validateMnemonic(mnemonic) {
  return Mnemonic.isValid(mnemonic);
}

async function mnemonicToSeedHex(mnemonic, passphrase = '') {
  const mnemonicObj = Mnemonic.fromString(mnemonic);
  const seed = await mnemonicObj.toSeed(passphrase);
  return seed.toString('hex');
}

async function derivePath(mnemonic, path) {
  const seed = await Mnemonic.fromString(mnemonic).toSeed();
  const master = HD.fromSeed(seed);
  const child = master.derive(path);

  return {
    path: path,
    privateKey: child.privKey, // Return the object, not the string
    publicKey: child.pubKey,   // Return the object, not the string
    wif: child.privKey.toWif(),
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
