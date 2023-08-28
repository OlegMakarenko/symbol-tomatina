import styles from '@/styles/components/ItemNFT.module.scss';
import ValueAccount from './ValueAccount';

const ItemNFT = ({ className, id, imageSrc, amount, address, addressTitle }) => {
    const handleClick = (e) => {
		e.preventDefault();
		window.location.href = `/mosaics/${id}`;
	}

    return (
        <div className={`${styles.itemNFT} ${className}`} onClick={handleClick}>
            <img src={imageSrc} className={styles.image}/>
            <div className={styles.info}>
                <div className={styles.infoRow}>
                    <div className={styles.id}>
                        ID: {id}
                    </div>
                    <div className={styles.amount}>
                        {amount}
                    </div>
                </div>
                <div title={addressTitle}>
                    <ValueAccount address={address} size="md" className={styles.address} />
                </div>
            </div>
        </div>
    );
}

export default ItemNFT;
