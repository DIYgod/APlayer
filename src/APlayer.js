function APlayer(option) {
    // handle options error
    if (!('music' in option && 'title' in option.music && 'author' in option.music && 'url' in option.music && 'pic' in option.music)) {
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

APlayer.prototype.init = function () {
    this.element = this.option.element;
    this.music = this.option.music;

    // parser lrc
    if (this.option.showlrc) {
        this.lrcTime = [];
        this.lrcLine = [];
        var lrcs = this.element.getElementsByClassName('aplayer-lrc-content')[0].innerHTML;
        var lines = lrcs.split(/\n/);
        var timeExp = /\[(\d{2}):(\d{2})\.(\d{2})]/;
        var lrcExp = /](.*)$/;
        var notLrcLineExp = /\[[A-Za-z]+:/;
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(/^\s+|\s+$/g, '');
            var oneTime = timeExp.exec(lines[i]);
            var oneLrc = lrcExp.exec(lines[i]);
            if (oneTime && oneLrc && !lrcExp.exec(oneLrc[1])) {
                this.lrcTime.push(parseInt(oneTime[1]) * 60 + parseInt(oneTime[2]) + parseInt(oneTime[3]) / 100);
                this.lrcLine.push(oneLrc[1]);
            }
            else if (lines[i] && !notLrcLineExp.exec(lines[i])) {
                throw 'APlayer Error: lrc format error : should be like `[mm:ss.xx]lyric` : ' + lines[i];
            }
        }
    }

    // fill in HTML
    this.element.innerHTML = ''
        + '<div class="aplayer-pic">'
        +     '<img src="' + this.music.pic + '">'
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

    // fill in lrc
    if (this.option.showlrc) {
        this.element.classList.add('aplayer-withlrc');
        var lrcHTML = '';
        this.lrcContents = this.element.getElementsByClassName('aplayer-lrc-contents')[0];
        for (i = 0; i < this.lrcLine.length; i++) {
            lrcHTML += '<p>' + this.lrcLine[i] + '</p>';
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

// play
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

// pause
APlayer.prototype.pause = function () {
    this.pauseButton.classList.add('aplayer-hide');
    this.playButton.classList.remove('aplayer-hide');
    this.audio.pause();
    clearInterval(this.playedTime);
};

// update progress bar (loading progress bar, play progress bar)
APlayer.prototype.updateBar = function (type, percentage, direction) {
    percentage = percentage > 0 ? percentage : 0;
    percentage = percentage < 1 ? percentage : 1;
    this[type + 'Bar'].style[direction] = percentage * 100 + '%';
};

// update lrc
APlayer.prototype.updateLrc = function (currentTime) {
    if (!currentTime) {
        currentTime = this.audio.currentTime;
    }
    if (currentTime < this.lrcTime[this.lrcIndex] || currentTime >= this.lrcTime[this.lrcIndex + 1]) {
        for (var i = 0; i < this.lrcTime.length; i++) {
            if (currentTime >= this.lrcTime[i] && (!this.lrcTime[i + 1] || currentTime < this.lrcTime[i + 1])) {
                this.lrcIndex = i;
                this.lrcContents.style.transform = 'translateY(' + -this.lrcIndex * 20 + 'px)';
                this.lrcContents.getElementsByClassName('aplayer-lrc-current')[0].classList.remove('aplayer-lrc-current');
                this.lrcContents.getElementsByTagName('p')[i].classList.add('aplayer-lrc-current');
            }
        }
    }
};

// format second to 00:00
APlayer.prototype.secondToTime = function (second) {
    var add0 = function (num) {
        return num < 10 ? '0' + num : '' + num;
    };
    var min = parseInt(second / 60);
    var sec = parseInt(second - min * 60);
    return add0(min) + ':' + add0(sec);
};