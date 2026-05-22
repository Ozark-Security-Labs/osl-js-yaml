# OZARK-NOTES

**Forked from:** nodeca/js-yaml@3d7d34aeb2bc27dc386dc5ace6d5600c5ac1d67a (2026-05-22)
**Anchor tag in this repo:** `upstream/3d7d34aeb2bc27dc386dc5ace6d5600c5ac1d67a`

## Surface kept

Four exports from `index.js`, matching the surface `deterministic-deps` actually consumes:

| Export | Purpose | Consumer use |
|---|---|---|
| `load(content, options?)` | Parse a single YAML document. | `deterministic-deps/src/config.ts`, `src/remote.ts`, `src/rules/index.ts`. |
| `loadAll(content, iteratee?, options?)` | Parse multi-document YAML (`---`-separated). | `deterministic-deps/src/rules/index.ts:2026`, `src/config.ts:395`. |
| `DEFAULT_SCHEMA` | The schema used by `load` by default. | `deterministic-deps/src/config.ts`, `src/rules/index.ts` — passed via `{ schema: yaml.DEFAULT_SCHEMA }`. |
| `YAMLException` | Error class thrown on parse failures. | Used implicitly via try/catch around `load`. |

## Surface removed

Public-surface trim from upstream's ~15 named exports down to 4.

**Removed from `index.js`:**
- `dump` (serializer entry point — consumer never serializes).
- `Type` (custom-type definition API).
- `Schema` (custom-schema constructor).
- `FAILSAFE_SCHEMA`, `JSON_SCHEMA`, `CORE_SCHEMA` (named schemas — consumer uses only `DEFAULT_SCHEMA`; the others remain on disk because `DEFAULT_SCHEMA` transitively extends them).
- `types` (the custom-type registry object with binary/float/map/null/pairs/set/timestamp/bool/int/merge/omap/seq/str entries).
- `safeLoad`, `safeLoadAll`, `safeDump` (the v3-to-v4 renamed error shims).

**Removed files:**
- `lib/dumper.js` (~965 LOC) — entire YAML serializer. The only consumer in the codebase was `index.js`'s `dump` export, which is gone.
- `bin/js-yaml.js` (CLI binary) — consumer doesn't shell out to a CLI.
- `dist/` (browser bundles `js-yaml.js`, `js-yaml.min.js`, `js-yaml.mjs`) — not consumed in this fork's runtime.
- `examples/`, `support/`, `benchmark/` — documentation / dev tooling.
- `test/` (entire upstream test suite — exercised removed surface).
- `migrate_v3_to_v4.md`, `CHANGELOG.md` — upstream migration / history docs.

**Dependencies cleaned up:**
- Runtime: `argparse ^2.0.1` removed (only used by the deleted CLI). The fork now has **zero runtime dependencies**.
- devDeps: dropped the browser-bundling toolchain (`rollup`, `rollup-plugin-*`, `@rollup/*`, `gh-pages`, `codemirror`, `ansi`, `benchmark`, `shelljs`, `fast-check`).
- `package.json` `exports."."` simplified from `{ import: "./dist/js-yaml.mjs", require: "./index.js" }` to `"./index.js"` (CJS-only — modern Node handles `import yaml from 'osl-js-yaml'` against CJS via default-export interop).
- Removed `bin`, `unpkg`, `jsdelivr`, `module` fields from `package.json`.
- Removed `scripts.browserify`, `scripts.demo`, `scripts.gh-demo`, `scripts.coverage`.

**Files kept (deliberately, in `lib/`):**
- `lib/loader.js` — the parser, the heart of `load`/`loadAll`.
- `lib/schema/{default,core,json,failsafe}.js` — `DEFAULT_SCHEMA` extends `CORE_SCHEMA` extends `JSON_SCHEMA` extends `FAILSAFE_SCHEMA`. All four are in the dependency chain.
- `lib/schema.js` — `Schema` class (no longer exported but used by the schema files).
- `lib/type.js` + `lib/type/*.js` (all 13 type files) — all types appear in the `DEFAULT_SCHEMA` extension chain (null, bool, int, float, timestamp, merge, binary, omap, pairs, set, str, seq, map).
- `lib/common.js`, `lib/exception.js`, `lib/snippet.js` — used by `lib/loader.js` and `lib/schema.js`.

## Build / runtime notes

- No build step. `index.js` and `lib/` are pre-existing JavaScript — consumers can `require()` or `import` directly.
- `index.js` is CommonJS (uses `module.exports`); ESM consumers get the module via Node's CJS-to-ESM default-export interop. `package.json` `exports."."` points at `./index.js` for both branches.
- Smoke test verified: `yaml.load('key: value')` → `{key:'value'}`; `yaml.loadAll('a:1\n---\nb:2')` → `[{a:1},{b:2}]`; `yaml.DEFAULT_SCHEMA` resolves to an object.
- `prepublishOnly: npm run gh-demo` script was removed earlier to defuse accidental gh-pages branch publishing.
