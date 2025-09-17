// smartledger-sdk/src/bsv.js

const { PrivKey, PubKey, KeyPair, Address, Bsm } = require('bsv');

function generateKeyPair() {
  const privKey = PrivKey.fromRandom();
  const pubKey = PubKey.fromPrivKey(privKey);
  return { privateKey: privKey, publicKey: pubKey };
}

async function signMessage(message, privateKey) {
  const key = PrivKey.fromString(privateKey);
  const keyPair = KeyPair.fromPrivKey(key);
  const messageBuffer = Buffer.from(message);
  const signature = Bsm.sign(messageBuffer, keyPair);
  return signature;
}

async function verifySignature(message, signature, publicKey) {
  const pubKey = PubKey.fromString(publicKey);
  const address = Address.fromPubKey(pubKey);
  const messageBuffer = Buffer.from(message);
  return Bsm.verify(messageBuffer, signature, address);
}

function isValidPrivateKey(privateKey) {
  try {
    PrivKey.fromString(privateKey);
    return true;
  } catch (e) {
    return false;
  }
}

function isValidPublicKey(publicKey) {
  try {
    PubKey.fromString(publicKey);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  generateKeyPair,
  signMessage,
  verifySignature,
  isValidPrivateKey,
  isValidPublicKey,
};
