import Avatar from '@/components/Avatar';
import ButtonCopy from '@/components/ButtonCopy';
import styles from '@/styles/components/ValueAccount.module.scss';
import Link from 'next/link';

const ValueAccount = ({ address, size, position, className }) => {
	let containerStyle = '';
	const textStyle = size === 'md' ? styles.textMd : '';

	switch (position) {
		case 'left':
			containerStyle = styles.containerLeft;
			break;
		case 'right':
			containerStyle = styles.containerRight;
			break;
	}

	const handleClick = e => {
		e.stopPropagation();
		e.preventDefault();
		window.location.href = `/accounts/${address}`;
	};

	return (
		<div className={`${styles.valueAccount} ${containerStyle} ${className}`}>
			<Avatar type="account" value={address} size={size} />
			<div className={styles.addressContainer}>
				<Link className={textStyle} href={`/accounts/${address}`} onClick={handleClick}>
					{address}
				</Link>
				<ButtonCopy value={address} />
			</div>
		</div>
	);
};

export default ValueAccount;
