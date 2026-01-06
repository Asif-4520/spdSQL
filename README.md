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

### Report issues

- Click the repository's **Issues** tab and create a new issue with a clear title and steps to reproduce.
- Label suggestions: `bug`, `enhancement`, `good first issue`.

### Pick an issue

- Look for issues marked `good first issue` or `help wanted`.
- If you want to work on an issue, comment you are taking it (to avoid duplicate work).

### Make changes locally

1. Fork the repo and clone your fork
2. Create a topic branch named like `feat/<short-description>` or `fix/<short-description>`

```bash
git checkout -b feat/add-demo-dataset
```

3. Install dependencies and run the dev server

```bash
npm install
npm run dev
```

4. Implement code and add tests where appropriate.
5. Run lint and ensure TypeScript passes:

```bash
npm run lint
npm run build  # runs tsc -b
```

6. Commit changes with clear messages (e.g., `feat: add demo dataset and import support`).

### Open a Pull Request (PR)

- Push your branch to your fork and open a PR against the `main` (or `master`) branch of this repo.
- In the PR description, reference the issue (if any) and explain what you changed and why.
- Add screenshots or GIFs for visual changes.

PR checklist (add to your PR description):
- [ ] Build passes locally (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] New code covered by tests (recommended)
- [ ] Documentation updated (README, or inline docs)

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



