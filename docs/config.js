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
    for (let i = 1; i < 10; i++) {
        if (window['dp' + (i + 1)]) {
            window['dp' + (i + 1)].destroy();
        }
    }
}

function aplayer1 () {
    window.ap1 = new APlayer({
        container: document.getElementById('aplayer1'),
        theme: '#e6d0b2',
        audio: {
            name: 'Preparation',
            artist: 'Hans Zimmer/Richard Harvey',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.mp3',
            cover: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.jpg'
        }
    });
}

function aplayer2 () {
    window.ap2 = new APlayer({
        container: document.getElementById('aplayer2'),
        theme: '#e6d0b2',
        audio: {
            name: 'Preparation',
            artist: 'Hans Zimmer/Richard Harvey',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.mp3',
            cover: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.jpg'
        }
    });
}

function aplayer3 () {
    window.ap3 = new APlayer({
        container: document.getElementById('aplayer3'),
        mini: false,
        autoplay: false,
        theme: '#FADFA3',
        loop: 'all',
        order: 'random',
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        listFolded: false,
        listMaxHeight: '90px',
        lrc: 3,
        audio: [
            {
                name: 'あっちゅ～ま青春!',
                artist: '七森中☆ごらく部',
                url: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.mp3',
                cover: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.jpg',
                lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.lrc'
            },
            {
                name: 'secret base~君がくれたもの~',
                artist: '茅野愛衣',
                url: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
                cover: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg',
                lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.lrc'
            },
            {
                name: '回レ！雪月花',
                artist: '小倉唯',
                url: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.mp3',
                cover: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.jpg',
                lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.lrc'
            }
        ]
    });
}

function aplayer4 () {
    window.ap4 = new APlayer({
        container: document.getElementById('aplayer4'),
        lrc: 3,
        audio: [{
            name: '回レ！雪月花',
            artist: '小倉唯',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.mp3',
            cover: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.jpg',
            lrc: "https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.lrc"
        }]
    });
}

function aplayer5 () {
    window.ap5 = new APlayer({
        container: document.getElementById('aplayer5'),
        lrc: 3,
        audio: [
            {
                name: 'あっちゅ～ま青春!',
                artist: '七森中☆ごらく部',
                url: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.mp3',
                cover: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.jpg',
                lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.lrc'
            },
            {
                name: 'secret base~君がくれたもの~',
                artist: '茅野愛衣',
                url: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
                cover: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg',
                lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.lrc'
            },
            {
                name: '回レ！雪月花',
                artist: '小倉唯',
                url: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.mp3',
                cover: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.jpg',
                lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.lrc'
            }
        ]
    });
}

function aplayer6 () {
    window.ap6 = new APlayer({
        container: document.getElementById('aplayer6'),
        mini: true,
        audio: {
            name: 'Preparation',
            artist: 'Hans Zimmer/Richard Harvey',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.mp3',
            cover: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.jpg'
        }
    });
}