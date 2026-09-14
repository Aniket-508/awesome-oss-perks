---
"ossperks": patch
---

Telemetry no longer prints PostHog network stack traces when the endpoint is unreachable, and adds an `ossperks telemetry status|enable|disable` command.

Transport failures are absorbed at the fetch boundary (PostHog's `logFlushError` writes to stderr with no hook to silence it) and requests time out after 2s, so an offline run finishes immediately instead of hanging on retries. Config also moves from `~/telemetry.json` to `~/.ossperks/telemetry.json`; an opt-out saved at the old path is still honoured.
