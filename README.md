# Эмнэлгийн цаг захиалгын систем

SAD236 · Системийн шинжилгээ ба зохиомж · Лаборатори 12 (Архитектурын зохиомж, CI)

Вэбд суурилсан гурван түвшинт архитектур: **React** (танилцуулга) → **Node.js REST API** (хэрэглээ) → **PostgreSQL** (өгөгдөл).

## Хавтасны бүтэц

| Хавтас | Агуулга |
|---|---|
| `docs/` | Диаграммууд (`three_tier.png`, `components.png`), `ADR-001.md` |
| `db/` | PostgreSQL схем (`schema.sql`, Лаб 11-ийн ERD-тэй нийцсэн) |
| `src/` | Код (бизнесийн дүрмүүд: `appointmentRules.js`) |
| `test/` | Автомат тест |
| `.github/workflows/ci.yml` | GitHub Actions CI |

## Тест ажиллуулах

```bash
npm ci
npm test
```

## Салбарын дүрэм

- `main` хамгаалалттай; ажлыг `feature/...` салбар дээр хийж pull request-ээр нэгтгэнэ.
- Pull request бүр дээр CI ногоон ✓ байх ёстой.
