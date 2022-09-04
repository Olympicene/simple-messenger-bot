import config from '../database/config.js';


class Timeout {

    static time = config.timeout_milliseconds;
    static timeout = {};

    static inTimeout(threadID) { //check if threadID is in timeout
        return this.timeout[threadID];
    }

    static threadTimeout(threadID) { //puts thread id in timeout
        this.timeout[threadID] = true;
        setTimeout(() => {this.timeout[threadID] = false;}, this.time);
    }
}

export default Timeout;
