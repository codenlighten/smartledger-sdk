// smartledger-sdk/src/index.js

const crypto = require('./crypto');
const wallet = require('./wallet');
const bsv = require('./bsv');
const utils = require('./utils');
const storage = require('./storage');

const SmartLedger = {
  ...crypto,
  ...wallet,
  ...bsv,
  ...utils,
  ...storage,
};

module.exports = SmartLedger;
