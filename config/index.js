const config = {
	NATIVE_MOSAIC_ID: process.env.NEXT_PUBLIC_NATIVE_MOSAIC_ID,
	NATIVE_MOSAIC_DIVISIBILITY: process.env.NEXT_PUBLIC_NATIVE_NATIVE_MOSAIC_DIVISIBILITY,
	NATIVE_MOSAIC_TICKER: process.env.NEXT_PUBLIC_NATIVE_MOSAIC_TICKER,
	API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	ADDRESS: process.env.NEXT_PUBLIC_ADDRESS,
	PRICE: process.env.NEXT_PUBLIC_PRICE,
	NETWORK_TYPE: +process.env.NEXT_PUBLIC_NETWORK_TYPE,
	GENERATION_HASH: process.env.NEXT_PUBLIC_GENERATION_HASH,
	EPOCH_ADJUSTMENT: process.env.NEXT_PUBLIC_EPOCH_ADJUSTMENT,
	EVENT_START_HEIGHT: +process.env.NEXT_PUBLIC_EVENT_START_HEIGHT,
	NEXT_PUBLIC_STATISTICS_SERVICE_URL: process.env.NEXT_PUBLIC_STATISTICS_SERVICE_URL,
	EXPLORER_URL: process.env.NEXT_PUBLIC_EXPLORER_URL
};

export default config;
