/* global SplitText */
(function () {
	'use strict';

	const twitchPlayer = nodecg.Replicant('twitchPlayer');

	class zsrstreama extends Polymer.Element
	{
	    static get is()
	    {
			return 'zsr-streama';
		}

        static get properties()
        {
			return {};
		}
	    ready()
	    {
	        super.ready();

	        twitchPlayer.on('change', newVal => {

	            this.$.volume.value = newVal.streamAVolume * 100;
				this.$.delay.innerText = newVal.streamADelay / 1000 + " seconds";
				if (newVal.streamADelay > 10000)
					this.$.delay.style.color = "red";
				else if (newVal.streamADelay > 8000)
					this.$.delay.style.color = "#D77D00";
				else this.$.delay.style.color ="green";
				
	            if (newVal.streamAMuted == true) {
	                this.$.mute.style.backgroundColor = "red";
	            }
	            if (newVal.streamAPaused == true) {
					this.$.pause.style.backgroundColor = "red";
					this.$.resume.style.backgroundColor = "lightgrey";
	            }
	            else {
	                this.$.resume.style.backgroundColor = "green";
	            }
	            if (newVal.streamARunning == true) {
	                this.$.pause.style.backgroundColor = "lightgrey";
	            }
	            if (newVal.streamARunning == true && newVal.streamAMuted == false) {
	                this.$.mute.style.backgroundColor = "lightgrey";
	            }
	            if (newVal.streamARunning == false && newVal.streamAMuted == false) {
	                this.$.mute.style.backgroundColor = "white";
	                this.$.pause.style.backgroundColor = "red";
					this.$.resume.style.backgroundColor = "white";
					this.$.refresh.style.backgroundColor = "white";
	            }
	            if (newVal.streamAPaused == true && newVal.streamAMuted == true) {
	                this.$.mute.style.backgroundColor = "lightgrey";
	                this.$.pause.style.backgroundColor = "red";
	                this.$.resume.style.backgroundColor = "white";
	            }

				/*
				if (newVal.streamAURL == "zsrA") {
	                this.$.dropdown.selectedIndex = "1";
	            }
	            if (newVal.streamAURL == "zsrB") {
	                this.$.dropdown.selectedIndex = "2";
	            }
	            if (newVal.streamAURL == "zsrC") {
	                this.$.dropdown.selectedIndex = "3";
				} 
				*/
	        });
	                    
	        
	    }

	    mute() 
        {
	        if (twitchPlayer.value.streamAMuted == false) {
	            twitchPlayer.value.streamAMuted = true;
	        } else if (twitchPlayer.value.streamAMuted == true) {
	            twitchPlayer.value.streamAMuted = false;
	        }
	    }

        volume() 
        {
	        twitchPlayer.value.streamAVolume = this.$.volume.value / 100;
	    }

        pause() 
        {
	        twitchPlayer.value.streamAPaused = true;
	    }

		refresh()
		{
			nodecg.sendMessage("resetTwitchPlayer", { id: 1, forceReset: true });
		}

        resume() 
        {
	        twitchPlayer.value.streamAPaused = false;
	    }

        stream() 
        {
	        twitchPlayer.value.streamAURL = this.$.dropdown.value;
	        console.log("Stream single changed to " + this.$.dropdown.value);
	    }

	}

	customElements.define(zsrstreama.is, zsrstreama);

})();

