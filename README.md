# Explorer Frontend

- [Overview](#overview)
- Instructions
    - [Installation](#installation)
    - [Build](#build)
    - [Lint](#lint)

# Overview

The Blockchain Explorer SSR web application build on NextJS framework.


## Installation

1. Install the required dependencies.

```
npm install
```

2. Create `.env` in root directory.

```env
NEXT_PUBLIC_NATIVE_MOSAIC_ID="72C0212E67A08BCE"
NEXT_PUBLIC_NATIVE_NATIVE_MOSAIC_DIVISIBILITY=6
NEXT_PUBLIC_NATIVE_MOSAIC_TICKER="XYM"
NEXT_PUBLIC_API_BASE_URL="https://symbol-tomatina.symbol.tools"
NEXT_PUBLIC_ADDRESS="TAHWEUW2EL4MEAAUWSKX5UHY75Z33R44W6XDOPY"
NEXT_PUBLIC_PRICE=70
NEXT_PUBLIC_NETWORK_TYPE=152
NEXT_PUBLIC_GENERATION_HASH="49D6E1CE276A85B70EAFE52349AACCA389302E7A9754BCF1221E79494FC665A4"
NEXT_PUBLIC_EPOCH_ADJUSTMENT="1667250467"
NEXT_PUBLIC_EVENT_START_HEIGHT=754000
NEXT_PUBLIC_STATISTICS_SERVICE_URL="https://testnet.symbol.services"
NEXT_PUBLIC_EXPLORER_URL="https://testnet.symbol.fyi"
```

3. Start application.

```shell
npm run dev
```


4. Visit http://localhost:3000/ in your browser.

## Build

```
npm run build
```


# lint

```
npm run lint
npm run lint:fix
```
