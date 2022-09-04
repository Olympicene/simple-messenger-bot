//time in between commands
const timeout_milliseconds = 1000;

const apiOptions = {
  listenEvents: true,
  selfListen: true,
  forceLogin: true,
};

//threadIDs of groupchats/chats its allowed in
const allowed_threads = [
  "2401681243197992",
  "4432056806822983",
  "4341136652627262",
  "4258360417509656",
  "100066164221694",
];

const DEBUG = true;

export default {timeout_milliseconds, apiOptions, allowed_threads, DEBUG}
