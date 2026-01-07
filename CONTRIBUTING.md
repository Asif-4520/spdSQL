# Contributing to SQLio 🤝

Thank you for your interest in contributing to SQLio! This document provides guidelines and instructions for contributing to this project.

## 🔒 Important: Branch Protection Policy

**This repository has strict branch protection rules:**

- ✅ **All contributions** must be made through Pull Requests
- ❌ **Direct pushes to `main`** are blocked for everyone
- ⚠️ **Only the repository owner** (`@Asif-4520`) can approve and merge pull requests
- 🔐 **Collaborators** can create PRs but cannot merge them

This policy ensures code quality and maintains security standards.

## 🚀 How to Contribute

### 1. Report Issues

Found a bug or have a feature request?

1. Check if the issue already exists in the [Issues](https://github.com/Asif-4520/SQLio/issues) tab
2. If not, create a new issue with:
   - Clear, descriptive title
   - Detailed description of the problem/feature
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment details (browser, OS, Node version)

### 2. Fork and Clone

1. **Fork** this repository to your GitHub account
2. **Clone** your fork locally:

```bash
git clone https://github.com/YOUR-USERNAME/SQLio.git
cd SQLio
```

3. **Add upstream** remote to stay updated:

```bash
git remote add upstream https://github.com/Asif-4520/SQLio.git
```

### 3. Create a Branch

Create a descriptive branch name:

```bash
# For new features
git checkout -b feat/add-new-feature

# For bug fixes
git checkout -b fix/fix-bug-name

# For documentation
git checkout -b docs/update-readme

# For refactoring
git checkout -b refactor/improve-component
```

Branch naming conventions:
- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

### 4. Make Your Changes

1. **Install dependencies:**

```bash
npm install
```

2. **Start the dev server:**

```bash
npm run dev
```

3. **Make your changes** following these guidelines:

   - ✅ Write clean, readable code
   - ✅ Follow existing code style and conventions
   - ✅ Add comments for complex logic
   - ✅ Keep changes focused and minimal
   - ✅ Test your changes thoroughly
   - ✅ Ensure no console errors or warnings

4. **Run linter:**

```bash
npm run lint
```

5. **Build the project:**

```bash
npm run build
```

6. **Test manually:**
   - Run the application
   - Test your changes in the browser
   - Check different scenarios
   - Test on different browsers if UI changes

### 5. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add support for JSON import"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance

Examples:
- ✅ `feat: add dark mode toggle to settings`
- ✅ `fix: resolve CSV import encoding issue`
- ✅ `docs: update installation instructions`
- ❌ `updated stuff` (too vague)
- ❌ `fix` (no description)

### 6. Keep Your Fork Updated

Before creating a PR, sync with upstream:

```bash
git fetch upstream
git merge upstream/main
```

Or use rebase for a cleaner history:

```bash
git fetch upstream
git rebase upstream/main
```

### 7. Push to Your Fork

```bash
git push origin feat/your-feature-name
```

### 8. Create a Pull Request

1. Go to your fork on GitHub
2. Click **"Compare & pull request"**
3. Fill in the PR template:

   **Title:** Clear, descriptive title (minimum 10 characters)
   
   **Description:** Include:
   - 📝 What changes you made and why
   - 🔗 Link to related issue (if any): `Fixes #123`
   - 🧪 How you tested the changes
   - 📸 Screenshots (for UI changes)
   - ⚠️ Any breaking changes or important notes

4. Submit the PR

### 9. PR Review Process

After submitting your PR:

1. ✅ **Automated checks will run:**
   - Lint check
   - Build check
   - PR validation

2. ⏳ **Wait for owner review:**
   - Only `@Asif-4520` can approve PRs
   - Address any requested changes
   - Discussion happens in PR comments

3. 🔄 **Make requested changes:**
   - Push new commits to your branch
   - PR updates automatically
   - No need to close and reopen

4. ✅ **Once approved:**
   - Owner will merge your PR
   - Your contribution will be part of the project!

## 📋 Code Style Guidelines

### TypeScript/React

- Use TypeScript for type safety
- Use functional components with hooks
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable and function names
- Keep components small and focused
- Extract reusable logic into custom hooks

### File Organization

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts
├── lib/           # Core logic and utilities
├── pages/         # Page components
├── routes/        # Routing configuration
└── store/         # State management
```

### Styling

- Use Tailwind CSS classes
- Follow existing styling patterns
- Ensure responsive design
- Test light and dark themes

## 🧪 Testing

Currently, the project doesn't have automated tests. When adding tests:

- Use Vitest or Jest for unit tests
- Use Playwright or Cypress for E2E tests
- Place tests near the code they test
- Name test files: `*.test.ts` or `*.spec.ts`

## 📝 Documentation

When making changes:

- Update README.md if needed
- Add JSDoc comments for public APIs
- Update inline comments for complex logic
- Create documentation for new features

## ❓ Questions?

- 💬 Open a [Discussion](https://github.com/Asif-4520/SQLio/discussions)
- 🐛 Report bugs in [Issues](https://github.com/Asif-4520/SQLio/issues)
- 📧 Contact the maintainer

## 🎯 Good First Issues

Look for issues labeled:
- `good first issue` - Great for newcomers
- `help wanted` - Community help needed
- `documentation` - Documentation improvements

## ✅ PR Checklist

Before submitting, ensure:

- [ ] Code follows project style guidelines
- [ ] Lint passes: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] Changes tested manually
- [ ] Commit messages are clear
- [ ] PR title is descriptive (min 10 chars)
- [ ] PR description is complete (min 20 chars)
- [ ] Related issue linked (if applicable)
- [ ] Screenshots added (for UI changes)
- [ ] Documentation updated (if needed)

## 🙏 Thank You!

Your contributions help make SQLio better for everyone. We appreciate your time and effort!

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow
- Maintain a positive environment

---

**Remember:** Only the repository owner can merge PRs. This is intentional to maintain code quality and security. Your contributions are valued and will be reviewed promptly! 🚀
