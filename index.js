const path = require('path');
const response = require('./database/response.json');
const config = require('./database/config')
const fs = require("fs");
const Timeout = require('./src/Timeout');
const login = require('facebook-chat-api');


//database with credentials & responses
const databaseDir = path.resolve(__dirname + '/database/'); 


////////////////////////////////////////////////////LOGIN////////////////////////////////////////////////////
login({appState: JSON.parse(fs.readFileSync('database/appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    //store most recent cookie in database
    fs.writeFileSync(databaseDir + '/appstate.json', JSON.stringify(api.getAppState())); 

    api.setOptions({
        listenEvents: true,
        forceLogin: true,
    })

    //keeps track of which thread is in timout
    //default is 1000 (1 seconds)
    var use = new Timeout(config.timeout_milliseconds); 

    //stores the threadIDs that the bot is allowed to respond to
    threadIDs = config.allowed_threads;


////////////////////////////////////////////////////LISTEN////////////////////////////////////////////////////
    api.listenMqtt((err, event) => {
        if(err) return console.error(err);

        //DEBUG
        // console.log(event);

        //check if thread id is valid and not in timeout

        if(threadIDs.includes(event.threadID)  && !use.inTimeout(event.threadID)) { 
            if(event.body in response) {

                //gets message from response.json
                var message = response[event.body];

                //sends message and puts thread in timeout afterward
                api.sendMessage(message, event.threadID, (err) => { 
                    if(err) return console.error(err);
                    
                    use.threadTimeout(event.threadID);
                });
            }
        }
    });
});

