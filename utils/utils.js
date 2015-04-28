var getCompression = require('./getCompression')
  , send = require('./send')
  , setup = require('./setup')
  , events = require('../emitter');

module.exports = {
  getCompression: getCompression
  , send: send
  , setup: function (config) {
  		'use strict';
      var setupSteps = events.required(['setup:start'], function () {
        events.emit('setup:complete');
      });

  		//execute all of the setup tasks in the setup obejct
  		//	not functionally pure... has sideeffects in the file system
  		//	sorry world
  		Object.keys(setup).forEach(function (key) {
  			if(typeof setup[key] === 'function'){
          setupSteps.add('setup:' + key);
          setup[key](config);
        }
      });

      events.emit('setup:start');
  }
};