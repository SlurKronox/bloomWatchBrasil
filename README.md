# BloomWatch Brasil (Legacy)

![CI](https://github.com/SlurKronox/bloomWatchBrasil/actions/workflows/ci.yml/badge.svg)
![Security](https://github.com/SlurKronox/bloomWatchBrasil/actions/workflows/security.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> Este repositorio esta em modo **legado**.
> Repositorio principal: **https://github.com/SlurKronox/bloomwatch-brasil-techers**

## Objetivo
Versao historica do BloomWatch em JavaScript, mantida para referencia e compatibilidade.
A base continua com validacao tecnica completa (lint, testes e build) para garantir rastreabilidade.
Novas evolucoes funcionais devem ocorrer no repositorio principal em TypeScript.

## Stack
- React 18
- Vite
- Supabase
- Vitest
- GitHub Actions

## Arquitetura
- `src/components`: interface e dashboards
- `src/services`: previsao e integracoes
- `src/lib`: cliente API/Supabase
- `supabase/`: funcoes e migracoes
- `docs/`: documentacao tecnica

## Setup Local
```bash
git clone https://github.com/SlurKronox/bloomWatchBrasil.git
cd bloomWatchBrasil
npm ci
```

Crie `.env`:
```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## Comandos
```bash
npm run lint
npm run test
npm run build
```

## Documentacao
- `docs/README.md`
- `docs/ARCHITECTURE.md`
- `docs/TESTING.md`
- `docs/CI.md`
- `docs/SECURITY.md`

## Governanca
- Politica de seguranca: `SECURITY.md`
- Guia de contribuicao: `CONTRIBUTING.md`

## English Summary
Legacy JavaScript BloomWatch repository kept stable with CI and security governance.
Active development is concentrated in the TypeScript primary repository.
