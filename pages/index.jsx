import styles from '@/styles/pages/Home.module.scss';
import Head from 'next/head';
import Card from '@/components/Card';
import Field from '@/components/Field';
import Separator from '@/components/Separator';
import Slider from '@/components/Slider';
import { useEffect, useState } from 'react';
import ValueAccountBalance from '@/components/ValueAccountBalance';
import ValueCopy from '@/components/ValueCopy';
import config from '@/config';
import QRCode from '@/components/QRCode';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { sendWithSSS, useToggle } from '@/utils';
import { toast } from 'react-toastify';
import TomatoesBackground from '@/components/TomatoesBackground';
import TomatoStickerPNG from '@/components/TomatoStickerPNG';
import AccountAddressInput from '@/components/AccountAddressInput';

const Home = ({}) => {
	const t = text => text;
	const [isQRVisible, toggleIsQRVisible] = useToggle(false);
	const [armLeft, setArmLeft] = useState(0);
	const [armRight, setArmRight] = useState(0);
	const [eyes, setEyes] = useState(0);
	const [legs, setLegs] = useState(0);
	const [mouth, setMouth] = useState(0);
	const [stem, setStem] = useState(0);
	const [message, setMessage] = useState('-');

	const launchSSS = async () => {
		if (!window.SSS) {
			toast.error(t('SSS Extension is not installed in your browser or is blocked for this site'));
			return;
		}
		try {
			await sendWithSSS(config.ADDRESS, config.PRICE, message);
			toast.info('Transaction announced. Awaiting confirmation');
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		const message = [armLeft, armRight, eyes, legs, mouth, stem].join(',');
		setMessage(message);
	}, [armLeft, armRight, eyes, legs, mouth, stem]);

	return (
		<div className={styles.wrapper}>
			<Head>
				<title>Symbol Tomatina</title>
			</Head>

			<div>
				<div className={styles.hero} id="section-home">
					<div className="layout-flex-col-fields">
						<h1>{t('Welcome to\nSymbol Tomatina!')}</h1>
						<h2>{t('Create your unique tomato and throw it into someone!')}</h2>
					</div>
				</div>
				<TomatoesBackground className={styles.backgroundTopLeft} />
				<TomatoesBackground className={styles.backgroundBottomLeft} />
				<TomatoesBackground className={styles.backgroundTopRight} />
				<TomatoesBackground className={styles.backgroundBottomRight} />
				<div className="layout-flex-col">
					<Card className={styles.card}>
						<div className="layout-flex-col">
							<h3>{t('Customize your tomato')}</h3>
							<div className="layout-flex-row layout-flex-mobile-reverse">
								<div className={`layout-flex-col-fields ${styles.controls}`}>
									<Field title={t('Left Arm')}>
										<Slider value={armLeft} min={0} max={9} onChange={setArmLeft} />
									</Field>
									<Field title={t('Right Arm')}>
										<Slider value={armRight} min={0} max={9} onChange={setArmRight} />
									</Field>
									<Field title={t('Eyes')}>
										<Slider value={eyes} min={0} max={21} onChange={setEyes} />
									</Field>
									<Field title={t('Legs')}>
										<Slider value={legs} min={0} max={10} onChange={setLegs} />
									</Field>
									<Field title={t('Mouth')}>
										<Slider value={mouth} min={0} max={19} onChange={setMouth} />
									</Field>
									<Field title={t('Stem')}>
										<Slider value={stem} min={0} max={9} onChange={setStem} />
									</Field>
								</div>
								<TomatoStickerPNG
									className={styles.tomatoSticker}
									armLeft={armLeft}
									armRight={armRight}
									eyes={eyes}
									legs={legs}
									mouth={mouth}
									stem={stem}
								/>
							</div>
							<Separator />
							<div className="layout-flex-col">
								<div>
									<h3>{t('Grow it')}</h3>
									<div>{t('To generate your tomato NFT, send transfer transaction with the following fields:')}</div>
								</div>
								<div className="layout-flex-col-fields">
									<Field title={t('Address')}>
										<ValueCopy value={config.ADDRESS} />
									</Field>
									<Field title={t('Message')}>
										<ValueCopy value={message} />
									</Field>
									<Field title={t('Amount')}>
										<ValueAccountBalance value={config.PRICE} />
									</Field>
								</div>
								<div className="layout-grid-row">
									<Button text={t('Transaction QR')} iconSrc="/images/icon-qr.png" onClick={toggleIsQRVisible} />
									<Button
										text={t('Pay with SSS')}
										iconSrc="/images/icon-sss.png"
										className="no-mobile"
										onClick={launchSSS}
									/>
								</div>
								<Modal isVisible={isQRVisible} onClose={toggleIsQRVisible}>
									<QRCode address={config.ADDRESS} message={message} amount={config.PRICE} />
								</Modal>
							</div>
						</div>
					</Card>
					<Card className={styles.card}>
						<div className="layout-flex-col">
							<h3>{t('Check Account Activity')}</h3>
							<AccountAddressInput />
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Home;
