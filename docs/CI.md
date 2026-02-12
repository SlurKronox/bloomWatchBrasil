# CI

## Workflows
- `.github/workflows/ci.yml`
- `.github/workflows/security.yml`

## CI Jobs
- `lint`
- `test`
- `build`

## Security Jobs
- `dependency-review` (PR)
- `codeql` (push, PR, schedule)

## Ambiente
- Node 20
- Dependencias instaladas com `npm ci`

## Criterio de aprovacao
Repositorio legado deve manter CI e Security verdes para estabilidade.

## English Summary
Legacy repo remains protected by CI and Security workflows for maintenance stability.
