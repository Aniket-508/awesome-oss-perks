---
"ossperks": minor
---

- Add Codeberg and Gitea as supported repository providers alongside GitHub and GitLab
- Add technology stack detection — programs can now declare required npm packages via `techPackages` to auto-verify technology requirements
- Add monorepo dependency scanning — all `package.json` files across workspaces are scanned, not just the root
