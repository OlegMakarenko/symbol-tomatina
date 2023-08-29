import styles from '@/styles/components/ItemNFT.module.scss';
import ValueAccount from './ValueAccount';
import Field from './Field';

const ItemNFT = ({ className, id, imageSrc, address, addressTitle }) => {
	const handleClick = e => {
		e.preventDefault();
		window.location.href = `/mosaics/${id}`;
	};

	return (
		<div className={`${styles.itemNFT} ${className}`} onClick={handleClick}>
			<img src={imageSrc} className={styles.image} />
			<div className={styles.info}>
				<div className={styles.infoRow}>
					<div className={styles.id}>ID: {id}</div>
				</div>
				<Field title={addressTitle}>
					<ValueAccount address={address} size="md" className={styles.address} />
				</Field>
			</div>
		</div>
	);
};

export default ItemNFT;
