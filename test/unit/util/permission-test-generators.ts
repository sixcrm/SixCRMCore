import * as _ from 'lodash';
const anyAction = 'someAction';
const anyEntity = 'someEntity';
const anyPermission = `${anyEntity}/${anyAction}`;
const anotherPermission = `${anyEntity}1/${anyAction}1`;

import arrayutilities from '../../../src/util/array-utilities';

export default class PermissionTestGenerators {

	static anyAction() {
		return anyAction;
	}

	static anyEntity() {
		return anyEntity;
	}

	static anyPermission() {
		return anyPermission;
	}

	static anotherPermission() {
		return anotherPermission;
	}

	static givenAnyUser(account = '770cf6af-42c4-4ffd-ba7f-9ee4fcb1084b') {

		const user = {
			id: 'super.user@test.com',
			acl: [{
				account: {
					id: account
				},
				role: {
					permissions: {
						allow: [`${anyEntity}/${anyAction}`]
					}
				}
			}]
		};

		PermissionTestGenerators.setGlobalUser(user);
		return user;
	}

	static setGlobalUser(user) {
		global.user = user;
		global.account = user.acl[0].account.id;
	}

	static givenUserWithNoPermissions(account = 'd26c1887-7ad4-4a44-be0b-e80dbce22774') {

		const user = {
			acl: [{
				account: {
					id: account
				},
				role: {
					permissions: {
						allow: [] as string[],
						deny: [] as string[]
					}
				}
			}],
			id: 'some.user@example.com'
		};

		PermissionTestGenerators.setGlobalUser(user);

		return user;
	}

	static givenUserWithDenied(action, entity, account?: string) {
		const user = PermissionTestGenerators.givenUserWithNoPermissions(account);

		user.acl[0].role.permissions.deny.push(`${entity}/${action}`);
		PermissionTestGenerators.setGlobalUser(user);

		return user;
	}

	static givenUserWithAllowed(action, entity, account?: string) {

		const user = PermissionTestGenerators.givenUserWithNoPermissions(account);

		user.acl[0].role.permissions.allow.push(`${entity}/${action}`);

		PermissionTestGenerators.setGlobalUser(user);

		return user;

	}

	static givenUserWithPermissionArray(permission_objects, account?: string) {

		const user = PermissionTestGenerators.givenUserWithNoPermissions(account);

		arrayutilities.map(permission_objects, (permission_object) => {

			user.acl[0].role.permissions.allow.push(permission_object.object + '/' + permission_object.action);

		});

		PermissionTestGenerators.setGlobalUser(user);

		return user;
	}
}
