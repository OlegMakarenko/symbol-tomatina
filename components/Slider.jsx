import styles from '@/styles/components/Slider.module.scss';
import ReactSlider from 'react-slider';
import CustomImage from './CustomImage';

const Slider = ({ min, max, value, imageSrc, onChange }) => {
	return (
		<div className={styles.container}>
			<ReactSlider
				value={value}
				onChange={onChange}
				className={styles.slider}
				marks
				markClassName={styles.mark}
				min={min}
				max={max}
				thumb
				trackClassName={styles.track}
				thumbActiveClassName={styles.thumbActive}
				thumbClassName={styles.thumb}
				renderThumb={(props) => <div {...props}>
					<CustomImage className={styles.thumbIcon} src="/images/control-tomato.svg" />
					<div className={styles.thumbHitSlop} />
				</div>}
			/>
			{!!imageSrc && <CustomImage className={styles.image} src={imageSrc} />}
		</div>
	);
};

export default Slider;
