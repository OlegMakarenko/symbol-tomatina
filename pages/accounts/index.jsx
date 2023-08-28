import styles from '@/styles/pages/Account.module.scss';
import Head from 'next/head';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import config from '@/config';
import { fetchAccountTransactions, fetchCreatedNFTs, fetchNodeUrl, getMosaicByGroups, getRouteParam, isAddressValid, useDataManager } from '@/utils';
import { toast } from 'react-toastify';
import TomatoesBackground from '@/components/TomatoesBackground';
import LoadingIndicator from '@/components/LoadingIndicator';
import ItemNFT from '@/components/ItemNFT';
import AccountAddressInput from '@/components/AccountAddressInput';
import Link from 'next/link';

const AccountInfo = () => {
	const t = text => text;
	const [address, setAddress] = useState('');
	const [receivedTomatoes, setReceivedTomatoes] = useState([]);
	const [sentTomatoes, setSentTomatoes] = useState([]);

	const [loadTransactions, isLoading] = useDataManager(async (address) => {
		const nodeUrl = await fetchNodeUrl();
		const createdNFTs = await fetchCreatedNFTs();
		const transactions = [];
		console.log(createdNFTs.map(item => item.mosaic_id))

		let pageNumber = 1;
		let isStartHeightReached = false
		while(!isStartHeightReached) {
			const transactionPage = await fetchAccountTransactions(address, nodeUrl, pageNumber);
			transactions.push(...transactionPage);
			pageNumber ++;

			if (transactionPage.length === 0) {
				break;
			}

			isStartHeightReached = transactionPage[transactionPage.length - 1].transactionInfo.height.compact() <= config.EVENT_START_HEIGHT;
		}

		const mosaicGroup = getMosaicByGroups(transactions, address, {}, createdNFTs);

		setReceivedTomatoes(mosaicGroup.received);
		setSentTomatoes(mosaicGroup.sent);
	}, null, console.error);

	useEffect(() => {
		const address = getRouteParam();

		if (!address) {
			return;
		}

		if (isAddressValid(address)) {
			setAddress(address);
			loadTransactions(address);
		}
		else {
			toast.error('Incorrect Address');
		}
	}, [])


	return (
		<div className={styles.wrapper}>
			<Head>
				<title>{t('Symbol Tomatina')}</title>
			</Head>
			<div>
				<TomatoesBackground className={styles.backgroundTopLeft} />
				<TomatoesBackground className={styles.backgroundBottomLeft} />
				<TomatoesBackground className={styles.backgroundTopRight} />
				<TomatoesBackground className={styles.backgroundBottomRight} />
				<div className="layout-flex-col">
					<Card className={styles.card}>
						<div className="layout-flex-col">
							<Link href="/">
								{t('Back to Home')}
							</Link>

							<h2>{t('Account Activity')}</h2>
							<AccountAddressInput address={address} />
						</div>
					</Card>
					<Card className={styles.card}>
						<div className="layout-flex-col">
							<div className={`layout-flex-row ${styles.tableHeader}`}>
								<div>{t('Received')}</div>
								<div>{t('Sent')}</div>
							</div>
							{isLoading && (
								<div className="layout-flex-center">
									<LoadingIndicator />
								</div>
							)}
							{!isLoading && (
								<div className="layout-flex-row scroll-x">
									{receivedTomatoes.length > 0 && (
										<div className="layout-flex-col">
											{receivedTomatoes.map((item, index) => <ItemNFT
												id={item.id}
												imageSrc={item.imageSrc}
												amount={item.amount}
												address={item.address}
												addressTitle={t('Received from account')}
												key={'receive' + index}
											/>)}
										</div>
									)}
									{receivedTomatoes.length === 0 && (
										<div className={styles.emptyListText}>{t('Nothing yet')}</div>
									)}
									{sentTomatoes.length > 0 && (
										<div className="layout-flex-col">
											{sentTomatoes.map((item, index) => <ItemNFT
												id={item.id}
												imageSrc={item.imageSrc}
												amount={item.amount}
												address={item.address}
												addressTitle={t('Sent to account')}
												key={'sent' + index}
											/>)}
										</div>
									)}
									{sentTomatoes.length === 0 && (
										<div className={styles.emptyListText}>{t('Nothing yet')}</div>
									)}
								</div>
							)}
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default AccountInfo;
