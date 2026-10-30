require('reflect-metadata');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { newDb, DataType } = require('pg-mem');
const { Event, User } = require('../dist-tests/entities');
const { storeReviewableEvent } = require('../dist-tests/events');

async function makeDataSource(t) {
  const db = newDb();
  db.public.registerFunction({ name: 'current_database', returns: DataType.text,
    implementation: () => 'analytics_test' });
  db.public.registerFunction({ name: 'version', returns: DataType.text,
    implementation: () => 'PostgreSQL 14.0' });
  const dataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres', entities: [Event, User], synchronize: true,
  });
  await dataSource.initialize();
  t.after(() => dataSource.destroy());
  return dataSource;
}

function event(overrides = {}) {
  return {
    type: 'track', eventId: 'queued-event', event: 'Published Comments',
    sentAt: '2026-10-27T22:00:00Z', userId: 'github:1',
    properties: { owner: 'owner', repo: 'repo', prNumber: 7 },
    context: { active: true, traits: { username: 'owner' } },
    ...overrides,
  };
}

test('concurrent retries insert one event and preserve the original payload', async t => {
  const db = await makeDataSource(t);
  await Promise.all(Array.from({ length: 10 }, () => storeReviewableEvent(db, event())));
  await storeReviewableEvent(db, event({ properties: { prNumber: 99 } }));
  const rows = await db.getRepository(Event).find({ relations: { user: true } });
  assert.equal(rows.length, 1);
  assert.equal(rows[0].eventId, 'queued-event');
  assert.equal(rows[0].properties.prNumber, 7);
  assert.equal(rows[0].user.userId, 'github:1');
  assert.equal(await db.getRepository(User).count(), 1);
});

test('distinct event IDs and legacy events without IDs remain separate', async t => {
  const db = await makeDataSource(t);
  for (const eventId of ['one', 'two', undefined, undefined]) {
    await storeReviewableEvent(db, event({ eventId }));
  }
  const rows = await db.getRepository(Event).find();
  assert.equal(rows.length, 4);
  assert.equal(rows.filter(row => row.eventId === null).length, 2);
});

test('userless connection events are stored without creating a user', async t => {
  const db = await makeDataSource(t);
  await storeReviewableEvent(db, event({
    event: 'Created Review', userId: undefined, context: { active: false },
  }));
  const row = await db.getRepository(Event).findOneOrFail({
    where: { eventId: 'queued-event' }, relations: { user: true },
  });
  assert.equal(row.user, null);
  assert.equal(row.active, false);
  assert.equal(await db.getRepository(User).count(), 0);
});

test('replicant attribution stays on the event rather than its owner profile', async t => {
  const db = await makeDataSource(t);
  await storeReviewableEvent(db, event({
    context: { active: true, traits: { agent: 'replicant' } },
  }));
  await storeReviewableEvent(db, event({ eventId: 'human-event' }));
  const rows = await db.getRepository(Event).find({
    relations: { user: true }, order: { id: 'ASC' },
  });
  assert.deepEqual(rows.map(row => row.agent), ['replicant', null]);
  assert.deepEqual(rows.map(row => row.user.userId), ['github:1', 'github:1']);
  assert.equal(await db.getRepository(User).count(), 1);
});

test('database failures reject instead of being acknowledged as duplicate deliveries', async t => {
  const db = await makeDataSource(t);
  await assert.rejects(storeReviewableEvent(db, event({ event: undefined })));
  assert.equal(await db.getRepository(Event).count(), 0);
});
