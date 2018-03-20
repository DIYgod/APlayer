import utils from './utils';
import Icons from './icons';

class Controller {
    constructor (player) {
        this.player = player;

        this.initPlayButton();
        this.initPlayBar();
        this.initOrderButton();
        this.initLoopButton();
        this.initMenuButton();
        if (!utils.isMobile) {
            this.initVolumeButton();
        }
    }

    initPlayButton () {
        this.player.template.pic.addEventListener('click', () => {
            this.player.toggle();
        });
    }

    initPlayBar () {
        const thumbMove = (e) => {
            let percentage = ((e.clientX || e.changedTouches[0].clientX) - utils.getElementViewLeft(this.player.template.barWrap)) / this.player.template.barWrap.clientWidth;
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.player.bar.set('played', percentage, 'width');
            this.player.lrc && this.player.lrc.update(percentage * this.player.duration);
            this.player.template.ptime.innerHTML = utils.secondToTime(percentage * this.player.duration);
        };

        const thumbUp = (e) => {
            document.removeEventListener(utils.nameMap.dragEnd, thumbUp);
            document.removeEventListener(utils.nameMap.dragMove, thumbMove);
            let percentage = ((e.clientX || e.changedTouches[0].clientX) - utils.getElementViewLeft(this.player.template.barWrap)) / this.player.template.barWrap.clientWidth;
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.player.bar.set('played', percentage, 'width');
            this.player.seek(this.player.bar.get('played', 'width') * this.player.duration);
            this.player.disableTimeupdate = false;
        };

        this.player.template.barWrap.addEventListener(utils.nameMap.dragStart, () => {
            this.player.disableTimeupdate = true;
            document.addEventListener(utils.nameMap.dragMove, thumbMove);
            document.addEventListener(utils.nameMap.dragEnd, thumbUp);
        });
    }

    initVolumeButton () {
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

        const thumbMove = (e) => {
            let percentage = 1 - ((e.clientY || e.changedTouches[0].clientY) - utils.getElementViewTop(this.player.template.volumeBar)) / this.player.template.volumeBar.clientHeight;
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.player.volume(percentage);
        };

        const thumbUp = (e) => {
            this.player.template.volumeBarWrap.classList.remove('aplayer-volume-bar-wrap-active');
            document.removeEventListener(utils.nameMap.dragEnd, thumbUp);
            document.removeEventListener(utils.nameMap.dragMove, thumbMove);
            let percentage = 1 - ((e.clientY || e.changedTouches[0].clientY) - utils.getElementViewTop(this.player.template.volumeBar)) / this.player.template.volumeBar.clientHeight;
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.player.volume(percentage);
        };

        this.player.template.volumeBarWrap.addEventListener(utils.nameMap.dragStart, () => {
            this.player.template.volumeBarWrap.classList.add('aplayer-volume-bar-wrap-active');
            document.addEventListener(utils.nameMap.dragMove, thumbMove);
            document.addEventListener(utils.nameMap.dragEnd, thumbUp);
        });
    }

    initOrderButton () {
        this.player.template.order.addEventListener('click', () => {
            if (this.player.options.order === 'list') {
                this.player.options.order = 'random';
                this.player.template.order.innerHTML = Icons.orderRandom;
            }
            else if (this.player.options.order === 'random') {
                this.player.options.order = 'list';
                this.player.template.order.innerHTML = Icons.orderList;
            }
        });
    }

    initLoopButton () {
        this.player.template.loop.addEventListener('click', () => {
            if (this.player.list.audios.length > 1) {
                if (this.player.options.loop === 'one') {
                    this.player.options.loop = 'none';
                    this.player.template.loop.innerHTML = Icons.loopNone;
                }
                else if (this.player.options.loop === 'none') {
                    this.player.options.loop = 'all';
                    this.player.template.loop.innerHTML = Icons.loopAll;
                }
                else if (this.player.options.loop === 'all') {
                    this.player.options.loop = 'one';
                    this.player.template.loop.innerHTML = Icons.loopOne;
                }
            }
            else {
                if (this.player.options.loop === 'one' || this.player.options.loop === 'all') {
                    this.player.options.loop = 'none';
                    this.player.template.loop.innerHTML = Icons.loopNone;
                }
                else if (this.player.options.loop === 'none') {
                    this.player.options.loop = 'all';
                    this.player.template.loop.innerHTML = Icons.loopAll;
                }
            }
        });
    }

    initMenuButton () {
        this.player.template.list.style.height = 33 * this.player.options.audio.length - 1 + 'px';
        this.player.template.listOl.style.height = 33 * this.player.options.audio.length - 1 + 'px';
        this.player.template.menu.addEventListener('click', () => {
            this.player.list.toggle();
        });
    }
}

export default Controller;