import styles from '@/styles/pages/404.module.scss';
import Head from 'next/head';

const Error = () => {
	return (
		<div className={styles.wrapper}>
			<Head>
				<title>Error</title>
			</Head>
		</div>
	);
};

export default Error;
