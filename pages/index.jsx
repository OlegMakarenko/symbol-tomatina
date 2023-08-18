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
import { useToggle } from '@/utils';
import { toast } from 'react-toastify';
import TomatoesBackground from '@/components/TomatoesBackground';
import TomatoStickerPNG from '@/components/TomatoStickerPNG';

const Home = ({ }) => {
	const t = text => text;
	const [isQRVisible, toggleIsQRVisible] = useToggle(false);
	const [armLeft, setArmLeft] = useState(0);
	const [armRight, setArmRight] = useState(0);
	const [eyes, setEyes] = useState(0);
	const [legs, setLegs] = useState(0);
	const [mouth, setMouth] = useState(0);
	const [stem, setStem] = useState(0);
	const [color, setColor] = useState('#f44336');
	const [greenColor, setGreenColor] = useState('#009688');

	const [amount, setAmount] = useState(0);
	const [message, setMessage] = useState('-');
	const [namespace, setNamespace] = useState(0);

	const launchSSS = () => {
		toast.error(t('Not implemented'));
	}

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
				<Card className={styles.card}>
					<div className="layout-flex-col">
						<h3>Customize your tomato</h3>
						<div className="layout-flex-row layout-flex-mobile-reverse">
							<div className={`layout-flex-col-fields ${styles.controls}`}>
								<Field title="Left Arm">
									<Slider value={armLeft} min={0} max={9} onChange={setArmLeft} />
								</Field>
								<Field title="Right Arm">
									<Slider value={armRight} min={0} max={9} onChange={setArmRight} />
								</Field>
								<Field title="Eyes">
									<Slider value={eyes} min={0} max={19} onChange={setEyes} />
								</Field>
								<Field title="Legs">
									<Slider value={legs} min={0} max={9} onChange={setLegs} />
								</Field>
								<Field title="Mouth">
									<Slider value={mouth} min={0} max={19} onChange={setMouth} />
								</Field>
								<Field title="Stem">
									<Slider value={stem} min={0} max={9} onChange={setStem} />
								</Field>

								{/* <Field title="Body">
									<ColorPicker value={color} onChange={setColor} />
								</Field>
								<Field title="Green">
									<ColorPicker value={greenColor} onChange={setGreenColor} />
								</Field> */}
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
