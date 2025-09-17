// smartledger-sdk/src/storage.js

const { encrypt, decrypt } = require('./crypto');

const STORAGE_PREFIX = 'smartledger_';

function checkLocalStorage() {
  if (typeof localStorage === 'undefined') {
    throw new Error('localStorage is not available in this environment.');
  }
}

function storeMnemonic(id, mnemonic, metadata, storageKey) {
  checkLocalStorage();
  const data = { mnemonic, metadata };
  const encryptedData = encrypt(JSON.stringify(data), storageKey);
  localStorage.setItem(`${STORAGE_PREFIX}${id}`, encryptedData);
}

function storeKey(id, key, metadata, storageKey) {
  checkLocalStorage();
  const data = { key, metadata };
  const encryptedData = encrypt(JSON.stringify(data), storageKey);
  localStorage.setItem(`${STORAGE_PREFIX}${id}`, encryptedData);
}

function listKeys() {
  checkLocalStorage();
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(STORAGE_PREFIX)) {
      keys.push(key.replace(STORAGE_PREFIX, ''));
    }
  }
  return keys;
}

function retrieveMnemonic(id, storageKey) {
  checkLocalStorage();
  const encryptedData = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
  if (!encryptedData) return null;
  const decryptedData = decrypt(encryptedData, storageKey);
  return JSON.parse(decryptedData);
}

function retrieveKey(id, storageKey) {
  checkLocalStorage();
  const encryptedData = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
  if (!encryptedData) return null;
  const decryptedData = decrypt(encryptedData, storageKey);
  return JSON.parse(decryptedData);
}

module.exports = {
  storeMnemonic,
  storeKey,
  listKeys,
  retrieveMnemonic,
  retrieveKey,
};
