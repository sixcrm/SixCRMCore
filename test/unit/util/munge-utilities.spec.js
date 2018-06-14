import * as chai from 'chai';
const expect = chai.expect;
const mockery = require('mockery');

describe('lib/munge-utilities', () => {

	before(() => {
		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});
	});

	afterEach(() => {
		mockery.resetCache();
	});

	after(() => {
		mockery.deregisterAll();
	});

	it('checks whether transformed data is a string', () => {

		const mungeUtilities = require('../../../lib/util/munge-utilities');

		expect(mungeUtilities.munge('a_munge_string')).to.be.a('string');

	});

	it('checks whether data transformation was successful', () => {

		mockery.registerMock('../../../lib/util/random', {
			createRandomString: () => {
				return 'a_random_string';
			}
		});

		const mungeUtilities = require('../../../lib/util/munge-utilities');

		const hash = mungeUtilities.munge('a_munge_string');

		expect(hash).to.equal('ffc92c3dab6a3b5208af3bbfc7cdaa5d17eab59f');

	});
});
