
import * as lodash from 'lodash';
const xml2js = require('xml2js');
import du from './debug-utilities';
import eu from './error-utilities';

module.exports = class XMLUtilities {

	static parse(xml_string, fatal){

		let error = null;
		let json = null;

		fatal = (_.isUndefined(fatal))?false:fatal;

		try {

			xml2js.parseString(xml_string, function (innerError, innerJson) {

				if(!_.isUndefined(innerError)){
					error = innerError;
				}

				if(!_.isUndefined(innerJson)){
					json = innerJson;
				}

			});

		}catch(a_error){

			error = a_error;

		}

		if(!_.isNull(error)){

			du.error(error);
			if(fatal){
				throw eu.getError(error);
			}

		}

		if (!error && !json) {
			throw eu.getError('server', 'The callback was suddenly async or something.');
		}

		return json;

	}

}
