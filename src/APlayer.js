require('./APlayer.scss');

let instances = [];

class APlayer {
    /**
     * APlayer constructor function
     *
     * @param {Object} option - See README
     * @constructor
     */
    constructor(option) {
        this.svg = {
            'play': ['0 0 16 31', 'M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z'],
            'pause': ['0 0 17 32', 'M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z'],
            'volume-up': ['0 0 28 32', 'M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056zM29.728 16q0 4.096-2.272 7.552t-6.048 5.056q-0.224 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.64 0.704-1.056 0.128-0.064 0.384-0.192t0.416-0.192q0.8-0.448 1.44-0.896 2.208-1.632 3.456-4.064t1.216-5.152-1.216-5.152-3.456-4.064q-0.64-0.448-1.44-0.896-0.128-0.096-0.416-0.192t-0.384-0.192q-0.704-0.416-0.704-1.056 0-0.448 0.32-0.8t0.832-0.352q0.224 0 0.448 0.096 3.776 1.632 6.048 5.056t2.272 7.552z'],
            'volume-down': ['0 0 28 32', 'M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z'],
            'volume-off': ['0 0 28 32', 'M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z'],
            'loop': ['0 0 29 32', 'M25.6 9.92q1.344 0 2.272 0.928t0.928 2.272v9.28q0 1.28-0.928 2.24t-2.272 0.96h-22.4q-1.28 0-2.24-0.96t-0.96-2.24v-9.28q0-1.344 0.96-2.272t2.24-0.928h8v-3.52l6.4 5.76-6.4 5.76v-3.52h-6.72v6.72h19.84v-6.72h-4.8v-4.48h6.080z'],
            'menu': ['0 0 22 32', 'M20.8 14.4q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2zM1.6 11.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2zM20.8 20.8q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2z']
        };
        this.getSVG = (type) => {
            return `
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" version="1.1" viewBox="${this.svg[type][0]}" width="100%">
                    <use xlink:href="#aplayer-${type}"></use>
                    <path class="aplayer-fill" d="${this.svg[type][1]}" id="aplayer-${type}"></path>
                </svg>
            `;
        };

        this.isMobile = /mobile/i.test(window.navigator.userAgent);
        // compatibility: some mobile browsers don't suppose autoplay
        if (this.isMobile) {
            option.autoplay = false;
        }

        // default options
        const defaultOption = {
            element: document.getElementsByClassName('aplayer')[0],
            narrow: false,
            autoplay: false,
            mutex: true,
            showlrc: 0,
            theme: '#b7daff',
            loop: true
        };
        for (let defaultKey in defaultOption) {
            if (defaultOption.hasOwnProperty(defaultKey) && !option.hasOwnProperty(defaultKey)) {
                option[defaultKey] = defaultOption[defaultKey];
            }
        }

        // multiple music
        this.playIndex = Object.prototype.toString.call(option.music) === '[object Array]' ? 0 : -1;

        this.option = option;
        this.audios = [];
        this.loop = option.loop;

        /**
         * Parse second to 00:00 format
         *
         * @param {Number} second
         * @return {String} 00:00 format
         */
        this.secondToTime = (second) => {
            const add0 = (num) => {
                return num < 10 ? '0' + num : '' + num;
            };
            const min = parseInt(second / 60);
            const sec = parseInt(second - min * 60);
            return add0(min) + ':' + add0(sec);
        };

        /**
         * Parse lrc, suppose multiple time tag
         *
         * @param {Array} arr - Format:
         * [mm:ss.xx]lyric
         * [mm:ss.xxx]lyric
         * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
         *
         * @return {Array} [[[time, text], [time, text], [time, text], ...], [[time, text], [time, text], [time, text], ...], ...]
         */
        this.parseLrc = (arr) => {
            let lrcs = [];
            for (let k = 0; k < arr.length; k++) {
                const lyric = arr[k].split('\n');
                let lrc = [];
                const lyricLen = lyric.length;
                for (let i = 0; i < lyricLen; i++) {
                    // match lrc time
                    const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g);
                    // match lrc text
                    const lrcText = lyric[i].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, '').replace(/^\s+|\s+$/g, '');

                    if (lrcTimes != null) {
                        // handle multiple time tag
                        const timeLen = lrcTimes.length;
                        for (let j = 0; j < timeLen; j++) {
                            const oneTime = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(lrcTimes[j]);
                            const lrcTime = (oneTime[1]) * 60 + parseInt(oneTime[2]) + parseInt(oneTime[3]) / ((oneTime[3] + '').length === 2 ? 100 : 1000);
                            lrc.push([lrcTime, lrcText]);
                        }
                    }
                }
                // sort by time
                lrc.sort((a, b) => a[0] - b[0]);
                lrcs.push(lrc);
            }
            return lrcs;
        };

        /**
         * Update progress bar, including loading progress bar and play progress bar
         *
         * @param {String} type - Point out which bar it is, should be played loaded or volume
         * @param {Number} percentage
         * @param {String} direction - Point out the direction of this bar, Should be height or width
         */
        this.updateBar = (type, percentage, direction) => {
            percentage = percentage > 0 ? percentage : 0;
            percentage = percentage < 1 ? percentage : 1;
            this[type + 'Bar'].style[direction] = percentage * 100 + '%';
        };

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
                        this.lrcContents.style.transform = `translateY(${-this.lrcIndex * 20}px)`;
                        this.lrcContents.style.webkitTransform = `translateY(${-this.lrcIndex * 20}px)`;
                        this.lrcContents.getElementsByClassName('aplayer-lrc-current')[0].classList.remove('aplayer-lrc-current');
                        this.lrcContents.getElementsByTagName('p')[i].classList.add('aplayer-lrc-current');
                    }
                }
            }
        };

        // define APlayer events
        this.eventTypes = ['play', 'pause', 'canplay', 'playing', 'ended', 'error'];
        this.event = {};
        for (let i = 0; i < this.eventTypes.length; i++) {
            this.event[this.eventTypes[i]] = [];
        }
        this.trigger = (type) => {
            for (let i = 0; i < this.event[type].length; i++) {
                this.event[type][i]();
            }
        }
    }

    /**
     * AutoLink initialization function
     */
    init() {
        this.element = this.option.element;
        this.multiple = this.playIndex > -1;
        this.music = this.multiple ? this.option.music[this.playIndex] : this.option.music;

        let i;
        // parser lrc
        if (this.option.showlrc) {
            let lrcs = [];
            if (this.option.showlrc === 1) {
                if (this.multiple) {
                    for (i = 0; i < this.option.music.length; i++) {
                        lrcs.push(this.option.music[i].lrc);
                    }
                }
                else {
                    lrcs.push(this.option.music.lrc);
                }
            }
            else if (this.option.showlrc === 2 || this.option.showlrc === true)  {
                for (i = 0; i < this.element.getElementsByClassName('aplayer-lrc-content').length; i++) {
                    lrcs.push(this.element.getElementsByClassName('aplayer-lrc-content')[i].innerHTML);
                }
            }

            this.lrcs = this.parseLrc(lrcs);
        }

        // add class aplayer-withlrc
        if (this.option.showlrc) {
            this.element.classList.add('aplayer-withlrc');
        }

        // fill in HTML
        let eleHTML = `
            <div class="aplayer-pic" ${(this.music.pic ? (`style="background-image: url('${this.music.pic}');"`) : ``)}>
                <div class="aplayer-button aplayer-play">
                    <button class="aplayer-icon aplayer-icon-play">`
            +           this.getSVG('play')
            + `     </button>
                </div>
            </div>
            <div class="aplayer-info">
                <div class="aplayer-music">
                    <span class="aplayer-title"></span>
                    <span class="aplayer-author"></span>
                </div>
                <div class="aplayer-lrc">
                    <div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>
                </div>
                <div class="aplayer-controller">
                    <div class="aplayer-bar-wrap">
                        <div class="aplayer-bar">
                            <div class="aplayer-loaded" style="width: 0"></div>
                            <div class="aplayer-played" style="width: 0; background: ${this.option.theme};">
                                <span class="aplayer-thumb" style="border: 1px solid ${this.option.theme};"></span>
                            </div>
                        </div>
                    </div>
                    <div class="aplayer-time">
                        <span class="aplayer-time-inner">
                            - <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>
                        </span>
                        <div class="aplayer-volume-wrap">
                            <button class="aplayer-icon aplayer-icon-volume-down">`
            +                   this.getSVG('volume-down')
            + `             </button>
                            <div class="aplayer-volume-bar-wrap">
                                <div class="aplayer-volume-bar">
                                    <div class="aplayer-volume" style="height: 80%; background: ${this.option.theme};"></div>
                                </div>
                            </div>
                        </div>
                        <button class="aplayer-icon aplayer-icon-loop${(this.loop ? `` : ` aplayer-noloop`)}">`
            +               this.getSVG('loop')
            + `         </button>
                        ${(this.multiple ? `<button class="aplayer-icon aplayer-icon-menu">`
            +               this.getSVG('menu')
            + `         </button>` : ``)}
                    </div>
                </div>
            </div>`;
        if (this.multiple) {
            eleHTML += `
            <div class="aplayer-list">
                <ol>`;
            for (i = 0; i < this.option.music.length; i++) {
                eleHTML += `
                    <li>
                        <span class="aplayer-list-cur" style="background: ${this.option.theme};"></span>
                        <span class="aplayer-list-index">${(i + 1)}</span>
                        <span class="aplayer-list-title">${this.option.music[i].title}</span>
                        <span class="aplayer-list-author">${this.option.music[i].author}</span>
                    </li>`
            }
            eleHTML += `
                </ol>
            </div>`
        }
        this.element.innerHTML = eleHTML;

        // hide loop button in arrow container
        if (this.element.offsetWidth < 300) {
            this.element.getElementsByClassName('aplayer-icon-loop')[0].style.display = 'none';
        }

        this.ptime = this.element.getElementsByClassName('aplayer-ptime')[0];

        if (this.element.getElementsByClassName('aplayer-info')[0].offsetWidth < 200) {
            this.element.getElementsByClassName('aplayer-time')[0].classList.add('aplayer-time-narrow');
        }
        // fix the width of aplayer bar
        this.bar = this.element.getElementsByClassName('aplayer-bar-wrap')[0];
        this.bar.style.marginRight = this.element.getElementsByClassName('aplayer-time')[0].offsetWidth + 5 + 'px';

        // switch to narrow style
        if (this.option.narrow) {
            this.element.classList.add('aplayer-narrow');
        }

        // play and pause button
        this.button = this.element.getElementsByClassName('aplayer-button')[0];
        this.button.addEventListener('click', (e) => {
            if (this.button.classList.contains('aplayer-play')) {
                this.play();
            }
            else if (this.button.classList.contains('aplayer-pause')) {
                this.pause();
            }
        });

        // click music list: change music
        if (this.multiple) {
            const listItem = this.element.getElementsByClassName('aplayer-list')[0].getElementsByTagName('li');
            for (let i = 0; i < this.option.music.length; i++) {
                listItem[i].addEventListener('click', () => {
                    const musicIndex = parseInt(listItem[i].getElementsByClassName('aplayer-list-index')[0].innerHTML) - 1;
                    if (musicIndex !== this.playIndex) {
                        this.setMusic(musicIndex);
                        if (this.isMobile) {
                            this.pause();
                        }
                        else {
                            this.play();
                        }
                    }
                    else {
                        this.toggle();
                    }
                });
            }
        }

        // control play progress
        this.playedBar = this.element.getElementsByClassName('aplayer-played')[0];
        this.loadedBar = this.element.getElementsByClassName('aplayer-loaded')[0];
        this.thumb = this.element.getElementsByClassName('aplayer-thumb')[0];
        let barWidth;
        this.bar.addEventListener('click', (event) => {
            const e = event || window.event;
            barWidth = this.bar.clientWidth;
            const percentage = (e.clientX - getElementViewLeft(this.bar)) / barWidth;
            this.updateBar('played', percentage, 'width');
            this.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = this.secondToTime(percentage * this.audio.duration);
            this.audio.currentTime = parseFloat(this.playedBar.style.width) / 100 * this.audio.duration;
        });

        this.thumb.addEventListener('mouseover', () => {
            this.thumb.style.background = this.option.theme;
        });
        this.thumb.addEventListener('mouseout', () => {
            this.thumb.style.background = '#fff';
        });

        const thumbMove = (event) => {
            const e = event || window.event;
            let percentage = (e.clientX - getElementViewLeft(this.bar)) / barWidth;
            percentage = percentage > 0 ? percentage : 0;
            percentage = percentage < 1 ? percentage : 1;
            this.updateBar('played', percentage, 'width');
            if (this.option.showlrc) {
                this.updateLrc(parseFloat(this.playedBar.style.width) / 100 * this.audio.duration);
            }
            this.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = this.secondToTime(percentage * this.audio.duration);
        };

        const thumbUp = () => {
            document.removeEventListener('mouseup', thumbUp);
            document.removeEventListener('mousemove', thumbMove);
            this.audio.currentTime = parseFloat(this.playedBar.style.width) / 100 * this.audio.duration;
            this.playedTime = setInterval(() => {
                this.updateBar('played', this.audio.currentTime / this.audio.duration, 'width');
                if (this.option.showlrc) {
                    this.updateLrc();
                }
                this.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = this.secondToTime(this.audio.currentTime);
                this.trigger('playing');
            }, 100);
        };

        this.thumb.addEventListener('mousedown', () => {
            barWidth = this.bar.clientWidth;
            clearInterval(this.playedTime);
            document.addEventListener('mousemove', thumbMove);
            document.addEventListener('mouseup', thumbUp);
        });

        // control volume
        this.volumeBar = this.element.getElementsByClassName('aplayer-volume')[0];
        const volumeBarWrap = this.element.getElementsByClassName('aplayer-volume-bar')[0];
        this.volumeicon = this.element.getElementsByClassName('aplayer-time')[0].getElementsByTagName('button')[0];
        const barHeight = 35;
        this.element.getElementsByClassName('aplayer-volume-bar-wrap')[0].addEventListener('click', (event) => {
            const e = event || window.event;
            let percentage = (barHeight - e.clientY + getElementViewTop(volumeBarWrap)) / barHeight;
            percentage = percentage > 0 ? percentage : 0;
            percentage = percentage < 1 ? percentage : 1;
            this.volume(percentage);
        });
        this.volumeicon.addEventListener('click', () => {
            if (this.audio.muted) {
                this.audio.muted = false;
                this.volumeicon.className = this.audio.volume === 1 ? 'aplayer-icon aplayer-icon-volume-up' : 'aplayer-icon aplayer-icon-volume-down';
                if (this.audio.volume === 1) {
                    this.volumeicon.className = 'aplayer-icon aplayer-icon-volume-up';
                    this.volumeicon.innerHTML = this.getSVG('volume-up');
                }
                else {
                    this.volumeicon.className = 'aplayer-icon aplayer-icon-volume-down';
                    this.volumeicon.innerHTML = this.getSVG('volume-down');
                }
                this.updateBar('volume', this.audio.volume, 'height');
            }
            else {
                this.audio.muted = true;
                this.volumeicon.className = 'aplayer-icon aplayer-icon-volume-off';
                this.volumeicon.innerHTML = this.getSVG('volume-off');
                this.updateBar('volume', 0, 'height');
            }
        });

        // get element's view position
        function getElementViewLeft(element) {
            let actualLeft = element.offsetLeft;
            let current = element.offsetParent;
            let elementScrollLeft;
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
            return actualLeft - elementScrollLeft;
        }

        function getElementViewTop(element) {
            let actualTop = element.offsetTop;
            let current = element.offsetParent;
            let elementScrollTop;
            while (current !== null) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            elementScrollTop = document.body.scrollTop + document.documentElement.scrollTop;
            return actualTop - elementScrollTop;
        }

        // loop control
        const loopEle = this.element.getElementsByClassName('aplayer-icon-loop')[0];
        loopEle.addEventListener('click', () => {
            if (this.loop) {
                loopEle.classList.add('aplayer-noloop');
                this.loop = false;
                this.audio.loop = this.multiple ? false : this.loop;
            }
            else {
                loopEle.classList.remove('aplayer-noloop');
                this.loop = true;
                this.audio.loop = this.multiple ? false : this.loop;
            }
        });

        // toggle menu control
        if (this.multiple) {
            const list = this.element.getElementsByClassName('aplayer-list')[0];
            list.style.height = list.offsetHeight + 'px';
            this.element.getElementsByClassName('aplayer-icon-menu')[0].addEventListener('click', () => {
                if (!list.classList.contains('aplayer-list-hide')) {
                    list.classList.add('aplayer-list-hide');
                }
                else {
                    list.classList.remove('aplayer-list-hide');
                }
            });
        }

        this.setMusic(0);

        instances.push(this);
    }

    /**
     * Set music
     */
    setMusic(index) {
        // get this.music
        if (this.multiple && typeof(index) !== 'undefined') {
            this.playIndex = index;
        }
        const indexMusic = this.playIndex;
        this.music = this.multiple ? this.option.music[indexMusic] : this.option.music;

        // set html
        if (this.music.pic) {
            this.element.getElementsByClassName('aplayer-pic')[0].style.backgroundImage = `url('${this.music.pic}')`;
        }
        this.element.getElementsByClassName('aplayer-title')[0].innerHTML = this.music.title;
        this.element.getElementsByClassName('aplayer-author')[0].innerHTML = ` - ${this.music.author}`;
        if (this.multiple) {
            if (this.element.getElementsByClassName('aplayer-list-light')[0]) {
                this.element.getElementsByClassName('aplayer-list-light')[0].classList.remove('aplayer-list-light');
            }
            this.element.getElementsByClassName('aplayer-list')[0].getElementsByTagName('li')[indexMusic].classList.add('aplayer-list-light');
        }

        // set the previous audio object
        if (this.audio) {
            this.pause();
            this.audio.currentTime = 0;
        }

        // get this audio object
        if ((this.multiple && !this.audios[indexMusic]) || this.playIndex === -1) {
            this.audio = document.createElement("audio");
            this.audio.src = this.music.url;
            if (this.option.preload) {
                this.audio.preload = this.option.preload;
            }
            else {
                this.audio.preload = this.isMobile ? 'none' : 'metadata';
            }

            // show audio time: the metadata has loaded or changed
            this.audio.addEventListener('durationchange', () => {
                if (this.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
                    this.element.getElementsByClassName('aplayer-dtime')[0].innerHTML = this.secondToTime(this.audio.duration);
                }
            });

            // show audio loaded bar: to inform interested parties of progress downloading the media
            this.audio.addEventListener('progress', () => {
                const percentage = this.audio.buffered.length ? this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration : 0;
                this.updateBar('loaded', percentage, 'width');
            });

            // audio download error: an error occurs
            this.audio.addEventListener('error', () => {
                this.element.getElementsByClassName('aplayer-author')[0].innerHTML = ` - Error happens ╥﹏╥`;
                this.trigger('pause');
            });

            // audio can play: enough data is available that the media can be played
            this.audio.addEventListener('canplay', () => {
                this.trigger('canplay');
            });

            // multiple music play
            this.ended = false;
            if (this.multiple) {
                this.audio.addEventListener('ended', () => {
                    if (this.isMobile) {
                        this.ended = true;
                        this.pause();
                        return;
                    }
                    if (this.audio.currentTime !== 0) {
                        if (this.playIndex < this.option.music.length - 1) {
                            this.setMusic(++this.playIndex);
                        }
                        else if (this.loop) {
                            this.setMusic(0);
                        }
                        else if (!this.loop) {
                            this.ended = true;
                            this.pause();
                            this.trigger('ended');
                        }
                    }
                });
            }
            else {
                this.audio.addEventListener('ended', () => {
                    if (!this.loop) {
                        this.ended = true;
                        this.pause();
                        this.trigger('ended');
                    }
                });
            }

            // control volume
            this.audio.volume = parseInt(this.element.getElementsByClassName('aplayer-volume')[0].style.height) / 100;

            // loop
            this.audio.loop = this.multiple ? false : this.loop;

            if (this.multiple) {
                this.audios[indexMusic] = this.audio;
            }
        }
        else {
            this.audio = this.audios[indexMusic];
            this.audio.volume = parseInt(this.element.getElementsByClassName('aplayer-volume')[0].style.height) / 100;
            this.audio.currentTime = 0;
        }

        // fill in lrc
        if (this.option.showlrc) {
            this.lrc = this.multiple ? this.lrcs[indexMusic] : this.lrcs[0];
            let lrcHTML = '';
            this.lrcContents = this.element.getElementsByClassName('aplayer-lrc-contents')[0];
            for (let i = 0; i < this.lrc.length; i++) {
                lrcHTML += `<p>${this.lrc[i][1]}</p>`;
            }
            this.lrcContents.innerHTML = lrcHTML;
            if (!this.lrcIndex) {
                this.lrcIndex = 0;
            }
            this.lrcContents.getElementsByTagName('p')[0].classList.add('aplayer-lrc-current');
            this.lrcContents.style.transform = 'translateY(0px)';
            this.lrcContents.style.webkitTransform = 'translateY(0px)';
        }

        // set duration time
        if (this.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
            this.element.getElementsByClassName('aplayer-dtime')[0].innerHTML = this.audio.duration ? this.secondToTime(this.audio.duration) : '00:00';
        }

        // autoplay
        if (this.option.autoplay && !this.isMobile) {
            this.play();
        }
        this.option.autoplay = true;  // autoplay next music

        if (this.isMobile) {
            this.pause();
        }
    }

    /**
     * Play music
     */
    play(time) {
        if (Object.prototype.toString.call(time) === '[object Number]') {
            this.audio.currentTime = time;
        }
        if (this.audio.paused) {
            this.button.classList.remove('aplayer-play');
            this.button.classList.add('aplayer-pause');
            this.button.innerHTML = '';
            setTimeout(() => {
                this.button.innerHTML = `
                            <button class="aplayer-icon aplayer-icon-pause">`
                    +           this.getSVG('pause')
                    + `     </button>`;
            }, 100);

            // pause other players (Thanks @Aprikyblue)
            if (this.option.mutex) {
                for (let i = 0; i < instances.length; i++) {
                    if (this != instances[i]) {
                        instances[i].pause();
                    }
                }
            }
            this.audio.play();
            if (this.playedTime) {
                clearInterval(this.playedTime);
            }
            this.playedTime = setInterval(() => {
                this.updateBar('played', this.audio.currentTime / this.audio.duration, 'width');
                if (this.option.showlrc) {
                    this.updateLrc();
                }
                this.ptime.innerHTML = this.secondToTime(this.audio.currentTime);
                this.trigger('playing');
            }, 100);
            this.trigger('play');
        }
    }

    /**
     * Pause music
     */
    pause() {
        if (!this.audio.paused || this.ended) {
            this.ended = false;
            this.button.classList.remove('aplayer-pause');
            this.button.classList.add('aplayer-play');
            this.button.innerHTML = '';
            setTimeout(() => {
                this.button.innerHTML = `
                            <button class="aplayer-icon aplayer-icon-play">`
                    +           this.getSVG('play')
                    + `     </button>`;
            }, 100);
            this.audio.pause();
            clearInterval(this.playedTime);
            this.trigger('pause');
        }
    }

    /**
     * Set volume
     */
    volume(percentage) {
        this.updateBar('volume', percentage, 'height');
        this.audio.volume = percentage;
        if (this.audio.muted) {
            this.audio.muted = false;
        }
        if (percentage === 1) {
            this.volumeicon.className = 'aplayer-icon aplayer-icon-volume-up';
            this.volumeicon.innerHTML = this.getSVG('volume-up');
        }
        else {
            this.volumeicon.className = 'aplayer-icon aplayer-icon-volume-down';
            this.volumeicon.innerHTML = this.getSVG('volume-down');
        }
    }

    /**
     * attach event
     */
    on(name, func) {
        if (typeof func === 'function') {
            this.event[name].push(func);
        }
    }

    /**
     * toggle between play and pause
     */
    toggle() {
        if (this.audio.paused) {
            this.play();
        }
        else {
            this.pause();
        }
    }
}

export {APlayer};