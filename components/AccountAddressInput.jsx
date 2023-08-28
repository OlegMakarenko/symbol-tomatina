import styles from '@/styles/components/AccountAddressInput.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import TextBox from './TextBox';
import Button from './Button';

const AccountAddressInput = ({ address }) => {
	const [addressInput, setAddressInput] = useState('');
	const t = text => text;

	const submitAddress = () => {
		if (addressInput.length) {
			window.location.href = `/accounts/${addressInput}`;
		}
	};

	useEffect(() => {
		if (address) {
			setAddressInput(address);
		}
	}, [address])

	return (
		<div className={styles.accountAddressInput}>
			<TextBox value={addressInput} placeholder={t('Address')} onChange={setAddressInput} />
			<Button text={t('Show')} onClick={submitAddress}/>
		</div>
	);
};

export default AccountAddressInput;
