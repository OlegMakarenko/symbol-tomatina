import { useEffect } from 'react';
import { useState } from 'react';
import { CirclePicker } from 'react-color';

const ColorPicker = ({ onChange, className }) => {
	const [width, useWidth] = useState();
	const [circleSize, useCircleSize] = useState();
	const [circleSpacing, useCircleSpacing] = useState();
	const handleChange = (value) => onChange(value.hex);

	useEffect(() => {
		setTimeout(() => {
			useWidth('100%');
			useCircleSize('2rem');
			useCircleSpacing('0.41rem');
		});

	}, []);

	return (
		<CirclePicker width={width} circleSize={circleSize} circleSpacing={circleSpacing} className={className} onChange={handleChange}/>
	);
};

export default ColorPicker;
