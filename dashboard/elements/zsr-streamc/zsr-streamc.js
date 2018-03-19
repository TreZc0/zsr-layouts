(function () {
	'use strict';

	const twitchPlayer = nodecg.Replicant('twitchPlayer');

	class zsrstreamc extends Polymer.Element
	{
	    static get is()
	    {
			return 'zsr-streamc';
		}

        static get properties()
        {
			return {};
		}
	    ready()
	    {
	        super.ready();

	        twitchPlayer.on('change', newVal => {

	            this.$.volume.value = newVal.streamCVolume * 100;
				this.$.delay.innerText = newVal.streamCDelay / 1000 + " seconds";
				if (newVal.streamCDelay > 10000)
					this.$.delay.style.color = "red";
				else if (newVal.streamCDelay > 8000)
					this.$.delay.style.color = "#D77D00";
				else this.$.delay.style.color ="green";

	            if (newVal.streamCMuted == true) {
	                this.$.mute.style.backgroundColor = "red";
	            }
	            if (newVal.streamCPaused == true) {
					this.$.pause.style.backgroundColor = "red";
					this.$.resume.style.backgroundColor = "lightgrey";
	            }
	            else {
	                this.$.resume.style.backgroundColor = "green";
	            }
	            if (newVal.streamCRunning == true) {
	                this.$.pause.style.backgroundColor = "lightgrey";
	            }
	            if (newVal.streamCRunning == true && newVal.streamCMuted == false) {
	                this.$.mute.style.backgroundColor = "lightgrey";
	            }
	            if (newVal.streamCRunning == false && newVal.streamCMuted == false) {
	                this.$.mute.style.backgroundColor = "white";
	                this.$.pause.style.backgroundColor = "red";
					this.$.resume.style.backgroundColor = "white";
					this.$.refresh.style.backgroundColor = "white";
	            }
	            if (newVal.streamCPaused == true && newVal.streamCMuted == true) {
	                this.$.mute.style.backgroundColor = "lightgrey";
	                this.$.pause.style.backgroundColor = "red";
	                this.$.resume.style.backgroundColor = "white";
	            }
				/*
	            if (newVal.streamCURL == "zsrA") {
	                this.$.dropdown.selectedIndex = "1";
	            }
	            if (newVal.streamCURL == "zsrB") {
	                this.$.dropdown.selectedIndex = "2";
	            }
	            if (newVal.streamCURL == "zsrC") {
	                this.$.dropdown.selectedIndex = "3";
				}
				*/
	        });
	                    
	        
	    }

	    mute() 
        {
	        if (twitchPlayer.value.streamCMuted == false) {
	            twitchPlayer.value.streamCMuted = true;
	        } else if (twitchPlayer.value.streamCMuted == true) {
	            twitchPlayer.value.streamCMuted = false;
	        }
	    }

        volume() 
        {
	        twitchPlayer.value.streamCVolume = this.$.volume.value / 100;
	    }

        pause() 
        {
	        twitchPlayer.value.streamCPaused = true;
	    }

		refresh()
		{
			nodecg.sendMessage("resetTwitchPlayer", { id: 3, forceReset: true });
		}

        resume() 
        {
	        twitchPlayer.value.streamCPaused = false;
	    }

        stream() 
        {
	        twitchPlayer.value.streamCURL = this.$.dropdown.value;
	        console.log("Stream single changed to " + this.$.dropdown.value);
	    }

	}

	customElements.define(zsrstreamc.is, zsrstreamc);

})();

