import utils from './utils';
import Icons from './icons';
import handleOption from './options';
import Template from './template';
import Bar from './bar';
import User from './user';

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

        this.audios = [];
        this.mode = this.options.mode;

        // save lrc
        this.container = this.options.container;
        if (this.options.showlrc === 2 || this.options.showlrc === true) {
            this.savelrc = [];
            const lrcEle = this.container.getElementsByClassName('aplayer-lrc-content');
            for (let i = 0; i < lrcEle.length; i++) {
                this.savelrc.push(lrcEle[i].innerHTML);
            }
        }
        this.lrcs = [];

        /**
         * Update lrc
         *
         * @param {Number} currentTime
         */
        this.updateLrc = (currentTime = this.audio.currentTime) => {
            if (this.lrcIndex > this.lrc.length - 1 || currentTime < this.lrc[this.lrcIndex][0] || (!this.lrc[this.lrcIndex + 1] || currentTime >= this.lrc[this.lrcIndex + 1][0])) {
                for (let i = 0; i < this.lrc.length; i++) {
                    if (currentTime >= this.lrc[i][0] && (!this.lrc[i + 1] || currentTime < this.lrc[i + 1][0])) {
                        this.lrcIndex = i;
                        this.template.lrc.style.transform = `translateY(${-this.lrcIndex * 16}px)`;
                        this.template.lrc.style.webkitTransform = `translateY(${-this.lrcIndex * 16}px)`;
                        this.template.lrc.getElementsByClassName('aplayer-lrc-current')[0].classList.remove('aplayer-lrc-current');
                        this.template.lrc.getElementsByTagName('p')[i].classList.add('aplayer-lrc-current');
                    }
                }
            }
        };

        // define APlayer events
        const eventTypes = ['play', 'pause', 'canplay', 'playing', 'ended', 'error'];
        this.event = {};
        for (let i = 0; i < eventTypes.length; i++) {
            this.event[eventTypes[i]] = [];
        }
        this.trigger = (type) => {
            for (let i = 0; i < this.event[type].length; i++) {
                this.event[type][i]();
            }
        };

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

        this.template = new Template({
            container: this.container,
            options: this.options,
            mode: this.mode
        });

        if (this.template.info.offsetWidth < 200) {
            this.template.time.classList.add('aplayer-time-narrow');
        }

        this.bar = new Bar(this.template);

        // play and pause button
        this.template.button.addEventListener('click', () => {
            this.toggle();
        });

        // click music list: change music
        this.template.list.addEventListener('click', (e) => {
            let target;
            if (e.target.tagName.toUpperCase() === 'LI') {
                target = e.target;
            }
            else {
                target = e.target.parentElement;
            }
            const musicIndex = parseInt(target.getElementsByClassName('aplayer-list-index')[0].innerHTML) - 1;
            if (musicIndex !== this.playIndex) {
                this.setMusic(musicIndex);
                this.play();
            }
            else {
                this.toggle();
            }
        });

        let barWidth;
        this.template.barWrap.addEventListener('click', (event) => {
            const e = event || window.event;
            barWidth = this.template.barWrap.clientWidth;
            const percentage = (e.clientX - utils.getElementViewLeft(this.template.barWrap)) / barWidth;
            if (isNaN(this.audio.duration)) {
                this.bar.set('played', 0, 'width');
            }
            else {
                this.bar.set('played', percentage, 'width');
                this.template.ptime.innerHTML = utils.secondToTime(percentage * this.audio.duration);
                this.audio.currentTime = this.bar.get('played', 'width') * this.audio.duration;
            }
        });

        this.template.thumb.addEventListener('mouseover', () => {
            this.template.thumb.style.background = this.options.theme;
        });
        this.template.thumb.addEventListener('mouseout', () => {
            this.template.thumb.style.background = '#fff';
        });

        const thumbMove = (event) => {
            const e = event || window.event;
            let percentage = (e.clientX - utils.getElementViewLeft(this.template.barWrap)) / barWidth;
            percentage = percentage > 0 ? percentage : 0;
            percentage = percentage < 1 ? percentage : 1;
            this.bar.set('played', percentage, 'width');
            if (this.options.showlrc) {
                this.updateLrc(this.bar.get('played', 'width') * this.audio.duration);
            }
            this.template.ptime.innerHTML = utils.secondToTime(percentage * this.audio.duration);
        };

        const thumbUp = () => {
            document.removeEventListener('mouseup', thumbUp);
            document.removeEventListener('mousemove', thumbMove);
            if (isNaN(this.audio.duration)) {
                this.bar.set('played', 0, 'width');
            }
            else {
                this.audio.currentTime = this.bar.get('played', 'width') * this.audio.duration;
                this.playedTime = setInterval(() => {
                    this.bar.set('played', this.audio.currentTime / this.audio.duration, 'width');
                    if (this.options.showlrc) {
                        this.updateLrc();
                    }
                    this.template.ptime.innerHTML = utils.secondToTime(this.audio.currentTime);
                    this.trigger('playing');
                }, 100);
            }
        };

        this.template.thumb.addEventListener('mousedown', () => {
            barWidth = this.template.barWrap.clientWidth;
            clearInterval(this.playedTime);
            document.addEventListener('mousemove', thumbMove);
            document.addEventListener('mouseup', thumbUp);
        });

        // control volume
        const barHeight = 35;
        this.template.volumeBarWrap.addEventListener('click', (event) => {
            const e = event || window.event;
            let percentage = (barHeight - e.clientY + utils.getElementViewTop(this.template.volumeBar)) / barHeight;
            percentage = percentage > 0 ? percentage : 0;
            percentage = percentage < 1 ? percentage : 1;
            this.volume(percentage);
        });
        this.template.volumeButton.addEventListener('click', () => {
            if (this.audio.muted) {
                this.audio.muted = false;
                this.switchVolumeIcon();
                this.bar.set('volume', this.volume(), 'height');
            }
            else {
                this.audio.muted = true;
                this.switchVolumeIcon();
                this.bar.set('volume', 0, 'height');
            }
        });

        // mode control
        this.template.mode.addEventListener('click', () => {
            if (this.isMultiple()) {
                if (this.mode === 'random') {
                    this.mode = 'single';
                }
                else if (this.mode === 'single') {
                    this.mode = 'order';
                }
                else if (this.mode === 'order') {
                    this.mode = 'circulation';
                }
                else if (this.mode === 'circulation') {
                    this.mode = 'random';
                }
            }
            else {
                if (this.mode === 'circulation') {
                    this.mode = 'order';
                }
                else {
                    this.mode = 'circulation';
                }
            }
            this.template.mode.innerHTML = Icons[this.mode];
            this.audio.loop = !(this.isMultiple() || this.mode === 'order');
        });

        // toggle menu control
        this.template.list.style.height = this.template.list.offsetHeight + 'px';
        this.template.menu.addEventListener('click', () => {
            if (!this.template.list.classList.contains('aplayer-list-hide')) {
                this.template.list.classList.add('aplayer-list-hide');
            }
            else {
                this.template.list.classList.remove('aplayer-list-hide');
            }
        });

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

        // set the previous audio object
        if (!utils.isMobile && this.audio) {
            this.pause();
            this.audio.currentTime = 0;
        }

        this.template.list.scrollTop = indexMusic * 33;

        // get this audio object
        if (utils.isMobile && this.audio) {
            this.audio.src = this.music.url;
        }
        else if (!utils.isMobile && this.audios[indexMusic]) {
            this.audio = this.audios[indexMusic];
            this.audio.volume = parseInt(this.template.volume.style.height) / 100;
            this.audio.currentTime = 0;
            this.audio.src = this.music.url;
        }
        else {
            this.audio = document.createElement("audio");
            this.audio.src = this.music.url;
            this.audio.preload = this.options.preload ? this.options.preload : 'auto';

            this.audio.addEventListener('play', () => {
                if (this.template.button.classList.contains('aplayer-play')) {
                    this.template.button.classList.remove('aplayer-play');
                    this.template.button.classList.add('aplayer-pause');
                    this.template.button.innerHTML = '';
                    setTimeout(() => {
                        this.template.button.innerHTML = `
                                    <button type="button" class="aplayer-icon aplayer-icon-pause">`
                            + Icons.pause
                            + `     </button>`;
                    }, 100);

                    // pause other players (Thanks @Aprikyblue)
                    if (this.options.mutex) {
                        for (let i = 0; i < instances.length; i++) {
                            if (this !== instances[i]) {
                                instances[i].pause();
                            }
                        }
                    }
                    if (this.playedTime) {
                        clearInterval(this.playedTime);
                    }
                    this.playedTime = setInterval(() => {
                        this.bar.set('played', this.audio.currentTime / this.audio.duration, 'width');
                        if (this.options.showlrc) {
                            this.updateLrc();
                        }
                        this.template.ptime.innerHTML = utils.secondToTime(this.audio.currentTime);
                        this.trigger('playing');
                    }, 100);
                    this.trigger('play');
                }
            });

            const pauseHandler = () => {
                if (this.template.button && (this.template.button.classList.contains('aplayer-pause') || this.ended)) {
                    this.ended = false;
                    this.template.button.classList.remove('aplayer-pause');
                    this.template.button.classList.add('aplayer-play');
                    this.template.button.innerHTML = '';
                    setTimeout(() => {
                        this.template.button.innerHTML = `
                                    <button type="button" class="aplayer-icon aplayer-icon-play">`
                            + Icons.play
                            + `     </button>`;
                    }, 100);
                    clearInterval(this.playedTime);
                    this.trigger('pause');
                }
            };

            this.audio.addEventListener('pause', pauseHandler);

            this.audio.addEventListener('abort', pauseHandler);

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
                this.trigger('pause');
            });

            // audio can play: enough data is available that the media can be played
            this.audio.addEventListener('canplay', () => {
                this.trigger('canplay');
            });

            // multiple music play
            this.ended = false;
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
                                this.ended = true;
                                this.pause();
                                this.trigger('ended');
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
                        this.ended = true;
                        this.pause();
                        this.trigger('ended');
                    }
                }
            });

            // control volume
            this.audio.volume = parseInt(this.template.volume.style.height) / 100;

            // loop
            this.audio.loop = !(this.isMultiple() || this.mode === 'order');

            this.audios[indexMusic] = this.audio;
        }

        /**
         * Parse lrc, suppose multiple time tag
         *
         * @param {String} lrc_s - Format:
         * [mm:ss.xx]lyric
         * [mm:ss.xxx]lyric
         * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
         *
         * @return {String} [[time, text], [time, text], [time, text], ...]
         */
        const parseLrc = (lrc_s) => {
            const lyric = lrc_s.split('\n');
            const lrc = [];
            const lyricLen = lyric.length;
            for (let i = 0; i < lyricLen; i++) {
                // match lrc time
                const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g);
                // match lrc text
                const lrcText = lyric[i].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, '').replace(/^\s+|\s+$/g, '');

                if (lrcTimes) {
                    // handle multiple time tag
                    const timeLen = lrcTimes.length;
                    for (let j = 0; j < timeLen; j++) {
                        const oneTime = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(lrcTimes[j]);
                        const lrcTime = oneTime[1] * 60 + parseInt(oneTime[2]) + parseInt(oneTime[3]) / ((oneTime[3] + '').length === 2 ? 100 : 1000);
                        lrc.push([lrcTime, lrcText]);
                    }
                }
            }
            // sort by time
            lrc.sort((a, b) => a[0] - b[0]);
            return lrc;
        };

        // fill in lrc
        if (this.options.showlrc) {
            const index = indexMusic;

            if (!this.lrcs[index]) {
                let lrcs = '';
                if (this.options.showlrc === 1) {
                    lrcs = this.options.music[index].lrc;
                }
                else if (this.options.showlrc === 2 || this.options.showlrc === true) {
                    lrcs = this.savelrc[index];
                }
                else if (this.options.showlrc === 3) {
                    const xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                                lrcs = xhr.responseText;
                                this.lrcs[index] = parseLrc(lrcs);
                            }
                            else {
                                console.log('Request was unsuccessful: ' + xhr.status);
                                this.lrcs[index] = [['00:00', 'Not available']];
                            }
                            this.lrc = this.lrcs[index];
                            let lrcHTML = '';
                            for (let i = 0; i < this.lrc.length; i++) {
                                lrcHTML += `<p>${this.lrc[i][1]}</p>`;
                            }
                            this.template.lrc.innerHTML = lrcHTML;
                            if (!this.lrcIndex) {
                                this.lrcIndex = 0;
                            }
                            this.template.lrc.getElementsByTagName('p')[0].classList.add('aplayer-lrc-current');
                            this.template.lrc.style.transform = 'translateY(0px)';
                            this.template.lrc.style.webkitTransform = 'translateY(0px)';
                        }
                    };
                    const apiurl = this.options.music[index].lrc;
                    xhr.open('get', apiurl, true);
                    xhr.send(null);
                }
                if (lrcs) {
                    this.lrcs[index] = parseLrc(lrcs);
                }
                else {
                    if (this.options.showlrc === 3) {
                        this.lrcs[index] = [['00:00', 'Loading']];
                    }
                    else {
                        this.lrcs[index] = [['00:00', 'Not available']];
                    }
                }
            }

            this.lrc = this.lrcs[index];
            let lrcHTML = '';
            for (let i = 0; i < this.lrc.length; i++) {
                lrcHTML += `<p>${this.lrc[i][1]}</p>`;
            }
            this.template.lrc.innerHTML = lrcHTML;
            if (!this.lrcIndex) {
                this.lrcIndex = 0;
            }
            this.template.lrc.getElementsByTagName('p')[0].classList.add('aplayer-lrc-current');
            this.template.lrc.style.transform = 'translateY(0px)';
            this.template.lrc.style.webkitTransform = 'translateY(0px)';
        }

        // set duration time
        if (this.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
            this.template.dtime.innerHTML = this.audio.duration ? utils.secondToTime(this.audio.duration) : '00:00';
        }
    }

    /**
     * Play music
     */
    play (time) {
        if (Object.prototype.toString.call(time) === '[object Number]') {
            this.audio.currentTime = time;
        }
        if (this.audio.paused) {
            this.audio.play();
        }
    }

    /**
     * Pause music
     */
    pause () {
        if (!this.audio.paused) {
            this.audio.pause();
        }
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
     * attach event
     */
    on (name, func) {
        if (typeof func === 'function') {
            this.event[name].push(func);
        }
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
