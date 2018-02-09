export default (options) => {

    // default options
    const defaultOption = {
        container: options.element || document.getElementsByClassName('aplayer')[0],
        narrow: false,
        autoplay: false,
        mutex: true,
        showlrc: 0,
        theme: '#b7daff',
        mode: 'circulation'
    };
    for (const defaultKey in defaultOption) {
        if (defaultOption.hasOwnProperty(defaultKey) && !options.hasOwnProperty(defaultKey)) {
            options[defaultKey] = defaultOption[defaultKey];
        }
    }

    if (Object.prototype.toString.call(options.music) !== '[object Array]') {
        options.music = [options.music];
    }

    return options;
};
