# BloomWatch Brasil (Legacy)

![CI](https://github.com/SlurKronox/bloomWatchBrasil/actions/workflows/ci.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> Este repositório está em modo **legado**.
> Repositório principal: **https://github.com/SlurKronox/bloomwatch-brasil-techers**

## Objetivo
Versão histórica do BloomWatch em JavaScript, mantida para referência e compatibilidade.
A base continua com validação técnica completa (lint, testes e build) para garantir rastreabilidade.
Novas evoluções funcionais devem ocorrer no repositório principal em TypeScript.

## Stack
- React 18
- Vite
- Supabase
- Vitest
- GitHub Actions

## Arquitetura
- `src/components`: interface e dashboards
- `src/services`: previsão e integrações
- `src/lib`: cliente API/Supabase
- `supabase/`: funções e migrações
- `docs/`: documentação técnica

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

## Documentação
- `docs/ARCHITECTURE.md`
- `docs/TESTING.md`
- `docs/CI.md`

## English Summary
Legacy JavaScript BloomWatch repository kept stable with full CI gates.
Active development is concentrated in the TypeScript primary repository.
