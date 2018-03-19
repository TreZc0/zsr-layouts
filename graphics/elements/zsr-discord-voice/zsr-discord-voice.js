(function () {
	'use strict';

	const voiceActivity = nodecg.Replicant('voiceActivity');
	const twitchPlayer = nodecg.Replicant('twitchPlayer');

	var speakerCount = 0;

	class zsrDiscordVoice extends Polymer.MutableData(Polymer.Element) {
		static get is() {
			return 'zsr-discord-voice';
		}

		static get properties() {
		    return {
		        columnsperline: {
		            type: Number,
                    value: 2
                },
                tablewidth: {
                    type: Number,
                    value: 300
                },
                rowWidth: {
                    type: Number,
                    reflectToAttribute: true,
                    value: 200
                },
                textMaxLength: {
                    type: Number,
                    reflectToAttribute: true,
                    value: 130
                },
		        speakerLines: {
		            type: Array,
		            reflectToAttribute: true,
		            value: []
		        }
			};
		}

		ready() {
			super.ready();

			const replicants =
				[
					twitchPlayer,
					voiceActivity
				];

			let numDeclared = 0;
			replicants.forEach(replicant => {
                replicant.once('change', () => {
                    numDeclared++;

                    // Start the loop once all replicants are declared
					if (numDeclared >= replicants.length) {

						/*
						//Calculate available screen estate for each row and name field
						this.rowWidth = this.tablewidth - 20; //both table borders combined (left/right table margin a 10 pixels)
						this.textMaxLength = this.rowWidth;
						this.rowWidth = Math.floor(this.rowWidth / this.columnsperline); //rows take 1/x of the space left e.g. 50% each for 2 columns per line, now hardcoded

						this.textMaxLength -= ((this.columnsperline - 1) * 20); //10 px padding for every extra column after the first one to create a gap
						this.textMaxLength -= this.columnsperline * 45; //for every avatar and its padding
						this.textMaxLength = Math.floor(this.textMaxLength / this.columnsperline);
						*/

					    voiceActivity.on('change', newVal => {

					        if (!newVal || !newVal.members)
					            return;

					        if (newVal.members.length == 0)
					        {
					            this.speakerLines.length = 0;
					            speakerCount = 0;

					            return;
					        }

					        if (speakerCount != newVal.members.length)
					        {
					            //Construct new table every time speaker count changes
					            speakerCount = newVal.members.length;

					            this.speakerLines.length = 0;

                                let lineCount = Math.ceil(speakerCount / this.columnsperline);

								console.log("Need " + lineCount + " lines to render this voice array!");

								let columnCount = this.columnsperline;

								if (lineCount == 1 && speakerCount < this.columnsperline)
									columnCount = speakerCount;

								//Calculate available screen estate for each row and name field
								this.rowWidth = this.tablewidth - 20; //both table borders combined (left/right table margin a 10 pixels)
								this.textMaxLength = this.rowWidth;
								this.rowWidth = Math.floor(this.rowWidth / columnCount); //rows take 1/x of the space left e.g. 50% each for 2 columns per line, now hardcoded
						
								this.textMaxLength -= ((columnCount - 1) * 10); //10 px padding for every extra column after the first one to create a gap
								this.textMaxLength -= columnCount * 42; //for every avatar and its padding
								this.textMaxLength = Math.floor(this.textMaxLength / columnCount);

								console.log("This table with " + columnCount + " columns per line and a base field size of " + this.tablewidth + " pixels has " + this.textMaxLength + " pixels of space per name field and " + this.rowWidth + " pixels for every row!");

								let arrayIndex = 0;

					            for (var i = 0; i < lineCount; i++)
                                {
                                    let line = [];

                                    for (var n = 0; n < this.columnsperline; n++)
                                    {
                                        if (arrayIndex == speakerCount)
                                            break;

                                        let column = newVal.members[arrayIndex];

                                        console.log("add " + column.name + " to line " + i);

                                        line.push(column);

                                        arrayIndex++;
                                    }
                                
                                    this.push("speakerLines", line);
                                }

								setTimeout(() => { //delay so html elements can render first before updating it

									this.speakerLines.forEach(line => {
										line.forEach(entry => {								
											Polymer.dom(this.root).querySelector("#td_" + entry.id).style.minWidth = this.rowWidth.toString() + "px";
										});
									});

									if (columnCount < this.columnsperline)
									{
										this.speakerLines.forEach(line => {
											line.forEach(entry => {
												Polymer.dom(this.root).querySelector("#container_" + entry.id).style.display = "table";
												Polymer.dom(this.root).querySelector("#container_" + entry.id).style.margin = "0 auto -50px";
											});
										});
									}

                                    this.updateSpeakingStatus(newVal.members);

					            }, 500);

					            return;
                            }

                            //Voice Update only
                            this.updateSpeakingStatus(newVal.members);		            
						});				
					}
				});
			});

		}

        updateSpeakingStatus(memberArray) {

            var arrayIndex = 0;

            this.speakerLines.forEach(line => {

                line.forEach(entry => {

                    if (memberArray[arrayIndex].isSpeaking)
                    {
                        Polymer.dom(this.root).querySelector("#mic_" + entry.id).style.visibility = "visible";
                        Polymer.dom(this.root).querySelector("#name_" + entry.id).style.textShadow = "0px 0px 22px rgba(0, 248, 0, 1)";
                    }
                    else
                    {
                        Polymer.dom(this.root).querySelector("#mic_" + entry.id).style.visibility = "hidden";
                        Polymer.dom(this.root).querySelector("#name_" + entry.id).style.textShadow = "0px 0px 0px rgba(0, 0, 0, 0.0)";
                    }

                    arrayIndex++;
                });
            });
		}
	}

	customElements.define(zsrDiscordVoice.is, zsrDiscordVoice);
})();
