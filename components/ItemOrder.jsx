import styles from '@/styles/components/ItemOrder.module.scss';
import ValueAccount from './ValueAccount';
import Field from './Field';
import ValueAccountBalance from './ValueAccountBalance';
import ValueLabel from './ValueLabel';

const ItemOrder = ({ className, mosaicId, creator, imageSrc, paidAmount, status }) => {
	const handleClick = e => {
		e.preventDefault();
		if (status === 'completed') {
			window.location.href = `/mosaics/${mosaicId}`;
		}
	};

	return (
		<div className={`${styles.itemOrder} ${className}`} onClick={handleClick}>
			<img src={imageSrc} className={styles.image} />
			<div className={styles.info}>
				<div className={styles.infoRow}>
					<div>
						<ValueLabel value={status} />
					</div>
					<ValueAccountBalance value={paidAmount} />
				</div>

				<Field title={'Creator'}>
					<ValueAccount address={creator} size="md" className={styles.address} />
				</Field>
			</div>
		</div>
	);
};

export default ItemOrder;
