import Promise from 'promise-polyfill';

import utils from './utils';
import Icons from './icons';
import handleOption from './options';
import Template from './template';
import Bar from './bar';
import User from './user';
import Lrc from './lrc';
import Controller from './controller';
import Timer from './timer';
import Events from './events';

const instances = [];

class APlayer {

    /**
     * APlayer constructor function
     *
     * @param {Object} options - See README
     * @constructor
     */
    constructor (options) {
        this.options = handleOption(options);
        this.container = this.options.container;
        this.audios = [];
        this.playIndex = 0;
        this.mode = this.options.mode;
        this.paused = true;

        // Assume "circulation" mode if single music is loaded and mode isn't already "circulation" or "order".
        if (!this.isMultiple() && this.mode !== 'circulation' && this.mode !== 'order') {
            this.mode = 'circulation';
        }
        this.randomOrder = utils.randomOrder(this.options.music.length);

        if (this.options.showlrc) {
            this.container.classList.add('aplayer-withlrc');
        }
        if (this.options.music.length > 1) {
            this.container.classList.add('aplayer-withlist');
        }
        if (utils.isMobile) {
            this.container.classList.add('aplayer-mobile');
        }
        this.arrow = this.container.offsetWidth <= 300;
        if (this.arrow) {
            this.container.classList.add('aplayer-arrow');
        }
        if (this.options.narrow) {
            this.container.classList.add('aplayer-narrow');
        }

        // save lrc
        this.container = this.options.container;
        if (this.options.showlrc === 2 || this.options.showlrc === true) {
            const lrcEle = this.container.getElementsByClassName('aplayer-lrc-content');
            for (let i = 0; i < lrcEle.length; i++) {
                if (this.options.music[i]) {
                    this.options.music[i].lrc = lrcEle[i].innerHTML;
                }
            }
        }

        this.template = new Template({
            container: this.container,
            options: this.options,
            mode: this.mode
        });

        if (this.template.info.offsetWidth < 200) {
            this.template.time.classList.add('aplayer-time-narrow');
        }

        if (this.options.showlrc) {
            this.lrc = new Lrc({
                container: this.template.lrc,
                async: this.options.showlrc === 3,
                content: this.options.music.map((item) => item.lrc),
                player: this,
            });
        }
        this.events = new Events();
        this.user = new User(this);
        this.bar = new Bar(this.template);
        this.controller = new Controller(this);
        this.timer = new Timer(this);

        this.initAudio();
        if (this.mode === 'random') {
            this.setAudio(this.randomOrder[0]);
        }
        else {
            this.setAudio(0);
        }

        // autoplay
        if (this.options.autoplay) {
            this.play();
        }

        instances.push(this);
    }

    initAudio () {
        this.audio = document.createElement('audio');
        this.audio.preload = this.options.preload ? this.options.preload : 'auto';

        for (let i = 0; i < this.events.audioEvents.length; i++) {
            this.audio.addEventListener(this.events.audioEvents[i], () => {
                this.events.trigger(this.events.audioEvents[i]);
            });
        }

        this.on('play', () => {
            if (this.paused) {
                this.play();
            }
        });

        this.on('pause', () => {
            if (!this.paused) {
                this.pause();
            }
        });

        // show audio time: the metadata has loaded or changed
        this.on('durationchange', () => {
            console.log('durationchange');
            if (this.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
                this.template.dtime.innerHTML = utils.secondToTime(this.audio.duration);
            }
        });

        // show audio loaded bar: to inform interested parties of progress downloading the media
        this.on('progress', () => {
            const percentage = this.audio.buffered.length ? this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration : 0;
            this.bar.set('loaded', percentage, 'width');
        });

        // audio download error: an error occurs
        this.on('error', () => {
            this.template.author.innerHTML = ` - Error happens ╥﹏╥`;
        });

        // multiple music play
        this.on('ended', () => {
            if (this.isMultiple()) {
                if (this.audio.currentTime !== 0) {
                    if (this.mode === 'random') {
                        this.setAudio(this.nextRandomNum());
                        this.play();
                    }
                    else if (this.mode === 'single') {
                        this.setAudio(this.playIndex);
                        this.play();
                    }
                    else if (this.mode === 'order') {
                        if (this.playIndex < this.options.music.length - 1) {
                            this.setAudio(++this.playIndex);
                            this.play();
                        }
                        else {
                            this.pause();
                        }
                    }
                    else if (this.mode === 'circulation') {
                        this.playIndex = (this.playIndex + 1) % this.options.music.length;
                        this.setAudio(this.playIndex);
                        this.play();
                    }
                }
            }
            else {
                if (this.mode === 'order') {
                    this.pause();
                }
            }
        });

        this.volume(this.user.get('volume'), true, true);
    }

    /**
     * Set music
     */
    setAudio (index) {
        if (typeof index !== 'undefined') {
            this.playIndex = index;
        }

        // set html
        if (this.options.music[this.playIndex].pic) {
            this.template.pic.style.backgroundImage = `url('${this.options.music[this.playIndex].pic}')`;
        }
        else {
            this.template.pic.style.backgroundImage = '';
        }
        this.template.title.innerHTML = this.options.music[this.playIndex].title;
        this.template.author.innerHTML = this.options.music[this.playIndex].author ? ' - ' + this.options.music[this.playIndex].author : '';
        const light = this.container.getElementsByClassName('aplayer-list-light')[0];
        if (light) {
            light.classList.remove('aplayer-list-light');
        }
        this.container.querySelectorAll('.aplayer-list li')[this.playIndex].classList.add('aplayer-list-light');

        this.template.list.scrollTop = this.playIndex * 33;

        this.audio.src = this.options.music[this.playIndex].url;
        this.seek(0);
        if (this.paused) {
            this.pause();
        }
        else {
            this.play();
        }

        this.lrc && this.lrc.switch(this.playIndex);

        // set duration time
        if (this.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
            this.template.dtime.innerHTML = this.audio.duration ? utils.secondToTime(this.audio.duration) : '00:00';
        }
    }

    seek (time) {
        time = Math.max(time, 0);
        if (this.audio.duration) {
            time = Math.min(time, this.audio.duration);
        }

        this.audio.currentTime = time;

        this.bar.set('played', time / this.audio.duration, 'width');
        this.template.ptime.innerHTML = utils.secondToTime(time);
    }

    /**
     * Play music
     */
    play () {
        if (this.paused) {
            this.paused = false;
            this.template.button.classList.remove('aplayer-play');
            this.template.button.classList.add('aplayer-pause');
            this.template.button.innerHTML = '';
            setTimeout(() => {
                this.template.button.innerHTML = Icons.pause;
            }, 100);
        }

        const playedPromise = Promise.resolve(this.audio.play());
        playedPromise.catch(() => {
            this.pause();
        }).then(() => {
        });

        this.timer.enable('progress');

        if (this.options.mutex) {
            for (let i = 0; i < instances.length; i++) {
                if (this !== instances[i]) {
                    instances[i].pause();
                }
            }
        }
    }

    /**
     * Pause music
     */
    pause () {
        if (!this.paused) {
            this.paused = true;

            this.template.button.classList.remove('aplayer-pause');
            this.template.button.classList.add('aplayer-play');
            this.template.button.innerHTML = '';
            setTimeout(() => {
                this.template.button.innerHTML = Icons.play;
            }, 100);
        }

        this.audio.pause();
        this.timer.disable('progress');
    }

    switchVolumeIcon () {
        if (this.volume() >= 0.95) {
            this.template.volumeButton.innerHTML = Icons.volumeUp;
        }
        else if (this.volume() > 0) {
            this.template.volumeButton.innerHTML = Icons.volumeDown;
        }
        else {
            this.template.volumeButton.innerHTML = Icons.volumeOff;
        }
    }

    /**
     * Set volume
     */
    volume (percentage, nostorage) {
        percentage = parseFloat(percentage);
        if (!isNaN(percentage)) {
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.bar.set('volume', percentage, 'height');
            if (!nostorage) {
                this.user.set('volume', percentage);
            }

            this.audio.volume = percentage;
            if (this.audio.muted) {
                this.audio.muted = false;
            }

            this.switchVolumeIcon();
        }

        return this.audio.volume;
    }

    /**
     * bind events
     */
    on (name, callback) {
        this.events.on(name, callback);
    }

    /**
     * toggle between play and pause
     */
    toggle () {
        if (this.template.button.classList.contains('aplayer-play')) {
            this.play();
        }
        else if (this.template.button.classList.contains('aplayer-pause')) {
            this.pause();
        }
    }

    /**
     * get whether multiple music definitions are loaded
     */
    isMultiple () {
        return this.options.music.length > 1;
    }

    /**
     * get next random number
     */
    nextRandomNum () {
        if (this.isMultiple()) {
            const index = this.randomOrder.indexOf(this.playIndex);
            if (index === this.randomOrder.length - 1) {
                return this.randomOrder[0];
            }
            else {
                return this.randomOrder[index + 1];
            }
        }
        else {
            return 0;
        }
    }

    /**
     * add music dynamically
     *
     * @param {Array} newMusic
     */
    addAudio (newMusic) {
        const wasSingle = !this.isMultiple();

        this.options.music = this.options.music.concat(newMusic);

        let newItemHTML = ``;
        for (let i = 0; i < newMusic.length; i++) {
            newItemHTML += `
                <li>
                    <span class="aplayer-list-cur" style="background: ${this.options.theme};"></span>
                    <span class="aplayer-list-index">${this.options.music.length - newMusic.length + i + 1}</span>
                    <span class="aplayer-list-title">${newMusic[i].title}</span>
                    <span class="aplayer-list-author">${newMusic[i].author}</span>
                </li>`;
        }
        this.template.listOl.innerHTML += newItemHTML;

        if (wasSingle && this.isMultiple()) {
            this.container.classList.add('aplayer-withlist');
            this.audio.loop = false;
        }
        const songListLength = this.container.querySelectorAll('.aplayer-list li').length;
        this.template.list.style.height = songListLength * 33 + 'px';

        this.randomOrder = utils.randomOrder(this.options.music.length);
    }

    /**
    * Remove song from playlist
    */
    removeAudio (index) {
        if (this.options.music[index] && this.options.music.length > 1) {
            const list = this.container.querySelectorAll('.aplayer-list li');
            if (index === this.playIndex) {
                if (this.options.music[index + 1]) {
                    this.setAudio(index + 1);
                }
                else {
                    this.setAudio(index - 1);
                }
            }
            if (this.playIndex > index) {
                this.playIndex--;
            }

            this.options.music.splice(index, 1);
            this.audios.splice(index, 1);

            list[index].remove();
            for (let i = index; i < list.length; i++) {
                list[i].getElementsByClassName('aplayer-list-index')[0].textContent = i;
            }
            if (this.options.music.length === 1) {
                this.container.classList.remove('aplayer-withlist');
            }
            this.template.list.style.height = parseInt(this.template.list.style.height, 10) - 33 + 'px';
        }
    }

    /**
     * destroy this player
     */
    destroy () {
        instances.splice(instances.indexOf(this), 1);
        this.pause();
        this.container.innerHTML = '';
        clearInterval(this.playedTime);
        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                delete this[key];
            }
        }
    }
}

export default APlayer;
