import * as _ from 'lodash';
import du from './util/debug-utilities';
import Routes from './routes';
import Configuration from './Configuration';
import LocalCache from './LocalCache';
import * as ajv from './controllers/providers/ajv-provider';
import arrayutilities from './util/array-utilities';
import eu from './util/error-utilities';

class SixCRM {

	routes: Routes;
	_resources: Map<string, any>;
	configuration: Configuration;
	localcache: LocalCache;
	validator: ajv;

	constructor() {

		this.routes = new Routes();
		this._resources = new Map();

		this.configuration = new Configuration(this.routes);
		this.localcache = new LocalCache();
		this.validator = ajv;
	}

	setResource(identifer, resource) {

		this._resources[identifer] = resource;

	}

	getResource(identifier) {

		return this._resources[identifier];

	}

	validate(data, path_to_model, fatal = true) {
		du.debug('Validate');
		du.debug('Validation Object: ', data);
		du.debug(`Validation Model: ${path_to_model}`);

		const schema = require(path_to_model);
		const valid = this.validator.validate(schema.$id, data);

		du.debug(`Model is ${valid ? 'valid' : 'not valid'}.`);

		if (fatal && !valid) {
			const errors = this.validator.errors;
			const error_messages = arrayutilities.map(errors, error => `[${schema.title}] instance${error.dataPath} ${error.message}`);
			const error_message = arrayutilities.compress(error_messages, ', ', '');

			du.warning({
				valid,
				errors,
				root: schema.title,
			});

			throw eu.getError(
				'server',
				`One or more validation errors occurred: ${error_message}`,
				{issues: errors.map(e => e.message)}
			);
		}

		return valid;
	}

}

if (!global.SixCRM) {
	global.SixCRM = new SixCRM();
}

process.on('unhandledRejection', (error, promise) => {
	du.fatal("Unhandled promise rejection", error, promise);
	throw error;
});
