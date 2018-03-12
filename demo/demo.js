const ap1 = new APlayer({
    element: document.getElementById('player1'),
    mini: false,
    autoplay: false,
    lrc: false,
    mutex: true,
    preload: 'metadata',
    audio: [{
        name: '光るなら',
        artist: 'Goose house',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
        theme: '#ebd0c2'
    }]
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
    audio: [{
        name: '光るなら',
        artist: 'Goose house',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
        lrc: "https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc",
        theme: '#ebd0c2'
    }]
});

const ap3 = new APlayer({
    element: document.getElementById('player3'),
    mini: false,
    autoplay: false,
    lrc: 3,
    mutex: true,
    audio: [{
        name: '光るなら',
        artist: 'Goose house',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
        lrc: "https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc",
        theme: '#ebd0c2'
    }]
});

const ap4 = new APlayer({
    element: document.getElementById('player4'),
    mini: false,
    autoplay: false,
    lrc: false,
    mutex: true,
    theme: '#ad7a86',
    order: 'random',
    audio: [{
        name: '光るなら',
        artist: 'Goose house',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
        lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
        theme: '#ebd0c2'
    }, {
        name: 'トリカゴ',
        artist: 'XX:me',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/darling.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/darling.jpg',
        lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/darling.lrc',
        theme: '#46718b'
    }, {
        name: '前前前世',
        artist: 'RADWIMPS',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.jpg',
        lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.lrc',
        theme: '#505d6b'
    }]
});

const ap5 = new APlayer({
    element: document.getElementById('player5'),
    mini: false,
    autoplay: false,
    lrc: 3,
    mutex: true,
    theme: '#ad7a86',
    listFolded: false,
    listMaxHeight: '80px',
    audio: [{
        name: '光るなら',
        artist: 'Goose house',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
        lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
        theme: '#ebd0c2'
    }, {
        name: 'トリカゴ',
        artist: 'XX:me',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/darling.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/darling.jpg',
        lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/darling.lrc',
        theme: '#46718b'
    }, {
        name: '前前前世',
        artist: 'RADWIMPS',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.jpg',
        lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.lrc',
        theme: '#505d6b'
    }]
});