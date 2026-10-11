# CLAUDE.md

## Development

- Package manager: pnpm (`corepack enable`, then `pnpm install --frozen-lockfile`)
- Tests: `pnpm test` (update snapshots with `pnpm jest -u` when a data change is intended)
- Lint and types: `pnpm eslint`, `pnpm tsc --noEmit`, `pnpm format --check`

## Releasing a new version to npm

Publishing is automated by `.github/workflows/release.yml`. It runs on every push to `main` that touches
`package.json` and publishes when that version is not on npm yet, then creates the `vX.Y.Z` tag and a GitHub
release. Never run `npm publish` yourself and never create the tag by hand.

To release:

1. Pick the version. Follow semver: patch for fixes (including data corrections), minor for new features, major for
   breaking changes. If the person asking did not say, check the commits since the last `v*` tag and propose one.
2. On a branch from the latest `main`, bump the version without tagging:
   `npm version <patch|minor|major|X.Y.Z> --no-git-tag-version`. This only changes `version` in `package.json`.
3. Commit as `X.Y.Z`, push, and open a pull request titled `Release X.Y.Z` that lists the changes since the last tag.
4. Once CI is green, merge it. The release workflow then publishes to npm.
5. Check that the `Release` workflow run on `main` succeeded and that the GitHub release `vX.Y.Z` exists.
