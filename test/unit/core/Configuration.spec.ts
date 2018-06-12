import * as chai from 'chai';
const expect = chai.expect;
import arrayutilities from '../../../src/util/array-utilities';
import objectutilities from '../../../src/util/object-utilities';
import randomutilities from '../../../src/util/random';
import Configuration from '../../../src/Configuration';
import Routes from '../../../src/routes';

describe('core/Configuration.js', () => {

	describe('getStageDomain', () => {

		it('retrieves site domain', () => {

			let configuration = new Configuration(new Routes());

			configuration.site_config.site.domain = 'furbolg.zoo';
			configuration.stage = 'fuzzy';

			let domain = configuration.getStageDomain();
			expect(domain).to.equal('furbolg.zoo');

		});

		it('returns null', () => {

			let configuration = new Configuration(new Routes());

			delete configuration.site_config.site.domain;

			let domain = configuration.getStageDomain();
			expect(domain).to.equal(null);

		});

	});

	describe('getSubdomainPath', () => {

		it('retrieves the correct domain', () => {

			//Technical Debt:  This fails when production credentials are used (get stage references...)
			let configuration = new Configuration(new Routes());

			configuration.site_config.site.domain = 'furbolg.zoo';
			configuration.stage = 'fuzzy';
			let domain_path = configuration.getSubdomainPath('critters');
			expect(domain_path).to.equal('fuzzy-critters.furbolg.zoo');

		});

		it('retrieves the correct domain (no stage)', () => {

			let configuration = new Configuration(new Routes());

			configuration.site_config.site.domain = 'furbolg.zoo';
			configuration.stage = 'fuzzy';
			configuration.site_config.site.include_stage = false

			let domain_path = configuration.getSubdomainPath('critters');
			expect(domain_path).to.equal('critters.furbolg.zoo');

		});

		it('retrieves the correct domain (undefined stage)', () => {

			let configuration = new Configuration(new Routes());

			configuration.site_config.site.domain = 'furbolg.zoo';
			delete configuration.site_config.site.include_stage;
			configuration.stage = 'fuzzy';
			let domain_path = configuration.getSubdomainPath('critters');
			expect(domain_path).to.equal('critters.furbolg.zoo');

		});

		it('retrieves the correct domain (undefined subdomain)', () => {

			let configuration = new Configuration(new Routes());

			configuration.site_config.site.domain = 'furbolg.zoo';
			configuration.stage = 'fuzzy';
			let domain_path = configuration.getSubdomainPath();
			expect(domain_path).to.equal('furbolg.zoo');

		});

	});

});
