export default (options) => {

    // default options
    const defaultOption = {
        container: options.element || document.getElementsByClassName('aplayer')[0],
        mini: options.narrow || false,
        autoplay: false,
        mutex: true,
        lrcType: options.showlrc || options.lrc || 0,
        preload: 'auto',
        theme: '#b7daff',
        loop: 'all',
        order: 'list',
        volume: 0.7,
        listFolded: false,
        listMaxHeight: options.listmaxheight,
        audio: options.music
    };
    for (const defaultKey in defaultOption) {
        if (defaultOption.hasOwnProperty(defaultKey) && !options.hasOwnProperty(defaultKey)) {
            options[defaultKey] = defaultOption[defaultKey];
        }
    }

    if (Object.prototype.toString.call(options.audio) !== '[object Array]') {
        options.audio = [options.audio];
    }

    options.audio.map((item) => {
        item.name = item.name || item.title;
        item.artist = item.artist || item.author;
        item.cover = item.cover || item.pic;
        return item;
    });

    if (options.audio.length <= 1 && options.loop === 'one') {
        options.loop = 'all';
    }

    return options;
};
