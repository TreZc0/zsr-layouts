/* global SplitText */
(function () {
	'use strict';

	const betting = nodecg.Replicant('betting', 'lfg-siphon');

	class Bettingsystem extends Polymer.Element
	{
	    static get is()
	    {
			return 'betting-system';
		}

        static get properties()
        {
			return {};
		}
	    ready()
	    {
	        super.ready();	                          
	    }

	    _open() 
	    {
			console.log("Betting opened! Topic:" + this.$.betTopic.value);
	        betting.value.premiumBets.length = 0;
			betting.value.otherBets.length = 0;
	        betting.value.topic = this.$.betTopic.value;
			nodecg.sendMessage('bettingOpen', this.$.betTopic.value);
	    }

        _close() 
        {
			nodecg.sendMessage('bettingClose');	
	    }
		
		_clear() 
        {
	        betting.value.premiumBets.length = 0;
			betting.value.otherBets.length = 0;
			nodecg.sendMessage('bettingClear');
	    }
	}

	customElements.define(Bettingsystem.is, Bettingsystem);

})();

