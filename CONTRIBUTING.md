# Contributing to ossperks

Thanks for your interest in contributing to **ossperks**! This project is a monorepo containing:

- **Website/docs** — A Fumadocs-based site that will aggregate open-source perks and program guidelines.
- **CLI** (`@ossperks/cli`) — A CLI that checks whether a user’s project qualifies for a given OSS program based on that program’s guidelines.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v22.20+
- [pnpm](https://pnpm.io/) v10.29+ (package manager)

### Getting Started

```bash
# Clone the repo (replace with your actual GitHub user/org and repo)
git clone https://github.com/Aniket-508/ossperks.git
cd ossperks

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run all tests
pnpm test
```

## Project Structure

```
packages/
└── cli/             # @ossperks/cli - CLI to check project eligibility for OSS programs
docs/                # Fumadocs documentation site (Next.js)
```

## Development Commands

```bash
# Build all packages
pnpm build

# Run all tests
pnpm test

# Type check everything
pnpm typecheck

# Lint and format check (ultracite)
pnpm check

# Fix lint and format issues (ultracite)
pnpm fix

# Run tests for the CLI package
pnpm --filter @ossperks/cli test
```

### Documentation site

To run the docs site locally:

```bash
pnpm --filter docs dev
```

## Code Style

We use `oxfmt` and `oxlint` (via `ultracite`) for linting and formatting. Run `pnpm fix` to auto-fix most issues.

## Pull Requests

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Ensure tests pass: `pnpm test`
4. Run `pnpm check` to verify code quality
5. Submit a PR

### Changesets

For any user-facing changes to packages, add a changeset:

```bash
pnpm changeset
```

Follow the prompts to select the affected packages and provide a brief description of the change.

## Package overview

- **`@ossperks/cli`**: The CLI used to check if a project qualifies for OSS perk programs. Add program definitions and eligibility logic here.
- **`docs`**: The Fumadocs app for the OSS Perks website and documentation.

## Questions?

Feel free to open an issue or start a discussion if you have questions!
