const langs = [
    { title: 'English', path: '/home', matchPath: /^\/(home|ecosystem|support)/ },
    { title: '简体中文', path: '/zh-Hans/', matchPath: /^\/zh-Hans/ },
];

docute.init({
    landing: 'landing.html',
    title: 'APlayer',
    repo: 'DIYgod/APlayer',
    twitter: 'DIYgod',
    'edit-link': 'https://github.com/MoePlayer/APlayer/tree/master/docs',
    nav: {
        default: [
            {
                title: 'Home', path: '/home'
            },
            {
                title: 'Ecosystem', path: '/ecosystem'
            },
            {
                title: 'Support APlayer', path: '/support'
            },
            {
                title: 'Languages', type: 'dropdown', items: langs
            }
        ],
        'zh-Hans': [
            {
                title: '首页', path: '/zh-Hans/'
            },
            {
                title: '生态', path: '/zh-Hans/ecosystem'
            },
            {
                title: '支持 APlayer', path: '/zh-Hans/support'
            },
            {
                title: '选择语言', type: 'dropdown', items: langs
            }
        ],
    },
    plugins: [
        docsearch({
            apiKey: '',
            indexName: 'aplayer',
            tags: ['english', 'zh-Hans'],
            url: 'https://aplayer.js.org'
        }),
        evanyou(),
        player()
    ]
});

function player () {
    return function (context) {
        context.event.on('landing:updated', function () {
            console.log('landing:updated');
            clearPlayer();
            aplayer0();
            aplayer1();
        });
        context.event.on('content:updated', function () {
            console.log('content:updated');
            clearPlayer();
            for (let i = 0; i < document.querySelectorAll('.load').length; i++) {
                document.querySelectorAll('.load')[i].addEventListener('click', function () {
                    window[this.parentElement.id] && window[this.parentElement.id]();
                });
            }
        });
    };
}

function clearPlayer () {
    for (let i = 0; i < 10; i++) {
        if (window['ap' + i]) {
            window['ap' + i].destroy();
        }
    }
}

function aplayer1 () {
    window.ap1 = new APlayer({
        container: document.getElementById('aplayer1'),
        theme: '#F57F17',
        lrcType: 3,
        audio: [{
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc',
            theme: '#ebd0c2'
        }, {
            name: 'トリカゴ',
            artist: 'XX:me',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.lrc',
            theme: '#46718b'
        }, {
            name: '前前前世',
            artist: 'RADWIMPS',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.lrc',
            theme: '#505d6b'
        }]
    });
}

function aplayer0 () {
    window.ap0 = new APlayer({
        container: document.getElementById('aplayer0'),
        fixed: true,
        lrcType: 3,
        audio: [{
            name: '前前前世',
            artist: 'RADWIMPS',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.lrc',
            theme: '#505d6b'
        }, {
            name: 'トリカゴ',
            artist: 'XX:me',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.lrc',
            theme: '#46718b'
        }, {
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc',
            theme: '#ebd0c2'
        }]
    });
}

function aplayer2 () {
    window.ap2 = new APlayer({
        container: document.getElementById('aplayer2'),
        audio: [{
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
            theme: '#ebd0c2'
        }]
    });
}

function aplayer3 () {
    window.ap3 = new APlayer({
        container: document.getElementById('aplayer3'),
        mini: false,
        autoplay: false,
        loop: 'all',
        order: 'random',
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        listFolded: false,
        listMaxHeight: 90,
        lrcType: 3,
        audio: [{
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc',
            theme: '#ebd0c2'
        }, {
            name: 'トリカゴ',
            artist: 'XX:me',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.lrc',
            theme: '#46718b'
        }, {
            name: '前前前世',
            artist: 'RADWIMPS',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.lrc',
            theme: '#505d6b'
        }]
    });
}

function aplayer4 () {
    window.ap4 = new APlayer({
        container: document.getElementById('aplayer4'),
        lrcType: 3,
        audio: [{
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc',
            theme: '#ebd0c2'
        }]
    });
}

function aplayer5 () {
    window.ap5 = new APlayer({
        container: document.getElementById('aplayer5'),
        lrcType: 3,
        audio: [{
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc',
            theme: '#ebd0c2'
        }, {
            name: 'トリカゴ',
            artist: 'XX:me',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.lrc',
            theme: '#46718b'
        }, {
            name: '前前前世',
            artist: 'RADWIMPS',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.lrc',
            theme: '#505d6b'
        }]
    });
}

function aplayer6 () {
    window.ap6 = new APlayer({
        container: document.getElementById('aplayer6'),
        mini: true,
        audio: [{
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
            theme: '#ebd0c2'
        }]
    });
}

function aplayer7 () {
    window.ap7 = new APlayer({
        container: document.getElementById('aplayer7'),
        audio: [{
            name: '光るなら(HLS)',
            artist: 'Goose house',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hls/hikarunara.m3u8',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
            theme: '#ebd0c2',
            type: 'hls'
        }, {
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
            theme: '#ebd0c2'
        }, {
            name: 'トリカゴ',
            artist: 'XX:me',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.jpg',
            theme: '#46718b'
        }, {
            name: '前前前世',
            artist: 'RADWIMPS',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg',
            theme: '#505d6b'
        }]
    });
}

function aplayer8 () {
    window.ap8 = new APlayer({
        container: document.getElementById('aplayer8'),
        theme: '#e9e9e9',
        audio: [{
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
        }, {
            name: 'トリカゴ',
            artist: 'XX:me',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.jpg',
        }, {
            name: '前前前世',
            artist: 'RADWIMPS',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg',
        }]
    });

    const colorThief = new ColorThief();
    window.ap8.on('switchaudio', function (index) {
        if (!window.ap8.options.audio[index].theme) {
            colorThief.getColorAsync(window.ap8.options.audio[index].cover, function (color) {
                window.ap8.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
            });
        }
    });
}

function aplayer9 () {
    window.ap9 = new APlayer({
        container: document.getElementById('aplayer9'),
        fixed: true,
        lrcType: 3,
        audio: [{
            name: '光るなら',
            artist: 'Goose house',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc',
            theme: '#ebd0c2'
        }, {
            name: 'トリカゴ',
            artist: 'XX:me',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.lrc',
            theme: '#46718b'
        }, {
            name: '前前前世',
            artist: 'RADWIMPS',
            url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3',
            cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg',
            lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.lrc',
            theme: '#505d6b'
        }]
    });
}