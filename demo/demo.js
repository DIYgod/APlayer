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
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
        cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
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
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
        cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
        lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc',
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
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
        cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
        lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc',
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
    }, {
        name: '光るなら(HLS)',
        artist: 'Goose house',
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hls/hikarunara.m3u8',
        cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
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
    listMaxHeight: 80,
    audio: [{
        name: '光るなら',
        artist: 'Goose house',
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3',
        cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
        lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc',
    }, {
        name: 'トリカゴ',
        artist: 'XX:me',
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.mp3',
        cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.jpg',
        lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/darling.lrc',
    }, {
        name: '前前前世',
        artist: 'RADWIMPS',
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3',
        cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg',
        lrc: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.lrc',
    }]
});
const colorThief = new ColorThief();
const image = new Image();
const xhr = new XMLHttpRequest();
const setTheme = (index) => {
    if (!ap5.list.audios[index].theme) {
        xhr.onload = function(){
            let coverUrl = URL.createObjectURL(this.response);
            image.onload = function(){
                let color = colorThief.getColor(image);
                ap5.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
                URL.revokeObjectURL(coverUrl)
            };
            image.src = coverUrl;
        }
        xhr.open('GET', ap5.list.audios[index].cover, true);
        xhr.responseType = 'blob';
        xhr.send();
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
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hls/hikarunara.m3u8',
        cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
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
        url: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hls/hikarunara.m3u8',
        cover: 'https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg',
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