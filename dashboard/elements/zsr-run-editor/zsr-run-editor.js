class zsrRunEditor extends Polymer.Element {
	static get is() {
		return 'zsr-run-editor';
	}

	static get properties() {
		return {
			showingOriginal: {
				type: Boolean,
				value: false
			}
		};
	}

	loadRun(run) {
		this.name = run.name;
		this.category = run.category;
		this.estimate = run.estimate;
		this.console = run.console;
		this.releaseYear = run.releaseYear;
		this.runners = run.runners.map(runner => {
			if (runner) {
				return {name: runner.name, stream: runner.stream};
			}

			return undefined;
		});
		this.coop = run.coop;
		this.discord = run.discord;
		this.srcom = run.srcom;
		this.racetime = run.racetime;
		this.timernotes = run.timernotes;
		this.originalValues = run.originalValues;
		this.pk = run.pk;
	}

	applyChanges() {
		// We have to build a new runners object.
		const runners = [];
		const runnerNameInputs = Polymer.dom(this.$.runners).querySelectorAll('paper-input[label^="Runner"]:not([disabled])');
		const runnerStreamInputs = Polymer.dom(this.$.runners).querySelectorAll('paper-input[label="Twitch Channel"]:not([disabled])');
		for (let i = 0; i < 4; i++) { //adjust this for more runners
			if (runnerNameInputs[i].value || runnerStreamInputs[i].value) {
				runners[i] = {
					name: runnerNameInputs[i].value,
					stream: runnerStreamInputs[i].value
				};
			}
		}

		nodecg.sendMessage('modifyRun', {
			name: this.name,
			category: this.category,
			estimate: this.estimate,
			console: this.console,
			releaseYear: this.releaseYear,
			coop: this.coop,
			discord: this.discord,
			timernotes: this.timernotes,
			srcom: this.srcom,
			racetime: this.racetime,
			runners,
			pk: this.pk
		}, () => {
			this.closest('paper-dialog').close();
		});
	}

	resetRun() {
		nodecg.sendMessage('resetRun', this.pk, () => {
			this.closest('paper-dialog').close();
		});
	}

	calcHide(path, showingOriginal) {
		path = path.split('.');
		const originalPath = path.slice(0);
		originalPath.unshift('originalValues');
		const originalValue = this.get(originalPath);
		const hasOriginal = typeof originalValue !== 'undefined';
		return showingOriginal && hasOriginal;
	}

	showOriginal() {
		this.showingOriginal = true;
	}

	hideOriginal() {
		this.showingOriginal = false;
	}
}

customElements.define(zsrRunEditor.is, zsrRunEditor);
