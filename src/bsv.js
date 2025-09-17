// smartledger-sdk/src/bsv.js

const sdk = require('@bsv/sdk');
const { PrivateKey, PublicKey, SignedMessage, Utils } = sdk;

function generateKeyPair() {
  const privateKey = PrivateKey.fromRandom();
  const publicKey = privateKey.toPublicKey();
  return { privateKey, publicKey };
}

function signMessage(message, privateKey, recipientPubKey = null) {
  const messageBytes = Utils.toArray(message, 'utf8');
  if (recipientPubKey) {
    return SignedMessage.sign(messageBytes, privateKey, recipientPubKey);
  }
  return SignedMessage.sign(messageBytes, privateKey);
}

function verifySignature(message, signature, verifierKey = null) {
  const messageBytes = Utils.toArray(message, 'utf8');
  if (verifierKey) {
    return SignedMessage.verify(messageBytes, signature, verifierKey);
  }
  return SignedMessage.verify(messageBytes, signature);
}

function isValidPrivateKey(privateKey) {
  try {
    PrivateKey.fromString(privateKey);
    return true;
  } catch (e) {
    return false;
  }
}

function isValidPublicKey(publicKey) {
  try {
    PublicKey.fromString(publicKey);
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
