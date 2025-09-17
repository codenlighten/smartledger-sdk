// smartledger-sdk/src/utils.js

const { v5: uuidv5 } = require('uuid');
const secrets = require('secrets.js-grempe');

const UUID_NAMESPACE = '9e7a4900-0e54-4dc4-9c5a-4b0c8d523745';

function generateUUID(domain) {
  return uuidv5(domain, UUID_NAMESPACE);
}

function splitSecret(secret, numShares, threshold) {
    const secretHex = Buffer.from(secret).toString('hex');
    return secrets.share(secretHex, numShares, threshold);
}

function combineShares(shares) {
    const combinedHex = secrets.combine(shares);
    return Buffer.from(combinedHex, 'hex').toString('utf8');
}

module.exports = {
  generateUUID,
  splitSecret,
  combineShares,
};
