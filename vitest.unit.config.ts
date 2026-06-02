import { defineConfig } from 'vitest/config'

// Node-environment unit tests for QA tooling (scripts/**), kept separate from the
// Storybook browser test project in vitest.config.ts.
// Run: npx vitest run --config vitest.unit.config.ts
export default defineConfig({
  test: {
    environment: 'node',
    include: ['scripts/**/*.test.mjs'],
  },
})
