import freeport from 'freeport';
import fs from 'fs';
import ms from 'ms';
import os from 'os';
import {SandCastle} from 'sandcastle';
import test from 'ava';

const EVALUATION_TIMEOUT = ms('3s');
const SANDCASTLE_OPTIONS = {
  timeout: EVALUATION_TIMEOUT, memoryLimitMB: 50, useStrictMode: true, socket: 55555,
  api: './evaluation_api.js'
};

let sandCastle, conditionCode;

test.before.cb('initialize SandCastle', t => {
  if (os.platform() === 'win32') {
    freeport((error, port) => {
      if (error) throw error;
      SANDCASTLE_OPTIONS.socket = port;
      sandCastle = new SandCastle(SANDCASTLE_OPTIONS);
      t.end();
    });
  } else {
    sandCastle = new SandCastle(SANDCASTLE_OPTIONS);
    console.log('Executing user code in SandCastle');
    t.end();
  }
});

test.before('load condition code', t => {
  conditionCode = fs.readFileSync('./condition.js');
});


testScenario('incomplete_review', (t, result) => {
  t.false(result.completed);
  t.is(result.shortDescription, '4 files, 7 discussions left');
  t.deepEqual(result.pendingReviewers, [{username: 'leereilly'}]);
});



function testScenario(name, fn) {
  test(name, function(t) {
    const context = {
      review: JSON.parse(fs.readFileSync(`./scenarios/${name}.json`))
    };
    return runSandCastle(conditionCode, context).then(result => {
      return fn(t, result);
    });
  });
}

function runSandCastle(code, context) {
  return new Promise((resolve, reject) => {
    const script = sandCastle.createScript(
      `exports.main = function() {exit((function() {\n${code};\n})());};`);
    script.on('exit', (error, output) => {
      if (error) {
        const e = new Error();
        const stack = error.stack.split(/[\n\r]/);
        let k = 2;
        while (k < stack.length && !/    at exports.main \(evalmachine/.test(stack[k])) k++;
        if (k >= stack.length) k = 2;
        stack.splice(k, Infinity);
        e.message = stack.join('\n')
          .replace(/evalmachine\.<anonymous>:/g, 'line ')
          .replace(
            / line (\d+)/g, (match, lineNumber) => ' line ' + (parseInt(lineNumber, 10) - 1));
        reject(e);
      } else {
        resolve(output);
      }
    });
    script.on('timeout', () => {
      reject(new Error(
        `Evaluating completion condition timed out after ${ms(EVALUATION_TIMEOUT)}`));
    });
    script.run(context);
  });
}
