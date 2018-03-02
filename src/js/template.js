import Icons from './icons';
import tplPlayer from '../template/player.art';

class Template {
    constructor (options) {
        this.container = options.container;
        this.options = options.options;
        this.mode = options.mode;
        this.init();
    }

    init () {
        this.container.innerHTML = tplPlayer({
            options: this.options,
            icons: Icons,
            mode: this.mode
        });

        this.lrc = this.container.querySelector('.aplayer-lrc-contents');
        this.ptime = this.container.querySelector('.aplayer-ptime');
        this.info = this.container.querySelector('.aplayer-info');
        this.time = this.container.querySelector('.aplayer-time');
        this.barWrap = this.container.querySelector('.aplayer-bar-wrap');
        this.button = this.container.querySelector('.aplayer-button');
        this.list = this.container.querySelector('.aplayer-list');
        this.listOl = this.container.querySelector('.aplayer-list ol');
        this.played = this.container.querySelector('.aplayer-played');
        this.loaded = this.container.querySelector('.aplayer-loaded');
        this.thumb = this.container.querySelector('.aplayer-thumb');
        this.volume = this.container.querySelector('.aplayer-volume');
        this.volumeBar = this.container.querySelector('.aplayer-volume-bar');
        this.volumeButton = this.container.querySelector('.aplayer-time button');
        this.volumeBarWrap = this.container.querySelector('.aplayer-volume-bar-wrap');
        this.mode = this.container.querySelector('.aplayer-icon-mode');
        this.menu = this.container.querySelector('.aplayer-icon-menu');
        this.pic = this.container.querySelector('.aplayer-pic');
        this.title = this.container.querySelector('.aplayer-title');
        this.author = this.container.querySelector('.aplayer-author');
        this.dtime = this.container.querySelector('.aplayer-dtime');
    }
}

export default Template;
