import { TransactionQR } from 'symbol-qr-library';
import styles from '@/styles/components/QRCode.module.scss';
import { createSDKTransferTransaction, useDataManager } from '@/utils';
import config from '@/config';
import { useEffect, useState } from 'react';

const QRCode = ({ address, message, amount }) => {
	const [prevData, setPrevData] = useState(false);

	const [generateImage, isImageLoading, image] = useDataManager(
        (address, amount, message) => {
			const transaction = createSDKTransferTransaction(address, amount, message);
			return new TransactionQR(transaction, config.NETWORK_TYPE, config.GENERATION_HASH).toBase64().toPromise();
        },
        null,
        console.error
    );

	const containerVisibilityStyle = {
		opacity: isImageLoading ? 0 : 1
	}

    useEffect(() => {
        if (!isImageLoading && (
			address !== prevData.address
			|| amount !== prevData.amount
			|| message !== prevData.message
		)) {
            generateImage(address, amount, message);
            setPrevData({address, amount, message});
        }
    }, [address, amount, message, isImageLoading, prevData]);

    return (
        <div className={styles.QRCode} style={containerVisibilityStyle}>
            <img src={image} className={styles.image} />
			<div className={styles.text}>Transaction QR</div>
        </div>
    );
};

export default QRCode;
