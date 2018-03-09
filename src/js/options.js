export default (options) => {

    // default options
    const defaultOption = {
        container: options.element || document.getElementsByClassName('aplayer')[0],
        narrow: false,
        autoplay: false,
        mutex: true,
        lrc: 0,
        theme: '#b7daff',
        loop: 'all',
        order: 'list',
    };
    for (const defaultKey in defaultOption) {
        if (defaultOption.hasOwnProperty(defaultKey) && !options.hasOwnProperty(defaultKey)) {
            options[defaultKey] = defaultOption[defaultKey];
        }
    }

    if (Object.prototype.toString.call(options.audio) !== '[object Array]') {
        options.audio = [options.audio];
    }

    if (options.audio.length <= 1 && options.loop === 'one') {
        options.loop = 'all';
    }

    return options;
};
