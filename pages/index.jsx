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

const Home = ({ }) => {
	const t = text => text;
	const [isQRVisible, toggleIsQRVisible] = useToggle(false);
	const [supply, setSupply] = useState(1);
	const [armLeft, setArmLeft] = useState(0);
	const [armRight, setArmRight] = useState(0);
	const [eyes, setEyes] = useState(0);
	const [legs, setLegs] = useState(0);
	const [mouth, setMouth] = useState(0);
	const [stem, setStem] = useState(0);
	const [message, setMessage] = useState('-');

	const isPremium = true;
	const sliderIcon = '';
	const armLeftMax = isPremium ? 9 : 9;
	const armRightMax = isPremium ? 9 : 9;
	const eyesMax = isPremium ? 21 : 19;
	const legsMax = isPremium ? 10 : 9;
	const mouthMax = isPremium ? 19 : 19;
	const stemMax  = isPremium ? 9 : 9;

	const launchSSS = async () => {
		if (!window.SSS) {
			toast.error(t('SSS Extension is not installed in your browser or is blocked for this site'));
			return;
		}
		try {
			await sendWithSSS(config.ADDRESS, config.PRICE, message);
			toast.info('Transaction announced. Awaiting confirmation');
		}
		catch (error) {
			toast.error(error.message);
		}
	}

	useEffect(() => {
		if (armLeft > armLeftMax) setArmLeft(armLeftMax);
		if (armRight > armRightMax) setArmRight(armRightMax);
		if (eyes > eyesMax) setEyes(eyesMax);
		if (legs > legsMax) setLegs(legsMax);
		if (mouth > mouthMax) setMouth(mouthMax);
		if (stem > stemMax) setStem(stemMax);
	}, [supply]);

	useEffect(() => {
		const message = [armLeft, armRight, eyes, legs, mouth, stem].join(',');
		setMessage(message);
	}, [armLeft, armRight, eyes, legs, mouth, stem])

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
				<div className="layout-flex-col">
					<Card className={styles.card}>
						<div className="layout-flex-col">
							<h3>Customize your tomato</h3>
							<div className="layout-flex-row layout-flex-mobile-reverse">
								<div className={`layout-flex-col-fields ${styles.controls}`}>
									{/* <Field title="Quantity">
										<div className="layout-flex-row">
											<Button
												iconSrc="/images/icon-crown.png"
												text="1"
												isActive={supply === 1}
												onClick={() => setSupply(1)}
											/>
											<Button
												text="5"
												isActive={supply === 5}
												onClick={() => setSupply(5)}
											/>
											<Button
												text="10"
												isActive={supply === 10}
												onClick={() => setSupply(10)}
											/>
											<Button
												text="15"
												isActive={supply === 20}
												onClick={() => setSupply(20)}
											/>
										</div>
									</Field> */}
									<Field title="Left Arm">
										<Slider
											value={armLeft}
											min={0}
											max={armLeftMax}
											imageSrc={sliderIcon}
											onChange={setArmLeft}
										/>
									</Field>
									<Field title="Right Arm">
										<Slider
											value={armRight}
											min={0}
											max={armRightMax}
											imageSrc={sliderIcon}
											onChange={setArmRight}
										/>
									</Field>
									<Field title="Eyes">
										<Slider
											value={eyes}
											min={0}
											max={eyesMax}
											imageSrc={sliderIcon}
											onChange={setEyes}
										/>
									</Field>
									<Field title="Legs">
										<Slider
											value={legs}
											min={0}
											max={legsMax}
											imageSrc={sliderIcon}
											onChange={setLegs}
										/>
									</Field>
									<Field title="Mouth">
										<Slider
											value={mouth}
											min={0}
											max={mouthMax}
											imageSrc={sliderIcon}
											onChange={setMouth}
										/>
									</Field>
									<Field title="Stem">
										<Slider
											value={stem}
											min={0}
											max={stemMax}
											imageSrc={sliderIcon}
											onChange={setStem}
										/>
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
										<ValueAccountBalance value={config.PRICE} />
									</Field>

								</div>
								<div className="layout-grid-row">
									<Button text="Transaction QR" iconSrc="/images/icon-qr.png" onClick={toggleIsQRVisible} />
									<Button text="Pay with SSS" iconSrc="/images/icon-sss.png"  className="no-mobile" onClick={launchSSS} />
								</div>
								<Modal isVisible={isQRVisible} onClose={toggleIsQRVisible}>
									<QRCode address={config.ADDRESS} message={message} amount={config.PRICE} />
								</Modal>
							</div>
						</div>
					</Card>
					<Card className={styles.card}>
						<div className="layout-flex-col">
							<h3>Check Account Activity</h3>
							<AccountAddressInput />
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Home;
