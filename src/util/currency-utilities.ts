import * as _ from 'lodash';
import du from './debug-utilities';
import numberutilities from './number-utilities';
import stringutilities from './string-utilities';

export default class CurrencyUtilities {

	static toCurrency(value: string | number, fatal: boolean = false) {

		du.debug('To Currency');

		if (numberutilities.isNumber(value, fatal)) {
			return (value as number).toFixed(2);
		}

		if (stringutilities.isNumeric(value, fatal)) {

			const number = parseFloat(value as string);

			return number.toFixed(2);
		}

		return null;

	}

	static toCurrencyString(value: string | number, fatal: boolean = false) {

		du.debug('To Currency String');

		return '$' + this.toCurrency(value, fatal);

	}

}
