
let crypto = require('crypto');

import du from './debug-utilities';
const random = global.SixCRM.routes.include('lib', 'random.js');

class MungeUtilities {

	static munge(mungestring){

		du.debug('Munge');

		let random_string = random.createRandomString(20);

		let hash = crypto.createHash('sha1').update(mungestring+random_string).digest('hex');

		return hash;

	}

}

module.exports = MungeUtilities;
