import styles from '@/styles/components/TomatoesBackground.module.scss';
import { useTranslation } from 'next-i18next';
import CustomImage from './CustomImage';
import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';

const TomatoesBackground = ({ className }) => {
	const { t } = useTranslation();
	const [animationState, setAnimationState] = useState(new Array(7).fill(false));
	const config = {
		duration: 2000
	}
	const initialPosition = {
		transform: `translate(0vw, 0vh) rotate(0deg)`,
		config
	};


	const items = [
		{
			zIndex: 3,
			rotation: 60,
			top: '0%',
			left: '10%',
			spring: useSpring(animationState[0] ? { transform: `translate(140vw, 0vh) rotate(350deg)` } : initialPosition)
		},
		{
			zIndex: 7,
			rotation: 165,
			top: '13%',
			left: '-8%',
			spring: useSpring(animationState[1] ? { transform: `translate(-100vw, 50vh) rotate(100deg)` } : initialPosition)
		},
		{
			zIndex: 4,
			rotation: -70,
			top: '25%',
			left: '0%',
			spring: useSpring(animationState[2] ? { transform: `translate(100vw, -50vh) rotate(400deg)` } : initialPosition)
		},
		{
			zIndex: 5,
			rotation: 20,
			top: '38%',
			left: '-11%',
			spring: useSpring(animationState[3] ? { transform: `translate(100vw, 100vh) rotate(700deg)` } : initialPosition)
		},
		{
			zIndex: 6,
			rotation: -20,
			top: '53%',
			left: '-1%',
			spring: useSpring(animationState[4] ? { transform: `translate(100vw, 100vh) rotate(100deg)` } : initialPosition)
		},

		{
			zIndex: 1,
			rotation: -106,
			top: '66%',
			left: '-20%',
			spring: useSpring(animationState[5] ? { transform: `translate(100vw, 100vh) rotate(200deg)` } : initialPosition)
		},
		{
			zIndex: 2,
			rotation: 1,
			top: '78%',
			left: '-1%',
			spring: useSpring(animationState[6] ? { transform: `translate(100vw, 100vh) rotate(180deg)` } : initialPosition)
		},
	];

	const handleIntersection = (index) => {
		setAnimationState(oldState => {
			const newState = [...oldState];
			newState[index] = true;

			return newState;
		});

		setTimeout(() => {
			setAnimationState(oldState => {
				const newState = [...oldState];
				newState[index] = false;

				return newState;
			});
		}, 10000);
	}

	return (
		<div className={`${styles.root} ${className}`}>
			{items.map((item, index) => (
				<div
					className={styles.tomato}
					style={{
						zIndex: item.zIndex,
						transform: `rotate(${item.rotation}deg)`,
						top: item.top,
						left: item.left
					}}
					key={'tomato' + index}
					onMouseEnter={() => handleIntersection(index)}
				>
					<animated.img
						src="/images/art-tomato-2.png"
						alt="Tomato"
						className={styles.image}
						style={item.spring}
					/>
				</div>
			))}

		</div>
	);
};

export default TomatoesBackground;
