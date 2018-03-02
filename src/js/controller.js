import utils from './utils';
import Icons from './icons';

class Controller {
    constructor (player) {
        this.player = player;

        this.initPlayButton();
        this.initList();
        this.initPlayBar();
        this.initModeButton();
        this.initMenuButton();
        if (!utils.isMobile) {
            this.initVolumeButton();
        }
    }

    initPlayButton () {
        this.player.template.button.addEventListener('click', () => {
            this.player.toggle();
        });
    }

    initList () {
        this.player.template.list.addEventListener('click', (e) => {
            let target;
            if (e.target.tagName.toUpperCase() === 'LI') {
                target = e.target;
            }
            else {
                target = e.target.parentElement;
            }
            const musicIndex = parseInt(target.getElementsByClassName('aplayer-list-index')[0].innerHTML) - 1;
            if (musicIndex !== this.player.playIndex) {
                this.player.setAudio(musicIndex);
                this.player.play();
            }
            else {
                this.player.toggle();
            }
        });
    }

    initPlayBar () {
        let barWidth;
        this.player.template.barWrap.addEventListener('click', (event) => {
            const e = event || window.event;
            barWidth = this.player.template.barWrap.clientWidth;
            const percentage = (e.clientX - utils.getElementViewLeft(this.player.template.barWrap)) / barWidth;
            if (isNaN(this.player.audio.duration)) {
                this.player.bar.set('played', 0, 'width');
            }
            else {
                this.player.seek(percentage * this.player.audio.duration);
            }
        });

        this.player.template.thumb.addEventListener('mouseover', () => {
            this.player.template.thumb.style.background = this.player.options.theme;
        });
        this.player.template.thumb.addEventListener('mouseout', () => {
            this.player.template.thumb.style.background = '#fff';
        });

        const thumbMove = (event) => {
            const e = event || window.event;
            let percentage = (e.clientX - utils.getElementViewLeft(this.player.template.barWrap)) / barWidth;
            percentage = percentage > 0 ? percentage : 0;
            percentage = percentage < 1 ? percentage : 1;
            this.player.bar.set('played', percentage, 'width');
            this.player.lrc && this.player.lrc.update(percentage * this.player.audio.duration);
            this.player.template.ptime.innerHTML = utils.secondToTime(percentage * this.player.audio.duration);
        };

        const thumbUp = () => {
            document.removeEventListener('mouseup', thumbUp);
            document.removeEventListener('mousemove', thumbMove);
            if (isNaN(this.player.audio.duration)) {
                this.player.bar.set('played', 0, 'width');
            }
            else {
                this.player.seek(this.player.bar.get('played', 'width') * this.player.audio.duration);
                this.player.timer.enable('progress');
            }
        };

        this.player.template.thumb.addEventListener('mousedown', () => {
            barWidth = this.player.template.barWrap.clientWidth;
            this.player.timer.disable('progress');
            document.addEventListener('mousemove', thumbMove);
            document.addEventListener('mouseup', thumbUp);
        });
    }

    initVolumeButton () {
        const barHeight = 35;
        this.player.template.volumeBarWrap.addEventListener('click', (event) => {
            const e = event || window.event;
            let percentage = (barHeight - e.clientY + utils.getElementViewTop(this.player.template.volumeBar)) / barHeight;
            percentage = percentage > 0 ? percentage : 0;
            percentage = percentage < 1 ? percentage : 1;
            this.player.volume(percentage);
        });
        this.player.template.volumeButton.addEventListener('click', () => {
            if (this.player.audio.muted) {
                this.player.audio.muted = false;
                this.player.switchVolumeIcon();
                this.player.bar.set('volume', this.player.volume(), 'height');
            }
            else {
                this.player.audio.muted = true;
                this.player.switchVolumeIcon();
                this.player.bar.set('volume', 0, 'height');
            }
        });
    }

    initModeButton () {
        this.player.template.mode.addEventListener('click', () => {
            if (this.player.isMultiple()) {
                if (this.player.mode === 'random') {
                    this.player.mode = 'single';
                }
                else if (this.player.mode === 'single') {
                    this.player.mode = 'order';
                }
                else if (this.player.mode === 'order') {
                    this.player.mode = 'circulation';
                }
                else if (this.player.mode === 'circulation') {
                    this.player.mode = 'random';
                }
            }
            else {
                if (this.player.mode === 'circulation') {
                    this.player.mode = 'order';
                }
                else {
                    this.player.mode = 'circulation';
                }
            }
            this.player.template.mode.innerHTML = Icons[this.player.mode];
            this.player.audio.loop = !(this.player.isMultiple() || this.player.mode === 'order');
        });
    }

    initMenuButton () {
        this.player.template.list.style.height = this.player.template.list.offsetHeight + 'px';
        this.player.template.menu.addEventListener('click', () => {
            if (!this.player.template.list.classList.contains('aplayer-list-hide')) {
                this.player.template.list.classList.add('aplayer-list-hide');
            }
            else {
                this.player.template.list.classList.remove('aplayer-list-hide');
            }
        });
    }
}

export default Controller;