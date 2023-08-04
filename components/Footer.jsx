import CustomImage from './CustomImage';
import styles from '@/styles/components/Footer.module.scss';

const Footer = () => (
	<footer className={styles.footer}>
		<CustomImage className={styles.footerLogo} src="/images/logo-symbol.png" alt="NEM" />
	</footer>
);

export default Footer;
