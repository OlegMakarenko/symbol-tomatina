import styles from '@/styles/pages/Layout.module.scss';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HomePage from '@/pages/index';
import AccountPage from '@/pages/accounts/index';
import MosaicPage from '@/pages/mosaics/index';
import Footer from '@/components/Footer';

const routes = [
	{
		pathName: '',
		component: HomePage
	},
	{
		pathName: 'accounts',
		component: AccountPage
	},
	{
		pathName: 'mosaics',
		component: MosaicPage
	}
];

const App = ({ Component, pageProps }) => {
	const router = useRouter();
	const [pathName, setPathName] = useState(null);
	const route = routes.find(route => route.pathName === pathName);

	useEffect(() => {
		const { pathname } = window.location;
		const destructedPathName = pathname.slice(1).split('/');
		setPathName(destructedPathName[0]);
	}, [router.pathname]);

	return (
		<div className={styles.wrapper}>
			<ToastContainer autoClose={2000} hideProgressBar pauseOnHover />
			<div className={styles.contentContainer}>
				<main className={styles.contentContainerInner}>
					{!!route && <route.component {...pageProps} />}
					{!route && <Component {...pageProps} />}
				</main>
			</div>
			<Footer />
		</div>
	);
};

export default appWithTranslation(App);
