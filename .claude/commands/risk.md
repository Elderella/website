---
allowed-tools: Bash, Read, Grep, Glob
description: Assess risk of pushing commits to origin/main
---

# Push Risk Assessment

Analyze commits about to be pushed and identify potential risks.

## Steps

### 1. Fetch latest and count commits
```bash
git fetch origin
git log origin/main..HEAD --oneline
```
If no commits, report "Branch is up to date" and stop.

### 2. CRITICAL: Check for new db.Column without migrations

This is the most important check. Run these commands and compare:

```bash
# New columns added to models
git diff origin/main..HEAD -- app/models/database.py | grep "^\+" | grep "db\.Column"

# New columns in migrations
git diff origin/main..HEAD -- migrations/versions/*.py | grep "^\+" | grep "add_column"
```

**If new columns appear in database.py but NOT in migrations → 🔴 BLOCK PUSH**

Extract column names from both outputs and verify each new model column has a corresponding migration.

### 3. CRITICAL: Check for localhost in mobile config

```bash
# Check if config points to localhost instead of production
grep -E "localhost|192\.168\.|127\.0\.0\.1|:8080" mobile/config.local.js
```

**If localhost/local IP found in apiUrl default → 🔴 BLOCK PUSH**

The default apiUrl must be `https://alpha.elderella.com`, not a local development URL.

### 4. Check feature flags for billing/new features

```bash
# Check billing flag status
grep -A2 "BILLING_ENABLED" mobile/config/featureFlags.ts
```

Any billing-related changes must have `BILLING_ENABLED: false` as default.

### 5. Categorize all changes

Review the commit list and categorize:

| 🔴 HIGH RISK | 🟡 MEDIUM | 🟢 LOW |
|--------------|-----------|--------|
| New db.Column without migration | New features (check flags) | Bug fixes |
| Localhost in mobile config | Large refactors | Documentation |
| Security/auth changes | Schema changes | Tests |
| API breaking changes | | |

### 6. Output report

```
## Push Risk Assessment

**Commits**: [count] ahead of origin/main

### 🔴 Critical Issues (BLOCK PUSH)
- [any model/migration mismatches]
- [localhost in mobile config.local.js]
- [any security issues]

### 🟡 Warnings
- [features to verify are flagged]

### 🟢 Safe Changes
- [bug fixes, docs, tests]

### Recommendation: [SAFE TO PUSH / BLOCK - FIX REQUIRED]
```

## Key Rules

1. **New db.Column without migration** → ALWAYS block
2. **Localhost in mobile config** → ALWAYS block (must use production URL)
3. **Billing changes** → Must be behind BILLING_ENABLED flag
4. **Security changes** → Flag for extra review
5. **When in doubt** → Ask user before recommending push
