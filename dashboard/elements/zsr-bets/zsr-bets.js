(function () {
    'use strict';

	const betting = nodecg.Replicant('betting', 'lfg-siphon');
    var winning;
    var winningsplit;
    var premiumname;
    var premiumbet;
    var othername;
    var otherbet;

    class Zsrbets extends Polymer.MutableData(Polymer.Element) {
        static get is() {
            return 'zsr-bets';
        }

        ready()
        {
            super.ready();

            const replicants = 
            [
                betting
            ];

            let numDeclared = 0;
            replicants.forEach(replicant => {
                replicant.once('change', () => {
                    numDeclared++;

                    // Start the loop once all replicants are declared
                    if (numDeclared >= replicants.length) {
                        betting.on('change', newVal => {
                            this.premiumBets = newVal.premiumBets;
                            this.otherBets = newVal.otherBets;
                        });
                    }
                });
            });
            this._checkboxChanged = this._checkboxChanged.bind(this);
            this.addEventListener('change', this._checkboxChanged);   
        }
        
        _checkboxChanged(e)
        {
            if (betting.value.premiumBets.length == 0)
                return;
                
            const target = e.path[0];
            winning = target.innerText.trim();
            winningsplit = winning.split(" ");
            console.log(winningsplit);
            
            var premiumWinner = betting.value.premiumBets.find(bet =>
            {
                if (bet.name == winningsplit[0])
                    return true;
                
                return false;
            });
           
            if (premiumWinner) {
                premiumname = winningsplit[0];
                premiumbet = winningsplit[1];
            } else {
                othername = winningsplit[0];
                otherbet = winningsplit[1];
            }
        }

        _assignWinnerPremium()
        {
            if (winningsplit.length == 0 || betting.value.premiumBets.length == 0)
                return;
            var winnerpremium = premiumname + " won the bet in the Subscriber/Cheer200 category. The winning bet was " + premiumbet + "!";
			nodecg.sendMessage("assignWinnerPremium", winnerpremium);
        }
		
		_assignWinnerOther()
		{
            if (winningsplit.length == 0 || betting.value.premiumBets.length == 0)
                return;
            
            var winnerother = othername + " won the bet in the regular user category. The winning bet was " + otherbet + "!";
			nodecg.sendMessage("assignWinnerOther", winnerother);
        }
    }

    customElements.define(Zsrbets.is, Zsrbets);
})();
