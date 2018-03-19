/* global SplitText */



(function () {
	'use strict';

	var nowPlaying = nodecg.Replicant('musicBreak');

	class zsrmusic extends Polymer.Element
	{
	    static get is()
	    {
			return 'zsr-music';
		}

        static get properties()
        {
			return {};
		}

		ready() 
		{
			super.ready();
		
			nowPlaying.on('change', newVal => {
				if (newVal.isPlaying == false) {
					this.$.boff.style.backgroundColor = "green";
					this.$.bon.style.backgroundColor = "red";
				} 
				else if (newVal.isPlaying == true) {
					this.$.boff.style.backgroundColor = "red";
					this.$.bon.style.backgroundColor = "green";
				}
			})}
		off() {
			nowPlaying.value.isPlaying = false;
		}

		on() {
			nowPlaying.value.isPlaying = true;
		}
		
		volume() {
			nowPlaying.value.volume = this.$.volume.value/100;
		}
		

	}
	customElements.define(zsrmusic.is, zsrmusic);
})();
