import tplLrc from '../template/lrc.art';

class Lrc {
    constructor (options) {
        this.container = options.container;
        this.async = options.async;
        this.player = options.player;
        this.content = options.content;
        this.parsed = [];
        this.index = 0;
        this.current = [];
    }

    update (currentTime = this.player.audio.currentTime) {
        if (this.index > this.current.length - 1 || currentTime < this.current[this.index][0] || (!this.current[this.index + 1] || currentTime >= this.current[this.index + 1][0])) {
            for (let i = 0; i < this.current.length; i++) {
                if (currentTime >= this.current[i][0] && (!this.current[i + 1] || currentTime < this.current[i + 1][0])) {
                    this.index = i;
                    this.container.style.transform = `translateY(${-this.index * 16}px)`;
                    this.container.style.webkitTransform = `translateY(${-this.index * 16}px)`;
                    this.container.getElementsByClassName('aplayer-lrc-current')[0].classList.remove('aplayer-lrc-current');
                    this.container.getElementsByTagName('p')[i].classList.add('aplayer-lrc-current');
                }
            }
        }
    }

    switch (index) {
        if (!this.parsed[index]) {
            if (!this.async) {
                if (this.content[index]) {
                    this.parsed[index] = this.parse(this.content[index]);
                }
                else {
                    this.parsed[index] = [['00:00', 'Not available']];
                }
            }
            else {
                this.parsed[index] = [['00:00', 'Loading']];
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                            this.parsed[index] = this.parse(xhr.responseText);
                        }
                        else {
                            console.log('Request was unsuccessful: ' + xhr.status);
                            this.parsed[index] = [['00:00', 'Not available']];
                        }

                        this.container.innerHTML = tplLrc({
                            lyrics: this.parsed[index]
                        });
                        this.update(0);
                        this.current = this.parsed[index];
                    }
                };
                const apiurl = this.content[index];
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
     * [mm:ss.xx]lyric
     * [mm:ss.xxx]lyric
     * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
     *
     * @return {String} [[time, text], [time, text], [time, text], ...]
     */
    parse (lrc_s) {
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
    }
}

export default Lrc;