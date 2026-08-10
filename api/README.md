# Invoices API

Laravel 13 API skeleton.

## Stack

- PHP 8.3+ / Laravel 13
- PostgreSQL 18 + Redis (via Laravel Sail, `compose.yaml`)
- Docker image: `invoices-api`

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
```

### With Sail (Docker)

```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
```

### Without Docker

```bash
composer setup   # install, .env, key, migrate, npm install, npm run build
composer dev     # serve + queue + logs + vite
```

## Conventions

- API routes live in [routes/api.php](routes/api.php); health check at `/up`, smoke check at `/api/ping`.
- JSON resources are unwrapped (no `data` envelope) — see [app/Providers/AppServiceProvider.php](app/Providers/AppServiceProvider.php).
- API rate limit: 60 req/min per user or IP.
- Exceptions render as JSON for `api/*` routes.

## Tests

```bash
composer test
```
