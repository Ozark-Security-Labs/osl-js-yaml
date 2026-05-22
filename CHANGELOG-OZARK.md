# CHANGELOG-OZARK

All Ozark-side patches applied on top of the upstream fork point (`upstream/3d7d34aeb2bc27dc386dc5ace6d5600c5ac1d67a`).

## 2026-05-22 — Initial Ozark fork

- **Type:** initial setup
- **Reference:** internal pilot — Ozark internal stdlib bring-up
- **Author:** @bjcorder
- **Notes:** Renamed package to `osl-js-yaml`, version `0.0.1`. Removed `prepublishOnly: npm run gh-demo` script. Normalized `repository` field to an object pointing at the fork. Added `OZARK-NOTES.md`, `CHANGELOG-OZARK.md`, `LICENSE-UPSTREAM`, Ozark README header. No functional trim.

## 2026-05-22 — Aggressive public-surface trim

- **Type:** trim — public API reduction + dumper removal
- **Reference:** consumer surface audit: `deterministic-deps` uses only `yaml.load`, `yaml.loadAll`, `yaml.DEFAULT_SCHEMA`
- **Author:** @bjcorder
- **Notes:** Reduced public exports from ~15 to 4 (`load`, `loadAll`, `DEFAULT_SCHEMA`, `YAMLException`). Rewrote `index.js` (47 → 16 LOC): removed exports `dump`, `Type`, `Schema`, `FAILSAFE_SCHEMA`, `JSON_SCHEMA`, `CORE_SCHEMA`, the `types` object, and the `safeLoad`/`safeLoadAll`/`safeDump` v3-to-v4 renamed shims. Deleted `lib/dumper.js` (~965 LOC) — the entire YAML serializer; only used by the dropped `dump` export. Deleted `bin/` (CLI), `dist/` (browser bundles), `examples/`, `support/`, `benchmark/`, `test/`, `migrate_v3_to_v4.md`, upstream `CHANGELOG.md`. Removed runtime dependency `argparse` (only used by the deleted CLI) — fork now has zero runtime dependencies. Removed devDeps for the browser-bundling toolchain (`rollup`, `rollup-plugin-*`, `gh-pages`, `codemirror`, `ansi`, `benchmark`, `shelljs`, `fast-check`). Simplified `package.json` `exports."."` to `"./index.js"` (CJS, with ESM-via-interop). Removed `bin`, `unpkg`, `jsdelivr`, `module` fields. Smoke test verified `load('key: value')`, `loadAll('a:1\n---\nb:2')`, and `DEFAULT_SCHEMA` resolve correctly.
