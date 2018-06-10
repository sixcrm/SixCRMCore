
import * as _ from 'lodash';
const serverless = require('serverless');
import du from './debug-utilities';
import eu from './error-utilities';

du.info(serverless);


//Technical Debt: Finish this.
class ServerlessUtilities {

	static loadConfig(stage, handler){

		let serverless_config = global.SixCRM.routes.include('root','serverless.yml');

		if(!_.has(serverless_config, 'functions') || !_.has(serverless_config.functions, handler)){
			throw eu.getError('server','The function "'+handler+'" is not defined in the serverless.yml file.');
		}

		let function_config = serverless_config.functions[handler];

		if(_.has(function_config, 'environment')){

			for(var k in function_config.environment){

				du.debug(k, function_config.environment[k]);

			}

		}

	}

}

module.exports = ServerlessUtilities;
