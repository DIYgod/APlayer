import tplLrc from '../template/lrc.art';

class Lrc {
    constructor (options) {
        this.container = options.container;
        this.async = options.async;
        this.player = options.player;
		this.external = options.external;
		this.offset = options.offset;
        this.parsed = [];
        this.index = 0;
        this.current = [];
		this.visible = true;
		
		if(this.external){
			this.player.template.lrcWrap.classList.add('aplayer-lrc-hide');
		}
    }

    show () {
        this.player.events.trigger('lrcshow');
		this.visibie = true;
		if(!this.external) this.player.template.lrcWrap.classList.remove('aplayer-lrc-hide');
    }

    hide () {
        this.player.events.trigger('lrchide');
		this.visibie = false;
        if(!this.external) this.player.template.lrcWrap.classList.add('aplayer-lrc-hide');
    }

    toggle () {
        if (!this.visible) {
            this.show();
        }
        else {
            this.hide();
        }
    }

    update (currentTime = this.player.audio.currentTime) {
        if (this.index > this.current.length - 1 ||
			currentTime < this.current[this.index][0] ||
			(this.current[this.index + 1] && currentTime >= this.current[this.index + 1][0])) {
            for (let i = 0; i < this.current.length; i++) {
                if (currentTime >= this.current[i][0] && (!this.current[i + 1] || currentTime < this.current[i + 1][0])) {
                    this.index = i;
					if(!this.external){
						this.player.events.trigger('lrcchange', this.current[this.index]);
						this.container.style.transform = `translateY(${-this.index * 16}px)`;
						this.container.style.webkitTransform = `translateY(${-this.index * 16}px)`;
						this.container.getElementsByClassName('aplayer-lrc-current')[0].classList.remove('aplayer-lrc-current');
						this.container.getElementsByTagName('p')[i].classList.add('aplayer-lrc-current');
					}
                }
            }
        }
    }

    switch (index) {
        if (!this.parsed[index]) {
            if (!this.async) {
                if (this.player.list.audios[index].lrc) {
                    this.parsed[index] = this.parse(this.player.list.audios[index].lrc);
                }
                else {
                    this.parsed[index] = [['00:00', 'Not available']];
                }
            }
            else {
                this.parsed[index] = [['00:00', 'Loading']];
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (index === this.player.list.index && xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                            this.parsed[index] = this.parse(xhr.responseText);
                        }
                        else {
                            this.player.notice(`LRC file request fails: status ${xhr.status}`);
                            this.parsed[index] = [['00:00', 'Not available']];
                        }
                        this.container.innerHTML = tplLrc({
                            lyrics: this.parsed[index]
                        });
                        this.update(0);
                        this.current = this.parsed[index];
                    }
                };
                const apiurl = this.player.list.audios[index].lrc;
                xhr.open('get', apiurl, true);
                xhr.send(null);
            }
        }

        this.container.innerHTML = tplLrc({
            lyrics: this.parsed[index]
        });
        this.update(0);
        this.current = this.parsed[index];
    }

    /**
     * Parse lrc, suppose multiple time tag
     *
     * @param {String} lrc_s - Format:
     * [mm:ss]lyric
     * [mm:ss.xx]lyric
     * [mm:ss.xxx]lyric
     * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
     * [mm:ss.xx]<mm:ss.xx>lyric
     *
     * @return {String} [[time, text], [time, text], [time, text], ...]
     */
    parse (lrc_s) {
        if (lrc_s) {
            lrc_s = lrc_s.replace(/([^\]^\n])\[/g, (match, p1) => p1 + '\n[');
            const lyric = lrc_s.split('\n');
            let lrc = [];
            const lyricLen = lyric.length;
            for (let i = 0; i < lyricLen; i++) {
                // match lrc time
                const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g);
                // match lrc text
                const lrcText = lyric[i].replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g, '').replace(/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g, '').replace(/^\s+|\s+$/g, '');

                if (lrcTimes) {
                    // handle multiple time tag
                    const timeLen = lrcTimes.length;
                    for (let j = 0; j < timeLen; j++) {
                        const oneTime = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(lrcTimes[j]);
                        const min2sec = oneTime[1] * 60;
                        const sec2sec = parseInt(oneTime[2]);
                        const msec2sec = oneTime[4] ? parseInt(oneTime[4]) / ((oneTime[4] + '').length === 2 ? 100 : 1000) : 0;
                        const lrcTime = Math.max(0, min2sec + sec2sec + msec2sec + this.offset);
                        lrc.push([lrcTime, lrcText]);
                    }
                }
            }
            // sort by time
            lrc = lrc.filter((item) => item[1]);
            lrc.sort((a, b) => a[0] - b[0]);
            return lrc;
        }
        else {
            return [];
        }
    }

    remove (index) {
        this.parsed.splice(index, 1);
    }

    clear () {
        this.parsed = [];
        this.container.innerHTML = '';
    }
}

export default Lrc;