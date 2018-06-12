import * as _ from 'lodash';
import Chalk from 'chalk';
import * as moment from 'moment';
import * as util from 'util';

enum LogLevel {
	debug,
	info,
	warning,
	error,
	fatal
}

export default class DebugUtilities {

	static SixVerbosityLevels = new Map<LogLevel, number>([
		[LogLevel.debug, 3],
		[LogLevel.info, 2],
		[LogLevel.warning, 1],
		[LogLevel.error, 0],
		[LogLevel.fatal, -1]
	]);

	static Formatters = new Map<LogLevel, (string) => string>([
		[LogLevel.debug, Chalk.grey],
		[LogLevel.info, Chalk.cyan],
		[LogLevel.warning, Chalk.yellow],
		[LogLevel.error, Chalk.bold.red],
		[LogLevel.fatal, Chalk.bold.white.bgRed]
	]);

	static debug(...args) { this.echo(args, LogLevel.debug); }
	static info(...args) { this.echo(args, LogLevel.info); }
	static warning(...args) { this.echo(args, LogLevel.warning); }
	static error(...args) { this.echo(args, LogLevel.error); }
	static fatal(...args) { this.echo(args, LogLevel.fatal); }

	static echo(args: any[], level: LogLevel) {

		if (!this.emit(level)) {
			return;
		}

		if (this.isLocal()) {
			return this.echoLocal(args, level);
		}
		else {
			return this.echoCloudwatch(args, level);
		}

	}

	static isLocal() {

		return (process.env.SIX_DEBUG_LOCAL || process.env.CIRCLECI) ? true : false;

	}

	static emit(level: LogLevel) {

		return process.env.SIX_VERBOSE !== null && process.env.SIX_VERBOSE !== undefined && process.env.SIX_VERBOSE >= this.SixVerbosityLevels[level];

	}

	static echoLocal(args: any[], level: LogLevel) {

		const outputItems: any[] = [];
		args.forEach((arg) => {

			if (_.isObject(arg)) {
				outputItems.push(util.inspect(arg, {depth : null}));
			}
			else {
				outputItems.push(arg);
			}

		});

		if (outputItems.length > 0) {
			let output = outputItems.join('\n');

			output = this.formatForConsole(output, level);
			// eslint-disable-next-line no-console
			// tslint:disable-next-line no-console
			console.log(output);
		}

	}

	static formatForConsole(output: string, level: LogLevel): string {

		return this.Formatters[level](output);

	}

	static echoCloudwatch(args: any[], level: LogLevel) {

		let message = "";
		let context = {};
		let error_code;
		let stack;

		if (_.isString(args[0])) {
			message = args[0];
			context = Array.prototype.slice.call(args, 1);
		}
		else {
			context = args;
		}

		if (_.isError(context[0])) {
			error_code = context[0].code;
			stack = context[0].stack;

			if (!message && context[0].message) {
				message = context[0].message;
			}
		}

		// eslint-disable-next-line no-console
		// tslint:disable-next-line no-console
		console.log(JSON.stringify({
			timestamp: moment().toISOString(),
			message,
			context,
			level,
			error_code,
			stack,
			// class,
			// method
		}));

	}

}
