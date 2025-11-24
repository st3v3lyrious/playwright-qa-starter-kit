🇬🇧 English Version
🎭 Playwright QA Starter Kit (TypeScript)

A complete and professional starter kit for end-to-end testing with Playwright + TypeScript, featuring:

Modern Page Object Model architecture

Component-based structure (filters, table, drawers, etc.)

Robust UI tests on Playwright’s official TodoMVC demo app

A “production-style” Playwright config (trace, retries, HTML reports, CI-friendly)

Clean repo layout, ideal for freelance work and portfolio showcasing

📦 1. Installation
Clone the repository
git clone https://github.com/<your-username>/playwright-qa-starter-kit.git
cd playwright-qa-starter-kit

Install dependencies
npm install

Install Playwright browsers
npx playwright install

▶️ 2. Running the Tests
Run all tests (headless)
npx playwright test

Run tests with the Playwright UI
npx playwright test --ui

Run only TodoMVC tests
npx playwright test tests/todomvc

🏛 3. Project Structure
/
├── src/
│   └── page-objects/
│       └── todomvc/
│           └── TodoPage.ts
│
├── tests/
│   └── todomvc/
│       ├── todomvc-basic.spec.ts
│       └── todomvc-filters.spec.ts
│
├── playwright.config.ts
├── package.json
├── README.md
└── .gitignore

✔ Clean, behavior-driven POM design

TodoPage exposes user actions, not HTML structure

addTodo(), toggleTodo(), filterActive(), clearCompleted(), etc.

Locators use modern selectors (getByRole, getByLabel, getByPlaceholder)

Architecture is scalable toward real applications (filters, tables, modals…)

⚙️ 4. Pro Playwright Config

Includes:

Retries enabled in CI only

Trace on first failure

HTML + JUnit reports

Chromium / Firefox / WebKit projects

Portable baseURL

Screenshot + video on failure

Full file:

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

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

🧪 5. Example Tests
Adding two todos
test('can add two todos', async ({ page }) => {
  const todoPage = new TodoPage(page);

  await todoPage.goto();

  await todoPage.addTodo('Buy milk');
  await todoPage.addTodo('Buy bread');

  await expect(todoPage.getTodo('Buy milk')).toBeVisible();
  await expect(todoPage.getTodo('Buy bread')).toBeVisible();
  await todoPage.expectItemsLeft(2);
});

Filtering Active vs Completed
test('filters Active vs Completed', async ({ page }) => {
  const todoPage = new TodoPage(page);

  await todoPage.goto();
  await todoPage.addTodo('Buy milk');
  await todoPage.addTodo('Buy bread');
  await todoPage.addTodo('Walk dog');

  await todoPage.toggleTodo('Buy milk');
  await todoPage.toggleTodo('Buy bread');

  await todoPage.filterActive();
  await todoPage.expectVisibleTodos(['Walk dog']);

  await todoPage.filterCompleted();
  await todoPage.expectVisibleTodos(['Buy milk', 'Buy bread']);
});

🤖 6. CI Integration (GitHub Actions)

Create:

.github/workflows/playwright.yml


Content:

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

🎯 7. Goal of This Project

This starter kit is built to serve as:

A training platform to grow QA engineering skills

A professional portfolio asset

A baseline for freelance missions

A foundation for advanced topics (auth flow, API testing, K6, CI/CD…)

🇫🇷 Version Française
🎭 Starter Kit Playwright QA (TypeScript)

Starter kit complet et professionnel pour les tests end-to-end avec Playwright + TypeScript, incluant :

Architecture Page Object Model moderne

Structure modulaire (filtres, tableau, panneaux latéraux…)

Tests UI robustes sur l’app officielle TodoMVC

Configuration Playwright de niveau professionnel (traces, retries, CI, rapports HTML)

Structure propre, idéale pour missions freelance & portfolio

📦 1. Installation
Cloner le dépôt
git clone https://github.com/<ton-username>/playwright-qa-starter-kit.git
cd playwright-qa-starter-kit

Installer les dépendances
npm install

Installer les navigateurs Playwright
npx playwright install

▶️ 2. Exécuter les tests
Tous les tests
npx playwright test

Avec l’interface Playwright
npx playwright test --ui

Tests TodoMVC uniquement
npx playwright test tests/todomvc

🏛 3. Structure du projet
/
├── src/
│   └── page-objects/
│       └── todomvc/
│           └── TodoPage.ts
│
├── tests/
│   └── todomvc/
│       ├── todomvc-basic.spec.ts
│       └── todomvc-filters.spec.ts
│
├── playwright.config.ts
├── package.json
├── README.md
└── .gitignore

✔ POM orienté comportement

TodoPage expose les actions utilisateur :
addTodo(), filterActive(), clearCompleted(), etc.

Locators modernes (getByRole, getByLabel, getByPlaceholder)

Architecture pensée pour évoluer vers des composants plus complexes

⚙️ 4. Configuration Playwright (pro)

retries en CI

trace à la première erreur

Screenshots + vidéos uniquement en cas d’échec

Rapport HTML + rapport JUnit CI

Multi-navigateurs (Chromium, Firefox, WebKit)

(Voir la config complète plus haut – elle est identique en FR.)

🧪 5. Exemples de tests
Ajouter deux todos
test('peut ajouter deux todos', async ({ page }) => {
  const todoPage = new TodoPage(page);

  await todoPage.goto();
  await todoPage.addTodo('Buy milk');
  await todoPage.addTodo('Buy bread');

  await expect(todoPage.getTodo('Buy milk')).toBeVisible();
  await expect(todoPage.getTodo('Buy bread')).toBeVisible();
  await todoPage.expectItemsLeft(2);
});

Filtres Active vs Completed
test('filtres Active / Completed', async ({ page }) => {
  const todoPage = new TodoPage(page);

  await todoPage.goto();
  await todoPage.addTodo('Buy milk');
  await todoPage.addTodo('Buy bread');
  await todoPage.addTodo('Walk dog');

  await todoPage.toggleTodo('Buy milk');
  await todoPage.toggleTodo('Buy bread');

  await todoPage.filterActive();
  await todoPage.expectVisibleTodos(['Walk dog']);

  await todoPage.filterCompleted();
  await todoPage.expectVisibleTodos(['Buy milk', 'Buy bread']);
});

🤖 6. Intégration Continue (GitHub Actions)

Identique à la section anglaise :
voir .github/workflows/playwright.yml.

🎯 7. Objectif du projet

Ce starter kit vise à :

servir de plateforme d’apprentissage QA moderne

constituer un portfolio professionnel

être utilisé comme base lors de missions freelance

préparer des flows plus avancés : login, API, perf tests, K6…