---
name: ossperks
description: Check if an open-source project qualifies for free tools, services, and credits. Run against any OSS repo to discover eligible perk programs.
version: 1.0.0
---

# OSS Perks

Checks open-source project eligibility for free tools, services, and credits from programs like Vercel, GitHub Copilot, Sentry, JetBrains, Cloudflare, and others.

## Usage

```bash
npx -y ossperks@latest check --repo <owner/repo>
```

## Commands

- `ossperks check` — Check if a project qualifies for OSS perk programs. Defaults to the current repo from `package.json`, or pass `--repo <owner/repo>`.
- `ossperks list` — List all available perk programs. Filter with `-c, --category <category>`.
- `ossperks show <slug>` — Show details for a specific program.
- `ossperks search <query>` — Search programs by name or description.
- `ossperks categories` — List available categories.

## Workflow

Run `ossperks check` against a repo to evaluate eligibility across all programs. Review the eligible / needs-review / ineligible results and apply for matching programs.