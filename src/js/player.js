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
import tplListItem from '../template/list-item.art';

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
        this.playIndex = 0;
        this.paused = true;
        this.playedPromise = Promise.resolve();
        this.mode = 'normal';

        this.randomOrder = utils.randomOrder(this.options.audio.length);

        this.container.classList.add('aplayer');
        if (this.options.lrcType) {
            this.container.classList.add('aplayer-withlrc');
        }
        if (this.options.audio.length > 1) {
            this.container.classList.add('aplayer-withlist');
        }
        if (utils.isMobile) {
            this.container.classList.add('aplayer-mobile');
        }
        this.arrow = this.container.offsetWidth <= 300;
        if (this.arrow) {
            this.container.classList.add('aplayer-arrow');
        }
        if (this.options.mini) {
            this.setMode('mini');
        }

        // save lrc
        this.container = this.options.container;
        if (this.options.lrcType === 2 || this.options.lrcType === true) {
            const lrcEle = this.container.getElementsByClassName('aplayer-lrc-content');
            for (let i = 0; i < lrcEle.length; i++) {
                if (this.options.audio[i]) {
                    this.options.audio[i].lrc = lrcEle[i].innerHTML;
                }
            }
        }

        this.template = new Template({
            container: this.container,
            options: this.options,
            randomOrder: this.randomOrder,
        });

        if (this.template.info.offsetWidth < 200) {
            this.template.time.classList.add('aplayer-time-narrow');
        }

        if (this.options.lrcType) {
            this.lrc = new Lrc({
                container: this.template.lrc,
                async: this.options.lrcType === 3,
                content: this.options.audio.map((item) => item.lrc),
                player: this,
            });
        }
        this.events = new Events();
        this.user = new User(this);
        this.bar = new Bar(this.template);
        this.controller = new Controller(this);
        this.timer = new Timer(this);

        this.initAudio();
        if (this.options.order === 'random') {
            this.switchAudio(this.randomOrder[0]);
        }
        else {
            this.switchAudio(0);
        }

        // autoplay
        if (this.options.autoplay) {
            this.play();
        }

        instances.push(this);
    }

    initAudio () {
        this.audio = document.createElement('audio');
        this.audio.preload = this.options.preload;

        for (let i = 0; i < this.events.audioEvents.length; i++) {
            this.audio.addEventListener(this.events.audioEvents[i], (e) => {
                this.events.trigger(this.events.audioEvents[i], e);
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

        this.on('timeupdate', () => {
            if (!this.disableTimeupdate) {
                this.bar.set('played', this.audio.currentTime / this.audio.duration, 'width');
                this.lrc && this.lrc.update();
                const currentTime = utils.secondToTime(this.audio.currentTime);
                if (this.template.ptime.innerHTML !== currentTime) {
                    this.template.ptime.innerHTML = currentTime;
                }
            }
        });

        // show audio time: the metadata has loaded or changed
        this.on('durationchange', () => {
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
            this.notice('An audio error has occurred.');
        });

        // multiple audio play
        this.on('ended', () => {
            if (this.options.loop === 'none') {
                if (this.options.order === 'list') {
                    if (this.playIndex < this.options.audio.length - 1) {
                        this.switchAudio((this.playIndex + 1) % this.options.audio.length);
                        this.play();
                    }
                    else {
                        this.switchAudio((this.playIndex + 1) % this.options.audio.length);
                        this.pause();
                    }
                }
                else if (this.options.order === 'random') {
                    if (this.randomOrder.indexOf(this.playIndex) < this.randomOrder.length - 1) {
                        this.switchAudio(this.nextRandomNum());
                        this.play();
                    }
                    else {
                        this.switchAudio(this.nextRandomNum());
                        this.pause();
                    }
                }
            }
            else if (this.options.loop === 'one') {
                this.switchAudio(this.playIndex);
                this.play();
            }
            else if (this.options.loop === 'all') {
                if (this.options.order === 'list') {
                    this.switchAudio((this.playIndex + 1) % this.options.audio.length);
                }
                else if (this.options.order === 'random') {
                    this.switchAudio(this.nextRandomNum());
                }
                this.play();
            }
        });

        this.volume(this.user.get('volume'), true);
    }

    switchAudio (index) {
        this.handlePlayPromise(() => {
            this.events.trigger('switchaudio', index);
            if (typeof index !== 'undefined') {
                this.playIndex = index;
            }

            const audio = this.options.audio[this.playIndex];
            // set html
            if (audio.cover) {
                this.template.pic.style.backgroundImage = `url('${audio.cover}')`;
            }
            else {
                this.template.pic.style.backgroundImage = '';
            }
            this.theme();
            this.template.title.innerHTML = audio.name;
            this.template.author.innerHTML = audio.artist ? ' - ' + audio.artist : '';
            const light = this.container.getElementsByClassName('aplayer-list-light')[0];
            if (light) {
                light.classList.remove('aplayer-list-light');
            }
            this.container.querySelectorAll('.aplayer-list li')[this.playIndex].classList.add('aplayer-list-light');

            this.template.list.scrollTop = this.playIndex * 33;

            // mse
            if (this.hls) {
                this.hls.destroy();
                this.hls = null;
            }
            let type = audio.type;
            if (this.options.customAudioType && this.options.customAudioType[type]) {
                if (Object.prototype.toString.call(this.options.customAudioType[type]) === '[object Function]') {
                    this.options.customAudioType[type](this.audio, audio, this);
                }
                else {
                    console.error(`Illegal customType: ${type}`);
                }
            }
            else {
                if (!type || type === 'auto') {
                    if (/m3u8(#|\?|$)/i.exec(audio.url)) {
                        type = 'hls';
                    }
                    else {
                        type = 'normal';
                    }
                }
                if (type === 'hls') {
                    if (Hls.isSupported()) {
                        this.hls = new Hls();
                        this.hls.loadSource(audio.url);
                        this.hls.attachMedia(this.audio);
                    }
                    else if (this.audio.canPlayType('application/x-mpegURL') || this.audio.canPlayType('application/vnd.apple.mpegURL')) {
                        this.audio.src = audio.url;
                    }
                    else {
                        this.notice('Error: HLS is not supported.');
                    }
                }
                else if (type === 'normal') {
                    this.audio.src = audio.url;
                }
            }

            this.seek(0);

            let playPromise;
            if (!this.paused) {
                playPromise = Promise.resolve(this.audio.play()).catch((err) => {
                    console.error(err);
                    this.pause();
                });
            }

            this.lrc && this.lrc.switch(this.playIndex);

            // set duration time
            if (this.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
                this.template.dtime.innerHTML = this.audio.duration ? utils.secondToTime(this.audio.duration) : '00:00';
            }

            return playPromise;
        });
    }

    theme (color = this.options.audio[this.playIndex].theme, index = this.playIndex) {
        this.options.audio[index].theme = color;
        this.template.listCurs[index].style.backgroundColor = color;
        if (index === this.playIndex) {
            this.template.pic.style.backgroundColor = color;
            this.template.played.style.background = color;
            this.template.thumb.style.background = color;
            this.template.volume.style.background = color;
        }
    }

    seek (time) {
        time = Math.max(time, 0);
        if (this.audio.duration) {
            time = Math.min(time, this.audio.duration);
        }

        this.audio.currentTime = time;

        if (isNaN(this.audio.duration)) {
            this.bar.set('played', 0, 'width');
        }
        else {
            this.bar.set('played', time / this.audio.duration, 'width');
        }
        this.template.ptime.innerHTML = utils.secondToTime(time);
    }

    play () {
        this.handlePlayPromise(() => {
            if (this.paused) {
                this.paused = false;
                this.template.button.classList.remove('aplayer-play');
                this.template.button.classList.add('aplayer-pause');
                this.template.button.innerHTML = '';
                setTimeout(() => {
                    this.template.button.innerHTML = Icons.pause;
                }, 100);
            }

            const playPromise = Promise.resolve(this.audio.play()).catch((err) => {
                console.error(err);
                this.pause();
            });

            this.timer.enable('loading');

            if (this.options.mutex) {
                for (let i = 0; i < instances.length; i++) {
                    if (this !== instances[i]) {
                        instances[i].pause();
                    }
                }
            }

            return playPromise;
        });
    }

    pause () {
        this.handlePlayPromise(() => {
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

            this.container.classList.remove('aplayer-loading');
            this.timer.disable('loading');
        });
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

        return this.audio.muted ? 0 : this.audio.volume;
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
     * get whether multiple audio definitions are loaded
     */
    isMultiple () {
        return this.options.audio.length > 1;
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
     * add audio dynamically
     *
     * @param {Array} newMusic
     */
    addAudio (newMusic) {
        this.events.trigger('addaudio', newMusic);
        const wasSingle = !this.isMultiple();

        this.template.listOl.innerHTML += tplListItem({
            theme: this.options.theme,
            audio: newMusic,
            index: this.options.audio.length + 1
        });

        this.options.audio = this.options.audio.concat(newMusic);

        if (wasSingle && this.isMultiple()) {
            this.container.classList.add('aplayer-withlist');
        }
        this.template.list.style.height = this.options.audio.length * 33 - 1 + 'px';
        this.template.listOl.style.height = this.options.audio.length * 33 - 1 + 'px';

        this.randomOrder = utils.randomOrder(this.options.audio.length);
        this.template.listCurs = this.container.querySelectorAll('.aplayer-list-cur');
    }

    /**
    * Remove song from playlist
    */
    removeAudio (index) {
        this.events.trigger('removeaudio', index);
        if (this.options.audio[index] && this.options.audio.length > 1) {
            const list = this.container.querySelectorAll('.aplayer-list li');

            this.options.audio.splice(index, 1);

            if (index === this.playIndex) {
                if (this.options.audio[index + 1]) {
                    this.switchAudio(index);
                }
                else {
                    this.switchAudio(index - 1);
                }
            }
            if (this.playIndex > index) {
                this.playIndex--;
            }

            list[index].remove();
            for (let i = index; i < list.length; i++) {
                list[i].getElementsByClassName('aplayer-list-index')[0].textContent = i;
            }
            if (this.options.audio.length === 1) {
                this.container.classList.remove('aplayer-withlist');
            }
            this.template.list.style.height = this.options.audio.length * 33 - 1 + 'px';
            this.template.listOl.style.height = this.options.audio.length * 33 - 1 + 'px';

            this.template.listCurs = this.container.querySelectorAll('.aplayer-list-cur');
        }
    }

    /**
     * destroy this player
     */
    destroy () {
        instances.splice(instances.indexOf(this), 1);
        this.pause();
        this.container.innerHTML = '';
        this.audio.src = '';
        this.timer.destroy();
        this.events.trigger('destroy');
    }

    setMode (mode = 'normal') {
        this.mode = mode;
        if (mode === 'mini') {
            this.container.classList.add('aplayer-narrow');
        }
        else if (mode === 'normal') {
            this.container.classList.remove('aplayer-narrow');
        }
    }

    notice (text, time = 2000, opacity = 0.8) {
        this.template.notice.innerHTML = text;
        this.template.notice.style.opacity = opacity;
        if (this.noticeTime) {
            clearTimeout(this.noticeTime);
        }
        this.events.trigger('notice_show', text);
        if (time) {
            this.noticeTime = setTimeout(() => {
                this.template.notice.style.opacity = 0;
                this.events.trigger('notice_hide');
            }, time);
        }
    }

    handlePlayPromise (callback) {
        this.playedPromise = this.playedPromise.then(callback).catch((err) => {
            console.error(err);
        });
    }

    static get version () {
        /* global APLAYER_VERSION */
        return APLAYER_VERSION;
    }
}

export default APlayer;
