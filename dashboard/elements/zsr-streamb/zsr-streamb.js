(function () {
	'use strict';

	const twitchPlayer = nodecg.Replicant('twitchPlayer');

	class zsrstreamb extends Polymer.Element
	{
	    static get is()
	    {
			return 'zsr-streamb';
		}

        static get properties()
        {
			return {};
		}
	    ready()
	    {
	        super.ready();

	        twitchPlayer.on('change', newVal => {

	            this.$.volume.value = newVal.streamBVolume * 100;
				this.$.delay.innerText = newVal.streamBDelay / 1000 + " seconds";
				if (newVal.streamBDelay > 10000)
					this.$.delay.style.color = "red";
				else if (newVal.streamBDelay > 8000)
					this.$.delay.style.color = "#D77D00";
				else this.$.delay.style.color ="green";
	            if (newVal.streamBMuted == true) {
	                this.$.mute.style.backgroundColor = "red";
	            }
	            if (newVal.streamBPaused == true) {
					this.$.pause.style.backgroundColor = "red";
					this.$.resume.style.backgroundColor = "lightgrey";
	            }
	            else {
	                this.$.resume.style.backgroundColor = "green";
	            }
	            if (newVal.streamBRunning == true) {
	                this.$.pause.style.backgroundColor = "lightgrey";
	            }
	            if (newVal.streamBRunning == true && newVal.streamBMuted == false) {
	                this.$.mute.style.backgroundColor = "lightgrey";
	            }
	            if (newVal.streamBRunning == false && newVal.streamBMuted == false) {
	                this.$.mute.style.backgroundColor = "white";
	                this.$.pause.style.backgroundColor = "red";
					this.$.resume.style.backgroundColor = "white";
					this.$.refresh.style.backgroundColor = "white";
	            }
	            if (newVal.streamBPaused == true && newVal.streamBMuted == true) {
	                this.$.mute.style.backgroundColor = "lightgrey";
	                this.$.pause.style.backgroundColor = "red";
	                this.$.resume.style.backgroundColor = "white";
	            }
				/*
	            if (newVal.streamBURL == "zsrA") {
	                this.$.dropdown.selectedIndex = "1";
	            }
	            if (newVal.streamBURL == "zsrB") {
	                this.$.dropdown.selectedIndex = "2";
	            }
	            if (newVal.streamBURL == "zsrC") {
	                this.$.dropdown.selectedIndex = "3";
				}
				*/
	        });
	                    
	        
	    }

	    mute() 
        {
	        if (twitchPlayer.value.streamBMuted == false) {
	            twitchPlayer.value.streamBMuted = true;
	        } else if (twitchPlayer.value.streamBMuted == true) {
	            twitchPlayer.value.streamBMuted = false;
	        }
	    }

        volume() 
        {
	        twitchPlayer.value.streamBVolume = this.$.volume.value / 100;
	    }

        pause() 
        {
	        twitchPlayer.value.streamBPaused = true;
	    }

		refresh()
		{
			nodecg.sendMessage("resetTwitchPlayer", { id: 2, forceReset: true });
		}

        resume() 
        {
	        twitchPlayer.value.streamBPaused = false;
	    }

        stream() 
        {
	        twitchPlayer.value.streamBURL = this.$.dropdown.value;
	        console.log("Stream single changed to " + this.$.dropdown.value);
	    }

	}

	customElements.define(zsrstreamb.is, zsrstreamb);

})();

