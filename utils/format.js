import config from '@/config';
import { Address, Deadline, UInt64, Mosaic, MosaicId, PlainMessage, TransferTransaction } from 'symbol-sdk';

export const formatDate = (dateStr, translate, showTime = false, showSeconds = false) => {
	const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

	const addZero = num => {
		return 0 <= num && 10 > num ? '0' + num : num + '';
	};

	const dateObj = new Date(dateStr);
	const seconds = addZero(dateObj.getSeconds());
	const minutes = addZero(dateObj.getMinutes());
	const hour = addZero(dateObj.getHours());
	const month = 'function' === typeof translate ? translate('month_' + months[dateObj.getMonth()]) : months[dateObj.getMonth()];
	const day = dateObj.getDate();
	const year = dateObj.getFullYear();

	let formattedDate = `${month} ${day}, ${year}`;

	formattedDate += showTime ? ` • ${hour}:${minutes}` : '';
	formattedDate += showTime && showSeconds ? `:${seconds}` : '';

	return formattedDate;
};

export const createSDKTransferTransaction = (recipientAddress, amount, message) => {
    return TransferTransaction.create(
        Deadline.create(config.EPOCH_ADJUSTMENT),
        Address.createFromRawAddress(recipientAddress),
        [
			new Mosaic(
				new MosaicId(config.NATIVE_MOSAIC_ID),
				UInt64.fromUint(amount * Math.pow(10, config.NATIVE_MOSAIC_DIVISIBILITY))
			)
		],
        PlainMessage.create(message),
        config.NETWORK_TYPE,
        UInt64.fromUint(0.1 * Math.pow(10, config.NATIVE_MOSAIC_DIVISIBILITY))
    );
};
