(function () {
	'use strict';

	const checklist = nodecg.Replicant('checklist');

	class zsrChecklist extends Polymer.MutableData(Polymer.Element) {
		static get is() {
			return 'zsr-checklist';
		}

		ready() {
			super.ready();
			checklist.on('change', newVal => {
				this.techStationDuties = newVal.techStationDuties;
				this.raceDuties = newVal.raceDuties;
			});

			this._checkboxChanged = this._checkboxChanged.bind(this);
			this.addEventListener('change', this._checkboxChanged);
		}

		_checkboxChanged(e) {
			const target = e.path[0];
			const category = target.getAttribute('category');
			const name = target.innerText.trim();
			checklist.value[category].find(task => {
				if (task.name === name) {
					task.complete = target.checked;
					return true;
				}

				return false;
			});
		}
	}

	customElements.define(zsrChecklist.is, zsrChecklist);
})();
