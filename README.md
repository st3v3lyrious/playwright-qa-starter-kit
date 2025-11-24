
# 🎭 Playwright QA Starter Kit (EN & FR)

---

# 🇬🇧 English Version

## 🎭 Playwright QA Starter Kit (TypeScript)

A complete and professional starter kit for end-to-end testing with **Playwright + TypeScript**, featuring:

- Modern **Page Object Model** architecture  
- Component-based structure (filters, table, drawers, panels, etc.)  
- Robust UI tests on Playwright’s official **TodoMVC** demo app  
- A “production-style” Playwright config (trace, retries, HTML/JUnit reports, CI-friendly)  
- Clean repo layout, ideal for **freelance work** and **portfolio showcasing**

---

## 📦 1. Installation

### Clone the repository

```bash
git clone https://github.com/st3v3lyrious/playwright-qa-starter-kit.git
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

---

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

---

## 🏛 3. Project Structure

```
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
```

---

## ⚙️ 4. Pro Playwright Config

### Main features:

- Retries enabled in CI  
- Trace on first failure  
- HTML + JUnit reports  
- Chromium / Firefox / WebKit projects  
- Configurable `baseURL`  
- Screenshots + videos on failure  


---

## 🤖 5. Continuous Integration (GitHub Actions)

Create:

```
.github/workflows/playwright.yml
```

With:

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

---

## 🎯 7. Goal of This Project

This starter kit is built to serve as:

  - A training platform to grow QA engineering skills
  - A professional portfolio asset
  - A baseline for freelance missions
  - A foundation for advanced topics (auth flow, API testing, K6, CI/CD…)

# 🇫🇷 Version Française

## 🎭 Starter Kit Playwright QA (TypeScript)

Starter kit complet et professionnel pour les tests end-to-end avec **Playwright + TypeScript**, incluant :

- Architecture **Page Object Model** moderne  
- Structure modulaire (filtres, tableau, panneaux…)  
- Tests UI robustes sur l’appli officielle **TodoMVC**  
- Configuration Playwright “pro” (traces, retries, CI, rapports)  
- Parfait pour missions freelance & portfolio

---

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

---

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

---

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

---

## ⚙️ 4. Configuration Playwright (pro)

- Retries en CI  
- Traces et vidéos uniquement sur échec  
- Rapport HTML + JUnit  
- Tests multi-navigateurs  
- `baseURL` configurable  

---

## 🤖 5. Integration Continue (GitHub Actions)

Identique à la section anglaise :
voir `.github/workflows/playwright.yml.`

## 🎯 6. Objectif du projet

Ce starter kit vise à :
  - servir de plateforme d’apprentissage QA moderne
  - constituer un portfolio professionnel
  - être utilisé comme base lors de missions freelance
  - préparer des flows plus avancés : login, API, perf tests, K6…