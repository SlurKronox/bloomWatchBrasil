# Security Baseline

## Objectives
- Maintain safe legacy operation
- Prevent accidental credential exposure
- Keep dependency and code scanning active

## Controls
- Required PR reviews before merge
- CI validates lint, test, and build
- Security workflow runs dependency review and CodeQL

## Legacy-Specific Practices
- Keep compatibility fixes isolated
- Avoid adding new privileged integrations
- Prefer migration notes to primary repository for major changes

## Incident Response
1. Revoke exposed tokens.
2. Patch and redeploy.
3. Document migration impact to primary repository.
4. Validate CI and security scans.

## English Summary
This document defines security controls for safe operation of the legacy repository.
