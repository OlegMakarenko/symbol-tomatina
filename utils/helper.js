import config from "@/config";
import { requestSign, setTransaction } from "sss-module";
import { Address, Deadline, Mosaic, MosaicId, PlainMessage, RepositoryFactoryHttp, TransactionHttp, TransactionType, TransferTransaction, UInt64 } from "symbol-sdk";

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

export const copyToClipboard = async text => {
	if (navigator.clipboard) {
		return navigator.clipboard.writeText(text);
	}

	const textArea = document.createElement('textarea');
	let success = false;

	textArea.value = text;
	textArea.style.top = '0';
	textArea.style.left = '0';
	textArea.style.position = 'fixed';
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		success = document.execCommand('copy');
	} catch {}

	document.body.removeChild(textArea);

	if (!success) {
		throw Error('Failed to copy to clipboard');
	}
};

export const trunc = (str, type, length = 5) => {
	const trunc = (text, cut, lengthFirst, lengthSecond) => {
		if (cut === 'start' && lengthFirst < text.length) {
			return '...' + text.substring(text.length - lengthFirst, text.length);
		}
		if (cut === 'middle' && lengthFirst + lengthSecond < text.length) {
			return text.substring(0, lengthFirst) + '...' + text.substring(text.length - lengthSecond, text.length);
		}
		if (cut === 'end' && lengthFirst < text.length) {
			return text.substring(0, lengthFirst) + '...';
		}

		return text;
	};

	if (typeof str !== 'string') {
		return '';
	}

	switch (type) {
		case 'address':
			return trunc(str, 'middle', 6, 3);
		case 'address-short':
			return trunc(str, 'start', 3);
		case 'address-long':
			return trunc(str, 'middle', 12, 12);
		case 'contact':
			return trunc(str, 'end', 18);
		case 'contact-short':
			return trunc(str, 'end', 12);
		case 'hash':
			return trunc(str, 'middle', 4, 4);
		case 'mosaicId':
			return trunc(str, 'middle', 6, 6);
		case 'namespaceName':
			return trunc(str, 'middle', 10, 10);
		default:
			return trunc(str, 'end', length);
	}
};

export const getRouteParam = () => {
	const { pathname } = window.location;
	const destructedPathName = pathname.slice(1).split('/');

	return destructedPathName.pop();
}

export const isAddressValid = (rawAddress) => {
    try {
        return Address.createFromRawAddress(rawAddress) && true;
    }
    catch {
        return false;
    }
};

export const getMosaicRelativeAmountString = (absoluteAmount, divisibility) => {
    if (divisibility === 0) {
        return absoluteAmount;
    }

    const array = absoluteAmount.split('');
    array.splice(absoluteAmount.length - divisibility, 0, '.');

    return array.join('');
};
