// SPDX-License-Identifier: Apache-2.0
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

const schema = JSON.parse(
  readFileSync(join(root, "schema/v0/report.schema.json"), "utf8"),
);
const validate = ajv.compile(schema); // also fails the run if the schema itself is malformed

const dir = join(root, "spec/v0/examples");
const fixtures = readdirSync(dir).filter((f) => f.endsWith(".json"));

let failures = 0;
for (const file of fixtures) {
  const mustReject = file.startsWith("invalid");
  const data = JSON.parse(readFileSync(join(dir, file), "utf8"));
  const ok = validate(data);
  if (ok === mustReject) {
    failures++;
    console.error(`✗ ${file}: expected ${mustReject ? "INVALID" : "valid"}, got ${ok ? "valid" : "INVALID"}`);
    if (!ok) console.error("   " + ajv.errorsText(validate.errors, { separator: "\n   " }));
  } else {
    console.log(`✓ ${file}`);
  }
}

if (failures) {
  console.error(`\n${failures} fixture(s) did not match expectations`);
  process.exit(1);
}
console.log(`\nAll ${fixtures.length} fixtures behaved as expected.`);
