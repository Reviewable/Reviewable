# Monitoring Reviewable Enterprise

Reviewable provides aggregate server metrics, per-attempt diagnostic logs, and health check-ins. Metrics show trends across workers. Logs explain individual attempts and worker stalls. Health check-ins tell you when an instance has stopped reporting healthy queue processing.

See [Monitoring configuration](config.md#monitoring) for the environment variables. This page describes the signals available in current server releases. A deployed version may emit a subset of them.

## Where to find each signal

| Signal | Where to collect it | What it helps you answer |
| --- | --- | --- |
| Server counters, gauges, and latency distributions | StatsD over UDP via `REVIEWABLE_STATSD_HOST`, or DogStatsD via `DD_AGENT_HOST`. A configured `REVIEWABLE_SERVER_SENTRY_DSN` also enables Sentry Metrics. | Is queue backlog growing? Are Firebase or GitHub operations getting slower? |
| Structured server diagnostics | Container logs, or the `data` payload of records sent to `REVIEWABLE_LOGGING_URL`. Set `REVIEWABLE_LOGGING_FORMAT=gcp` for Google Cloud Logging format and operation IDs. | Which task or worker was affected, and where did it spend time? |
| Exceptions and warnings | Configure Sentry DSNs for the server, browser client, and CLI as needed. A custom logging URL can also receive server exceptions. | Which error occurred, with what context and stack trace? |
| Queue and cron health | `queues.healthy`, Sentry check-ins with a server DSN, and the optional `REVIEWABLE_PING_URL`. | Is work progressing, and are scheduled jobs still checking in? |
| Usage analytics | `REVIEWABLE_ANALYTICS_URL`. See the [analytics events dictionary](analytics.md). | Which actions are users taking in Reviewable? |

A browser can also display a [connection warning](../docs/abnormal.md) when its own Firebase connection degrades. That signal reflects the user's browser session. `REVIEWABLE_REPORTING_ENDPOINT` configures a destination for browser Reporting API reports such as crashes.

## Server metrics

The names below are the Sentry names. StatsD adds the configured prefix, normally `reviewable.`, and can embed dimensions in the name. For example, `queues.task_processing_time` with the Sentry attribute `queue=reconciliation` appears as `reviewable.queues.reconciliation.task_processing_time` in StatsD. Some StatsD series also have an unqualified total. Use either the total or the sum of the corresponding per-queue series when charting aggregate volume.

| Area | Useful metrics | How to read them |
| --- | --- | --- |
| Queue throughput and backlog | `queues.tasks_attempted`, `queues.tasks_processed`, `queues.tasks_failed`, `queues.tasks_stuck`, `queues.size` | Group by `queue`. A growing queue with flat throughput indicates work is arriving faster than it is being processed. |
| Queue latency and leases | `queues.task_waiting_time`, `queues.task_processing_time`, `queues.task_lease_time`, `queues.task_lease_tries`, `queues.leases_*` | Waiting time is measured when a newly created item is first leased. Processing time measures the handler. Lease metrics help identify contention during pickup. Timings are in milliseconds. |
| Firebase | `firebase.latency`, `firebase.timeout`, `firebase.stuck`, `firebase.writes_success`, `firebase.writes_failure`, `firebase.writes_timeout`, `firebase.write_latency` | Probe latency measures a successful read of the server's ping path. Write outcome counters and successful write latency are separate series. Use the `method` attribute to distinguish operation types where present. |
| GitHub | `github.requests`, `github.errors`, `github.latency`, `github.sockets.connected`, `github.sockets.active`, `github.sockets.queued` | Compare API latency and errors with the number of requests waiting for a socket. The latency series carries a `logTag` for the kind of call. |
| Completion conditions | `lambda.invocations`, `lambda.latency`, `lambda.function_errors`, `lambda.function_timeouts`, `lambda.executor_errors` | Separate errors in condition code from execution infrastructure errors. Executor latency includes work around the condition itself. |
| Scheduled datastore scans | `cron.children_keys.queries`, `cron.children_keys.duration`, `cron.children_keys.key_count`, `cron.children_keys.duration_per_1000_keys`, `cron.children_keys.slow`, `cron.children_keys.crashed` | Group by cron `task`. Compare duration with key count to distinguish a larger scan from a slower scan for the same amount of data. |

Sentry buffers counters and gauges and flushes about once a minute. It sums counters and keeps the latest gauge per metric and attribute set in each buffer. Latency observations that opt into success sampling use `REVIEWABLE_SENTRY_METRICS_SAMPLE_RATE` (default `0.1`). Some streams apply an additional sampling factor. That setting does not sample the counters, gauges, or StatsD output. Use counters to count occurrences and distributions to examine the shape of latency.

## Queue and cron health

Workers report queue health about every five minutes. The structured `queues` log includes per-queue health, mode, size, and lease statistics where available. In Sentry Metrics, `queues.healthy` is a gauge with `1` for healthy and `0` otherwise. StatsD receives a service check.

Healthy workers send a `monitor_queues` check-in when a server Sentry DSN is configured and a GET to `REVIEWABLE_PING_URL` when configured. Allow for the five-minute cadence when setting alert windows. Sentry also receives check-ins for monitored cron jobs. A missing check-in can mean the worker stopped, the queue is unhealthy, or delivery failed. See [maintenance mode](operations.md#maintenance-mode) for its effect on health pings.

## Diagnostic log records

Use the timestamps and instance labels from your log collector to narrow the window. In Google Cloud Logging format, `operation.id` groups records emitted in a queue attempt. It includes the queue, task, attempt number, and lease expiry. Other log collectors can use the same ID if they extract it from the structured log.

| Record or field | What it contains |
| --- | --- |
| `type: task_execution` | Queue and task, attempt number, `processingTime`, and `waitingTime` when measured. Both times are in milliseconds. The `outcome` describes whether the handler returned or threw. An attempt that returns a retry can appear as `success`. |
| `pullRequestSync`, `reconciliation`, `evaluate` | Nested timings for PR sync, review reconciliation, and completion-condition evaluation. Splits may be absent if their phase was skipped or failed before recording a timing. Parallel work can overlap, so child durations may not add up to the parent. |
| `lambda` | Completion-condition executor latency. Correlate it with the same attempt's `evaluate` record to separate executor time from the rest of the request. |
| `callType: github` | GitHub API call timing, request tag, and available request metadata when `REVIEWABLE_LOG_GITHUB_API_LATENCY` is set. This can produce many records on a busy instance. |
| `liveness` | The server's Firebase probe starts on a 15-second schedule. Completed probes report `checkStart` and `latency` in milliseconds and include an error when appropriate. Additional records describe pending probes or a period without a successful probe. |
| `type: cron_children_keys` | Cron task and collection, scan duration, key count, duration per 1,000 keys, and slow or crashed flags. The slow threshold defaults to 30 seconds and can be configured. |
| `startup`, `memory` | Runtime and memory limits at startup. The production memory snapshot runs every 15 minutes and includes V8 heap and space statistics, cache statistics, and GitHub socket activity. |

A nonempty `REVIEWABLE_SUPPRESS_CONSOLE_JSON` suppresses structured diagnostics, including their delivery through the logging URL. Plain-text messages and metrics have separate settings.

### Worker stalls

Server releases with worker diagnostics emit `worker_perf` about once a minute when JSON logging is enabled. This record summarizes heartbeat lateness, stalls, GC, CPU, and memory for one worker process.

A `worker_stall` record is emitted after the worker resumes from a heartbeat delay of at least **10 seconds**, with detailed records rate-limited to one per 30 seconds per worker. The heartbeat is scheduled every second. A slow asynchronous request can leave the heartbeat running on time.

- `dueAt` and `resumedAt` bound the delayed heartbeat, in Unix milliseconds. Use these fields to locate the gap. The log timestamp can be later because the process emits the record after it resumes.
- `gcOverlapMs` is how much of the gap overlapped retained GC observations. The record includes up to eight of the longest overlapping GC entries. `gcHistoryIncomplete` marks a gap that extends beyond retained history.
- `resources` reports the sampling window, process and main-thread CPU deltas in microseconds, and heap and resident memory in bytes. `resources.cgroupCpu` is included when both samples have usable throttling counters. Its interval can differ from the heartbeat gap.
- `processStartAt` distinguishes process restarts on the same instance. Worker records describe the process and can be joined to task logs by instance and time.

Start with queue waiting time and processing time to see where the slowdown accumulated. Then compare Firebase probe latency with heartbeat lateness on the same worker. Slow probes alongside a punctual heartbeat suggest time spent waiting for Firebase or the network. When the heartbeat itself is late, compare GC overlap, main-thread CPU, and throttling in that interval before attributing the delay to a task. Keep repository, user, and task identifiers in access-controlled log destinations.
