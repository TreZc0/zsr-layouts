(function () {
	const throwIncoming = nodecg.Replicant('interview:throwIncoming');
	const currentLayout = nodecg.Replicant('zsr:currentLayout');

	class zsrThrow extends Polymer.Element {
		static get is() {
			return 'zsr-throw';
		}

		static get properties() {
			return {
				throwIncoming: {
					type: Boolean,
					value: false
				},
				disabled: {
					type: Boolean,
					value: false,
					reflectToAttribute: true
				}
			};
		}

		ready() {
			super.ready();
			throwIncoming.on('change', newVal => {
				this.throwIncoming = newVal;
			});
			currentLayout.on('change', newVal => {
				this.disabled = newVal === 'interview';
			});
		}

		arm() {
			throwIncoming.value = true;
		}

		disarm() {
			throwIncoming.value = false;
		}
	}

	customElements.define(zsrThrow.is, zsrThrow);
})();
