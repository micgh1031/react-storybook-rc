'use strict';
const _fs = require('fs');
const fs = _interopRequireWildcard(_fs);
const _glob = require('glob');
const _mkdirp = require('mkdirp');

const MESSAGES_PATTERN = './__i18n__/**/*.json';
const LANG_DIR = './src/i18n/';

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    const newObj = {};
    if (obj != null) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj; return newObj;
  }
}

const messages = (0, _glob.sync)(MESSAGES_PATTERN).map(function (filename) {
    return fs.readFileSync(filename, 'utf8');
}).map(function (file) {
    return JSON.parse(file);
}).reduce(function (collection, descriptors) {
    descriptors.forEach(function (_ref) {
        const id = _ref.id,
              defaultMessage = _ref.defaultMessage;

        if (collection.hasOwnProperty(id)) {
            throw new Error('Duplicate message id: ' + id);
        }

        collection[id] = defaultMessage;
    });

    return collection;
}, {});

(0, _mkdirp.sync)(LANG_DIR);
fs.writeFileSync(LANG_DIR + 'en.json', JSON.stringify(messages, null, 4));
