import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // -------------- BASE --------------
  testDir: './tests',
  timeout: 30 * 1000, // 30 seconds max per test
  expect: {
    timeout: 5000, // timeout pour les assertions
  },

  // -------------- RETRIES / FAILURES --------------
  retries: process.env.CI ? 2 : 0, // en CI = plus fragile → 2 retries
  workers: process.env.CI ? 2 : undefined, // CI → limite le parallélisme pour éviter les flakes

  // -------------- REPORTING --------------
  reporter: [
    ['list'], // affichage dans la console
    ['html', { open: 'never' }], // rapport HTML
    ['junit', { outputFile: 'results/junit.xml' }], // utile pour Jenkins / GitLab
  ],

  // -------------- TRACES & SCREENSHOTS --------------
  use: {
    trace: 'on-first-retry', // génère trace.zip uniquement si le test échoue une première fois
    screenshot: 'only-on-failure', // utile pour debug
    video: 'retain-on-failure', // vidéos conservées seulement si test KO
    actionTimeout: 10_000, // timeout pour clic, fill, etc.
    navigationTimeout: 15_000,
    baseURL: 'https://demo.playwright.dev', // ou ton site
    headless: true,
  },

  // -------------- PROJETS (Chrome / Firefox / Mobile) --------------
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // -------------- IGNORE / CONFIG EXTRAS --------------
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // interdiction d'utiliser test.only en CI
  outputDir: 'test-results/', // screenshots/videos/traces
});
