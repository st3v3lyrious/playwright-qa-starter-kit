# 🎭 Playwright QA Starter Kit (EN & FR)

# 🇬🇧 English Version

## 🎭 Playwright QA Starter Kit (TypeScript)

A complete and professional starter kit for end-to-end testing with **Playwright + TypeScript**, featuring:

- Modern **Page Object Model** architecture  
- Component-based structure (filters, table, drawers, etc.)  
- Robust UI tests on Playwright’s official **TodoMVC** demo app  
- A “production-style” Playwright config (trace, retries, HTML reports, CI-friendly)  
- Clean repo layout, ideal for **freelance work** and **portfolio showcasing**

## 📦 1. Installation

### Clone the repository

```bash
git clone https://github.com/<your-username>/playwright-qa-starter-kit.git
cd playwright-qa-starter-kit
```

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

## ▶️ 2. Running the Tests

### Run all tests (headless)

```bash
npx playwright test
```

### Run tests with the Playwright UI

```bash
npx playwright test --ui
```

### Run only TodoMVC tests

```bash
npx playwright test tests/todomvc
```

## 🏛 3. Project Structure

```
/
├── src/
│   └── page-objects/
│       └── todomvc/
│           └── TodoPage.ts
├── tests/
│   └── todomvc/
│       ├── todomvc-basic.spec.ts
│       └── todomvc-filters.spec.ts
├── playwright.config.ts
├── package.json
├── README.md
└── .gitignore
```

## ⚙️ 4. Pro Playwright Config

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'results/junit.xml' }],
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://demo.playwright.dev',
    headless: true,
  },

  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
    { name: 'firefox', use: devices['Desktop Firefox'] },
    { name: 'webkit', use: devices['Desktop Safari'] },
  ],

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  outputDir: 'test-results/',
});
```

## 🤖 6. CI Integration (GitHub Actions)

```
.github/workflows/playwright.yml
```

```yaml
name: Playwright Tests

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npx playwright test --reporter=line
```

# 🇫🇷 Version Française

## 🎭 Starter Kit Playwright QA (TypeScript)

Starter kit complet et professionnel pour les tests end-to-end avec **Playwright + TypeScript**, incluant :

- Architecture **Page Object Model** moderne  
- Structure modulaire (filtres, tableau, panneaux…)  
- Tests UI robustes sur l’appli officielle **TodoMVC**  
- Configuration Playwright “pro” (traces, retries, CI, rapports)  
- Parfait pour missions freelance & portfolio

## 📦 1. Installation

### Cloner le dépôt

```bash
git clone https://github.com/<ton-username>/playwright-qa-starter-kit.git
cd playwright-qa-starter-kit
```

### Installer les dépendances

```bash
npm install
```

### Installer les navigateurs Playwright

```bash
npx playwright install
```

## ▶️ 2. Lancer les tests

### Tous les tests

```bash
npx playwright test
```

### Avec l’UI

```bash
npx playwright test --ui
```

### Tests TodoMVC uniquement

```bash
npx playwright test tests/todomvc
```

## 🏛 3. Structure du projet

```
/
├── src/
│   └── page-objects/
│       └── todomvc/
│           └── TodoPage.ts
├── tests/
│   └── todomvc/
│       ├── todomvc-basic.spec.ts
│       └── todomvc-filters.spec.ts
├── playwright.config.ts
├── package.json
├── README.md
└── .gitignore
```
