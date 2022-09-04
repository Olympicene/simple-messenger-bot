
# simple-messenger-bot
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


This is a simple Facebook messenger chat bot. 
It is easy to customize, all responses and triggers are assigned in a json file.
You can also specify which threads it will work in and the delay between each command in the [config.js](database/config.js).


## Requirements

- node >= 17.0

## Installation 

```bash 
  git clone https://github.com/Olympicene/simple-messenger-bot.git
  cd simple-messenger-bot
  npm install
```
    
## Login

As of writing this, due to facebook-chat-api being in maintenance mode, 
login via username and password is impossible. The workaround involves using cookies from the facebook website found
in this [issue](https://github.com/Schmavery/facebook-chat-api/issues/870#issuecomment-820762472).
It's not a long process so I'll summarize it here.

- Install a puppeter extension (I use [this one](https://github.com/ktty1220/export-cookie-for-puppeteer)) 
  -  (UPDATE: the chrome store page link is a 404 use firefox or unpack [my crx file](https://www.mediafire.com/file/hguaj9npk9ymyul/0.2.0_0.crx/file))
- Login to __facebook.com__ NOT messenger.com
- use puppeter to retrieve the cookies as a JSON file
- rename the file to appstate.json and put it in [simple-messenger-bot/database](database)
- for every cookie object replace "name" with "key" (just find and replace all instances of "name" with "key")

If your appstate.json somewhat looks like [example-appstate.json](database/example-appstate.json) then you did it right.

## Config
Next you need to edit [config.js](database/config.js)

exports.timeout_milliseconds is self explanatory, its  how long the bot will wait before it accepts the next command.

```
//time in between commands
exports.timeout_milliseconds = 1000
```

exports.allowed_threads contains a list of Thread ID's associated with groupchats that the bot is allowed to respond to.
Thread IDs are a number that can be found at the end of urls when you access messenger via browser. 
<br>
<br>
Example
<br>
<br>
<img src="https://i.imgur.com/wSBxeCD.png">
```
exports.allowed_threads = [
    '4341136652627262', 
]
```


## Usage

After you finish above sections run
```
npm test
```

If you did everything right, you should see this in your terminal:
```
info login Logged in
info login Request to reconnect
info login Done logging in.
```
While this program is running, the chat bot will respond to any triggers outlined in [response.json](database/response.json)
<br>
To stop the bot, stop the program with Ctrl+C

## Customization

edit response.json

```
{
    "hello": "hello my name is robot",
    "goodbye": "goodbye nice to meet you"
}
```
The key is the trigger for the bot and the value is the response it will type back.<br>
<img src="https://i.imgur.com/bfRyxQE.png">
  
