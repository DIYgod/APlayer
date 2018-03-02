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
        this.mode = this.options.mode;

        this.events = new Events();

        // multiple music
        this.playIndex = 0;
        this.music = this.options.music[this.playIndex];

        // add class aplayer-withlrc
        if (this.options.showlrc) {
            this.container.classList.add('aplayer-withlrc');
        }
        if (this.options.music.length > 1) {
            this.container.classList.add('aplayer-withlist');
        }

        // Assume "circulation" mode if single music is loaded and mode isn't already "circulation" or "order".
        if (!this.isMultiple() && this.mode !== 'circulation' && this.mode !== 'order') {
            this.mode = 'circulation';
        }
        this.getRandomOrder();

        this.user = new User(this);

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

        this.bar = new Bar(this.template);

        this.controller = new Controller(this);

        this.timer = new Timer(this);

        this.paused = true;

        this.initAudio();

        if (this.mode === 'random') {
            this.setMusic(this.randomOrder[0]);
        }
        else {
            this.setMusic(0);
        }

        this.volume(this.user.get('volume'), true, true);

        // autoplay
        if (this.options.autoplay) {
            this.play();
        }

        instances.push(this);
    }

    initAudio () {
        this.audio = document.createElement('audio');
        this.audio.preload = this.options.preload ? this.options.preload : 'auto';

        this.audio.addEventListener('play', () => {
            if (this.paused) {
                this.play();
            }
        });

        this.audio.addEventListener('pause', () => {
            if (!this.paused) {
                this.pause();
            }
        });

        for (let i = 0; i < this.events.audioEvents.length; i++) {
            this.audio.addEventListener(this.events.audioEvents[i], () => {
                this.events.trigger(this.events.audioEvents[i]);
            });
        }

        // show audio time: the metadata has loaded or changed
        this.audio.addEventListener('durationchange', () => {
            if (this.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
                this.template.dtime.innerHTML = utils.secondToTime(this.audio.duration);
            }
        });

        // show audio loaded bar: to inform interested parties of progress downloading the media
        this.audio.addEventListener('progress', () => {
            const percentage = this.audio.buffered.length ? this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration : 0;
            this.bar.set('loaded', percentage, 'width');
        });

        // audio download error: an error occurs
        this.audio.addEventListener('error', () => {
            this.template.author.innerHTML = ` - Error happens ╥﹏╥`;
        });

        // multiple music play
        this.audio.addEventListener('ended', () => {
            if (this.isMultiple()) {
                if (this.audio.currentTime !== 0) {
                    if (this.mode === 'random') {
                        this.setMusic(this.nextRandomNum());
                        this.play();
                    }
                    else if (this.mode === 'single') {
                        this.setMusic(this.playIndex);
                        this.play();
                    }
                    else if (this.mode === 'order') {
                        if (this.playIndex < this.options.music.length - 1) {
                            this.setMusic(++this.playIndex);
                            this.play();
                        }
                        else {
                            this.pause();
                        }
                    }
                    else if (this.mode === 'circulation') {
                        this.playIndex = (this.playIndex + 1) % this.options.music.length;
                        this.setMusic(this.playIndex);
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

        // control volume
        this.audio.volume = parseInt(this.template.volume.style.height) / 100;

        // loop
        this.audio.loop = !(this.isMultiple() || this.mode === 'order');
    }

    /**
     * Set music
     */
    setMusic (index) {
        // get this.music
        if (typeof index !== 'undefined') {
            this.playIndex = index;
        }
        const indexMusic = this.playIndex;
        this.music = this.options.music[indexMusic];

        // set html
        if (this.music.pic) {
            this.template.pic.style.backgroundImage = `url('${this.music.pic}')`;
        }
        else {
            this.template.pic.style.backgroundImage = '';
        }
        this.template.title.innerHTML = this.music.title;
        this.template.author.innerHTML = this.music.author ? ' - ' + this.music.author : '';
        const light = this.container.getElementsByClassName('aplayer-list-light')[0];
        if (light) {
            light.classList.remove('aplayer-list-light');
        }
        this.template.listItems[indexMusic].classList.add('aplayer-list-light');

        this.template.list.scrollTop = indexMusic * 33;

        this.pause();
        this.audio.currentTime = 0;
        this.audio.src = this.music.url;

        this.lrc && this.lrc.switch(indexMusic);

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
     * get random order, using Fisher–Yates shuffle
     */
    getRandomOrder () {
        function random (min, max) {
            if (max) {
                max = min;
                min = 0;
            }
            return min + Math.floor(Math.random() * (max - min + 1));
        }
        function shuffle (arr) {
            const length = arr.length,
                shuffled = new Array(length);
            for (let index = 0, rand; index < length; index++) {
                rand = random(0, index);
                if (rand !== index) { shuffled[index] = shuffled[rand]; }
                shuffled[rand] = arr[index];
            }
            return shuffled;
        }
        if (this.isMultiple()) {
            this.randomOrder = shuffle([...Array(this.options.music.length)].map(function (item, i) {
                return i;
            }));
        }
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
    * Remove song from playlist
    */
    removeSong (indexOfSong) {
        if (this.options.music[indexOfSong]) { // Check if song exists
            if (this.options.music[indexOfSong + 1] || this.options.music[indexOfSong - 1]) {
                if (indexOfSong === this.playIndex) {
                    if (this.options.music[indexOfSong + 1]) { // Play next song if it exists.
                        this.setMusic(indexOfSong + 1);
                        this.playIndex = this.playIndex - 1; // Adjust play index for removed song
                    }
                    else if (!this.options.music[indexOfSong + 1]) { // Play previous song if it exists.
                        this.setMusic(indexOfSong - 1);
                    }
                }
                else {
                    if (indexOfSong < this.playIndex) {
                        this.playIndex = this.playIndex - 1;
                    }
                }
                if (this.template.list[indexOfSong + 1]) {
                    const targetSong = this.template.list[indexOfSong - 1];
                    targetSong.getElementsByClassName('aplayer-list-index')[0].textContent = indexOfSong;
                }
                else {
                    for (let i = 1; i < this.template.list.length; i++) {
                        if (this.template.list[indexOfSong + i]) {
                            const targetSong = this.template.list[indexOfSong + i];
                            targetSong.getElementsByClassName('aplayer-list-index')[0].textContent = indexOfSong + i;
                        }
                    }
                }
                this.options.music.splice(indexOfSong, 1); // Delete song from music array
                this.audios.splice(indexOfSong, 1); // Delete song from audios array
                this.template.list[indexOfSong].remove();
                if (this.options.music[0] && this.options.music[1]) {
                    this.multiple = false;
                    this.container.classList.remove('aplayer-withlist');
                }
            }
            const listHeight = parseInt(this.template.list.style.height, 10);
            this.template.list.style.height = listHeight - 33 + "px";
        }
        else {
            console.error("ERROR: Song does not exist");
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

    /**
     * add music dynamically
     *
     * @param {Array} newMusic
     */
    addMusic (newMusic) {
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
        const songListLength = this.template.listItems.length;
        this.template.list.style.height = songListLength * 33 + 'px';

        this.getRandomOrder();
    }
}

export default APlayer;
