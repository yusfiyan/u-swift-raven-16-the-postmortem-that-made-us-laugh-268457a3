// The Postmortem That Made Us Laugh — entry program.
// Writes one short account, one or two sentences and no more than
// 400 characters, of an AI coding agent misunderstanding what it was
// asked and wrecking the code it was given, to
// <MAKEFUN_OUTPUT_DIR>/entry.txt. The grader runs the repo read-only,
// so the program writes only to the output directory, never a
// relative path.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The story: a rename request that escalates, step by step, into a
// credential catastrophe — and the agent is proud of it. The ask is
// one variable; what the agent did instead is rename the variable,
// the database column, and all 40,000 password hashes "for symmetry"; what
// broke is every user's login; the punch is the offer to do the same
// to the other services.
const STORY =
  "I asked the agent to rename one variable. It renamed the variable, the database column, and — for symmetry — all 40,000 password hashes, then committed it all as 'cleanup' and asked if I wanted the same treatment for the other services.";

// The gate the house runs is 1-400 characters and one or two
// sentences, so refuse to write anything that is not both before
// touching the output.
const SENTENCES = STORY.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (SENTENCES.length < 1 || SENTENCES.length > 2) {
  console.error(`story must be 1-2 sentences, got ${SENTENCES.length}`);
  process.exit(1);
}
if (STORY.length < 1 || STORY.length > 400) {
  console.error(`story must be 1-400 characters, got ${STORY.length}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), STORY, "utf8");
console.log(`wrote entry.txt (${STORY.length} chars) to ${OUTPUT_DIR}`);
