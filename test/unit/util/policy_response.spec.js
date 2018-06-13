let PolicyResponse = global.SixCRM.routes.include('lib', 'policy_response.js');
let chai = require('chai');
let expect = chai.expect;

const anyPrincipalId = 'user';
const anyEffect = 'effect';
const anyResource = 'resource';
const anyUser = 'user';

describe('lib/policy_response', () => {
	describe('policy_response', () => {

		it('should generate a policy', () => {
			// given
			const aPrincipalId = anyPrincipalId;
			const anEffect = anyEffect;
			const aResource = anyResource;
			const aUser = anyUser;
			const expectedResponse = anyPolicyResponse();

			// when
			const generatedPolicy = PolicyResponse.generatePolicy(aPrincipalId, anEffect, aResource, aUser);

			// then
			expect(generatedPolicy).to.deep.equal(expectedResponse);
		});

		it('should generate a policy without a policy document when effect and resource are undefined', () => {
			// given
			const aPrincipalId = anyPrincipalId;
			let anEffect;
			let aResource;
			const aUser = anyUser;
			const expectedResponse = anyPolicyResponseWithoutPolicyDocument();

			// when
			const generatedPolicy = PolicyResponse.generatePolicy(aPrincipalId, anEffect, aResource, aUser);

			// then
			expect(generatedPolicy).to.deep.equal(expectedResponse);
		});

	});

	function anyPolicyResponse() {
		return {
			principalId: anyPrincipalId,
			policyDocument: {
				Version: '2012-10-17',
				Statement: [{
					Action: "execute-api:Invoke",
					Effect: anyEffect,
					Resource: anyResource
				}]
			},
			context: {
				user: anyUser
			}
		};
	}

	function anyPolicyResponseWithoutPolicyDocument() {
		return {
			principalId: anyPrincipalId,
			context: {
				user: anyUser
			}
		};
	}
});
