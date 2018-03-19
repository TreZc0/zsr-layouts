'use strict';

// Packages
const cheerio = require('cheerio');
const request = require('request-promise').defaults({jar: true}); // <= Automatically saves and re-uses cookies.

// Ours
const nodecgApiContext = require('./util/nodecg-api-context');

const LOGIN_URL = 'https://private.gamesdonequick.com/tracker/admin/login/';

module.exports = function (nodecg) {
	// Store a reference to this nodecg API context in a place where other libs can easily access it.
	// This must be done before any other files are `require`d.
	nodecgApiContext.set(nodecg);
	const loginLog = new nodecg.Logger(`${nodecg.bundleName}:tracker`);
	let isFirstLogin = true;

	if (nodecg.bundleConfig.useMockData) {
		nodecg.log.warn('WARNING! useMockData is true, you will not receive real data from the tracker!');
	}

	// Be careful when re-ordering these.
	// Some of them depend on Replicants initialized in others.
	require('./timekeeping');
	require('./obs');
	require('./nowplaying');
	require('./countdown');

	loginToTracker().then(() => {
		const schedule = require('./schedule');
		schedule.on('permissionDenied', () => {
			loginToTracker().then(schedule.update);
		});
	});

	// Tracker logins expire every 2 hours. Re-login every 90 minutes.
	setInterval(loginToTracker, 360 * 60 * 1000);

	if (nodecg.bundleConfig.twitch) {
		require('./twitch-ads');
	}

	if (nodecg.bundleConfig.twitter && nodecg.bundleConfig.twitter.userId) {
		if (nodecg.bundleConfig.twitter.enabled) {
			require('./twitter');
		}
	} else {
		nodecg.log.warn('"twitter" is not defined in cfg/sgdq17-layouts.json! ' +
			'Twitter integration will be disabled.');
	}


    //Custom modules by DB
	require('./twitch-module');
	require('./leaderboard');
	require('./musicbreak');
	require('./discord');


	// Fetch the login page, and run the response body through cheerio
	// so we can extract the CSRF token from the hidden input field.
	// Then, POST with our username, password, and the csrfmiddlewaretoken.
	function loginToTracker() {
		if (isFirstLogin) {
			loginLog.info('Logging in as %s...', nodecg.bundleConfig.tracker.username);
		} else {
			loginLog.info('Refreshing tracker login session as %s...', nodecg.bundleConfig.tracker.username);
		}

		return request({
			uri: LOGIN_URL,
			transform(body) {
				return cheerio.load(body);
			}
		}).then($ => request({
			method: 'POST',
			uri: LOGIN_URL,
			form: {
				username: nodecg.bundleConfig.tracker.username,
				password: nodecg.bundleConfig.tracker.password,
				csrfmiddlewaretoken: $('#login-form > input[name="csrfmiddlewaretoken"]').val()
			},
			headers: {
				Referer: LOGIN_URL
			},
			resolveWithFullResponse: true,
			simple: false
		})).then(() => {
			if (isFirstLogin) {
				isFirstLogin = false;
				loginLog.info('Logged in as %s.', nodecg.bundleConfig.tracker.username);
			} else {
				loginLog.info('Refreshed session as %s.', nodecg.bundleConfig.tracker.username);
			}
		}).catch(err => {
			loginLog.error('Error authenticating!\n', err);
		});
	}
};
