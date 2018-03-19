/* global SplitText */
(function () {
	'use strict';


	class Layoutreload extends Polymer.Element
	{
	    static get is()
	    {
			return 'layout-reload';
		}

        static get properties()
        {
			return {};
		}
	    ready()
	    {
	        super.ready();	                          
	    }

	    _reload() 
	    {
			nodecg.sendMessage("askReloadLayoutConfig");
	    }
		
	}

	customElements.define(Layoutreload.is, Layoutreload);

})();

