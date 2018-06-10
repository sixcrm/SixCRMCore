import * as lodash from 'lodash';
import du from './debug-utilities';
const numberutilities = global.SixCRM.routes.include('lib', 'number-utilities.js');
import stringutilities from './string-utilities';

export default class CurrencyUtilities {

	static toCurrency(value: string | number, fatal: boolean = false){

		du.debug('To Currency');

		if(numberutilities.isNumber(value, fatal)){
			return (value as number).toFixed(2);
		}

		if(stringutilities.isNumeric(value, fatal)){

			let number = parseFloat(value as string);

			return number.toFixed(2);
		}

		return null;

	}

	static toCurrencyString(value: string | number, fatal: boolean = false){

		du.debug('To Currency String');

		return '$'+this.toCurrency(value, fatal);

	}

}
