---
"ossperks": minor
---

- Add keyword-set intent classification for eligibility rules, replacing brittle regex matching
- Add SPDX/OSI license detection via `license-similarity` and `spdx-license-list`
- Add program `configFiles` support for auto-verifying hosting requirements (e.g. `vercel.json`)
- Fix dependency scanning on Codeberg/Gitea by paginating the recursive git tree API so large repos no longer miss `package.json` files beyond the first page
- Reduce GitLab tree API overhead by requesting 100 entries per page instead of the default 20
- Fix empty bullets and reason formatting inconsistencies in the docs check page
