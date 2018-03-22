const ap1 = new APlayer({
    element: document.getElementById('player1'),
    mini: false,
    autoplay: false,
    lrcType: false,
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
    lrcType: false,
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
    lrcType: 3,
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
    lrcType: false,
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
    }, {
        name: '光るなら(HLS)',
        artist: 'Goose house',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/hls/hikarunara.m3u8',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
        theme: '#ebd0c2',
        type: 'hls'
    }]
});

const ap5 = new APlayer({
    element: document.getElementById('player5'),
    mini: false,
    autoplay: false,
    lrcType: 3,
    mutex: true,
    theme: '#e9e9e9',
    listFolded: false,
    listMaxHeight: '80px',
    audio: [{
        name: '光るなら',
        artist: 'Goose house',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
        lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
    }, {
        name: 'トリカゴ',
        artist: 'XX:me',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/darling.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/darling.jpg',
        lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/darling.lrc',
    }, {
        name: '前前前世',
        artist: 'RADWIMPS',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.mp3',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.jpg',
        lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/yourname.lrc',
    }]
});
const colorThief = new ColorThief();
const setTheme = (index) => {
    if (!ap5.list.audios[index].theme) {
        colorThief.getColorAsync(ap5.list.audios[index].cover, function (color) {
            ap5.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
        });
    }
};
setTheme(ap5.list.index);
ap5.on('listswitch', (data) => {
    setTheme(data.index);
});

const ap6 = new APlayer({
    element: document.getElementById('player6'),
    mutex: true,
    audio: [{
        name: '光るなら(HLS)',
        artist: 'Goose house',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/hls/hikarunara.m3u8',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
        theme: '#ebd0c2',
        type: 'hls'
    }]
});
const ap7 = new APlayer({
    element: document.getElementById('player7'),
    mutex: true,
    audio: [{
        name: '光るなら(HLS)',
        artist: 'Goose house',
        url: 'https://moeplayer.b0.upaiyun.com/aplayer/hls/hikarunara.m3u8',
        cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
        theme: '#ebd0c2',
        type: 'customHls',
    }],
    customAudioType: {
        'customHls': function (audioElement, audio, player) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(audio.url);
                hls.attachMedia(audioElement);
            }
            else if (audioElement.canPlayType('application/x-mpegURL') || audioElement.canPlayType('application/vnd.apple.mpegURL')) {
                audioElement.src = audio.url;
            }
            else {
                player.notice('Error: HLS is not supported.');
            }
        }
    }
});

const ap8 = new APlayer({
    element: document.getElementById('player8'),
    mutex: true,
    theme: '#ad7a86',
    order: 'random',
    lrcType: 3,
    fixed: true,
});
$.ajax({
    url: 'https://api.i-meto.com/meting/api?server=netease&type=playlist&id=35798529',
    success: function (list) {
        ap8.list.add(JSON.parse(list));
    }
});