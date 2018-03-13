import Icons from './icons';
import tplPlayer from '../template/player.art';

class Template {
    constructor (options) {
        this.container = options.container;
        this.options = options.options;
        this.randomOrder = options.randomOrder;
        this.init();
    }

    init () {
        let cover;
        if (this.options.order === 'random') {
            cover = this.options.audio[this.randomOrder[0]].cover;
        }
        else {
            cover = this.options.audio[0].cover;
        }

        this.container.innerHTML = tplPlayer({
            options: this.options,
            icons: Icons,
            cover: cover,
        });

        this.lrc = this.container.querySelector('.aplayer-lrc-contents');
        this.ptime = this.container.querySelector('.aplayer-ptime');
        this.info = this.container.querySelector('.aplayer-info');
        this.time = this.container.querySelector('.aplayer-time');
        this.barWrap = this.container.querySelector('.aplayer-bar-wrap');
        this.button = this.container.querySelector('.aplayer-button');
        this.list = this.container.querySelector('.aplayer-list');
        this.listOl = this.container.querySelector('.aplayer-list ol');
        this.listCurs = this.container.querySelectorAll('.aplayer-list-cur');
        this.played = this.container.querySelector('.aplayer-played');
        this.loaded = this.container.querySelector('.aplayer-loaded');
        this.thumb = this.container.querySelector('.aplayer-thumb');
        this.volume = this.container.querySelector('.aplayer-volume');
        this.volumeBar = this.container.querySelector('.aplayer-volume-bar');
        this.volumeButton = this.container.querySelector('.aplayer-time button');
        this.volumeBarWrap = this.container.querySelector('.aplayer-volume-bar-wrap');
        this.loop = this.container.querySelector('.aplayer-icon-loop');
        this.order = this.container.querySelector('.aplayer-icon-order');
        this.menu = this.container.querySelector('.aplayer-icon-menu');
        this.pic = this.container.querySelector('.aplayer-pic');
        this.title = this.container.querySelector('.aplayer-title');
        this.author = this.container.querySelector('.aplayer-author');
        this.dtime = this.container.querySelector('.aplayer-dtime');
    }
}

export default Template;
