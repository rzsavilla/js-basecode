function Timer() {
    var start = new Date().getTime();
    var pause = 0;

    /** Restart timer */
    this.reset = function() {
        start = new Date().getTime();
        pause = 0;
    }
    /** Pause the timer */
    this.pause = function() { pause = pause + new Date().getTime(); }
    /** Resume timer, records elapsed time during pause*/
    this.resume = function() { pause = new Date().getTime() - pause; }

    /** Get time elapsed */
    this.elapsed = function() { return (new Date().getTime() - start) - pause; }
}