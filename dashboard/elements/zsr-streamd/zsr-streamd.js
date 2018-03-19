(function () {
	'use strict';

	const twitchPlayer = nodecg.Replicant('twitchPlayer');

	class zsrstreamd extends Polymer.Element
	{
	    static get is()
	    {
			return 'zsr-streamd';
		}

        static get properties()
        {
			return {};
		}
	    ready()
	    {
	        super.ready();

	        twitchPlayer.on('change', newVal => {

				this.$.volume.value = newVal.streamDVolume * 100;
				this.$.delay.innerText = newVal.streamDDelay / 1000 + " seconds";
				if (newVal.streamDDelay > 10000)
					this.$.delay.style.color = "red";
				else if (newVal.streamDDelay > 8000)
					this.$.delay.style.color = "#D77D00";
				else this.$.delay.style.color ="green";

	            if (newVal.streamDMuted == true) {
	                this.$.mute.style.backgroundColor = "red";
	            }
	            if (newVal.streamDPaused == true) {
					this.$.pause.style.backgroundColor = "red";
					this.$.resume.style.backgroundColor = "lightgrey";
	            }
	            else {
	                this.$.resume.style.backgroundColor = "green";
	            }
	            if (newVal.streamDRunning == true) {
	                this.$.pause.style.backgroundColor = "lightgrey";
	            }
	            if (newVal.streamDRunning == true && newVal.streamDMuted == false) {
	                this.$.mute.style.backgroundColor = "lightgrey";
	            }
	            if (newVal.streamDRunning == false && newVal.streamDMuted == false) {
	                this.$.mute.style.backgroundColor = "white";
	                this.$.pause.style.backgroundColor = "red";
					this.$.resume.style.backgroundColor = "white";
					this.$.refresh.style.backgroundColor = "white";
	            }
	            if (newVal.streamDPaused == true && newVal.streamDMuted == true) {
	                this.$.mute.style.backgroundColor = "lightgrey";
	                this.$.pause.style.backgroundColor = "red";
	                this.$.resume.style.backgroundColor = "white";
	            }
				/*
	            if (newVal.streamDURL == "zsrA") {
	                this.$.dropdown.selectedIndex = "1";
	            }
	            if (newVal.streamDURL == "zsrB") {
	                this.$.dropdown.selectedIndex = "2";
	            }
	            if (newVal.streamDURL == "zsrC") {
	                this.$.dropdown.selectedIndex = "3";
				}
				*/
	        });
	                    
	        
	    }

	    mute() 
        {
	        if (twitchPlayer.value.streamDMuted == false) {
	            twitchPlayer.value.streamDMuted = true;
	        } else if (twitchPlayer.value.streamDMuted == true) {
	            twitchPlayer.value.streamDMuted = false;
	        }
	    }

        volume() 
        {
	        twitchPlayer.value.streamDVolume = this.$.volume.value / 100;
	    }

        pause() 
        {
	        twitchPlayer.value.streamDPaused = true;
	    }
		
		refresh()
		{
			nodecg.sendMessage("resetTwitchPlayer", { id: 4, forceReset: true });
		}

        resume() 
        {
	        twitchPlayer.value.streamDPaused = false;
	    }

        stream() 
        {
	        twitchPlayer.value.streamDURL = this.$.dropdown.value;
	        console.log("Stream single changed to " + this.$.dropdown.value);
	    }

	}

	customElements.define(zsrstreamd.is, zsrstreamd);

})();

