import styles from '@/styles/components/ButtonCopy.module.scss';
import { copyToClipboard } from '@/utils';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

const ButtonCopy = ({ value, className }) => {
	const { t } = useTranslation();

	const copy = e => {
		try {
			copyToClipboard(value);
			toast.success(t('Copied'));
		} catch {
			toast.error(t('Failed to copy'));
		}
	};

	return (
		<div className={`${styles.buttonCopy} ${className}`} onClick={copy}>
			<Image src="/images/icon-copy.png" fill alt="Copy" />
		</div>
	);
};

export default ButtonCopy;
