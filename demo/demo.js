const ap1 = new APlayer({
    element: document.getElementById('player1'),
    narrow: false,
    autoplay: true,
    showlrc: false,
    mutex: true,
    theme: '#e6d0b2',
    preload: 'metadata',
    mode: 'circulation',
    music: {
        title: 'Preparation',
        author: 'Hans Zimmer/Richard Harvey',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.mp3',
        pic: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.jpg'
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
    narrow: true,
    autoplay: false,
    showlrc: false,
    mutex: true,
    theme: '#e6d0b2',
    mode: 'circulation',
    music: {
        title: 'Preparation',
        author: 'Hans Zimmer/Richard Harvey',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.mp3',
        pic: 'https://moeplayer.b0.upaiyun.com/aplayer/preparation.jpg'
    }
});

const ap3 = new APlayer({
    element: document.getElementById('player3'),
    narrow: false,
    autoplay: false,
    showlrc: 3,
    mutex: true,
    theme: '#615754',
    mode: 'circulation',
    music: {
        title: '回レ！雪月花',
        author: '小倉唯',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.mp3',
        pic: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.jpg',
        lrc: "https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.lrc"
    }
});

const ap4 = new APlayer({
    element: document.getElementById('player4'),
    narrow: false,
    autoplay: false,
    showlrc: false,
    mutex: true,
    theme: '#ad7a86',
    mode: 'random',
    music: [
        {
            title: 'あっちゅ～ま青春!',
            author: '七森中☆ごらく部',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.mp3',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.jpg'
        },
        {
            title: 'secret base~君がくれたもの~',
            author: '茅野愛衣',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
        },
        {
            title: '回レ！雪月花',
            author: '小倉唯',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.mp3',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.jpg'
        }
    ]
});

const ap5 = new APlayer({
    element: document.getElementById('player5'),
    narrow: false,
    autoplay: false,
    showlrc: 3,
    mutex: true,
    theme: '#ad7a86',
    mode: 'random',
    listmaxheight: '80px',
    music: [
        {
            title: 'あっちゅ～ま青春!',
            author: '七森中☆ごらく部',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.mp3',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.jpg',
            lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/yuruyuri.lrc'
        },
        {
            title: 'secret base~君がくれたもの~',
            author: '茅野愛衣',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg',
            lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.lrc'
        },
        {
            title: '回レ！雪月花',
            author: '小倉唯',
            url: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.mp3',
            pic: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.jpg',
            lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/snowmoonflowers.lrc'
        }
    ]
});