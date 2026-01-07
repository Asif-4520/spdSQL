# Contributing to SQLio 🎉

Thank you for your interest in contributing to SQLio! We're excited to have you join our community. This guide will help you understand our development process and coding standards.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Branch Naming Conventions](#branch-naming-conventions)

## Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Git

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/SQLio.git
   cd SQLio
   ```
3. **Add the upstream repository** as a remote:
   ```bash
   git remote add upstream https://github.com/Asif-4520/SQLio.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

### 1. Create a New Branch

Always create a new branch for your work. Never commit directly to `main`.

```bash
git checkout -b feat/your-feature-name
```

See [Branch Naming Conventions](#branch-naming-conventions) for naming guidelines.

### 2. Make Your Changes

- Write clean, maintainable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Build the project
npm run build

# Run type checking
npx tsc --noEmit
```

### 4. Commit Your Changes

Follow our [Commit Message Guidelines](#commit-message-guidelines).

```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Push to Your Fork

```bash
git push origin feat/your-feature-name
```

### 6. Open a Pull Request

- Go to the repository on GitHub
- Click "Compare & pull request"
- Fill out the PR template completely
- Link any related issues

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This leads to more readable commit history and enables automated changelog generation.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (white-space, formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Scope (Optional)

The scope could be anything specifying the place of the commit change:

- `editor`
- `database`
- `ui`
- `export`
- `import`
- `query`
- `schema`

### Subject

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Start with a lowercase letter
- No period (.) at the end
- Maximum 72 characters

### Examples

```bash
feat: add SQL query autocomplete
fix(editor): resolve syntax highlighting issue
docs: update installation instructions
refactor(database): improve query execution performance
style: format code with Prettier
test: add unit tests for import functionality
```

### Body (Optional)

Provide additional context about the changes:

```bash
feat: add dark mode support

Added theme toggle component and dark mode styles for all pages.
Preferences are saved in localStorage.
```

### Footer (Optional)

Reference issues and breaking changes:

```bash
fix: resolve CSV import parsing error

Fixes #123
```

For breaking changes:

```bash
feat: change database API interface

BREAKING CHANGE: Database initialization now requires async/await pattern.
Migration guide available in docs/migration.md
```

## Pull Request Process

### Before Opening a PR

- [ ] Ensure your fork is up to date with upstream `main`
- [ ] Run `npm run lint` with no errors
- [ ] Run `npm run build` successfully
- [ ] Run `npx tsc --noEmit` with no type errors
- [ ] Test your changes thoroughly in the browser
- [ ] Update documentation if needed
- [ ] Follow commit message conventions

### PR Title Requirements

PR titles MUST follow Conventional Commits format:

✅ **Good:**
- `feat: add CSV export functionality`
- `fix(editor): resolve cursor position bug`
- `docs: update contributing guidelines`

❌ **Bad:**
- `Update file.ts`
- `fixes bug`
- `WIP`

### PR Description Requirements

Use the provided PR template and include:

1. **Clear description** of what changed and why
2. **Type of change** marked in the checklist
3. **Related issue** linked (e.g., `Fixes #123`)
4. **List of changes** made
5. **Testing done** with checklist completed
6. **Screenshots** for UI changes (required)
7. **Complete checklist** with all items addressed

### Review Process

1. **Automated checks** must pass (CI, linting, build)
2. **At least one approval** required from maintainers
3. **All review comments** must be addressed
4. **Conflicts must be resolved** before merge
5. **PR will be squash merged** - ensure PR title is clean

### After Approval

- Maintainers will squash and merge your PR
- Your changes will be included in the next release
- The branch will be automatically deleted

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` - use proper types or `unknown`
- Use type inference where appropriate

### React

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use meaningful component and prop names

### File Organization

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts
├── lib/           # Core logic and utilities
│   ├── DB/        # Database layer
│   └── data/      # Data files and utilities
├── pages/         # Route pages
├── routes/        # Routing configuration
├── store/         # State management
└── styles/        # Global styles
```

### Naming Conventions

- **Files**: `kebab-case.tsx` or `PascalCase.tsx` for components
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Interfaces/Types**: `PascalCase`

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Use trailing commas in objects and arrays
- Maximum line length: 100 characters
- Run `npm run lint` to check style

### Comments

- Write self-documenting code when possible
- Add comments for complex logic
- Use JSDoc for public APIs
- Explain "why" not "what"

## Testing Guidelines

While the project currently doesn't have a test suite, we encourage:

- Manual testing of all changes
- Testing in multiple browsers (Chrome, Firefox, Safari)
- Testing edge cases and error conditions
- Documenting test steps in PR description

Future contributions adding automated tests are highly welcome!

## Branch Naming Conventions

Use descriptive branch names following this pattern:

```
<type>/<short-description>
```

### Examples

- `feat/add-query-history`
- `fix/csv-import-error`
- `docs/update-readme`
- `refactor/database-layer`
- `perf/optimize-query-execution`
- `test/add-editor-tests`

### Types

Use the same types as commit messages:
- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `perf/` - Performance improvements
- `test/` - Adding tests
- `chore/` - Maintenance tasks

## Questions?

If you have questions:

1. Check existing issues and PRs
2. Search the documentation
3. Open a new issue with the "question" label

## Recognition

All contributors will be recognized in our release notes and contributor list.

Thank you for contributing to SQLio! 🚀
