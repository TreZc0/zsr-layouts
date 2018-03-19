/* global SplitText */


(function () {
	'use strict';
	
	const twitchPlayer = nodecg.Replicant('twitchPlayer');

	class zsrstreamreset extends Polymer.Element
	{
	    static get is()
	    {
			return 'zsr-stream-reset';
		}

        static get properties()
        {
			return {};
		}

		reset() {
			twitchPlayer.value.playerInstanceCreated = false;
			twitchPlayer.value.streamARunning = false;
			twitchPlayer.value.streamBRunning = false;
			twitchPlayer.value.streamCRunning = false;
			twitchPlayer.value.streamDRunning = false;			
			twitchPlayer.value.streamAPaused = false;
			twitchPlayer.value.streamBPaused = false;
			twitchPlayer.value.streamCPaused = false;
			twitchPlayer.value.streamDPaused = false;
		}
	}
	
	customElements.define(zsrstreamreset.is, zsrstreamreset);
})();

