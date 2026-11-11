import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import {promisify} from 'node:util';

const evaluate = promisify(execFile);
const evaluatorPath = fileURLToPath(new URL('./evaluate.mjs', import.meta.url));

testScenario('incomplete_review', result => {
  assert.equal(result.completed, false);
  assert.equal(result.shortDescription, '4 files, 7 discussions left');
  assert.deepEqual(result.pendingReviewers, [{username: 'leereilly'}]);
});

function testScenario(name, check) {
  test(name, async () => {
    const {stdout} = await evaluate(process.execPath, ['--max-old-space-size=50', evaluatorPath, name], {
      timeout: 5000, killSignal: 'SIGKILL'  // Allow for process startup and enforce a hard deadline.
    });
    check(JSON.parse(stdout));
  });
}
