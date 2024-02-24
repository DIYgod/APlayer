import tplListItem from '../template/list-item.art';
import tplListTitle from '../template/list-title.art';
import utils from './utils';
import Icons from './icons';
import smoothScroll from 'smoothscroll';

class List {
    constructor(player) {
        this.player = player;
        this.index = 0;
        this.audios = this.player.options.audio;
        this.showing = true;
        if (this.player.options.listFolded) {
            this.showing = false;
        }
        this.player.template.list.style.height = `${Math.min(this.player.template.list.scrollHeight, this.player.options.listMaxHeight)}px`;

        if (this.player.options.fixedBar) {
            this.player.template.list.style.height = '0px';
            this.initListClearButton();
            this.addClickListener();
        }

        this.bindEvents();
    }

    bindEvents() {
        this.player.template.list.addEventListener('click', (e) => {
            let target;
            if (e.target.tagName.toUpperCase() === 'LI') {
                target = e.target;
            } else {
                target = e.target.parentElement;
                // When click the list title.
                if (target.tagName.toUpperCase() !== 'LI') {
                    return;
                }
            }
            const audioIndex = parseInt(target.getElementsByClassName('aplayer-list-index')[0].innerHTML) - 1;
            if (audioIndex !== this.index) {
                this.switch(audioIndex);
                this.player.play();
            } else {
                this.player.toggle();
            }
        });
    }

    addClickListener() {
        document.addEventListener('click', (e) => {
            if (e.path.indexOf(this.player.template.list) < 0 && e.path.indexOf(this.player.template.menu) < 0) {
                this.hide();
            }
        });
    }

    initListClearButton() {
        this.player.template.list.addEventListener('click', (e) => {
            if (e.target.tagName.toUpperCase() === 'BUTTON') {
                this.hide();
                this.clear();
            } else {
                const target = e.target.parentElement;
                if (target.tagName.toUpperCase() === 'BUTTON' || target.tagName.toUpperCase() === 'SVG') {
                    this.hide();
                    this.clear();
                }
            }
        });
    }

    show() {
        this.showing = true;
        this.player.template.list.scrollTop = this.index * 33;
        this.player.template.list.style.height = `${Math.min(this.player.template.list.scrollHeight, this.player.options.listMaxHeight)}px`;
        this.player.events.trigger('listshow');
        this.player.template.list.classList.add('list-show');
    }

    hide() {
        this.showing = false;
        this.player.template.list.style.height = `${Math.min(this.player.template.list.scrollHeight, this.player.options.listMaxHeight)}px`;
        setTimeout(() => {
            this.player.template.list.style.height = '0px';
            this.player.events.trigger('listhide');
            this.player.template.list.classList.remove('list-show');
        }, 0);
    }

    toggle() {
        if (this.showing) {
            this.hide();
        } else {
            this.show();
        }
    }

    add(audios) {
        this.player.events.trigger('listadd', {
            audios: audios,
        });

        if (Object.prototype.toString.call(audios) !== '[object Array]') {
            audios = [audios];
        }
        audios.map((item) => {
            item.name = item.name || item.title || 'Audio name';
            item.artist = item.artist || item.author || 'Audio artist';
            item.cover = item.cover || item.pic;
            item.type = item.type || 'normal';
            return item;
        });

        const wasSingle = !(this.audios.length > 1);
        const wasEmpty = this.audios.length === 0;

        this.player.template.list.innerHTML += tplListItem({
            theme: this.player.options.theme,
            audio: audios,
            index: this.audios.length + 1,
        });

        this.audios = this.audios.concat(audios);

        if (wasSingle && this.audios.length > 1) {
            this.player.container.classList.add('aplayer-withlist');
        }

        this.player.randomOrder = utils.randomOrder(this.audios.length);
        this.player.template.listCurs = this.player.container.querySelectorAll('.aplayer-list-cur');

        this.player.template.listCurs[this.audios.length - 1].style.backgroundColor = audios.theme || this.player.options.theme;

        if (wasEmpty) {
            if (this.player.options.order === 'random') {
                this.switch(this.player.randomOrder[0]);
            } else {
                this.switch(0);
            }
        }
        if (this.player.options.fixedBar) {
            this.updateListNum();
        }
        if (this.player.options.storeList) {
            this.updateListStorage();
        }
    }

    remove(index) {
        this.player.events.trigger('listremove', {
            index: index,
        });
        if (this.audios[index]) {
            if (this.audios.length > 1) {
                const list = this.player.container.querySelectorAll('.aplayer-list li');
                list[index].remove();

                this.audios.splice(index, 1);
                this.player.lrc && this.player.lrc.remove(index);

                if (index === this.index) {
                    if (this.audios[index]) {
                        this.switch(index);
                    } else {
                        this.switch(index - 1);
                    }
                }
                if (this.index > index) {
                    this.index--;
                }

                for (let i = index; i < list.length; i++) {
                    list[i].getElementsByClassName('aplayer-list-index')[0].textContent = i;
                }
                if (this.audios.length === 1) {
                    this.player.container.classList.remove('aplayer-withlist');
                }

                this.player.template.listCurs = this.player.container.querySelectorAll('.aplayer-list-cur');
            } else {
                this.clear();
            }
            if (this.player.options.fixedBar) {
                this.updateListNum();
            }
            if (this.player.options.storeList) {
                this.updateListStorage();
            }
        }
    }

    switch(index) {
        this.player.events.trigger('listswitch', {
            index: index,
        });

        if (typeof index !== 'undefined' && this.audios[index]) {
            this.index = index;

            const audio = this.audios[this.index];

            // set html
            this.player.template.pic.style.backgroundImage = audio.cover ? `url('${audio.cover}')` : this.player.options.defaultCover !== '' ? `url(${this.player.options.defaultCover})` : '';
            this.player.theme(this.audios[this.index].theme || this.player.options.theme, this.index, false);
            this.player.template.title.innerHTML = audio.name;
            this.player.template.author.innerHTML = audio.artist ? ' - ' + audio.artist : '';

            const light = this.player.container.getElementsByClassName('aplayer-list-light')[0];
            if (light) {
                light.classList.remove('aplayer-list-light');
            }
            this.player.container.querySelectorAll('.aplayer-list li')[this.index].classList.add('aplayer-list-light');

            smoothScroll(this.index * 33, 500, null, this.player.template.list);

            this.player.setAudio(audio);

            this.player.lrc && this.player.lrc.switch(this.index);
            this.player.lrc && this.player.lrc.update(0);

            // set duration time
            if (this.player.duration !== 1) {
                // compatibility: Android browsers will output 1 at first
                this.player.template.dtime.innerHTML = utils.secondToTime(this.player.duration);
            }
            if (this.player.options.storeList) {
                this.updateListStorage();
            }
        }
    }

    clear() {
        this.player.events.trigger('listclear');
        this.index = 0;
        this.player.container.classList.remove('aplayer-withlist');
        this.player.pause();
        this.audios = [];
        this.player.lrc && this.player.lrc.clear();
        this.player.audio.src = '';
        if (this.player.options.fixedBar) {
            this.player.template.list.innerHTML = tplListTitle({
                icons: Icons,
            });
        } else {
            this.player.template.list.innerHTML = '';
        }
        if (this.player.options.defaultCover) {
            this.player.template.pic.style.backgroundImage = `url(${this.player.options.defaultCover})`;
        }
        this.player.theme(this.player.options.theme, this.index, false);
        this.player.template.title.innerHTML = this.player.options.defaultTitle;
        this.player.template.author.innerHTML = '';
        this.player.bar.set('loaded', 0, 'width');
        this.player.template.dtime.innerHTML = utils.secondToTime(0);
        if (this.player.options.fixedBar) {
            this.updateListNum();
        }
        if (this.player.options.storeList) {
            this.updateListStorage();
        }
    }

    updateListStorage() {
        this.player.storage.set('list', this.audios);
        this.player.storage.set('listIndex', this.index);
    }

    updateListNum() {
        if (this.audios.length > 99) {
            this.player.template.listLength.innerHTML = '99+';
        } else {
            this.player.template.listLength.innerHTML = this.audios.length;
        }
    }
}

export default List;
