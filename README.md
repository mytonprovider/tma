# My TON Provider

A Telegram Mini App for exploring [TON Storage](https://docs.ton.org/participate/ton-storage/storage-daemon) providers — decentralized storage on The Open Network. Browse providers, inspect their status and hardware, compare prices, filter and sort the list, and save favorites. It runs inside Telegram and as a standalone web app.

## Features

- Provider list with search by public key, sorting and rich filters (rating, uptime, price, bag size, CPU, RAM, location, telemetry, status).
- Provider details: health status with success rate, telemetry, hardware, network and software info, copy of public key and address, open in explorer.
- Favorites, light/dark theme and English/Russian language — synced to your Telegram account.

## Data

Provider data comes from the public aggregator [mytonprovider.org](https://mytonprovider.org) — no API keys required.

- `POST /api/v1/providers/search` — provider list with filters, sorting and pagination.
- `GET /api/v1/providers/filters` — value ranges for the filter UI.

## Run

```
pnpm install
pnpm dev
```

Open the URL printed in the terminal. Outside Telegram it runs as a normal web app with default settings (dark theme, English).

## Build

```
pnpm build
pnpm preview
```

## Deploy

```
pnpm run deploy
```

Builds and publishes `dist/` to GitHub Pages.

## License

[MIT](LICENSE)
