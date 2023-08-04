import styles from '@/styles/components/Button.module.scss';
import { useTranslation } from 'next-i18next';
import CustomImage from './CustomImage';

const Button = ({ className, text, iconSrc, onClick }) => {
	const { t } = useTranslation();

	return (
		<button className={`${styles.button} ${className}`} onClick={onClick}>
			<CustomImage className={styles.icon} src={iconSrc} alt="Button Icon" />
			<div>{text}</div>
		</button>
	);
};

export default Button;
