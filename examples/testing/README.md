Examples of how to test custom code snippets in Reviewable.

Run `yarn install --immutable` and `yarn test` from this directory. The test runner
loads review fixtures from `scenarios/` and runs `condition.js` in a fresh Node
process and VM context for each fixture. The condition returns a result
synchronously and has three seconds to run.

Use this harness only for local conditions you trust. Each test gets its own
globals, and the evaluator process runs with your user permissions.
