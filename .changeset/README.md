# Changesets

This repo uses Changesets to version and publish the workspace packages.

- Add a changeset for any user-facing package change.
- Merge the changeset PR to `main`.
- The release workflow will open or update a version PR.
- Merging the version PR publishes all fixed-version packages together.
