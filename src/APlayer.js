/**
 * APlayer constructor function
 *
 * @param {Object} option - See README
 * @constructor
 */
(() => {
    let APlayers = [];

    class APlayer {
        constructor(option) {

            this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
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
                theme: '#b7daff'
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
            this.loop = true;

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
                <div class="aplayer-pic" ${(this.music.pic ? (`style="background-image: url("${encodeURI(this.music.pic)}");"`) : ``)}>
                    <div class="aplayer-button aplayer-play">
                        <i class="demo-icon aplayer-icon-play"></i>
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
                             - <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>
                            <div class="aplayer-volume-wrap">
                                <i class="demo-icon aplayer-icon-volume-down"></i>
                                <div class="aplayer-volume-bar-wrap">
                                    <div class="aplayer-volume-bar">
                                        <div class="aplayer-volume" style="height: 80%; background: ${this.option.theme};"></div>
                                    </div>
                                </div>
                            </div>
                            <i class="demo-icon aplayer-icon-loop"></i>${(this.multiple ? `<i class="demo-icon aplayer-icon-menu"></i>` : ``)}
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

            if (this.element.getElementsByClassName('aplayer-info')[0].offsetWidth < 200) {
                this.element.getElementsByClassName('aplayer-time')[0].classList.add('aplayer-time-narrow');
            }
            // fix the width of aplayer bar
            this.element.getElementsByClassName('aplayer-bar-wrap')[0].style.marginRight = this.element.getElementsByClassName('aplayer-time')[0].offsetWidth + 5 + 'px';

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
                        }
                        this.play();
                    });
                }
            }

            // control play progress
            this.playedBar = this.element.getElementsByClassName('aplayer-played')[0];
            this.loadedBar = this.element.getElementsByClassName('aplayer-loaded')[0];
            this.thumb = this.element.getElementsByClassName('aplayer-thumb')[0];
            this.bar = this.element.getElementsByClassName('aplayer-bar')[0];
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
                this.play();
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
            const volumeicon = this.element.getElementsByClassName('aplayer-time')[0].getElementsByTagName('i')[0];
            const barHeight = 35;
            this.element.getElementsByClassName('aplayer-volume-bar-wrap')[0].addEventListener('click', (event) => {
                const e = event || window.event;
                let percentage = (barHeight - e.clientY + getElementViewTop(volumeBarWrap)) / barHeight;
                percentage = percentage > 0 ? percentage : 0;
                percentage = percentage < 1 ? percentage : 1;
                this.updateBar('volume', percentage, 'height');
                this.audio.volume = percentage;
                if (this.audio.muted) {
                    this.audio.muted = false;
                }
                if (percentage === 1) {
                    volumeicon.className = 'demo-icon aplayer-icon-volume-up';
                }
                else {
                    volumeicon.className = 'demo-icon aplayer-icon-volume-down';
                }
            });
            volumeicon.addEventListener('click', () => {
                if (this.audio.muted) {
                    this.audio.muted = false;
                    volumeicon.className = this.audio.volume === 1 ? 'demo-icon aplayer-icon-volume-up' : 'demo-icon aplayer-icon-volume-down';
                    this.updateBar('volume', this.audio.volume, 'height');
                }
                else {
                    this.audio.muted = true;
                    volumeicon.className = 'demo-icon aplayer-icon-volume-off';
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
                this.element.getElementsByClassName('aplayer-icon-menu')[0].addEventListener('click', () => {
                    const list = this.element.getElementsByClassName('aplayer-list')[0];
                    if (!list.classList.contains('aplayer-list-hide')) {
                        list.classList.add('aplayer-list-hide');
                    }
                    else {
                        list.classList.remove('aplayer-list-hide');
                    }
                });
            }

            this.setMusic(0);

            APlayers.push(this);
        };

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
                this.element.getElementsByClassName('aplayer-pic')[0].style.backgroundImage = `url(${encodeURI(this.music.pic)})`;
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
                this.audio.preload = this.isMobile ? 'none' : 'metadata';

                // show audio time
                this.audio.addEventListener('durationchange', () => {
                    if (this.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
                        this.element.getElementsByClassName('aplayer-dtime')[0].innerHTML = this.secondToTime(this.audio.duration);
                    }
                });

                // show audio loaded bar
                this.audio.addEventListener('progress', () => {
                    const percentage = this.audio.buffered.length ? this.audio.buffered.end(this.audio.buffered.length - 1) / this.audio.duration : 0;
                    this.updateBar('loaded', percentage, 'width');
                });

                // audio download error
                this.audio.addEventListener('error', () => {
                    this.element.getElementsByClassName('aplayer-author')[0].innerHTML = ` - Error happens ╥﹏╥`;
                });

                // multiple music play
                if (this.multiple) {
                    this.audio.addEventListener('ended', () => {
                        if (this.playIndex < this.option.music.length - 1) {
                            this.setMusic(++this.playIndex);
                        }
                        else if (this.loop) {
                            this.setMusic(0);
                        }
                        else if (!this.loop) {
                            this.pause();
                        }
                    });
                }
                else {
                    this.audio.addEventListener('ended', () => {
                        if (!this.loop) {
                            this.pause();
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
        };

        /**
         * Play music
         */
        play() {
            if (this.audio.paused) {
                this.button.classList.remove('aplayer-play');
                this.button.classList.add('aplayer-pause');
                this.button.innerHTML = '';
                setTimeout(() => {
                    this.button.innerHTML = '<i class="demo-icon aplayer-icon-pause"></i>';
                }, 100);

                // pause other players (Thanks @Aprikyblue)
                if (this.option.mutex) {
                    for (let i = 0; i < APlayers.length; i++) {
                        if (this != APlayers[i]) {
                            APlayers[i].pause();
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
                    this.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = this.secondToTime(this.audio.currentTime);
                }, 100);
            }
        };

        /**
         * Pause music
         */
        pause() {
            if (!this.audio.paused) {
                this.button.classList.remove('aplayer-pause');
                this.button.classList.add('aplayer-play');
                this.button.innerHTML = '';
                setTimeout(() => {
                    this.button.innerHTML = '<i class="demo-icon aplayer-icon-play"></i>';
                }, 100);
                this.audio.pause();
                clearInterval(this.playedTime);
            }
        };
    }

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = APlayer
    }
    else {
        window.APlayer = APlayer;
    }
})();