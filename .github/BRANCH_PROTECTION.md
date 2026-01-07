# Branch Protection Rules Configuration

This document outlines the branch protection rules that need to be configured in the repository settings to ensure only the repository owner can merge pull requests.

## Required Settings

### Step 1: Navigate to Branch Protection Settings

1. Go to your repository on GitHub
2. Click on **Settings** → **Branches**
3. Under "Branch protection rules", click **Add rule** or edit the existing rule for `main`

### Step 2: Configure Protection for `main` Branch

Apply the following settings:

#### Branch name pattern
```
main
```

#### Protect matching branches

✅ **Require a pull request before merging**
- ✅ Require approvals: **1**
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require review from Code Owners
- ✅ Restrict who can dismiss pull request reviews
  - Add: `Asif-4520` (repository owner only)
- ✅ Require approval of the most recent reviewable push

✅ **Require status checks to pass before merging**
- ✅ Require branches to be up to date before merging
- Add status checks (if you have CI workflows):
  - `build`
  - `lint`
  - `test` (when tests are added)

✅ **Require conversation resolution before merging**
- Ensures all PR comments are addressed before merging

✅ **Require signed commits** (Recommended for additional security)

✅ **Require linear history**
- Prevents merge commits, requires rebase or squash merging

✅ **Do not allow bypassing the above settings**
- Ensures rules apply to administrators as well

✅ **Restrict who can push to matching branches**
- Select: **Restrict pushes that create matching branches**
- Add: `Asif-4520` (repository owner only)
- This prevents anyone else from pushing directly to `main`

✅ **Allow force pushes**
- ❌ Disable this for security

✅ **Allow deletions**
- ❌ Disable this to prevent accidental deletion

#### Rules applied to everyone including administrators
- ✅ Include administrators
  - This ensures even administrators cannot bypass these rules

### Step 3: Configure Repository Settings

In addition to branch protection, configure these repository-wide settings:

1. Go to **Settings** → **General** → **Pull Requests**
   - ✅ Allow squash merging
   - ❌ Allow merge commits (optional, based on preference)
   - ❌ Allow rebase merging (optional, based on preference)
   - ✅ Always suggest updating pull request branches
   - ✅ Allow auto-merge
   - ✅ Automatically delete head branches

2. Go to **Settings** → **Moderation options**
   - Configure interaction limits if needed

## CODEOWNERS File

The `.github/CODEOWNERS` file in this repository specifies that:
- All files require approval from `@Asif-4520`
- Critical configuration files have explicit ownership rules

This works in conjunction with the "Require review from Code Owners" branch protection rule.

## GitHub Actions Workflow

The repository includes a workflow (`.github/workflows/branch-protection.yml`) that:
- Validates that PRs meet requirements
- Checks for required labels
- Ensures PR has proper description
- Blocks merges that don't meet criteria

## Important Notes

1. **Only the repository owner** (`Asif-4520`) will be able to:
   - Approve pull requests
   - Merge pull requests
   - Push directly to protected branches (if enabled)

2. **Collaborators with full permissions** will be able to:
   - Create branches
   - Open pull requests
   - View code and issues
   - **BUT CANNOT** merge or approve PRs

3. **Direct pushes to `main`** are completely blocked for everyone except the owner (and only if explicitly allowed)

4. **Force pushes** are disabled to prevent history rewriting

5. These settings can only be changed by repository administrators (owner)

## Verification

After applying these settings:

1. Test by having a collaborator create a PR
2. Verify they cannot merge it
3. Verify direct pushes to `main` are blocked
4. Verify only you can approve and merge PRs

## Additional Security Recommendations

1. **Enable 2FA** for your GitHub account
2. **Use signed commits** with GPG keys
3. **Review security alerts** regularly
4. **Keep dependencies updated** to avoid vulnerabilities
5. **Audit collaborator permissions** periodically

## Troubleshooting

- **Problem**: Collaborators can still merge PRs
  - **Solution**: Ensure "Restrict who can dismiss pull request reviews" is enabled and only includes you

- **Problem**: Someone pushed directly to `main`
  - **Solution**: Ensure "Restrict who can push to matching branches" is properly configured

- **Problem**: Rules are bypassed
  - **Solution**: Ensure "Do not allow bypassing the above settings" is checked and "Include administrators" is enabled

## Summary

With these settings:
- ✅ No one can push directly to `main` (except owner if allowed)
- ✅ All changes must go through pull requests
- ✅ Only `@Asif-4520` can approve PRs (via CODEOWNERS)
- ✅ Only `@Asif-4520` can merge PRs
- ✅ Collaborators can contribute but cannot merge
- ✅ All rules apply even to administrators
