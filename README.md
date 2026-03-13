# Shotokan Platform

Monorepo com:
- **Frontend**: Next.js + TypeScript + Tailwind (export estático para GitHub Pages)
- **Backend**: NestJS + Prisma + PostgreSQL + Redis (deploy no Railway)

## Estrutura
```
apps/
  web/   -> Next.js (static export)
  api/   -> NestJS (Prisma)
```

## Frontend (GitHub Pages)
O frontend está preparado para `next export`.

Comandos:
```
cd apps/web
npm install
npm run build
```

O build gera `apps/web/out/` pronto para publicar via GitHub Pages.

Se o repositório não estiver na raiz do domínio, define:
```
NEXT_PUBLIC_BASE_PATH=/NOME_DO_REPO
```

## Backend (Railway)
O backend usa NestJS + Prisma.

Configurações:
- `DATABASE_URL` (PostgreSQL)
- `REDIS_URL`

Modelos principais:
- `BeltRank`
- `Exam`
- `MemberRankHistory`

## Fluxo pretendido
Login dos instrutores → abre plataforma interna (a construir depois).
