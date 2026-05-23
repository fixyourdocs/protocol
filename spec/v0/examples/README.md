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
| [`invalid.json`](invalid.json) | Known-bad fixture for negative tests. `report.kind` is outside the v0 enum and an unknown top-level field `priority` is present. | invalid |

## Validating locally

From the repository root:

```sh
npx ajv-cli@5 validate \
  -s schema/v0/report.schema.json \
  --spec=draft2020 --strict=false --all-errors \
  -d 'spec/v0/examples/minimum-required.json' \
  -d 'spec/v0/examples/golden-path.json' \
  -d 'spec/v0/examples/full.json'

# Negative: this MUST fail.
npx ajv-cli@5 validate \
  -s schema/v0/report.schema.json \
  --spec=draft2020 --strict=false --all-errors \
  -d 'spec/v0/examples/invalid.json' \
  && { echo "expected invalid.json to fail"; exit 1; } || echo "invalid.json rejected — as expected"
```
