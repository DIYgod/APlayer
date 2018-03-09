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

        this.types = ['loading', 'progress'];

        this.init();
    }

    init () {
        this.types.map((item) => {
            this[`init${item}Checker`]();
            return item;
        });
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

    initloadingChecker () {
        let lastPlayPos = 0;
        let currentPlayPos = 0;
        let bufferingDetected = false;
        this.loadingChecker = setInterval(() => {
            if (this.enableloadingChecker) {
                // whether the audio is buffering
                currentPlayPos = this.player.audio.currentTime;
                if (!bufferingDetected
                    && currentPlayPos === lastPlayPos
                    && !this.player.audio.paused) {
                    this.player.container.classList.add('aplayer-loading');
                    bufferingDetected = true;
                }
                if (bufferingDetected
                    && currentPlayPos > lastPlayPos
                    && !this.player.audio.paused) {
                    this.player.container.classList.remove('aplayer-loading');
                    bufferingDetected = false;
                }
                lastPlayPos = currentPlayPos;
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

    destroy () {
        this.types.map((item) => {
            this[`enable${item}Checker`] = false;
            this[`${item}Checker`] && clearInterval(this[`${item}Checker`]);
            return item;
        });
    }
}

export default Timer;