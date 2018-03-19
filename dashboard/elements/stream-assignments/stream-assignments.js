(function () {
    'use strict';

    const twitchPlayer = nodecg.Replicant('twitchPlayer');
	const runnerJSON = nodecg.Replicant('runners');
	const currentRun = nodecg.Replicant('currentRun');

    class StreamAssignments extends Polymer.MutableData(Polymer.Element) {
        static get is() {
            return 'stream-assignments';
        }

        ready()
        {
            super.ready();

            const replicants = 
            [
                twitchPlayer,
                runnerJSON
            ];

            let numDeclared = 0;
            replicants.forEach(replicant => {
                replicant.once('change', () => {
                    numDeclared++;

                    // Start the loop once all replicants are declared
                    if (numDeclared >= replicants.length) {
                        twitchPlayer.on('change', newVal => {

                            this.runnerList = newVal.runnerList;

                            var count = 0;
                            var link = "kadgar.net Link";

                            newVal.runnerList.find(runner => {
                                if (runner.checked == true && runner.id == "---> A") {
                                    if (count == 0) {
                                        link = "http://kadgar.net/live";
                                    }

                                    link = link.concat("/");

                                    runnerJSON.value.find(runnerIndex => {
                                        if (runnerIndex) {
                                            if (runnerIndex.name === runner.name) {
                                                link = link.concat(runnerIndex.stream);
                                            }
                                        }
                                    });

                                    count++;

                                    return true;
                                }

                                return false;
                            });

                            newVal.runnerList.find(runner => {
                                if (runner.checked == true && runner.id == "---> B") {
                                    if (count == 0) {
                                        link = "http://kadgar.net/live";
                                    }

                                    link = link.concat("/");

                                    runnerJSON.value.find(runnerIndex => {
                                        if (runnerIndex) {
                                            if (runnerIndex.name === runner.name) {
                                                link = link.concat(runnerIndex.stream);
                                            }
                                        }
                                    });

                                    count++;

                                    return true;
                                }

                                return false;
                            });

                            newVal.runnerList.find(runner => {
                                if (runner.checked == true && runner.id == "---> C") {
                                    if (count == 0) {
                                        link = "http://kadgar.net/live";
                                    }

                                    link = link.concat("/");

                                    runnerJSON.value.find(runnerIndex => {
                                        if (runnerIndex) {
                                            if (runnerIndex.name === runner.name) {
                                                link = link.concat(runnerIndex.stream);
                                            }
                                        }
                                    });

                                    count++;

                                    return true;
                                }

                                return false;
                            });

                            newVal.runnerList.find(runner => {
                                if (runner.checked == true && runner.id == "---> D") {
                                    if (count == 0) {
                                        link = "http://kadgar.net/live";
                                    }

                                    link = link.concat("/");

                                    runnerJSON.value.find(runnerIndex => {
                                        if (runnerIndex) {
                                            if (runnerIndex.name === runner.name) {
                                                link = link.concat(runnerIndex.stream);
                                            }
                                        }
                                    });

                                    count++;

                                    return true;
                                }

                                return false;
                            });
                       
							this.$.kadgarLink.value = link;
                        });
                    }
                });
            });
                
            this._checkboxChanged = this._checkboxChanged.bind(this);
            this.addEventListener('change', this._checkboxChanged);
        }

        _assignStreams()
        {
			nodecg.sendMessage("askSwitchRunners", 1);

			/* if (this.$.kadgarLink.value.length > 24)
				 nodecg.sendMessage("assignmentsChanged", this.$.kadgarLink.value); //send kadgar link to discord bot */
        }

        _checkboxChanged(e)
        {
            const target = e.path[0];

            var name = target.innerText.trim();

            if (name.indexOf("--->") != -1) {

                name = name.substr(0, name.indexOf("--->"));
                name = name.trim();
            }

            var count = 0;

            twitchPlayer.value.runnerList.forEach(runner => {
                
                if (runner.checked == true)
                    count++;
            });

            twitchPlayer.value.runnerList.find(runner => {
                if (runner.name === name)
				{
					// let hasDualScreen = ['NDS', 'Nintendo DS', 'NDSi', 'Nintendo DSi', '3DS', 'Nintendo 3DS'].includes(currentRun.value.console);
                    if (target.checked)
                    {
                        runner.checked = true;

                        var runnerFound = false;

                        twitchPlayer.value.runnerList.find(runnerSearch => {
                            if (runnerSearch.checked == true && runnerSearch.id == "---> A")
                            {
                                runnerFound = true;

                                return true;
                            }

                            return false;
                        });

                        if (!runnerFound)
                        {
                            runner.id = "---> A";
                        }
                        else
                        {
                            runnerFound = false;

                            twitchPlayer.value.runnerList.find(runnerSearch => {
                                if (runnerSearch.checked == true && runnerSearch.id == "---> B") {

                                    runnerFound = true;

                                    return true;
                                }

                                return false;
                            });

                            if (!runnerFound)
                            {
                                runner.id = "---> B";
                            }
                            else
                            {
                                runnerFound = false;

                                twitchPlayer.value.runnerList.find(runnerSearch => {
                                    if (runnerSearch.checked == true && runnerSearch.id == "---> C") {

                                        runnerFound = true;

                                        return true;
                                    }

                                    return false;
                                });

                                if (!runnerFound)
                                {
                                    runner.id = "---> C";
                                }
                                else
                                {
                                    runner.id = "---> D";
                                }
                            }
                        }
                    }
                    else
                    {
                        runner.checked = false;
                        runner.id = "";
                    }

                    return true;
                }

                return false;
            });      
        }
    }

    customElements.define(StreamAssignments.is, StreamAssignments);
})();
