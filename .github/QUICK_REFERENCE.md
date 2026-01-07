# Quick Reference Guide 📋

This is a quick reference for common workflows and commands for SQLio contributors and maintainers.

## For Contributors

### Getting Started
```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/SQLio.git
cd SQLio
npm install
npm run dev  # Start dev server at http://localhost:5173
```

### Creating a Feature
```bash
# Create a feature branch (use feat/, fix/, docs/, etc.)
git checkout -b feat/my-awesome-feature

# Make changes, then check your work
npm run lint    # Check code style
npm run build   # Verify build works

# Commit with conventional format
git commit -m "feat: add my awesome feature"

# Push to your fork
git push origin feat/my-awesome-feature

# Open PR on GitHub (template will auto-populate)
```

### Commit Message Format
```
<type>(<scope>): <subject>

feat:      ✨ New feature
fix:       🐛 Bug fix
docs:      📝 Documentation
style:     💄 Formatting
refactor:  ♻️  Refactoring
perf:      ⚡ Performance
test:      ✅ Tests
build:     📦 Build system
ci:        👷 CI/CD
chore:     🔧 Maintenance
```

### PR Title Examples
✅ Good:
- `feat: add dark mode toggle`
- `fix(editor): resolve cursor position bug`
- `docs: update installation guide`

❌ Bad:
- `Update file.ts`
- `fixes bug`
- `WIP`

### Before Submitting PR
- [ ] Code follows project style
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Self-reviewed code
- [ ] Added/updated documentation
- [ ] PR description is complete

## For Maintainers

### Reviewing PRs

#### Check PR Quality
- [ ] PR title follows conventional commits
- [ ] Description is clear and complete
- [ ] All CI checks pass
- [ ] Code changes are reasonable in size
- [ ] No sensitive data in commits
- [ ] Tests included (when applicable)

#### Review Process
```bash
# Check out PR locally
gh pr checkout <PR_NUMBER>

# Or manually:
git fetch origin pull/<PR_NUMBER>/head:pr-<PR_NUMBER>
git checkout pr-<PR_NUMBER>

# Test changes
npm install
npm run lint
npm run build
npm run dev

# Review code, leave feedback on GitHub
```

#### Merging
- Use **Squash and Merge** only
- Edit commit message if needed
- Ensure commit message follows conventions
- Branch will auto-delete

### Managing Issues

#### Triaging New Issues
1. Read issue description
2. Verify it uses proper template
3. Apply appropriate labels:
   - Type: `bug`, `enhancement`, `documentation`
   - Priority: `priority: low/medium/high/critical`
   - Area: `area: ui`, `area: database`, etc.
   - Meta: `good first issue`, `help wanted`
4. Assign to milestone (if applicable)
5. Respond to reporter

#### Label Guidelines
- `good first issue` - Simple, well-defined, good for newcomers
- `help wanted` - Looking for contributors
- `priority: critical` - Security issues, major bugs
- `priority: high` - Important features, significant bugs
- `priority: medium` - Standard improvements
- `priority: low` - Nice to have

### Security Management

#### Dependabot PRs
```bash
# Review weekly Dependabot PRs
# For patch updates: Usually safe to merge after CI passes
# For minor updates: Review changelog, test if needed
# For major updates: Requires testing and potential code changes

# Merge multiple Dependabot PRs at once:
gh pr merge <PR_NUMBER> --squash --auto
```

#### Security Alerts
1. Check Security tab regularly
2. Review Dependabot security advisories
3. Merge security update PRs promptly
4. For vulnerabilities in code:
   - Create security advisory
   - Fix in private fork
   - Coordinate disclosure

### Release Management

#### Creating a Release
```bash
# Ensure main is up to date
git checkout main
git pull

# Review changes since last release
git log v1.0.0..HEAD --oneline

# Tag new version (use semantic versioning)
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin v1.1.0

# Create release on GitHub
gh release create v1.1.0 --generate-notes
```

#### Semantic Versioning
- **Major (X.0.0)** - Breaking changes
- **Minor (1.X.0)** - New features, backwards compatible
- **Patch (1.0.X)** - Bug fixes, backwards compatible

Based on commits since last release:
- `feat:` → Minor version bump
- `fix:` → Patch version bump
- `BREAKING CHANGE:` → Major version bump

## Common Commands

### Development
```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npx tsc --noEmit # Type check only
```

### Git Workflows
```bash
# Update your fork
git remote add upstream https://github.com/Asif-4520/SQLio.git
git fetch upstream
git merge upstream/main

# Sync branch with main
git checkout feat/my-feature
git rebase main  # Or: git merge main

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Amend last commit message
git commit --amend
```

### GitHub CLI
```bash
# Install: https://cli.github.com

# List PRs
gh pr list

# View PR details
gh pr view <PR_NUMBER>

# Check out PR
gh pr checkout <PR_NUMBER>

# Review PR
gh pr review <PR_NUMBER> --approve
gh pr review <PR_NUMBER> --request-changes --body "Comments"

# Merge PR
gh pr merge <PR_NUMBER> --squash

# Create issue
gh issue create

# List issues
gh issue list --label "good first issue"
```

## Useful Links

### Documentation
- [Contributing Guide](../CONTRIBUTING.md)
- [Commit Conventions](.github/COMMIT_CONVENTIONS.md)
- [Security Policy](../SECURITY.md)
- [Repository Settings](.github/REPOSITORY_SETTINGS.md)

### External Resources
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Git Best Practices](https://git-scm.com/book/en/v2)

### Project Specific
- [Main Repository](https://github.com/Asif-4520/SQLio)
- [Issues](https://github.com/Asif-4520/SQLio/issues)
- [Pull Requests](https://github.com/Asif-4520/SQLio/pulls)
- [Actions](https://github.com/Asif-4520/SQLio/actions)
- [Security](https://github.com/Asif-4520/SQLio/security)

## Troubleshooting

### CI Fails

**Linting errors:**
```bash
npm run lint          # See errors
npm run lint -- --fix # Auto-fix if possible
```

**Build errors:**
```bash
npm run build  # See detailed errors
# Fix TypeScript errors in reported files
```

**Type check fails:**
```bash
npx tsc --noEmit  # See all type errors
# Add proper types or fix type issues
```

### PR Blocked

**"Branch not up to date":**
```bash
git checkout feat/my-feature
git fetch origin
git merge origin/main
git push
```

**"Conversation not resolved":**
- Review all PR comments
- Mark resolved ones as resolved
- Address or respond to all feedback

### Merge Conflicts
```bash
git checkout feat/my-feature
git fetch origin
git merge origin/main
# Resolve conflicts in files
git add .
git commit -m "chore: resolve merge conflicts"
git push
```

## Best Practices

### Code Quality
- ✅ Keep PRs small and focused
- ✅ Write self-documenting code
- ✅ Add comments for complex logic
- ✅ Follow existing code style
- ✅ Test your changes thoroughly

### Communication
- ✅ Be clear and concise
- ✅ Be respectful and professional
- ✅ Respond to feedback promptly
- ✅ Ask questions when unclear
- ✅ Document decisions

### Git Hygiene
- ✅ Make atomic commits
- ✅ Write clear commit messages
- ✅ Keep history clean
- ✅ Avoid force pushing (except own branches)
- ✅ Rebase before opening PR

---

**Need help?** Open an issue with the `question` label or check existing documentation.
