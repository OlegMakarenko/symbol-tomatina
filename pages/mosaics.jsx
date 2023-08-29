import styles from '@/styles/pages/Mosaic.module.scss';
import Head from 'next/head';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import config from '@/config';
import { fetchNFTInfo, fetchNodeUrl, getRouteParam, useDataManager } from '@/utils';
import TomatoesBackground from '@/components/TomatoesBackground';
import LoadingIndicator from '@/components/LoadingIndicator';
import ValueAccount from '@/components/ValueAccount';
import Field from '@/components/Field';
import ValueCopy from '@/components/ValueCopy';
import CustomImage from '@/components/CustomImage';

const AccountInfo = () => {
	const t = text => text;
	const [mosaicId, setMosaicId] = useState('');
	const [info, setInfo] = useState({ mosaicId });

	const [loadInfo, isLoading] = useDataManager(
		async mosaicId => {
			const nodeUrl = await fetchNodeUrl();
			const info = await fetchNFTInfo(mosaicId, nodeUrl);
			setInfo(info);
		},
		{},
		console.error
	);

	useEffect(() => {
		const mosaicId = getRouteParam();

		if (!mosaicId) {
			return;
		}

		setMosaicId(mosaicId);
		loadInfo(mosaicId);
	}, []);

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
							<a href="/">{t('Back to Home')}</a>
							<h2>{t('Mosaic')}</h2>
							{isLoading && (
								<div className="layout-flex-center">
									<LoadingIndicator />
								</div>
							)}
							{!isLoading && (
								<div className="layout-flex-row-mobile-col">
									<img src={info.imageSrc} className={styles.image} />
									<div className={styles.mosaicInfo}>
										<div className="layout-flex-col-fields">
											<Field title={t('Mosaic ID')}>{info.mosaicId}</Field>
											<Field title={t('Creator')}>
												<ValueAccount address={info.creator} size="sm" className="no-mobile" />
												<ValueAccount address={info.creator} size="md" className="no-desktop" />
											</Field>
											<Field title={t('Total Supply')}>{info.supply}</Field>
											<Field title={t('Image Transaction Hash')}>
												<ValueCopy value={info.imageTransactionHash} />
											</Field>
											<a
												className={styles.explorerLink}
												href={`${config.EXPLORER_URL}/mosaics/${mosaicId}`}
												target="_blank"
											>
												<CustomImage className={styles.explorerLinkIcon} src="/images/icon-primary-explorer.png" />
												<div className={styles.explorerLinkText}>{t('Show in Explorer')}</div>
											</a>
										</div>
									</div>
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
