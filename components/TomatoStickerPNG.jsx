import styles from '@/styles/components/TomatoStickerPNG.module.scss';
import mergeImages from 'merge-images';

import Body from '@/public/images/body/body.png';

import ArmLeft1 from '@/public/images/arm-left/Arm Left_1.png';
import ArmLeft2 from '@/public/images/arm-left/Arm Left_2.png';
import ArmLeft3 from '@/public/images/arm-left/Arm Left_3.png';
import ArmLeft4 from '@/public/images/arm-left/Arm Left_4.png';
import ArmLeft5 from '@/public/images/arm-left/Arm Left_5.png';
import ArmLeft6 from '@/public/images/arm-left/Arm Left_6.png';
import ArmLeft7 from '@/public/images/arm-left/Arm Left_7.png';
import ArmLeft8 from '@/public/images/arm-left/Arm Left_8.png';
import ArmLeft9 from '@/public/images/arm-left/Arm Left_9.png';
import ArmLeft10 from '@/public/images/arm-left/Arm Left_10.png';

import ArmRight1 from '@/public/images/arm-right/Arm Right_1.png';
import ArmRight2 from '@/public/images/arm-right/Arm Right_2.png';
import ArmRight3 from '@/public/images/arm-right/Arm Right_3.png';
import ArmRight4 from '@/public/images/arm-right/Arm Right_4.png';
import ArmRight5 from '@/public/images/arm-right/Arm Right_5.png';
import ArmRight6 from '@/public/images/arm-right/Arm Right_6.png';
import ArmRight7 from '@/public/images/arm-right/Arm Right_7.png';
import ArmRight8 from '@/public/images/arm-right/Arm Right_8.png';
import ArmRight9 from '@/public/images/arm-right/Arm Right_9.png';
import ArmRight10 from '@/public/images/arm-right/Arm Right_10.png';

import Eyes1 from '@/public/images/eyes/Eyes_1.png';
import Eyes2 from '@/public/images/eyes/Eyes_2.png';
import Eyes3 from '@/public/images/eyes/Eyes_3.png';
import Eyes4 from '@/public/images/eyes/Eyes_4.png';
import Eyes5 from '@/public/images/eyes/Eyes_5.png';
import Eyes6 from '@/public/images/eyes/Eyes_6.png';
import Eyes7 from '@/public/images/eyes/Eyes_7.png';
import Eyes8 from '@/public/images/eyes/Eyes_8.png';
import Eyes9 from '@/public/images/eyes/Eyes_9.png';
import Eyes10 from '@/public/images/eyes/Eyes_10.png';
import Eyes11 from '@/public/images/eyes/Eyes_11.png';
import Eyes12 from '@/public/images/eyes/Eyes_12.png';
import Eyes13 from '@/public/images/eyes/Eyes_13.png';
import Eyes14 from '@/public/images/eyes/Eyes_14.png';
import Eyes15 from '@/public/images/eyes/Eyes_15.png';
import Eyes16 from '@/public/images/eyes/Eyes_16.png';
import Eyes17 from '@/public/images/eyes/Eyes_17.png';
import Eyes18 from '@/public/images/eyes/Eyes_18.png';
import Eyes19 from '@/public/images/eyes/Eyes_19.png';
import Eyes20 from '@/public/images/eyes/Eyes_20.png';
import EyesEyepatch from '@/public/images/eyes/eyepatch.png';
import EyesSunglasses from '@/public/images/eyes/sunglasses.png';

import Legs1 from '@/public/images/legs/feet_1.png';
import Legs2 from '@/public/images/legs/feet_2.png';
import Legs3 from '@/public/images/legs/feet_3.png';
import Legs4 from '@/public/images/legs/feet_4.png';
import Legs5 from '@/public/images/legs/feet_5.png';
import Legs6 from '@/public/images/legs/feet_6.png';
import Legs7 from '@/public/images/legs/feet_7.png';
import Legs8 from '@/public/images/legs/feet_8.png';
import Legs9 from '@/public/images/legs/feet_9.png';
import Legs10 from '@/public/images/legs/feet_10.png';
import LegsSkateboard from '@/public/images/legs/skateboard.png';

import Mouth1 from '@/public/images/mouth/Mouth-01.png';
import Mouth2 from '@/public/images/mouth/Mouth-02.png';
import Mouth3 from '@/public/images/mouth/Mouth-03.png';
import Mouth4 from '@/public/images/mouth/Mouth-04.png';
import Mouth5 from '@/public/images/mouth/Mouth-05.png';
import Mouth6 from '@/public/images/mouth/Mouth-06.png';
import Mouth7 from '@/public/images/mouth/Mouth-07.png';
import Mouth8 from '@/public/images/mouth/Mouth-08.png';
import Mouth9 from '@/public/images/mouth/Mouth-09.png';
import Mouth10 from '@/public/images/mouth/Mouth-10.png';
import Mouth11 from '@/public/images/mouth/Mouth-11.png';
import Mouth12 from '@/public/images/mouth/Mouth-12.png';
import Mouth13 from '@/public/images/mouth/Mouth-13.png';
import Mouth14 from '@/public/images/mouth/Mouth-14.png';
import Mouth15 from '@/public/images/mouth/Mouth-15.png';
import Mouth16 from '@/public/images/mouth/Mouth-16.png';
import Mouth17 from '@/public/images/mouth/Mouth-17.png';
import Mouth18 from '@/public/images/mouth/Mouth-18.png';
import Mouth19 from '@/public/images/mouth/Mouth-19.png';
import Mouth20 from '@/public/images/mouth/Mouth-20.png';

import Stem1 from '@/public/images/stem/stem-01.png';
import Stem2 from '@/public/images/stem/stem-02.png';
import Stem3 from '@/public/images/stem/stem-03.png';
import Stem4 from '@/public/images/stem/stem-04.png';
import Stem5 from '@/public/images/stem/stem-05.png';
import Stem6 from '@/public/images/stem/stem-06.png';
import Stem7 from '@/public/images/stem/stem-07.png';
import Stem8 from '@/public/images/stem/stem-08.png';
import Stem9 from '@/public/images/stem/stem-09.png';
import Stem10 from '@/public/images/stem/stem-10.png';


import { useEffect, useState } from 'react';
import { useDataManager } from '@/utils';

const TomatoStickerPNG = ({ armLeft, armRight, eyes, legs, mouth, stem, className }) => {
	const [source, setSource] = useState('');

	const bodyImage = [Body][0];
	const armLeftImage = [
		ArmLeft1,
		ArmLeft2,
		ArmLeft3,
		ArmLeft4,
		ArmLeft5,
		ArmLeft6,
		ArmLeft7,
		ArmLeft8,
		ArmLeft9,
		ArmLeft10
	][armLeft] || ArmLeft1;
	const armRightImage = [
		ArmRight1,
		ArmRight2,
		ArmRight3,
		ArmRight4,
		ArmRight5,
		ArmRight6,
		ArmRight7,
		ArmRight8,
		ArmRight9,
		ArmRight10
	][armRight] || ArmRight1;
	const eyesImage = [
		Eyes1,
		Eyes2,
		Eyes3,
		Eyes4,
		Eyes5,
		Eyes6,
		Eyes7,
		Eyes8,
		Eyes9,
		Eyes10,
		Eyes11,
		Eyes12,
		Eyes13,
		Eyes14,
		Eyes15,
		Eyes16,
		Eyes17,
		Eyes18,
		Eyes19,
		Eyes20,
		EyesEyepatch,
		EyesSunglasses,
	][eyes] || Eyes1;
	const legsImage = [
		Legs1,
		Legs2,
		Legs3,
		Legs4,
		Legs5,
		Legs6,
		Legs7,
		Legs8,
		Legs9,
		Legs10,
		LegsSkateboard,
	][legs] || Legs1;
	const mouthImage = [
		Mouth1,
		Mouth2,
		Mouth3,
		Mouth4,
		Mouth5,
		Mouth6,
		Mouth7,
		Mouth8,
		Mouth9,
		Mouth10,
		Mouth11,
		Mouth12,
		Mouth13,
		Mouth14,
		Mouth15,
		Mouth16,
		Mouth17,
		Mouth18,
		Mouth19,
		Mouth20
	][mouth] || Mouth1;
	const stemImage = [
		Stem1,
		Stem2,
		Stem3,
		Stem4,
		Stem5,
		Stem6,
		Stem7,
		Stem8,
		Stem9,
		Stem10
	][stem] || Stem1;

	const [updateImage, isLoading] = useDataManager(async () => {
		const image = await mergeImages([
			legsImage,
			bodyImage,
			armLeftImage,
			armRightImage,
			eyesImage,
			mouthImage,
			stemImage
		]);
		setSource(image);
	});

	const loadingStyle = !isLoading ? styles.loading : '';
	const extendedClassName = `${className} ${styles.sticker} `;

	useEffect(() => {
		updateImage();
	}, [updateImage, eyes, mouth, legs]);

	return (
		<img src={source} className={extendedClassName} />
	);
};

export default TomatoStickerPNG;
