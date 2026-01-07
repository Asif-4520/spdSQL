# Commit Message Conventions

SQLio follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for all commit messages. This ensures a consistent, readable commit history and enables automated tooling.

## Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

## Components

### Type (Required)

The type must be one of the following:

| Type | Description | Example |
|------|-------------|---------|
| `feat` | A new feature | `feat: add query autocomplete` |
| `fix` | A bug fix | `fix: resolve CSV parsing error` |
| `docs` | Documentation only | `docs: update installation guide` |
| `style` | Code style changes (formatting, missing semicolons, etc.) | `style: format with Prettier` |
| `refactor` | Code change that neither fixes a bug nor adds a feature | `refactor: simplify database layer` |
| `perf` | Performance improvement | `perf: optimize query execution` |
| `test` | Adding or updating tests | `test: add editor component tests` |
| `build` | Changes to build system or dependencies | `build: update vite to v5` |
| `ci` | Changes to CI configuration | `ci: add code coverage workflow` |
| `chore` | Other changes that don't modify src or test files | `chore: update gitignore` |
| `revert` | Reverts a previous commit | `revert: revert feat: add feature X` |

### Scope (Optional)

The scope is optional and should indicate what area of the codebase is affected:

- `editor` - Code editor component
- `database` - Database layer
- `ui` - User interface
- `query` - Query execution
- `import` - Import functionality
- `export` - Export functionality
- `schema` - Schema management
- `history` - Query history
- `settings` - Settings/configuration
- `deps` - Dependencies

### Subject (Required)

The subject is a short description of the change:

- Use the imperative, present tense: "change" not "changed" or "changes"
- Don't capitalize the first letter
- No period (.) at the end
- Maximum 72 characters
- Be concise but descriptive

✅ **Good:**
```
add dark mode support
fix syntax highlighting in SQL editor
update README with new installation steps
```

❌ **Bad:**
```
Added dark mode support.
Fixed bug
Update
WIP
```

### Body (Optional)

The body provides additional context about the change:

- Use the imperative, present tense
- Wrap at 72 characters
- Explain what and why, not how
- Separate from subject with a blank line

Example:
```
feat: add query result export to Excel

Add Excel export functionality to the query results page.
Users can now export query results in .xlsx format in addition
to CSV and JSON formats.
```

### Footer (Optional)

The footer is used for:

1. **Breaking Changes:**
   ```
   BREAKING CHANGE: change API interface
   ```

2. **Issue References:**
   ```
   Fixes #123
   Closes #456
   Refs #789
   ```

3. **Multiple issues:**
   ```
   Fixes #123, #456
   ```

## Examples

### Feature Addition
```
feat: add SQL query autocomplete

Implement autocomplete for SQL keywords, table names, and column names
in the code editor using CodeMirror's autocomplete extension.

Closes #45
```

### Bug Fix
```
fix(editor): resolve cursor position after format

Fix an issue where the cursor position was lost after formatting
SQL queries. The cursor now maintains its relative position.

Fixes #123
```

### Documentation Update
```
docs: add troubleshooting section to README

Add common issues and solutions to help users resolve
installation and runtime problems.
```

### Breaking Change
```
feat(database)!: change initialization API

Change the database initialization to use async/await pattern
for better error handling and consistency.

BREAKING CHANGE: Database.init() is now async and must be awaited.
Migration guide: see docs/migration-v2.md

Refs #234
```

### Performance Improvement
```
perf(query): optimize result rendering for large datasets

Use virtual scrolling for query results with more than 1000 rows.
This reduces initial render time by ~80% for large result sets.

Closes #156
```

### Dependency Update
```
chore(deps): update @duckdb/duckdb-wasm to v1.33.1

Update DuckDB WebAssembly to the latest version for
improved performance and bug fixes.
```

### Multiple Changes
```
feat: improve import/export functionality

- Add support for importing gzipped CSV files
- Add Excel (.xlsx) export format
- Improve error messages for invalid files
- Add progress indicator for large files

Closes #78, #92, #103
```

## PR Title Requirements

Since PRs are squash merged, the **PR title becomes the commit message** in the main branch. Therefore:

- PR titles MUST follow the same format as commit messages
- The PR title will be the subject of the final commit
- The PR description will be the commit body

✅ **Good PR Titles:**
```
feat: add dark mode toggle
fix(editor): resolve syntax highlighting issue
docs: update contributing guidelines
refactor(database): simplify connection handling
```

❌ **Bad PR Titles:**
```
Update file.ts
Fix bug
WIP
Feature request #123
```

## Tools and Automation

### Git Hooks (Optional)

Consider using tools like Husky and commitlint to enforce commit message conventions:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky
```

### Editor Integration

Many editors have plugins for Conventional Commits:

- VS Code: "Conventional Commits"
- IntelliJ: "Conventional Commit"
- Vim: "vim-conventional-commits"

### GitHub Actions

Our CI automatically validates:
- PR titles follow Conventional Commits
- Commit messages follow conventions (warning only)

## Benefits

Following these conventions provides:

1. **Readable History**: Easy to understand what changed and why
2. **Automated Changelogs**: Generate release notes automatically
3. **Semantic Versioning**: Determine version bumps based on commit types
4. **Better Collaboration**: Clear communication of intent
5. **Easy Navigation**: Filter commits by type or scope

## Quick Reference

```
feat:     ✨ New feature
fix:      🐛 Bug fix
docs:     📝 Documentation
style:    💄 Code style
refactor: ♻️  Code refactoring
perf:     ⚡ Performance
test:     ✅ Tests
build:    📦 Build system
ci:       👷 CI/CD
chore:    🔧 Maintenance
revert:   ⏪ Revert
```

## Questions?

- Read the [Conventional Commits specification](https://www.conventionalcommits.org/)
- Check our [Contributing Guide](../CONTRIBUTING.md)
- Look at recent commits in the repository for examples
- Ask in issues or discussions

---

**Remember:** On your first PR, it's okay if you don't get it perfect. Maintainers will help you adjust the PR title to follow conventions. The goal is to learn and improve! 🚀
