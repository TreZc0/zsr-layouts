/* global SplitText */
(function () {
	'use strict';

	const leaderboard = nodecg.Replicant('leaderboard');
	const runners = nodecg.Replicant('runners');

	class ZsrIrc extends Polymer.Element
	{
	    static get is()
	    {
			return 'zsr-irc';
		}

        static get properties()
        {
			return {};
		}
	    ready()
	    {
	        super.ready();	                          
	    }

	    _setRaceID() 
	    {
	        leaderboard.value.ranking.length = 0;
	        leaderboard.value.raceID = this.$.srlID.value;
	    }

        _importRunners() 
        {
            nodecg.sendMessage('suspendRunnerUpdates');
            nodecg.sendMessage('importRunnersFromSRL', this.$.srlID.value);
	    }
		
		_clear() 
        {
			leaderboard.value.raceID = '';
			this.$.srlID.value = '';
			nodecg.sendMessage('suspendRunnerUpdates');

			runners.value.length = 0;
	    }
	}

	customElements.define(ZsrIrc.is, ZsrIrc);

})();

