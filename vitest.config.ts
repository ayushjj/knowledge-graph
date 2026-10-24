import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    // Only the repo's own tests run — a *.test.* file dropped into insights/ or learnings/ must never execute
    // (CI runs vitest on every push to master; security review 2026-10-24).
    include: ['tests/**/*.test.ts'],
  },
});
