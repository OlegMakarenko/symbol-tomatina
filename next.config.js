const i18nConfig = require('./next-i18next.config.js'); // eslint-disable-line import/extensions
const webpack = require('webpack');

module.exports = {
	distDir: 'build',
	reactStrictMode: true,
	output: 'export',
	eslint: {
		ignoreDuringBuilds: true
	},
	images: {
		unoptimized: true
	},
	webpack: (config, { isServer }) => {
		// use a browser-optimized wasm for Ed25519 crypto operations
		const moduleRegExp = /symbol-crypto-wasm-node/;
		const newPath = '../../../symbol-crypto-wasm-web/symbol_crypto_wasm.js';
		config.plugins.push(new webpack.NormalModuleReplacementPlugin(moduleRegExp, newPath));

		// enable async loading of wasm files
		config.experiments = { asyncWebAssembly: true, topLevelAwait: true, layers: true };

		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		});

		return config;
	}
};
