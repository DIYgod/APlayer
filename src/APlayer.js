/**
 * APlayer constructor function
 *
 * @param {Object} option - See README
 * @constructor
 */

function APlayer(option) {
    // handle options error
    if (!('music' in option && 'title' in option.music && 'author' in option.music && 'url' in option.music)) {
        throw 'APlayer Error: Music, music.title, music.author, music.url, music.pic are required in options';
    }
    if (option.element === null) {
        throw 'APlayer Error: element option null';
    }

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
        showlrc: false
    };
    for (var defaultKey in defaultOption) {
        if (defaultOption.hasOwnProperty(defaultKey) && !option.hasOwnProperty(defaultKey)) {
            option[defaultKey] = defaultOption[defaultKey];
        }
    }

    this.option = option;
}

/**
 * AutoLink initialization function
 */
APlayer.prototype.init = function () {
    this.element = this.option.element;
    this.music = this.option.music;

    // parser lrc
    if (this.option.showlrc) {
        var lrcs = this.element.getElementsByClassName('aplayer-lrc-content')[0].innerHTML;
        this.lrc = this.parseLrc(lrcs);
    }

    // fill in HTML
    this.element.innerHTML = ''
        + '<div class="aplayer-pic">'
        +     '<div class="aplayer-button aplayer-pause aplayer-hide">'
        +         '<i class="demo-icon aplayer-icon-pause"></i>'
        +     '</div>'
        +     '<div class="aplayer-button aplayer-play">'
        +         '<i class="demo-icon aplayer-icon-play"></i>'
        +     '</div>'
        + '</div>'
        + '<div class="aplayer-info">'
        +     '<div class="aplayer-music">'
        +         '<span class="aplayer-title">' + this.music.title + '</span>'
        +         '<span class="aplayer-author"> - (＞﹏＜)加载中,好累的说...</span>'
        +     '</div>'
        +     '<div class="aplayer-lrc">'
        +         '<div class="aplayer-lrc-contents" style="transform: translateY(0);"></div>'
        +     '</div>'
        +     '<div class="aplayer-controller">'
        +         '<div class="aplayer-bar-wrap">'
        +             '<div class="aplayer-bar">'
        +                 '<div class="aplayer-loaded" style="width: 0"></div>'
        +                 '<div class="aplayer-played" style="width: 0">'
        +                     '<span class="aplayer-thumb"></span>'
        +                 '</div>'
        +             '</div>'
        +         '</div>'
        +         '<div class="aplayer-time">'
        +             ' - <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">(oﾟ▽ﾟ)</span>'
        +             '<div class="aplayer-volume-wrap">'
        +                 '<i class="demo-icon aplayer-icon-volume-down"></i>'
        +                 '<div class="aplayer-volume-bar-wrap">'
        +                     '<div class="aplayer-volume-bar">'
        +                         '<div class="aplayer-volume" style="height: 80%"></div>'
        +                     '</div>'
        +                 '</div>'
        +             '</div>'
        +         '</div>'
        +     '</div>'
        + '</div>';

    // music pic
    if (this.music.pic) {
        this.element.getElementsByClassName('aplayer-pic')[0].style.backgroundImage = 'url(' + encodeURI(this.music.pic) + ')';
    }

    // fill in lrc
    if (this.option.showlrc) {
        this.element.classList.add('aplayer-withlrc');
        var lrcHTML = '';
        this.lrcContents = this.element.getElementsByClassName('aplayer-lrc-contents')[0];
        for (var i = 0; i < this.lrc.length; i++) {
            lrcHTML += '<p>' + this.lrc[i][1] + '</p>';
        }
        this.lrcContents.innerHTML = lrcHTML;
        this.lrcIndex = 0;
        this.lrcContents.getElementsByTagName('p')[0].classList.add('aplayer-lrc-current');
    }

    // switch to narrow style
    if (this.option.narrow) {
        this.element.classList.add('aplayer-narrow');
    }

    // create audio element
    this.audio = document.createElement("audio");
    this.audio.src = this.music.url;
    this.audio.loop = true;
    this.audio.preload = 'metadata';

    // show audio time
    var _self = this;
    this.audio.addEventListener('durationchange', function() {
        if (_self.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
            _self.element.getElementsByClassName('aplayer-dtime')[0].innerHTML = _self.secondToTime(_self.audio.duration);
        }
    });

    // can play, remove loading style, show loading progress bar
    // compatibility: different mobile browsers have different triggering time, use loadedmetadata event to take the place of canplay event
    this.audio.addEventListener('loadedmetadata', function () {
        _self.element.getElementsByClassName('aplayer-author')[0].innerHTML = ' - ' + _self.music.author;
        _self.loadedTime = setInterval(function () {
            var percentage = _self.audio.buffered.end(_self.audio.buffered.length - 1) / _self.audio.duration;
            _self.updateBar.call(_self, 'loaded', percentage, 'width');
            if (percentage === 1) {
                clearInterval(_self.loadedTime);
            }
        }, 500);
    });

    // audio download error
    this.audio.addEventListener('error', function () {
        _self.element.getElementsByClassName('aplayer-author')[0].innerHTML = ' - ' + '加载失败 ╥﹏╥';
    });

    // play and pause button
    this.playButton = this.element.getElementsByClassName('aplayer-play')[0];
    this.pauseButton = this.element.getElementsByClassName('aplayer-pause')[0];
    this.playButton.addEventListener('click', function () {
        _self.play.call(_self);
    });
    this.pauseButton.addEventListener('click', function () {
        _self.pause.call(_self);
    });

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

    this.thumb.addEventListener('mousedown', function () {
        barWidth = _self.bar.clientWidth;
        clearInterval(_self.playedTime);
        document.addEventListener('mousemove', thumbMove);
        document.addEventListener('mouseup', thumbUp);
    });

    function thumbMove (event) {
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

    function thumbUp () {
        document.removeEventListener('mouseup', thumbUp);
        document.removeEventListener('mousemove', thumbMove);
        _self.audio.currentTime = parseFloat(_self.playedBar.style.width) / 100 * _self.audio.duration;
        _self.play();
    }

    // control volume
    this.audio.volume = 0.8;
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
    function getElementViewLeft (element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        var elementScrollLeft;
        while (current !== null){
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
        return actualLeft - elementScrollLeft;
    }
    function getElementViewTop (element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        var elementScrollTop;
        while (current !== null){
            actualTop += current. offsetTop;
            current = current.offsetParent;
        }
        elementScrollTop = document.body.scrollTop + document.documentElement.scrollTop;
        return actualTop - elementScrollTop;
    }

    // autoplay
    if (this.option.autoplay) {
        this.play();
    }
};

/**
 * Play music
 */
APlayer.prototype.play = function () {
    this.playButton.classList.add('aplayer-hide');
    this.pauseButton.classList.remove('aplayer-hide');
    this.audio.play();
    var _self = this;
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
    this.pauseButton.classList.add('aplayer-hide');
    this.playButton.classList.remove('aplayer-hide');
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
    if (!currentTime) {
        currentTime = this.audio.currentTime;
    }
    if (currentTime < this.lrc[this.lrcIndex][0] || (!this.lrc[this.lrcIndex + 1] || currentTime >= this.lrc[this.lrcIndex + 1][0])) {
        for (var i = 0; i < this.lrc.length; i++) {
            if (currentTime >= this.lrc[i][0] && (!this.lrc[i + 1] || currentTime < this.lrc[i + 1][0])) {
                this.lrcIndex = i;
                this.lrcContents.style.transform = 'translateY(' + -this.lrcIndex * 20 + 'px)';
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
 * @param {String} text - Format:
 * [mm:ss.xx]lyric
 * [mm:ss.xxx]lyric
 * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
 *
 * @return {Array} [[time, text], [time, text], [time, text], ...]
 */
APlayer.prototype.parseLrc = function (text) {
    var lyric = text.split('\n');
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

    return lrc;
};