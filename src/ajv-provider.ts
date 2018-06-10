import * as _ from 'lodash';
import * as Ajv from 'ajv';
import glob from 'glob';

const schemas = glob.sync('model/**/*.json')
	.map(filename => require(`${__dirname}/../../${filename}`))
	.filter(schema => !_.isUndefined(schema.$schema));

export default new Ajv({
	format: 'full',
	allErrors: true,
	verbose: true,
	schemas
});
