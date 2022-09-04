import appRoot from 'app-root-path';
import config from '../database/config.js';
import timer from '../src/Timeout.js';
import response from '../database/response.json' assert { type: 'json' };



function EventHandler(event, api) {
	let threadIDs = config.allowed_threads;

	if (
        threadIDs.includes(event.threadID) &&
        !timer.inTimeout(event.threadID)
      ) {
        if (event.body in response) {
          //gets message from response.json
          var message = response[event.body];

          //sends message and puts thread in timeout afterward
          api.sendMessage(message, event.threadID, (err) => {
            if (err) return console.error(err);

            timer.threadTimeout(event.threadID);
          });
        }
      }
}

export default EventHandler;
