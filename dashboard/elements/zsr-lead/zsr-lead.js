/* global SplitText */


 
(function () {
	'use strict';
	
	const audioChannels = nodecg.Replicant('gameAudioChannels');
	const twitchPlayer = nodecg.Replicant('twitchPlayer');

	class zsrlead extends Polymer.Element
	{
	    static get is()
	    {
			return 'zsr-lead';
		}

        static get properties()
        {
			return {};
		}
		ready() 
		{
			super.ready();
		
			twitchPlayer.on('change', newVal => {
				if ((!twitchPlayer.value.streamAMuted) && (!twitchPlayer.value.streamBMuted) && (!twitchPlayer.value.streamCMuted) && (!twitchPlayer.value.streamDMuted)) {
					this.$.leadA.style.backgroundColor = "white";
					this.$.leadB.style.backgroundColor = "white";
					this.$.leadC.style.backgroundColor = "white";
					this.$.leadD.style.backgroundColor = "white";
				} else if (!twitchPlayer.value.streamAMuted) {
					this.$.leadA.style.backgroundColor = "green";
					this.$.leadB.style.backgroundColor = "white";
					this.$.leadC.style.backgroundColor = "white";
					this.$.leadD.style.backgroundColor = "white";
				} else if (!twitchPlayer.value.streamBMuted) {
					this.$.leadA.style.backgroundColor = "white";
					this.$.leadB.style.backgroundColor = "green";
					this.$.leadC.style.backgroundColor = "white";
					this.$.leadD.style.backgroundColor = "white";
				} else if (!twitchPlayer.value.streamCMuted) {
					this.$.leadA.style.backgroundColor = "white";
					this.$.leadB.style.backgroundColor = "white";
					this.$.leadC.style.backgroundColor = "green";
					this.$.leadD.style.backgroundColor = "white";
				} else if (!twichPlayer.value.streamDMuted) {
					this.$.leadA.style.backgroundColor = "white";
					this.$.leadB.style.backgroundColor = "white";
					this.$.leadC.style.backgroundColor = "white";
					this.$.leadD.style.backgroundColor = "green";
				} else {
					this.$.leadA.style.backgroundColor = "white";
					this.$.leadB.style.backgroundColor = "white";
					this.$.leadC.style.backgroundColor = "white";
					this.$.leadD.style.backgroundColor = "white";
				}
			});
		}

		playerA()
		{
		    this.$.leadA.style.backgroundColor = "green";
		    this.$.leadB.style.backgroundColor = "white";
			this.$.leadC.style.backgroundColor = "white";
			this.$.leadD.style.backgroundColor = "white";

		    twitchPlayer.value.streamAMuted = false;
		    twitchPlayer.value.streamBMuted = true;
			twitchPlayer.value.streamCMuted = true;
			twitchPlayer.value.streamDMuted = true;
		}

		playerB()
		{
		    this.$.leadA.style.backgroundColor = "white";
		    this.$.leadB.style.backgroundColor = "green";
			this.$.leadC.style.backgroundColor = "white";
			this.$.leadD.style.backgroundColor = "white";

		    twitchPlayer.value.streamAMuted = true;
		    twitchPlayer.value.streamBMuted = false;
			twitchPlayer.value.streamCMuted = true;
			twitchPlayer.value.streamDMuted = true;
		}
		
		playerC()
		{
		    this.$.leadA.style.backgroundColor = "white";
		    this.$.leadB.style.backgroundColor = "white";
			this.$.leadC.style.backgroundColor = "green";
			this.$.leadD.style.backgroundColor = "white";

		    twitchPlayer.value.streamAMuted = true;
		    twitchPlayer.value.streamBMuted = true;
			twitchPlayer.value.streamCMuted = false;
			twitchPlayer.value.streamDMuted = true;
		}
		
		playerD()
		{
		    this.$.leadA.style.backgroundColor = "white";
		    this.$.leadB.style.backgroundColor = "white";
			this.$.leadC.style.backgroundColor = "white";
			this.$.leadD.style.backgroundColor = "green";

		    twitchPlayer.value.streamAMuted = true;
		    twitchPlayer.value.streamBMuted = true;
			twitchPlayer.value.streamCMuted = true;
			twitchPlayer.value.streamDMuted = false;
		}
		
	}
	customElements.define(zsrlead.is, zsrlead);
})();
