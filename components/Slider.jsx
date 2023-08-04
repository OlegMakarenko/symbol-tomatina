import styles from '@/styles/components/Slider.module.scss';
import ReactSlider from 'react-slider';
import CustomImage from './CustomImage';

const Slider = ({ min, max, value, onChange }) => {
	return (
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
	);
};

export default Slider;
