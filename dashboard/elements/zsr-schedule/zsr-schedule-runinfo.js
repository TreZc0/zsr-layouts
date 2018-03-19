class zsrScheduleRuninfo extends Polymer.Element {
	static get is() {
		return 'zsr-schedule-runinfo';
	}

	static get properties() {
		return {
			notes: {
				type: String,
				observer: '_notesChanged'
			},
			label: {
				type: String,
				reflectToAttribute: true
			}
		};
	}

	_notesChanged(newVal) {
		if (newVal) {
			this.$.notes.querySelector('.value').innerHTML = newVal.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
		} else {
			this.$.notes.querySelector('.value').innerHTML = '';
		}
	}

	setRun(run) {
		this.name = run.name;
		this.shortName = run.shortName;
		this.console = run.console;
		this.runners = run.runners;
		this.releaseYear = run.releaseYear;
		this.estimate = run.estimate;
		this.category = run.category;
		this.discord = run.discord;
		this.srcom = run.srcom;
		this.racetime = run.racetime;
		this.order = run.order;
		this.notes = run.notes;
		this.timernotes = run.timernotes;
		this.coop = run.coop;
		this.originalValues = run.originalValues;
	}

	calcName(name) {
		if (name) {
			return name.split('\\n').join(' ');
		}

		return name;
	}

	calcModified(original) {
		return typeof original === 'undefined' || original === null ? '' : 'modified';
	}
}

customElements.define(zsrScheduleRuninfo.is, zsrScheduleRuninfo);
