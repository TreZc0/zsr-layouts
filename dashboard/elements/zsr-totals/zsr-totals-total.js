(function () {
	'use strict';

	class zsrTotalsTotal extends Polymer.Element {
		static get is() {
			return 'zsr-totals-total';
		}

		static get properties() {
			return {
				total: {
					type: String,
					value: '?'
				},
				currency: {
					type: String
				}
			};
		}

		edit() {
			this.dispatchEvent(new CustomEvent('edit', {bubbles: true, composed: true}));
		}

		equal(a, b) {
			return a === b;
		}
	}

	customElements.define(zsrTotalsTotal.is, zsrTotalsTotal);
})();
