<h1>
  <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://ossperks.com/icon-light.svg">
   <source media="(prefers-color-scheme: light)" srcset="https://ossperks.com/icon.svg">
   <img alt="OSS Perks" src="https://ossperks.com/icon.svg" height="40">
  </picture>
  OSS Perks CLI
</h1>

<p align="left">
  <a href="https://www.npmjs.com/package/ossperks"><img src="https://img.shields.io/npm/v/ossperks.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/ossperks"><img src="https://img.shields.io/npm/dm/ossperks.svg" alt="npm downloads" /></a>
  <a href="https://github.com/Aniket-508/awesome-oss-perks/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-CC0--1.0-lightgrey.svg" alt="license" /></a>
  <a href="https://github.com/Aniket-508/awesome-oss-perks/actions/workflows/ci.yml"><img src="https://github.com/Aniket-508/awesome-oss-perks/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
</p>

Check if your project qualifies for open-source programs — across GitHub, GitLab, Codeberg, and Gitea.

## Install

```sh
# Run without installing
npx ossperks

# Install globally
npm install -g ossperks
# or
pnpm add -g ossperks
```

## Commands

### `check`

Check your project's eligibility across all supported OSS programs.

```sh
# Auto-detect repo from package.json or git config
ossperks check

# Specify a repo explicitly
ossperks check --repo vercel/next.js

# Check a GitLab, Codeberg, or Gitea repo
ossperks check --repo inkscape/inkscape --provider gitlab
ossperks check --repo forgejo/forgejo --provider codeberg
ossperks check --repo go-gitea/gitea --provider gitea

# Output results as JSON
ossperks check --repo vercel/next.js --json
```

**What gets checked automatically:**

- License type (permissive, OSI-approved, copyleft)
- Star count thresholds
- Fork and private repo detection
- Tech stack requirements (e.g. Convex, Neon, Algolia packages in `package.json`)
- Hosting hints (e.g. presence of `vercel.json`)
- Project age

**What requires manual review:**

- Non-commercial use
- Community size
- Code of conduct
- Subjective or role-based criteria

### `list`

List all available OSS programs.

```sh
ossperks list

# Filter by category
ossperks list --category devtools

# Output as JSON
ossperks list --json
```

### `show`

Show details for a specific program by its slug.

```sh
ossperks show vercel
ossperks show sentry
ossperks show github-copilot
```

### `search`

Search programs by name, description, tags, or perks.

```sh
ossperks search "database"
ossperks search "ci cd"
```

### `categories`

List all available program categories.

```sh
ossperks categories
ossperks categories --json
```

### `telemetry`

Show or change anonymous usage data collection.

```sh
ossperks telemetry          # same as `status`
ossperks telemetry status
ossperks telemetry disable
ossperks telemetry enable
```

## Environment Variables

Tokens avoid API rate limits when checking repos; the last two disable telemetry.

| Variable           | Description                                       |
| ------------------ | ------------------------------------------------- |
| `GITHUB_TOKEN`     | GitHub personal access token                      |
| `GITLAB_TOKEN`     | GitLab personal access token                      |
| `DO_NOT_TRACK`     | Set to any value to disable telemetry             |
| `DISABLE_TELEMETRY`| Set to any value to disable telemetry             |

```sh
GITHUB_TOKEN=ghp_... ossperks check --repo your-org/your-repo
```

## Telemetry

The CLI collects anonymous usage data to understand which commands are used and
on which platforms. It is **on by default**, and a notice is printed the first
time an event is sent.

**What is collected**

| Field                                | Example              |
| ------------------------------------ | -------------------- |
| Command name                         | `cli:check`          |
| CLI version                          | `0.4.0`              |
| Operating system, architecture       | `linux`, `arm64`     |
| Node version                         | `v22.20.0`           |
| Whether the run is in CI             | `true`               |
| Anonymous id: `sha256(host:user)[:16]` | `9f1c2ab4d0e3f871` |

Errors also send the command name, error message, and stack trace so crashes can
be fixed.

**What is never collected:** repository names or URLs, file paths, tokens, the
contents of your project, your hostname or username in plain text, or your IP
beyond what PostHog records for any HTTPS request.

Data is sent to [PostHog](https://posthog.com) (`https://us.i.posthog.com`).
Delivery failures are silently dropped — telemetry never writes errors to your
terminal and never blocks a command.

**How to opt out** (any one of these):

```sh
ossperks telemetry disable   # persisted to ~/.ossperks/telemetry.json
export DO_NOT_TRACK=1        # per-shell, also respected by other tools
export DISABLE_TELEMETRY=1   # per-shell
```

Re-enable with `ossperks telemetry enable`. Check the current state with
`ossperks telemetry status`.

## Development

See the [CONTRIBUTING.md](https://github.com/Aniket-508/awesome-oss-perks/blob/main/CONTRIBUTING.md) for development setup and commands.
