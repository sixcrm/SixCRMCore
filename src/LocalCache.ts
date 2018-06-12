import * as _ from 'lodash';
import du from './util/debug-utilities';
import eu from './util/error-utilities';

// Technical Debt:  This is largely unused...
export default class LocalCache {

	cache: Map<string, any>;

	constructor() {

		this.clear('all');
		this.cache = new Map();

	}

	resolveQuestion(question, answer_function) {

		du.debug('Resolve Question');

		const answer = this.get(question);

		du.debug('Asking: ' + question);

		if (_.isNull(answer)) {

			du.debug('Executing Answer Function');

			if (!_.isFunction(answer_function)) {
				throw eu.getError('server', 'Answer function must be a function');
			}

			return Promise.resolve(answer_function()).then((innerAnswer) => {

				global.SixCRM.localcache.set(question, innerAnswer);

				du.debug('Caching Question: ' + question, innerAnswer);

				return innerAnswer;

			});

		} else {

			du.debug('Returning existing answer.');

			return Promise.resolve(answer);

		}

	}

	get(key) {

		du.debug('Get');

		if (!_.isString(key)) {
			throw eu.getError('server', 'Key should be a string');
		}

		if (_.has(this.cache, key)) {

			return this.cache[key];

		}

		return null;

	}

	set(key, value) {

		du.debug('Set');

		if (!_.isString(key)) {
			throw eu.getError('server', 'Key should be a string');
		}

		if (_.has(this.cache, key) && _.isNull(value)) {

			this.clear(key);

		} else {

			if (!_.isNull(value)) {

				this.cache[key] = value;

			}

		}

		return true;

	}

	clear(key) {

		du.debug('Clear');

		if (_.isUndefined(key)) {
			key = 'all';
		}

		if (!_.isString(key)) {
			throw eu.getError('server', 'Key should be a string');
		}

		if (key === 'all') {
			this.cache = new Map();
		} else {
			delete this.cache[key];
		}

	}

}
