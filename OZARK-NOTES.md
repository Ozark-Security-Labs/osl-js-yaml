# OZARK-NOTES

**Forked from:** nodeca/js-yaml@3d7d34aeb2bc27dc386dc5ace6d5600c5ac1d67a (2026-05-22)
**Anchor tag in this repo:** `upstream/3d7d34aeb2bc27dc386dc5ace6d5600c5ac1d67a`

## Surface kept

v0.0.1 first-pass fork — no functional trim. Concrete consumer surface to date:

- Default export (commonly imported as `yaml`) — used by `deterministic-deps` in:
  - `src/config.ts` (config file parsing)
  - `src/remote.ts` (remote validation payload parsing)
  - `src/rules/index.ts` (rule loading)

Functions exercised: `load`, `dump` (typical js-yaml API).

## Surface removed

None in this initial fork. Notable surfaces still present that consumer does not exercise:
- CLI binary (`bin/js-yaml.js`)
- `loadAll` / `dumpAll` multi-document APIs
- Schema customization (`DEFAULT_SCHEMA`, `JSON_SCHEMA`, `CORE_SCHEMA`, etc.)

Phase 1b trim candidates: the CLI binary and the `support/`, `examples/`, `dist/js-yaml.min.js` browser distribution.

## Build / runtime notes

- `dist/`, `lib/`, `index.js` are committed in the upstream tree. No build step required for consumers; `npm install` from git URL just copies files.
- Own deps: `argparse ^2.0.1` (only used by the CLI; transitive from consumer's POV — stays upstream).
- `prepublishOnly: npm run gh-demo` (which pushes to a `gh-pages` branch) was removed to defuse accidental side effects.
