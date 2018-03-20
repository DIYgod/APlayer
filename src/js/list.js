import tplListItem from '../template/list-item.art';
import utils from './utils';

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
        this.player.events.trigger('listadd', audios);
        const wasSingle = !(this.audios.length > 1);

        this.player.template.listOl.innerHTML += tplListItem({
            theme: this.player.options.theme,
            audio: audios,
            index: this.audios.length + 1
        });

        this.audios = this.audios.concat(audios);

        if (wasSingle && this.audios.length > 1) {
            this.player.container.classList.add('aplayer-withlist');
        }
        this.player.template.list.style.height = this.audios.length * 33 - 1 + 'px';
        this.player.template.listOl.style.height = this.audios.length * 33 - 1 + 'px';

        this.player.randomOrder = utils.randomOrder(this.audios.length);
        this.player.template.listCurs = this.player.container.querySelectorAll('.aplayer-list-cur');

        this.player.template.listCurs[this.audios.length - 1].style.backgroundColor = audios.theme || this.player.options.theme;
    }

    remove (index) {
        this.player.events.trigger('listremove', index);
        if (this.audios[index] && this.audios.length > 1) {
            const list = this.player.container.querySelectorAll('.aplayer-list li');
            list[index].remove();

            this.audios.splice(index, 1);

            if (index === this.index) {
                if (this.audios[index + 1]) {
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
            this.player.template.list.style.height = this.audios.length * 33 - 1 + 'px';
            this.player.template.listOl.style.height = this.audios.length * 33 - 1 + 'px';

            this.player.template.listCurs = this.player.container.querySelectorAll('.aplayer-list-cur');
        }
        else {
            // TODO
        }
    }

    switch (index) {
        this.player.events.trigger('listswitch', index);
        if (typeof index !== 'undefined') {
            this.index = index;
        }

        const audio = this.audios[this.index];

        // set html
        this.player.template.pic.style.backgroundImage = audio.cover ? `url('${audio.cover}')` : '';
        this.player.theme(this.audios[this.index].theme || this.player.options.theme, this.index);
        this.player.template.title.innerHTML = audio.name;
        this.player.template.author.innerHTML = audio.artist ? ' - ' + audio.artist : '';

        const light = this.player.container.getElementsByClassName('aplayer-list-light')[0];
        if (light) {
            light.classList.remove('aplayer-list-light');
        }
        this.player.container.querySelectorAll('.aplayer-list li')[this.index].classList.add('aplayer-list-light');

        this.player.template.list.scrollTop = this.index * 33;

        this.player.setAudio(audio);

        this.player.lrc && this.player.lrc.switch(this.index);

        // set duration time
        if (this.player.audio.duration !== 1) {           // compatibility: Android browsers will output 1 at first
            this.player.template.dtime.innerHTML = this.player.audio.duration ? utils.secondToTime(this.player.audio.duration) : '00:00';
        }
    }
}

export default List;