import tplListItem from '../template/list-item.art';
import utils from './utils';
import smoothScroll from 'smoothscroll';

class List {
    constructor (player) {
        this.player = player;
        this.index = 0;
        this.audios = this.player.options.audio;

        this.bindEvents();
    }

    bindEvents () {
        this.player.template.list.addEventListener('click', (e) => {
            let target;
            if (e.target.tagName.toUpperCase() === 'LI') {
                target = e.target;
            }
            else {
                target = e.target.parentElement;
            }
            const audioIndex = parseInt(target.getElementsByClassName('aplayer-list-index')[0].innerHTML) - 1;
            if (audioIndex !== this.index) {
                this.switch(audioIndex);
                this.player.play();
            }
            else {
                this.player.toggle();
            }
        });
    }

    show () {
        this.player.events.trigger('listshow');
        this.player.template.list.classList.remove('aplayer-list-hide');
        this.player.template.listOl.scrollTop = this.index * 33;
    }

    hide () {
        this.player.events.trigger('listhide');
        this.player.template.list.classList.add('aplayer-list-hide');
    }

    toggle () {
        if (!this.player.template.list.classList.contains('aplayer-list-hide')) {
            this.hide();
        }
        else {
            this.show();
        }
    }

    add (audios) {
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

        this.player.template.listOl.innerHTML += tplListItem({
            theme: this.player.options.theme,
            audio: audios,
            index: this.audios.length + 1
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
            }
            else {
                this.switch(0);
            }
        }
    }

    remove (index) {
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
                    }
                    else {
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
            }
            else {
                this.clear();
            }
        }
    }

    switch (index) {
        this.player.events.trigger('listswitch', {
            index: index,
        });

        if (typeof index !== 'undefined' && this.audios[index]) {
            this.index = index;

            const audio = this.audios[this.index];

            // set html
            this.player.template.pic.style.backgroundImage = audio.cover ? `url('${audio.cover}')` : '';
            this.player.theme(this.audios[this.index].theme || this.player.options.theme, this.index, false);
            this.player.template.title.innerHTML = audio.name;
            this.player.template.author.innerHTML = audio.artist ? ' - ' + audio.artist : '';

            const light = this.player.container.getElementsByClassName('aplayer-list-light')[0];
            if (light) {
                light.classList.remove('aplayer-list-light');
            }
            this.player.container.querySelectorAll('.aplayer-list li')[this.index].classList.add('aplayer-list-light');

            smoothScroll(this.index * 33, 500, null, this.player.template.listOl);

            this.player.setAudio(audio);

            this.player.lrc && this.player.lrc.switch(this.index);
            this.player.lrc && this.player.lrc.update(0);

            // set duration time
            if (this.player.duration !== 1) {           // compatibility: Android browsers will output 1 at first
                this.player.template.dtime.innerHTML = utils.secondToTime(this.player.duration);
            }
        }
    }

    clear () {
        this.player.events.trigger('listclear');
        this.index = 0;
        this.player.container.classList.remove('aplayer-withlist');
        this.player.pause();
        this.audios = [];
        this.player.lrc && this.player.lrc.clear();
        this.player.audio.src = '';
        this.player.template.listOl.innerHTML = '';
        this.player.template.pic.style.backgroundImage = '';
        this.player.theme(this.player.options.theme, this.index, false);
        this.player.template.title.innerHTML = 'No audio';
        this.player.template.author.innerHTML = '';
        this.player.bar.set('loaded', 0, 'width');
        this.player.template.dtime.innerHTML = utils.secondToTime(0);
    }
}

export default List;