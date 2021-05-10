module.exports = class Timeout {

    constructor(time) { //time (milliseconds)
        this.time = time; 
        this.timeout = {};
    }

    inTimeout(threadID) { //check if threadID is in timeout
        return this.timeout[threadID];
    }

    threadTimeout(threadID) { //puts thread id in timeout
        this.timeout[threadID] = true;
        setTimeout(() => {this.timeout[threadID] = false;}, this.time);
    }
}
