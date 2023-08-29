import CustomImage from './CustomImage';
import styles from '@/styles/components/ValueLabel.module.scss';

const ValueLabel = ({ value }) => {
	const iconsMap = {
		completed: '/images/icon-status-success.svg',
		pending_settlement: '/images/icon-status-pending.svg',
		pending_image_container: '/images/icon-status-pending.svg',
		failed: '/images/icon-status-failed.svg',
	};
	const styleMap = {
		completed: styles.success,
		pending_settlement: styles.warning,
		pending_image_container: styles.warning,
		failed: styles.danger,
	};
	const textMap = {
		completed: 'Completed',
		pending_settlement: 'Pending',
		pending_image_container: 'Image Uploading',
		failed: 'Failed',
	};

	return (
		<div className={styles.valueLabel}>
			<CustomImage src={iconsMap[value]} className={`${styles.icon} ${styleMap[value]}`} />
			<div className={styleMap[value]}>{textMap[value]}</div>
		</div>
	);
};

export default ValueLabel;
