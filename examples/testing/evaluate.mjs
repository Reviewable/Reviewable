import {readFileSync} from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import {runInNewContext} from 'node:vm';
import lodash from 'lodash';

const fixture = new URL(`./scenarios/${process.argv[2]}.json`, import.meta.url);
const review = JSON.parse(readFileSync(fixture, 'utf8'));
const conditionCode = readFileSync(new URL('./condition.js', import.meta.url), 'utf8');
const script = `JSON.stringify((function() {\n'use strict';\n${conditionCode}\n})())`;

const result = runInNewContext(script, {
  review,
  _: lodash,
  require(moduleName) {
    if (moduleName === 'http') return http;
    if (moduleName === 'https') return https;
    throw new Error('Module not whitelisted: ' + moduleName);
  }
}, {
  filename: 'condition.js', lineOffset: -2, timeout: 3000, microtaskMode: 'afterEvaluate'
});
process.stdout.write(result);
