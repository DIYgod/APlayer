export default (options) => {
    // default options
    const defaultOption = {
        container: options.element || document.getElementsByClassName('aplayer')[0],
        mini: options.narrow || options.fixed || false,
        fixed: false,
        fixedBar: false,
        autoplay: false,
        mutex: true,
        lrcType: options.showlrc || options.lrc || 0,
        lrcFontSize: 12,
        lrcErrNotice: true,
        preload: 'metadata',
        theme: '#b7daff',
        loop: 'all',
        order: 'list',
        volume: 0.7,
        listFolded: !options.fixed,
        listMaxHeight: options.listmaxheight || 250,
        audio: options.music || [],
        storageName: 'aplayer-setting',
        storeList: false,
        defaultTitle: 'No audio',
        defaultCover: '',
        defaultLrcErrText: 'Not available',
        defaultLrcLoadingText: 'Loading',
    };
    for (const defaultKey in defaultOption) {
        if (defaultOption.hasOwnProperty(defaultKey) && !options.hasOwnProperty(defaultKey)) {
            options[defaultKey] = defaultOption[defaultKey];
        }
    }

    options.listMaxHeight = parseFloat(options.listMaxHeight);

    if (Object.prototype.toString.call(options.audio) !== '[object Array]') {
        options.audio = [options.audio];
    }

    options.audio.map((item) => {
        item.name = item.name || item.title || 'Audio name';
        item.artist = item.artist || item.author || 'Audio artist';
        item.cover = item.cover || item.pic;
        item.type = item.type || 'normal';
        return item;
    });

    if (options.audio.length <= 1 && options.loop === 'one') {
        options.loop = 'all';
    }

    return options;
};
