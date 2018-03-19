'use strict';

// Ours
const nodecg = require('./util/nodecg-api-context').get();

var jsmediatags = require('jsmediatags');
var pathExists = require('path-exists');

var basePath = "";
var runFolder = "";
var currRunName = "";

var allFiles = [];
var allTitles = [];
var allGames = [];

var countFiles = 0;
var countSongs = 0;

var currentIndex = 0;
var countReadTags = 0;

var currentRunInfo;

var isBusy = false;


basePath = `bundles/${nodecg.bundleName}/graphics/music/`;

const nextGame = nodecg.Replicant('currentRun');
const infoScreen = nodecg.Replicant('nowPlaying');
const pulsing = nodecg.Replicant('nowPlayingPulsing');

nodecg.listenFor('pulseNowPlaying', pulse);

let pulseTimeout;

const nowPlaying = nodecg.Replicant('musicBreak', { defaultValue: {}, persistent: true });

nowPlaying.value =
{
    file: "N/A",
    title: "N/A",
    game: "N/A",
    volume: 1.0,
    isPlaying: false
};

function findSongs(shortName) {
    currRunName = shortName;

    runFolder = basePath;
    runFolder = runFolder.concat(shortName);
    runFolder = runFolder.concat("/");

    let testFile = "";

    for (var i = 1; i <= 10; i++) {
        testFile = runFolder;

        testFile = testFile.concat(i.toString());
        testFile = testFile.concat(".mp3");

        if (pathExists.sync(testFile) == false) {
            console.log("file not found, assuming we found all of them then. Path:", testFile);
            break;
        }
        else {
            countFiles += 1;
        }
    }

    if (countFiles == 0)
        readTags(false);
    else
        readTags(true);
}

function readTags(status) {
    if (status == false) {
        nowPlaying.value.file = "";
        nowPlaying.value.title = "";
        nowPlaying.value.game = "";
        nowPlaying.value.isPlaying = false;

        infoScreen.value.title = " ";
        infoScreen.value.game = "No Song Available -";

        // If the graphic is already showing, end it prematurely
        if (pulsing.value) {
            clearTimeout(pulseTimeout);
            pulsing.value = false;
        }

        isBusy = false;

        return;
    }

    if (currentIndex == 0) {
        readNextTag();
    }
    else {
        countReadTags += 1;

        if (countReadTags == countFiles) {
            currentIndex = 0;

			shuffleSongs();

            _nextSong();

            isBusy = false;
        }
        else {
            readNextTag();
        }
    }
}

function shuffleSongs() {

	for (var i = 0; i < countSongs; i++) {
		let random = Math.floor(Math.random() * countSongs);

		let temp1 = allFiles[i];
		let temp2 = allTitles[i];
		let temp3 = allGames[i];

		allFiles[i] = allFiles[random];
		allTitles[i] = allTitles[random];
		allGames[i] = allGames[random];

		allFiles[random] = temp1;
		allTitles[random] = temp2;
		allGames[random] = temp3;
	}
}

function readNextTag() {
    currentIndex += 1;

    let testFile = runFolder;

    testFile = testFile.concat(currentIndex.toString());
    testFile = testFile.concat(".mp3");

    console.log("read tags of file:", testFile);

    new jsmediatags.Reader(testFile)
    .setTagsToRead(["title", "album"])
    .read(
    {
        onSuccess: function (tag) {
            if (tag.tags.title == "undefined" || tag.tags.album == "undefined") {
                console.log("this file has missing or bad tags, song is skipped");

                readTags(true);
            }
            else {
                allFiles[countSongs] = testFile.substr(testFile.indexOf(currRunName));
                allTitles[countSongs] = tag.tags.title;
                allGames[countSongs] = tag.tags.album;

                console.log(tag.tags.title);
                console.log(tag.tags.album);

                countSongs += 1;

                readTags(true);
            }
        },
        onError: function (error) {
            console.log('critical error while reading tags, song is skipped', error.type, error.info);

            readTags(true);
        }
    });
}
nextGame.on('change', newVal => {
    nextGameChanged(newVal);
});

function nextGameChanged(newVal) {
    if (!newVal)
        return;

    if (isBusy == true) {
        setTimeout(() => {
            nextGameChanged(newVal);
        }, 100);

        return;
    }

    if (currentRunInfo) {
        if (currentRunInfo.shortName == newVal.shortName)
            return;
    }

    currentRunInfo = newVal;
    isBusy = true;

    countFiles = 0;
    countSongs = 0;
    countReadTags = 0;
    currentIndex = 0;

    nowPlaying.value.file = "";
    nowPlaying.value.title = " ";
    infoScreen.value.game = "Waiting for Song -";
    nowPlaying.value.isPlaying = false;

    _hideSongInfo();

    findSongs(newVal.shortName);
}

nodecg.listenFor('nextSong', cb => {
    _nextSong();
    if (typeof cb === 'function') {
        cb();
    }
});

nodecg.listenFor('showSongInfo', cb => {
    _showSongInfo();
    if (typeof cb === 'function') {
        cb();
    }
});

nodecg.listenFor('hideSongInfo', cb => {
    _hideSongInfo();
    if (typeof cb === 'function') {
        cb();
    }
});


function _nextSong() {

	console.log("Asked for next Song");

	if (countSongs == 0) {

		console.log("No Songs available");

        nowPlaying.value.file = "";
        nowPlaying.value.title = "";
        nowPlaying.value.game = "";
        nowPlaying.value.isPlaying = false;

        infoScreen.value.title = " ";
        infoScreen.value.game = "No Song Available -";

        // If the graphic is already showing, end it prematurely
        if (pulsing.value) {
            clearTimeout(pulseTimeout);
            pulsing.value = false;
		}

		return;
	}

	if (currentIndex >= countSongs) {

		console.log("End of Playlist reached. Reset randomization");

		currentIndex = 0;

		shuffleSongs();
	}

	if (currentIndex < countSongs) {

        console.log("play file: ", allFiles[currentIndex]);
        console.log("title: ", allTitles[currentIndex]);
		console.log("game: ", allGames[currentIndex]);

        nowPlaying.value.file = allFiles[currentIndex];
        nowPlaying.value.title = allTitles[currentIndex];
        nowPlaying.value.game = allGames[currentIndex];

		currentIndex += 1;

		console.log("Playlist " + currentIndex + "/" + countSongs);
    }
	else {

		/*
        nowPlaying.value.file = "";
        nowPlaying.value.title = "";
        nowPlaying.value.game = "";
        nowPlaying.value.isPlaying = false;

        infoScreen.value.title = " ";
        infoScreen.value.game = "No Song Available -";

        // If the graphic is already showing, end it prematurely
        if (pulsing.value) {
            clearTimeout(pulseTimeout);
            pulsing.value = false;
        }
		*/
    }
}

function _showSongInfo() {
    //Info Screen
    infoScreen.value.title = nowPlaying.value.title;
    infoScreen.value.game = nowPlaying.value.game;

    // If the graphic is already showing, end it prematurely and show the new song
    if (pulsing.value) {
        clearTimeout(pulseTimeout);
        pulsing.value = false;
    }

    //Show the graphic
    pulse();
}

function _hideSongInfo() {
    infoScreen.value.title = " ";
    infoScreen.value.game = "Waiting for Song -";

    // If the graphic is already showing, end it prematurely
    if (pulsing.value) {
        clearTimeout(pulseTimeout);
        pulsing.value = false;
    }
}

/**
* Shows the nowPlaying graphic for 12 seconds.
* @returns {undefined}
*/
function pulse() {
    // Don't stack pulses
    if (pulsing.value) {
        return;
    }

    pulsing.value = true;

    // Hard-coded 12 second duration
    pulseTimeout = setTimeout(() => {
        pulsing.value = false;
    }, 12 * 1000);
}
