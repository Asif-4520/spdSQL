# SQLio (SQL Lab) ⚡️

**A lightweight, browser-based SQL playground and query explorer built with React, Vite, TypeScript, CodeMirror, and DuckDB (WASM).**

---

## Table of Contents 📚

- [Overview](#overview)
- [Features](#features)
- [Demo / Quick usage](#demo--quick-usage)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install & run locally](#install--run-locally)
  - [Build & preview](#build--preview)
  - [Lint & type check](#lint--type-check)
- [Project structure](#project-structure)
- [How it works — high level](#how-it-works--high-level)
- [How to contribute (for beginners)](#how-to-contribute-for-beginners) ✅
  - [Report issues](#report-issues)
  - [Pick an issue](#pick-an-issue)
  - [Make changes locally](#make-changes-locally)
  - [Open a Pull Request (PR)](#open-a-pull-request-pr)
- [Developer notes & tips 🔧](#developer-notes--tips-%EF%B8%8F)
- [Roadmap & ideas](#roadmap--ideas)
- [License & contact](#license--contact)

---

## Overview

SQLio is an interactive SQL playground and lightweight UI for exploring SQL queries in the browser. It uses:

- React + Vite + TypeScript for the UI
- CodeMirror for an editor with SQL highlighting/autocomplete
- DuckDB compiled to WebAssembly (via @duckdb/duckdb-wasm) for in-browser query execution
- Tailwind CSS for styling

The app aims to help users explore SQL on demo datasets, import/export data, and iterate quickly in a safe, local environment.

---

## Features ✅

- SQL editor with syntax highlighting and editor features (CodeMirror)
- Execute queries locally using DuckDB WASM
- Demo datasets available for quick experimentation
- Import and export data (CSV / ZIP)
- Query history and result preview
- Light/dark theme support

---

## Demo / Quick usage

1. Start the dev server:

```bash
npm install
npm run dev
```

2. Open http://localhost:5173 in your browser.
3. Pick a demo dataset, write a SQL statement in the editor, and run it with the Run button.
4. Export results or import CSV files via the Import/Export pages.

---

## Getting started

### Prerequisites

- Node.js >= 16 (Node 18+ recommended)
- npm (or yarn/pnpm if preferred)

> Note: The project uses Vite and TypeScript. Make sure your environment can run `vite` and `tsc`.

### Install & run locally

```bash
git clone https://github.com/Asif-4520/SQLio.git
cd sql-lab
npm install
npm run dev
```

- The dev server is `vite` (default port 5173)
- Hot module reloading & fast refresh are enabled

### Build & preview

```bash
npm run build
npm run preview
```

This produces a production build (and runs a preview server on a default port).

### Lint & type checks

- Lint: `npm run lint` (ESLint configured)
- Type check: `npm run build` triggers `tsc -b` as part of the build step

---

## Project structure (important files & folders)

- `src/` — main source code
  - `components/` — shared React components (Editor, NavBar, Modal, Result, Sidebar, etc.)
  - `contexts/` — global context and state providers
  - `lib/` — core logic, including database layer
    - `DB/` — database services and adapters (duckdb.service.ts, db.core.ts, etc.)
    - `data/` — demo data files and utilities
  - `pages/` — route pages (Home, QueryEditor, Import, Export, History, Schema, Settings)
  - `routes/` — routing helpers and definitions
  - `store/` — small persistent store (e.g., settings)
  - `styles/` — global styles
- `public/` — public assets (icons, service worker)
- `package.json` — scripts & deps
- `vite.config.ts` — Vite configuration

This structure is intentionally simple—add new features under `src/` grouped by feature domain.

---

## How it works — high level

- The UI presents a CodeMirror editor configured for SQL.
- When you run a query, the app passes SQL to the DuckDB WASM engine and renders results using Apache Arrow for fast columnar display.
- Import/Export uses `jszip` for ZIP handling and CSV parsing utilities to handle uploads and downloads.

---

## How to contribute (for beginners) 🎉

We welcome contributions of all sizes — documentation, small bug fixes, UX improvements, tests, or new features!

**⚠️ Important:** This repository follows strict quality standards and contribution guidelines. Please read our [Contributing Guide](CONTRIBUTING.md) before submitting PRs.

### Quick Start

1. **Read the guidelines:**
   - 📋 [Contributing Guide](CONTRIBUTING.md) - Complete contribution workflow
   - 💬 [Commit Conventions](.github/COMMIT_CONVENTIONS.md) - How to write commit messages
   - 🔒 [Security Policy](SECURITY.md) - How to report security issues

2. **Report issues:**
   - Use issue templates in the **Issues** tab
   - Choose: Bug Report, Feature Request, or Documentation
   - Provide clear title and detailed description

3. **Pick an issue:**
   - Look for `good first issue` or `help wanted` labels
   - Comment on the issue to claim it

4. **Make changes:**
   ```bash
   # Fork and clone the repository
   git clone https://github.com/YOUR-USERNAME/SQLio.git
   cd SQLio
   
   # Create a feature branch
   git checkout -b feat/your-feature-name
   
   # Install dependencies and start development
   npm install
   npm run dev
   ```

5. **Follow conventions:**
   - Use conventional commit format: `feat: add new feature`
   - Run `npm run lint` before committing
   - Build with `npm run build` to check for errors
   - Follow the PR template when opening pull requests

6. **Submit a PR:**
   - **Main branch is protected** - all changes require PRs
   - PRs must pass CI checks (lint, build, type-check)
   - At least 1 approval required from maintainers
   - PRs are squash merged - ensure PR title follows conventions
   - All review conversations must be resolved

### Branch Protection Rules

🔒 The `main` branch is fully protected:
- ❌ No direct pushes
- ❌ No force pushes
- ❌ No bypass for anyone (including admins)
- ✅ All changes via Pull Requests only
- ✅ Requires approvals and passing CI checks
- ✅ Squash merge only (clean commit history)

### PR Requirements

All PRs must:
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for PR title
- Include meaningful description (minimum 20 characters)
- Pass all CI checks (lint, build, type-check)
- Receive at least 1 approval
- Resolve all review conversations
- Have up-to-date branch with `main`

See [CONTRIBUTING.md](CONTRIBUTING.md) for complete details.

---

## Repository Standards & Quality 🏆

This repository maintains strict professional standards:

### 🔒 Security
- [Security Policy](SECURITY.md) for reporting vulnerabilities
- Automated dependency updates via Dependabot
- CodeQL security scanning on all PRs
- Secret scanning and push protection enabled

### 📋 Code Quality
- ESLint for code linting
- TypeScript for type safety
- Automated CI checks on all PRs
- Code review required before merge

### 📝 Documentation
- Comprehensive contribution guidelines
- Issue and PR templates
- Commit message conventions
- Code owner assignments

### 🤖 Automation
- Automated dependency updates
- Stale issue/PR management
- CI/CD with GitHub Actions
- Automated branch cleanup

---

## Developer notes & tips 🔧

- Editor: `src/components/Editor.tsx` uses CodeMirror and `@codemirror/lang-sql` for SQL mode. Extend or modify editor behavior there.
- DB layer: `src/lib/DB` contains database adapters. To plug in a new backend, add a new adapter that implements the same interface used by `db.core.ts`.
- Demo data: Add new datasets under `src/lib/data/` and register them in the demo pages.
- Routing: Update `src/routes` to add pages to the app navigation.
- Add tests: There's currently no test harness included—consider adding Vitest or Jest for unit tests and Playwright or Cypress for E2E tests.
- Linting/formatting: ESLint is configured (`npm run lint`). Consider adding Prettier and pre-commit hooks (Husky) for a more consistent workflow.

---

## Roadmap & ideas (how you can help)

- Add unit & E2E tests
- Better CSV/JSON import options & schema inference
- Add more demo datasets covering common use cases
- Improve CodeMirror autocompletion for dataset columns
- Add CI (GitHub Actions) to run lint, type-check, build, and tests

---



