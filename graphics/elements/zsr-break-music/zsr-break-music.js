(function () {
    'use strict';

    const nowPlaying = nodecg.Replicant('musicBreak');

    var audio = new Audio();
    var index = 1;
    var basePath = `music/`;
    var countSongs = 0;

    var lastSong;

    var currSong;

    var wasPlaying = false;
    var changeMusic = false;
    var hasInitMusic = false;

    var waitForUpdate = false;

    function loop()
    {
        if (hasInitMusic == false)
        {
            if (changeMusic == true)
            {
                waitForUpdate = false;
                wasPlaying = false;
                changeMusic = false;
                hasInitMusic = true;
            }

            setTimeout(() => {
                loop();
            }, 500);
        }
        else
        {
            if (changeMusic == true)
            {
                waitForUpdate = false;
                changeMusic = false;

                if (wasPlaying == true)
                {
                    wasPlaying = false;
                    audio.pause();

                    nodecg.sendMessage('hideSongInfo');
                }
            }

            if (waitForUpdate == false)
                {
                if (currSong.isPlaying == false) {
                    if (wasPlaying == true) {
                        wasPlaying = false;

                        audio.pause();

                        nodecg.sendMessage('hideSongInfo');
                    }
                }
                else {
                    if (wasPlaying == false) {
                        wasPlaying = true;

                        let fileName = currSong.file;
                        let fullPath = basePath.concat(fileName);

                        audio = new Audio(fullPath);
                        audio.volume = currSong.volume;

                        lastSong = currSong.file;

                        audio.play();

                        nodecg.sendMessage('showSongInfo');
                    }
                    else {

                        audio.volume = currSong.volume;

						if (audio.ended) {

							console.log("This song ended, request next one");
                            
                            nodecg.sendMessage('nextSong');

                            wasPlaying = false;
                            waitForUpdate = true;
                        }
                    }
                }
            }

            setTimeout(() => {
                loop();
            }, 500)
        }
    }

    class ZsrBreakMusic extends Polymer.Element 
    {
        static get is() 
        {
            return 'zsr-break-music';
        }

        ready()
        {
            super.ready();

            nowPlaying.on('change', this._nowPlayingChanged.bind(this));
            loop();
        }

        _nowPlayingChanged(newVal)
        {
			currSong = newVal;

            if (lastSong)
                if (lastSong != currSong.file || wasPlaying != currSong.isPlaying)
                    changeMusic = true;
                else
                    changeMusic = false;
            else
                changeMusic = true;
        }
    }

    customElements.define(ZsrBreakMusic.is, ZsrBreakMusic);

})();
