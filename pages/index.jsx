import styles from '@/styles/pages/Home.module.scss';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Card from '@/components/Card';
import Field from '@/components/Field';
import Separator from '@/components/Separator';
import Slider from '@/components/Slider';
import ColorPicker from '@/components/ColorPicker';
import TomatoSticker from '@/components/TomatoSticker';
import { useEffect, useState } from 'react';
import ValueAccountBalance from '@/components/ValueAccountBalance';
import ValueCopy from '@/components/ValueCopy';
import config from '@/config';
import { TransactionQR } from 'symbol-qr-library';
import QRCode from '@/components/QRCode';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { useToggle } from '@/utils';
import { toast } from 'react-toastify';
import TomatoesBackground from '@/components/TomatoesBackground';

export const getServerSideProps = async ({ locale }) => {
	//const blocksPage = await getBlockPage();

	return {
		props: {
			//blocks: blocksPage.data,
			...(await serverSideTranslations(locale, ['common']))
		}
	};
};

const Home = ({ blocks }) => {
	const { t } = useTranslation();
	const [isQRVisible, toggleIsQRVisible] = useToggle(false);
	const [bodySize, setBodySize] = useState(50);
	const [eyes, setEyes] = useState(0);
	const [hands, setHands] = useState(0);
	const [legs, setLegs] = useState(0);
	const [color, setColor] = useState('#f44336');
	const [greenColor, setGreenColor] = useState('#009688');

	const [amount, setAmount] = useState(0);
	const [message, setMessage] = useState('-');
	const [namespace, setNamespace] = useState(0);

	const getFormattedBodySize = () => bodySize / 100;

	const launchSSS = () => {
		toast.error(t('Not implemented'));
	}

	useEffect(() => {
		const message = [bodySize, eyes, hands, legs, color, greenColor].join(',');
		setMessage(message);
	}, [bodySize, eyes, hands, legs, color, greenColor])

	return (
		<div className={styles.wrapper}>
			<Head>
				<title>Symbol Tomatina</title>
			</Head>

			<div>
				<div className={styles.hero} id="section-home">
					<div className="layout-flex-col-fields">
						<h1>{'Welcome to\nSymbol Tomatina!'}</h1>
						<h2>{'Create your unique tomato and throw it into someone!'}</h2>
					</div>
				</div>
				<TomatoesBackground className={styles.backgroundTopLeft} />
				<TomatoesBackground className={styles.backgroundBottomLeft} />
				<TomatoesBackground className={styles.backgroundTopRight} />
				<TomatoesBackground className={styles.backgroundBottomRight} />
				<Card className={styles.card}>
					<div className="layout-flex-col">
						<h3>Customize your tomato</h3>
						<div className="layout-flex-row layout-flex-mobile-reverse">

							<div className="layout-flex-col-fields" id="section-create">

								<Field title="Size">
									<Slider value={bodySize} min={30} max={70} onChange={setBodySize} />
								</Field>
								<Field title="Eyes">
									<Slider value={eyes} min={0} max={5} onChange={setEyes} />
								</Field>
								<Field title="Hands">
									<Slider value={hands} min={0} max={4} onChange={setHands} />
								</Field>
								<Field title="Legs">
									<Slider value={legs} min={0} max={3} onChange={setLegs} />
								</Field>
								<Field title="Body">
									<ColorPicker value={color} onChange={setColor} />
								</Field>
								<Field title="Green">
									<ColorPicker value={greenColor} onChange={setGreenColor} />
								</Field>
							</div>
							<TomatoSticker
								className={styles.tomatoSticker}
								bodySize={bodySize}
								eyes={eyes}
								hands={hands}
								legs={legs}
								color={color}
								greenColor={greenColor}
							/>
						</div>
						<Separator />
						<div className="layout-flex-col">
							<div>
								<h3>Grow it</h3>
								<div>To generate your tomato NFT, send transfer transaction with the following fields:</div>
							</div>
							<div className="layout-flex-col-fields">

								<Field title="Address">
									<ValueCopy value={config.ADDRESS} />
								</Field>
								<Field title="Message">
									<ValueCopy value={message} />
								</Field>
								<Field title="Amount">
									<ValueAccountBalance value={amount} />
								</Field>

							</div>
							{/*   */}
							<div className="layout-grid-row">
								<Button text="Transaction QR" iconSrc="/images/icon-qr.png" onClick={toggleIsQRVisible} />
								<Button text="Pay with SSS" iconSrc="/images/icon-sss.png"  className="no-mobile" onClick={launchSSS} />
							</div>
							<Modal isVisible={isQRVisible} onClose={toggleIsQRVisible}>
								<QRCode address={config.ADDRESS} message={message} amount={amount} />
							</Modal>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Home;
