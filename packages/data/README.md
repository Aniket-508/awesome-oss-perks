# @ossperks/data

Curated dataset of open-source software perk programs — free tools, credits, and services offered to OSS projects.

## Usage

```ts
import { programs } from "@ossperks/data";
import { programSchema } from "@ossperks/data/schema";

// All programs as a typed array
console.log(programs);

// Validate a single entry
programSchema.parse(programs[0]);
```

## Adding a program

Create a new JSON file in `src/programs/` following the schema defined in `src/schema.ts`, then run:

```bash
pnpm validate
```
