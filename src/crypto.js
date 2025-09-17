// smartledger-sdk/src/crypto.js

const CryptoJS = require('crypto-js');

function encrypt(message, secret) {
  return CryptoJS.AES.encrypt(message, secret).toString();
}

function decrypt(ciphertext, secret) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function hash(data, algorithm = 'SHA256') {
  switch (algorithm.toUpperCase()) {
    case 'SHA256':
      return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
    case 'SHA512':
      return CryptoJS.SHA512(data).toString(CryptoJS.enc.Hex);
    case 'MD5':
      return CryptoJS.MD5(data).toString(CryptoJS.enc.Hex);
    default:
      throw new Error(`Unsupported hash algorithm: ${algorithm}`);
  }
}

function base64Encode(text) {
  const words = CryptoJS.enc.Utf8.parse(text);
  return CryptoJS.enc.Base64.stringify(words);
}

function base64Decode(base64text) {
  const words = CryptoJS.enc.Base64.parse(base64text);
  return CryptoJS.enc.Utf8.stringify(words);
}

function getRandomBytes(size) {
    return CryptoJS.lib.WordArray.random(size).toString(CryptoJS.enc.Hex);
}

module.exports = {
  encrypt,
  decrypt,
  hash,
  base64Encode,
  base64Decode,
  getRandomBytes,
};
