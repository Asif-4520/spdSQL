# Quick Setup Guide for Branch Protection

This is a quick reference guide for setting up branch protection on GitHub. For detailed information, see [BRANCH_PROTECTION.md](BRANCH_PROTECTION.md).

## ⚡ Quick Steps

### 1. Enable Branch Protection Rules

1. Go to: `https://github.com/Asif-4520/SQLio/settings/branches`
2. Click **"Add rule"** or edit existing rule for `main`
3. Apply these settings:

```
Branch name pattern: main

✅ Require a pull request before merging
   ✅ Require approvals: 1
   ✅ Dismiss stale pull request approvals when new commits are pushed
   ✅ Require review from Code Owners
   
✅ Require status checks to pass before merging
   ✅ Require branches to be up to date before merging
   Status checks: branch-protection-enforcement/pr-validation
   
✅ Require conversation resolution before merging

✅ Require linear history

✅ Include administrators (IMPORTANT!)

✅ Restrict who can push to matching branches
   ☑️ Only: Asif-4520
   
❌ Allow force pushes: DISABLED
❌ Allow deletions: DISABLED
```

### 2. Verify CODEOWNERS

The `.github/CODEOWNERS` file should contain:

```
* @Asif-4520
```

This ensures all files require your approval.

### 3. Test the Protection

After setup:
1. Try to push directly to `main` → Should be blocked ✅
2. Have a collaborator create a PR → They cannot merge it ✅
3. Only you can approve and merge PRs ✅

## 🔐 Result

After configuration:
- **Direct pushes to main:** ❌ BLOCKED (for everyone)
- **Collaborator can merge:** ❌ BLOCKED (requires owner approval)
- **Only owner can approve:** ✅ ENFORCED
- **Only owner can merge:** ✅ ENFORCED

## 📝 Important Notes

1. **"Include administrators"** must be checked - This applies rules to you too (best practice)
2. **CODEOWNERS file** works with "Require review from Code Owners" setting
3. **Restrict who can push** prevents direct pushes even from admins
4. These settings can only be changed by repository administrators

## 🆘 Support

If branch protection isn't working:
1. Check "Include administrators" is enabled
2. Verify CODEOWNERS file syntax
3. Ensure "Restrict who can push" is configured
4. Clear GitHub cache (sign out/in)

For detailed troubleshooting, see [BRANCH_PROTECTION.md](BRANCH_PROTECTION.md#troubleshooting).
