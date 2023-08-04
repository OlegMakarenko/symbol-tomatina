import Footer from '@/components/Footer';
import styles from '@/styles/pages/Layout.module.scss';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ja from 'javascript-time-ago/locale/ja.json';
import uk from 'javascript-time-ago/locale/uk.json';
import zh from 'javascript-time-ago/locale/zh.json';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(uk);
TimeAgo.addLocale(zh);
TimeAgo.addLocale(ja);

const App = ({ Component, pageProps }) => {
	return (
		<div className={styles.wrapper}>
			<ToastContainer autoClose={2000} hideProgressBar pauseOnHover />
			<div className={styles.contentContainer}>
				<main className={styles.contentContainerInner}>
					<Component {...pageProps} />
				</main>
			</div>
			<Footer />
		</div>
	);
};

export default appWithTranslation(App);
