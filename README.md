# UniGear — Campus Asset Management System (校园资产管理系统)

> **Dual-Track Monorepo**: Web Admin + Mobile App, powered by Supabase.
> (双轨 Monorepo 架构：Web 管理面板 + 移动端应用，后端使用 Supabase)

## 项目结构 / Project Structure

```
Capstone_Project/
├── app-web/          # Next.js 14 Admin Panel (Web 管理面板)
├── app-mobile/       # Expo SDK 50 Mobile App (移动端应用)
├── database/         # Supabase migrations, seeds & types (数据库)
│   ├── migrations/   # SQL migration files
│   ├── seed/         # Seed data scripts
│   └── types/        # Auto-generated TypeScript types
├── docs/             # Documentation (项目文档)
│   ├── requirements/ # Requirement specs
│   ├── design/       # Figma & design docs
│   └── qa/           # QA reports
└── .agents/          # AI agent rules & workflows
```

## 技术栈 / Tech Stack

| Layer    | Technology                         |
| -------- | ---------------------------------- |
| Web      | Next.js 14 (App Router) + Tailwind |
| Mobile   | React Native (Expo SDK 50)         |
| Backend  | Supabase (PostgreSQL + RLS)        |
| Language | Strict TypeScript (no `any`)       |

## 团队 / Team

| Squad          | Members                    | Directory      |
| -------------- | -------------------------- | -------------- |
| Mobile + DB    | Bosheng, Yuxuan, Cunjun    | `/app-mobile/` & `/database/` |
| Web            | Letao, Linpeng             | `/app-web/`    |

## 快速开始 / Quick Start

```bash
# Web Admin Panel
cd app-web && npm install && npm run dev

# Mobile App
cd app-mobile && npm install && npx expo start
```

## 开发规范 / Development Rules

- **Contract-Driven**: All frontend types imported from `database/types/supabase.ts`
- **Bilingual Comments**: English first, Chinese second
- **Strict TypeScript**: No `any` type allowed
- **Component Limit**: Max 150 lines per component
