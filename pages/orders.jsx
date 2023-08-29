import styles from '@/styles/pages/Account.module.scss';
import Head from 'next/head';
import Card from '@/components/Card';
import { useEffect } from 'react';
import {
	fetchOrders,
	useDataManager
} from '@/utils';
import TomatoesBackground from '@/components/TomatoesBackground';
import LoadingIndicator from '@/components/LoadingIndicator';
import ItemOrder from '@/components/ItemOrder';

const Orders = () => {
	const t = text => text;
	const [loadOrders, isLoading, orders] = useDataManager(fetchOrders, [], console.error);
	useEffect(loadOrders, []);

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
							<h2>{t('Orders')}</h2>
							{isLoading && (
								<div className="layout-flex-center">
									<LoadingIndicator />
								</div>
							)}
							{!isLoading && (
								<div className="layout-flex-col align-center-mobile">
									{orders.map((item, index) => (
										<ItemOrder
											mosaicId={item.mosaicId}
											creator={item.creator}
											imageSrc={item.imageSrc}
											paidAmount={item.paidAmount}
											status={item.status}
											orderTransactionHash={item.orderTransactionHash}
											key={'order' + index}
										/>
									))}
								</div>
							)}
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Orders;
