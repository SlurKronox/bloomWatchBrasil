# Contributing Guide

## Legacy Context
This repository is legacy. Prefer sending new features to:
`https://github.com/SlurKronox/bloomwatch-brasil-techers`

## Workflow
- Base branch: `main`
- Keep PRs small and scoped to maintenance/security fixes
- Link migration notes when touching shared logic

## Local Validation
```bash
npm ci
npm run lint
npm run test:ci
npm run build
```

## Pull Request Requirements
- CI and Security checks green
- No committed secrets
- Docs updated when behavior changes
