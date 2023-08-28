import styles from '@/styles/components/Button.module.scss';
import CustomImage from './CustomImage';

const Button = ({ className, text, iconSrc, onClick, isActive = true }) => {
	const activeStyle = isActive ? styles.buttonActive : '';

	return (
		<button className={`${styles.button} ${className} ${activeStyle}`} onClick={onClick}>
			{!!iconSrc && <CustomImage className={styles.icon} src={iconSrc} alt="Button Icon" />}
			<div>{text}</div>
		</button>
	);
};

export default Button;
