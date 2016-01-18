/**
 * APlayer constructor function
 *
 * @param {Object} option - See README
 * @constructor
 */
(function () {
    function APlayer(option) {

        this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
        // compatibility: some mobile browsers don't suppose autoplay
        if (this.isMobile) {
            option.autoplay = false;
        }

        // default options
        var defaultOption = {
            element: document.getElementsByClassName('aplayer')[0],
            narrow: false,
            autoplay: false,
            showlrc: false,
            theme: '#b7daff'
        };
        for (var defaultKey in defaultOption) {
            if (defaultOption.hasOwnProperty(defaultKey) && !option.hasOwnProperty(defaultKey)) {
                option[defaultKey] = defaultOption[defaultKey];
            }
        }

        // multiple music
        this.playIndex = Object.prototype.toString.call(option.music) === '[object Array]' ? 0 : -1;

        this.option = option;
        this.audios = [];
        this.loop = true;
    }

    /**
     * AutoLink initialization function
     */
    APlayer.prototype.init = function () {
        this.element = this.option.element;
        this.music = this.playIndex > -1 ? this.option.music[this.playIndex] : this.option.music;

        var i;
        // parser lrc
        if (this.option.showlrc) {
            var lrcs = [];
            for (i = 0; i < this.element.getElementsByClassName('aplayer-lrc-content').length; i++) {
                lrcs.push(this.element.getElementsByClassName('aplayer-lrc-content')[i].innerHTML);
            }
            this.lrcs = this.parseLrc(lrcs);
        }

        // fill in HTML
        var eleHTML = ''
            + '<div class="aplayer-pic">'
            +     '<div class="aplayer-button aplayer-play">'
            +         '<i class="demo-icon aplayer-icon-play"></i>'
            +     '</div>'
            + '</div>'
            + '<div class="aplayer-info">'
            +     '<div class="aplayer-music">'
            +         '<span class="aplayer-title"></span>'
            +         '<span class="aplayer-author"></span>'
            +     '</div>'
            +     '<div class="aplayer-lrc">'
            +         '<div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>'
            +     '</div>'
            +     '<div class="aplayer-controller">'
            +         '<div class="aplayer-bar-wrap">'
            +             '<div class="aplayer-bar">'
            +                 '<div class="aplayer-loaded" style="width: 0"></div>'
            +                 '<div class="aplayer-played" style="width: 0; background: ' + this.option.theme + ';">'
            +                     '<span class="aplayer-thumb" style="border: 1px solid ' + this.option.theme + ';"></span>'
            +                 '</div>'
            +             '</div>'
            +         '</div>'
            +         '<div class="aplayer-time">'
            +             ' - <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>'
            +             '<div class="aplayer-volume-wrap">'
            +                 '<i class="demo-icon aplayer-icon-volume-down"></i>'
            +                 '<div class="aplayer-volume-bar-wrap">'
            +                     '<div class="aplayer-volume-bar">'
            +                         '<div class="aplayer-volume" style="height: 80%; background: ' + this.option.theme + ';"></div>'
            +                     '</div>'
            +                 '</div>'
            +             '</div>'
            +             '<i class="demo-icon aplayer-icon-loop"></i>'
            +             (this.playIndex > -1 ? '<i class="demo-icon aplayer-icon-menu"></i>' : '')
            +         '</div>'
            +     '</div>'
            + '</div>';
        if (this.playIndex > -1) {
            eleHTML += ''
            + '<div class="aplayer-list">'
            +     '<ol>';
            for (i = 0; i < this.option.music.length; i++) {
                eleHTML += ''
            +         '<li>'
            +             '<span class="aplayer-list-cur" style="background: ' + this.option.theme + ';"></span>'
            +             '<span class="aplayer-list-index">' + (i + 1) + '</span>'
            +             '<span class="aplayer-list-title">' + this.option.music[i].title + '</span>'
            +             '<span class="aplayer-list-author">' + this.option.music[i].author + '</span>'
            +         '</li>'
            }
            eleHTML += ''
            +     '</ol>'
            + '</div>'
        }
        this.element.innerHTML = eleHTML;

        // switch to narrow style
        if (this.option.narrow) {
            this.element.classList.add('aplayer-narrow');
        }

        var _self = this;

        // play and pause button
        this.button = this.element.getElementsByClassName('aplayer-button')[0];
        this.button.addEventListener('click', function () {
            if (this.classList.contains('aplayer-play')) {
               _self.play.call(_self);
            }
            else if (this.classList.contains('aplayer-pause')) {
                _self.pause.call(_self);
            }
        });

        // click music list: change music
        if (this.playIndex > -1) {
            for (i = 0; i < this.option.music.length; i++) {
                this.element.getElementsByClassName('aplayer-list')[0].getElementsByTagName('li')[i].addEventListener('click', function () {
                    var musicIndex = parseInt(this.getElementsByClassName('aplayer-list-index')[0].innerHTML) - 1;
                    if (musicIndex !== _self.playIndex) {
                        _self.setMusic(musicIndex);
                    }
                    _self.play();
                });
            }
        }

        // control play progress
        this.playedBar = this.element.getElementsByClassName('aplayer-played')[0];
        this.loadedBar = this.element.getElementsByClassName('aplayer-loaded')[0];
        this.thumb = this.element.getElementsByClassName('aplayer-thumb')[0];
        this.bar = this.element.getElementsByClassName('aplayer-bar')[0];
        var barWidth;
        this.bar.addEventListener('click', function (event) {
            var e = event || window.event;
            barWidth = _self.bar.clientWidth;
            var percentage = (e.clientX - getElementViewLeft(_self.bar)) / barWidth;
            _self.updateBar.call(_self, 'played', percentage, 'width');
            _self.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = _self.secondToTime(percentage * _self.audio.duration);
            _self.audio.currentTime = parseFloat(_self.playedBar.style.width) / 100 * _self.audio.duration;
        });

        this.thumb.addEventListener('mouseover', function () {
            this.style.background = _self.option.theme;
        });
        this.thumb.addEventListener('mouseout', function () {
            this.style.background = '#fff';
        });

        this.thumb.addEventListener('mousedown', function () {
            barWidth = _self.bar.clientWidth;
            clearInterval(_self.playedTime);
            document.addEventListener('mousemove', thumbMove);
            document.addEventListener('mouseup', thumbUp);
        });

        function thumbMove(event) {
            var e = event || window.event;
            var percentage = (e.clientX - getElementViewLeft(_self.bar)) / barWidth;
            percentage = percentage > 0 ? percentage : 0;
            percentage = percentage < 1 ? percentage : 1;
            _self.updateBar.call(_self, 'played', percentage, 'width');
            if (_self.option.showlrc) {
                _self.updateLrc.call(_self, parseFloat(_self.playedBar.style.width) / 100 * _self.audio.duration);
            }
            _self.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = _self.secondToTime(percentage * _self.audio.duration);
        }

        function thumbUp() {
            document.removeEventListener('mouseup', thumbUp);
            document.removeEventListener('mousemove', thumbMove);
            _self.audio.currentTime = parseFloat(_self.playedBar.style.width) / 100 * _self.audio.duration;
            _self.play();
        }

        // control volume
        this.volumeBar = this.element.getElementsByClassName('aplayer-volume')[0];
        var volumeBarWrap = this.element.getElementsByClassName('aplayer-volume-bar')[0];
        var volumeicon = _self.element.getElementsByClassName('aplayer-time')[0].getElementsByTagName('i')[0];
        var barHeight = 35;
        this.element.getElementsByClassName('aplayer-volume-bar-wrap')[0].addEventListener('click', function (event) {
            var e = event || window.event;
            var percentage = (barHeight - e.clientY + getElementViewTop(volumeBarWrap)) / barHeight;
            percentage = percentage > 0 ? percentage : 0;
            percentage = percentage < 1 ? percentage : 1;
            _self.updateBar.call(_self, 'volume', percentage, 'height');
            _self.audio.volume = percentage;
            if (_self.audio.muted) {
                _self.audio.muted = false;
            }
            if (percentage === 1) {
                volumeicon.className = 'demo-icon aplayer-icon-volume-up';
            }
            else {
                volumeicon.className = 'demo-icon aplayer-icon-volume-down';
            }
        });
        volumeicon.addEventListener('click', function () {
            if (_self.audio.muted) {
                _self.audio.muted = false;
                volumeicon.className = _self.audio.volume === 1 ? 'demo-icon aplayer-icon-volume-up' : 'demo-icon aplayer-icon-volume-down';
                _self.updateBar.call(_self, 'volume', _self.audio.volume, 'height');
            }
            else {
                _self.audio.muted = true;
                volumeicon.className = 'demo-icon aplayer-icon-volume-off';
                _self.updateBar.call(_self, 'volume', 0, 'height');
            }
        });

        // get element's view position
        function getElementViewLeft(element) {
            var actualLeft = element.offsetLeft;
            var current = element.offsetParent;
            var elementScrollLeft;
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
            return actualLeft - elementScrollLeft;
        }

        function getElementViewTop(element) {
            var actualTop = element.offsetTop;
            var current = element.offsetParent;
            var elementScrollTop;
            while (current !== null) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            elementScrollTop = document.body.scrollTop + document.documentElement.scrollTop;
            return actualTop - elementScrollTop;
        }

        // loop control
        this.element.getElementsByClassName('aplayer-icon-loop')[0].addEventListener('click', function () {
            if (_self.loop) {
                this.classList.add('aplayer-noloop');
                _self.loop = false;
                _self.audio.loop = _self.playIndex > -1 ? false : _self.loop;
            }
            else {
                this.classList.remove('aplayer-noloop');
                _self.loop = true;
                _self.audio.loop = _self.playIndex > -1 ? false : _self.loop;
            }
        });

        // toggle menu control
        if (this.playIndex > -1) {
            this.element.getElementsByClassName('aplayer-icon-menu')[0].addEventListener('click', function () {
                var list = _self.element.getElementsByClassName('aplayer-list')[0];
                if (!list.classList.contains('aplayer-list-hide')) {
                    list.classList.add('aplayer-list-hide');
                }
                else {
                    list.classList.remove('aplayer-list-hide');
                }
            });
        }

        this.setMusic(0);
    };

    /**
     * Set music
     */
    APlayer.prototype.setMusic = function (index) {
        // get this.music
        if (this.playIndex > -1 && typeof(arguments[0]) !== 'undefined') {
            this.playIndex = arguments[0];
        }
        var indexMusic = this.playIndex;
        this.music = this.playIndex > -1 ? this.option.music[indexMusic] : this.option.music;

        // set html
        if (this.music.pic) {
            this.element.getElementsByClassName('aplayer-pic')[0].style.backgroundImage = 'url(' + encodeURI(this.music.pic) + ')';
        }
        this.element.getElementsByClassName('aplayer-title')[0].innerHTML = this.music.title;
        this.element.getElementsByClassName('aplayer-author')[0].innerHTML = ' - ' + this.music.author;
        if (this.playIndex > -1) {
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
        if ((this.playIndex > -1 && !this.audios[indexMusic]) || this.playIndex === -1) {
            this.audio = document.createElement("audio");
            this.audio.src = this.music.url;
            this.audio.preload = this.isMobile ? 'none' : 'metadata';

            // show audio time
            var _self = this;
            this.audio.addEventListener('durationchange', function () {
                if (_self.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
                    _self.element.getElementsByClassName('aplayer-dtime')[0].innerHTML = _self.secondToTime(_self.audio.duration);
                }
            });

            // show audio loaded bar
            _self.audio.addEventListener('progress', function () {
                var percentage = _self.audio.buffered.length ? _self.audio.buffered.end(_self.audio.buffered.length - 1) / _self.audio.duration : 0;
                _self.updateBar.call(_self, 'loaded', percentage, 'width');
            });

            // audio download error
            this.audio.addEventListener('error', function () {
                _self.element.getElementsByClassName('aplayer-author')[0].innerHTML = ' - ' + 'Error happens ╥﹏╥';
            });

            // multiple music play
            if (this.playIndex > -1) {
                this.audio.addEventListener('ended', function () {
                    if (_self.playIndex < _self.option.music.length - 1) {
                        _self.setMusic(++_self.playIndex);
                    }
                    else if (_self.loop) {
                        _self.setMusic(0);
                    }
                    else if (!_self.loop) {
                        _self.pause();
                    }
                });
            }
            else {
                this.audio.addEventListener('ended', function () {
                    if (!_self.loop) {
                        _self.pause();
                    }
                });
            }

            // control volume
            this.audio.volume = parseInt(this.element.getElementsByClassName('aplayer-volume')[0].style.height) / 100;

            // loop
            this.audio.loop = this.playIndex > -1 ? false : this.loop;

            if (this.playIndex > -1) {
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
            this.lrc = this.playIndex > -1 ? this.lrcs[indexMusic] : this.lrcs[0];
            this.element.classList.add('aplayer-withlrc');
            var lrcHTML = '';
            this.lrcContents = this.element.getElementsByClassName('aplayer-lrc-contents')[0];
            for (var i = 0; i < this.lrc.length; i++) {
                lrcHTML += '<p>' + this.lrc[i][1] + '</p>';
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
    APlayer.prototype.play = function () {
        var _self = this;
        this.button.classList.remove('aplayer-play');
        this.button.classList.add('aplayer-pause');
        this.button.innerHTML = '';
        setTimeout(function () {
            _self.button.innerHTML = '<i class="demo-icon aplayer-icon-pause"></i>';
        }, 100);
        this.audio.play();
        if (this.playedTime) {
            clearInterval(this.playedTime);
        }
        this.playedTime = setInterval(function () {
            _self.updateBar.call(_self, 'played', _self.audio.currentTime / _self.audio.duration, 'width');
            if (_self.option.showlrc) {
                _self.updateLrc.call(_self);
            }
            _self.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = _self.secondToTime(_self.audio.currentTime);
        }, 100);
    };

    /**
     * Pause music
     */
    APlayer.prototype.pause = function () {
        var _self = this;
        this.button.classList.remove('aplayer-pause');
        this.button.classList.add('aplayer-play');
        this.button.innerHTML = '';
        setTimeout(function () {
            _self.button.innerHTML = '<i class="demo-icon aplayer-icon-play"></i>';
        }, 100);
        this.audio.pause();
        clearInterval(this.playedTime);
    };

    /**
     * Update progress bar, including loading progress bar and play progress bar
     *
     * @param {String} type - Point out which bar it is, should be played loaded or volume
     * @param {Number} percentage
     * @param {String} direction - Point out the direction of this bar, Should be height or width
     */
    APlayer.prototype.updateBar = function (type, percentage, direction) {
        percentage = percentage > 0 ? percentage : 0;
        percentage = percentage < 1 ? percentage : 1;
        this[type + 'Bar'].style[direction] = percentage * 100 + '%';
    };

    /**
     * Update lrc
     *
     * @param {Number} currentTime
     */
    APlayer.prototype.updateLrc = function (currentTime) {
        if (typeof(arguments[0]) === 'undefined') {
            currentTime = this.audio.currentTime;
        }
        if (this.lrcIndex > this.lrc.length - 1 || currentTime < this.lrc[this.lrcIndex][0] || (!this.lrc[this.lrcIndex + 1] || currentTime >= this.lrc[this.lrcIndex + 1][0])) {
            for (var i = 0; i < this.lrc.length; i++) {
                if (currentTime >= this.lrc[i][0] && (!this.lrc[i + 1] || currentTime < this.lrc[i + 1][0])) {
                    this.lrcIndex = i;
                    this.lrcContents.style.transform = 'translateY(' + -this.lrcIndex * 20 + 'px)';
                    this.lrcContents.style.webkitTransform = 'translateY(' + -this.lrcIndex * 20 + 'px)';
                    this.lrcContents.getElementsByClassName('aplayer-lrc-current')[0].classList.remove('aplayer-lrc-current');
                    this.lrcContents.getElementsByTagName('p')[i].classList.add('aplayer-lrc-current');
                }
            }
        }
    };

    /**
     * Parse second to 00:00 format
     *
     * @param {Number} second
     * @return {String} 00:00 format
     */
    APlayer.prototype.secondToTime = function (second) {
        var add0 = function (num) {
            return num < 10 ? '0' + num : '' + num;
        };
        var min = parseInt(second / 60);
        var sec = parseInt(second - min * 60);
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
    APlayer.prototype.parseLrc = function (arr) {
        var lrcs = [];
        for (var k = 0; k < arr.length; k++) {
            var lyric = arr[k].split('\n');
            var lrc = [];
            var lyricLen = lyric.length;
            for (var i = 0; i < lyricLen; i++) {
                // match lrc time
                var lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g);
                // match lrc text
                var lrcText = lyric[i].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, '').replace(/^\s+|\s+$/g, '');

                if (lrcTimes != null) {
                    // handle multiple time tag
                    var timeLen = lrcTimes.length;
                    for (var j = 0; j < timeLen; j++) {
                        var oneTime = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(lrcTimes[j]);
                        var lrcTime = (oneTime[1]) * 60 + parseInt(oneTime[2]) + parseInt(oneTime[3]) / ((oneTime[3] + '').length === 2 ? 100 : 1000);
                        lrc.push([lrcTime, lrcText]);
                    }
                }
            }
            // sort by time
            lrc.sort(function (a, b) {
                return a[0] - b[0];
            });
            lrcs.push(lrc);
        }
        return lrcs;
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = APlayer
    }
    else {
        window.APlayer = APlayer;
    }
})();