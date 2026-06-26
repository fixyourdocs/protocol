<!-- SPDX-License-Identifier: CC-BY-4.0 -->

# v0 reference examples

These JSON files are reference fixtures for the
[v0 wire format](../README.md). They are governed by Apache 2.0
(see the repository-root [LICENSE](../../../LICENSE)); the SPDX header
on each file appears in the `$comment` field, which the schema permits
for tooling annotations.

| File | Purpose | Schema verdict |
|---|---|---|
| [`minimum-required.json`](minimum-required.json) | Smallest valid v0 report. Exercises only required fields. | valid |
| [`golden-path.json`](golden-path.json) | Typical agent submission with evidence and a suggested fix. | valid |
| [`full.json`](full.json) | Every optional field populated. | valid |
| [`context-receipt.json`](context-receipt.json) | Uses `task_context.receipt` (the `task-context-receipt` capability) with `doc_observed`, `attempt`, and `privacy_claims`. | valid |
| [`invalid.json`](invalid.json) | Known-bad fixture for negative tests. `report.kind` is outside the v0 enum and an unknown top-level field `priority` is present. | invalid |
| [`invalid-context-receipt.json`](invalid-context-receipt.json) | Known-bad: `receipt.doc_observed.url` is missing (required) and `privacy_claims` carries an unknown flag. | invalid |

## Validating locally

The bundled harness validates every fixture in this directory against the
schema and asserts that the `invalid*.json` files are rejected. From the
repository root:

```sh
npm ci   # first time only
npm test
```

Or validate individual files with `ajv-cli`:

```sh
npx ajv-cli@5 validate \
  -s schema/v0/report.schema.json \
  --spec=draft2020 --strict=false --all-errors \
  -d 'spec/v0/examples/minimum-required.json' \
  -d 'spec/v0/examples/golden-path.json' \
  -d 'spec/v0/examples/full.json' \
  -d 'spec/v0/examples/context-receipt.json'

# Negative: these MUST fail.
for f in invalid invalid-context-receipt; do
  npx ajv-cli@5 validate \
    -s schema/v0/report.schema.json \
    --spec=draft2020 --strict=false --all-errors \
    -d "spec/v0/examples/$f.json" \
    && { echo "expected $f.json to fail"; exit 1; } || echo "$f.json rejected — as expected"
done
```
