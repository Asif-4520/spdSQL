# GitHub Repository Configuration Guide

This document provides step-by-step instructions for configuring the SQLio repository with strict professional standards. These settings must be applied manually by a repository administrator.

## ⚠️ Important

**REQUIRED**: Repository administrator access is needed to apply these settings.

---

## 🔒 Branch Protection Rules

### Protecting the `main` Branch

Navigate to: **Settings → Branches → Add branch protection rule**

#### Branch name pattern
```
main
```

#### Protection Settings (Required)

✅ **Require a pull request before merging**
   - ✅ Require approvals: **1** (minimum)
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from Code Owners
   - ❌ Allow specified actors to bypass required pull requests (DISABLED)

✅ **Require status checks to pass before merging**
   - ✅ Require branches to be up to date before merging
   - **Required status checks:**
     - `Validate PR Title`
     - `Validate PR Description`

✅ **Require conversation resolution before merging**

✅ **Require signed commits** (Optional but recommended)

✅ **Require linear history**

✅ **Include administrators**
   - This ensures even administrators must follow the rules
   - **NO bypass permissions for anyone**

✅ **Restrict who can push to matching branches**
   - Add restrictions: **NONE** (no one can push directly)
   - This effectively locks the branch from direct pushes

❌ **Allow force pushes** (DISABLED)
   - **NO** force pushes allowed for anyone

❌ **Allow deletions** (DISABLED)
   - Prevent accidental deletion of main branch

#### Summary Checklist

- [ ] Require pull request with 1+ approval
- [ ] Dismiss stale reviews on new commits
- [ ] Require Code Owner review
- [ ] No bypass for anyone
- [ ] All CI checks must pass
- [ ] Require up-to-date branches
- [ ] Require conversation resolution
- [ ] Require linear history
- [ ] Include administrators in restrictions
- [ ] No direct push permissions
- [ ] No force push allowed
- [ ] No branch deletion allowed

---

## 🔀 Pull Request Settings

Navigate to: **Settings → General → Pull Requests**

✅ **Allow squash merging**
   - ✅ Default to pull request title and description

❌ **Allow merge commits** (DISABLED)

❌ **Allow rebase merging** (DISABLED)

✅ **Always suggest updating pull request branches**

✅ **Allow auto-merge**

✅ **Automatically delete head branches**

---

## 🛡️ General Repository Settings

Navigate to: **Settings → General**

### Features

✅ **Issues**
✅ **Projects**
✅ **Discussions** (Optional)
✅ **Sponsorships** (Optional)
✅ **Wikis** (Optional)

### Pull Requests

✅ **Allow merge commits**: DISABLED
✅ **Allow squash merging**: ENABLED (Default)
✅ **Allow rebase merging**: DISABLED
✅ **Always suggest updating pull request branches**: ENABLED
✅ **Automatically delete head branches**: ENABLED

### Archives

❌ **Make this repository read-only** (should be DISABLED for active development)

---

## 🔐 Security Settings

Navigate to: **Settings → Security → Code security and analysis**

### Dependency Graph
✅ **Enabled**

### Dependabot Alerts
✅ **Enabled**

### Dependabot Security Updates
✅ **Enabled**

### Dependabot Version Updates
✅ **Enabled** (configured via `.github/dependabot.yml`)

### Code Scanning
✅ **Configure CodeQL** (recommended)
   - Create `.github/workflows/codeql.yml` if not exists

### Secret Scanning
✅ **Enabled** (if available for your plan)

### Push Protection
✅ **Enabled** (prevents pushing secrets)

---

## 📋 Additional Configurations

### Issue Templates
- Already configured in `.github/ISSUE_TEMPLATE/`
- Verify they appear when creating issues

### PR Template
- Already configured in `.github/PULL_REQUEST_TEMPLATE/`
- Verify it appears when creating PRs

### Code Owners
- Already configured in `.github/CODEOWNERS`
- Verify auto-assignment works on PRs

### Actions Permissions

Navigate to: **Settings → Actions → General**

✅ **Allow all actions and reusable workflows**
   - Or: **Allow actions created by GitHub and verified creators**

**Workflow permissions:**
- ⚪ Read repository contents and packages permissions (default)
- ✅ Read and write permissions (if needed for automated PRs)

✅ **Allow GitHub Actions to create and approve pull requests**

### Collaborator Permissions

Navigate to: **Settings → Collaborators and teams**

**Security Best Practice:** Minimize collaborator permissions to maintain repository security and control.

#### Recommended Permission Levels

✅ **Repository Owner (Admin):**
   - Keep Admin access only for repository owner
   - Full control over all settings and permissions

✅ **External Collaborators:**
   - **Read** - For viewing only (recommended for most)
   - **Triage** - Can manage issues/PRs without code access
   - ❌ **Write** - Avoid granting unless absolutely necessary
   - ❌ **Maintain** - Avoid granting unless absolutely necessary
   - ❌ **Admin** - Reserved for repository owner only

#### Steps to Set Collaborator Permissions

1. Navigate to **Settings → Collaborators and teams**
2. For each existing collaborator:
   - Click the role dropdown next to their name
   - Change to **Read** or **Triage** (downgrade from Write/Maintain)
   - Remove collaborators who no longer need access
3. For new collaborators:
   - Add with minimum required permission level
   - Default to **Read** or **Triage**

#### Permission Level Details

- **Read**: View code, open issues, comment on PRs (safest)
- **Triage**: Read + manage issues/PRs (good for non-code contributors)
- **Write**: Triage + push to branches (not recommended - use forks instead)
- **Maintain**: Write + manage settings (not recommended)
- **Admin**: Full access (repository owner only)

#### Note on Contribution Model

With proper branch protection:
- Contributors should **fork** the repository
- Submit changes via **Pull Requests** from their forks
- No need for Write access to the main repository
- Read access is sufficient for most contributors

---

## 🎯 Verification Checklist

After applying all settings, verify:

### Branch Protection
- [ ] Cannot push directly to `main` (try: `git push origin main` - should fail)
- [ ] Cannot force push to `main` (try: `git push -f origin main` - should fail)
- [ ] Cannot delete `main` branch
- [ ] PRs require approval before merge
- [ ] All CI checks must pass
- [ ] Conversations must be resolved
- [ ] Administrators follow same rules

### PR Workflow
- [ ] Can only squash merge PRs
- [ ] PR template appears automatically
- [ ] Code owners are auto-requested for review
- [ ] Branches are auto-deleted after merge
- [ ] CI workflows run on PR creation

### Issue Tracking
- [ ] Issue templates appear when creating issues
- [ ] Labels are available and organized
- [ ] Projects/milestones configured (if used)

### Security
- [ ] Dependabot creates PRs for updates
- [ ] Security alerts are visible
- [ ] Secret scanning active
- [ ] Code scanning configured (if applicable)

---

## 📊 Recommended Labels

Create/organize these labels: **Settings → Issues → Labels**

### Type
- `bug` (red) - Something isn't working
- `enhancement` (blue) - New feature or request
- `documentation` (green) - Documentation improvements
- `question` (purple) - Further information requested

### Priority
- `priority: critical` (dark red) - Critical priority
- `priority: high` (red) - High priority
- `priority: medium` (orange) - Medium priority
- `priority: low` (yellow) - Low priority

### Status
- `status: in-progress` (yellow) - Currently being worked on
- `status: blocked` (red) - Blocked by dependencies
- `status: ready` (green) - Ready to work on
- `status: on-hold` (gray) - On hold

### Area
- `area: ui` - User interface
- `area: database` - Database layer
- `area: editor` - Code editor
- `area: import-export` - Import/export functionality
- `area: performance` - Performance improvements

### Meta
- `good first issue` (green) - Good for newcomers
- `help wanted` (green) - Extra attention needed
- `dependencies` (blue) - Dependency updates
- `automated` (gray) - Automated changes
- `security` (red) - Security related

---

## 🚀 Post-Configuration

After applying all settings:

1. **Test the workflow:**
   - Try pushing to main (should fail)
   - Create a test PR (should require approval and checks)
   - Verify all CI checks run

2. **Communicate changes:**
   - Update team/contributors about new requirements
   - Point them to CONTRIBUTING.md
   - Ensure everyone understands the workflow

3. **Monitor:**
   - Review Dependabot PRs regularly
   - Check security alerts
   - Review and merge automated updates

---

## 📞 Support

If you encounter issues with these settings:

1. Verify you have admin access
2. Check GitHub status page for outages
3. Review GitHub documentation for the specific feature
4. Open an issue in this repository

---

**Last Updated:** 2026-01-07
**Applies To:** GitHub Free/Pro/Team/Enterprise plans

Note: Some features (like required status checks) may require GitHub Actions to have run at least once. Create a test PR to establish the checks before enforcing them.
