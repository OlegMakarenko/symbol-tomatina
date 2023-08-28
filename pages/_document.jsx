import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="shortcut icon" href="/favicon.png" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="theme-color" content="#e04445" />
				<meta name="description" content="Symbol Tomatina" />
				<link rel="apple-touch-icon" href="/favicon.png" />
				<link rel="/preview.png" href="image url" />
				<meta property="og:title" content="Symbol Tomatina" />
				<meta property="og:description" content="Create your unique tomato and throw it into someone!" />
				<meta property="og:image" content="/preview.png" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					// eslint-disable-next-line max-len
					href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
				<link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@300&display=swap" rel="stylesheet" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
