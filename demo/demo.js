const ap1 = new APlayer({
    element: document.getElementById('player1'),
    mini: false,
    autoplay: true,
    lrc: false,
    mutex: true,
    theme: '#e6d0b2',
    preload: 'metadata',
    audio: {
        name: 'Preparation',
        artist: 'Hans Zimmer/Richard Harvey',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.jpg'
    }
});
ap1.on('play', function () {
    console.log('play');
});
ap1.on('play', function () {
    console.log('play play');
});
ap1.on('pause', function () {
    console.log('pause');
});
ap1.on('canplay', function () {
    console.log('canplay');
});
ap1.on('playing', function () {
    console.log('playing');
});
ap1.on('ended', function () {
    console.log('ended');
});
ap1.on('error', function () {
    console.log('error');
});

const ap2 = new APlayer({
    element: document.getElementById('player2'),
    mini: true,
    autoplay: false,
    lrc: false,
    mutex: true,
    theme: '#e6d0b2',
    audio: {
        name: 'Preparation',
        artist: 'Hans Zimmer/Richard Harvey',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.jpg'
    }
});

const ap3 = new APlayer({
    element: document.getElementById('player3'),
    mini: false,
    autoplay: false,
    lrc: 3,
    mutex: true,
    theme: '#615754',
    audio: {
        name: '回レ！雪月花',
        artist: '小倉唯',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.jpg',
        lrc: "https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.lrc"
    }
});

const ap4 = new APlayer({
    element: document.getElementById('player4'),
    mini: false,
    autoplay: false,
    lrc: false,
    mutex: true,
    theme: '#ad7a86',
    order: 'random',
    audio: [
        {
            name: 'あっちゅ～ま青春!',
            artist: '七森中☆ごらく部',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.mp3',
            cover: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.jpg'
        },
        {
            name: 'secret base~君がくれたもの~',
            artist: '茅野愛衣',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
            cover: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
        },
        {
            name: '回レ！雪月花',
            artist: '小倉唯',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.mp3',
            cover: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.jpg'
        }
    ]
});

const ap5 = new APlayer({
    element: document.getElementById('player5'),
    mini: false,
    autoplay: false,
    lrc: 3,
    mutex: true,
    theme: '#ad7a86',
    listFolded: true,
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