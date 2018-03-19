'use strict';

// Ours
const nodecg = require('./util/nodecg-api-context').get();

const pulsing = nodecg.Replicant('nowPlayingPulsing', { defaultValue: false, persistent: true });
const nowPlaying = nodecg.Replicant('nowPlaying', { defaultValue: {}, persistent: true });
