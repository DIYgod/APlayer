import utils from './utils';

class Timer {
    constructor (player) {
        this.player = player;

        window.requestAnimationFrame = (() =>
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        )();

        this.types = ['progress'];

        this.init();
    }

    init () {
        for (let i = 0; i < this.types.length; i++) {
            const type = this.types[i];
            if (type !== 'fps') {
                this[`init${type}Checker`]();
            }
        }
    }

    initprogressChecker () {
        this.progressChecker = setInterval(() => {
            if (this.enableprogressChecker) {
                this.player.bar.set('played', this.player.audio.currentTime / this.player.audio.duration, 'width');
                this.player.lrc && this.player.lrc.update();
                const currentTime = utils.secondToTime(this.player.audio.currentTime);
                if (this.player.template.ptime.innerHTML !== currentTime) {
                    this.player.template.ptime.innerHTML = currentTime;
                }
            }
        }, 100);
    }

    enable (type) {
        this[`enable${type}Checker`] = true;

        if (type === 'fps') {
            this.initfpsChecker();
        }
    }

    disable (type) {
        this[`enable${type}Checker`] = false;
    }

    destroy (type) {
        this[`${type}Checker`] && clearInterval(this[`${type}Checker`]);
    }
}

export default Timer;