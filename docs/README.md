---
search: english
---

# APlayer

🍭 Wow, such a beautiful HTML5 music player

## Special Sponsors

<a href="https://www.dogecloud.com/?ref=dplayer" target="_blank">
    <img width="222px" src="https://i.imgur.com/BBKXPAp.png">
</a>
<a href="https://www.upyun.com/" target="_blank">
    <img width="222px" src="https://imgur.com/apG1uKf.png">
</a>

## Installation

Using npm:

```
npm install aplayer --save
```

Using Yarn:

```
yarn add aplayer
```

## Quick Start

<div class="aplayer-wrap">
    <div id="aplayer2"><button class="docute-button load">Click to load player</div>
</div>

```html
<link rel="stylesheet" href="APlayer.min.css">
<div id="aplayer"></div>
<script src="APlayer.min.js"></script>
```

```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [{
        name: 'name',
        artist: 'artist',
        url: 'url.mp3',
        cover: 'cover.jpg'
    }]
});
```

Work with module bundler:

```js
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';

const ap = new APlayer(options);
```

## Options

Name | Default | Description
----|-------|----
container | document.querySelector('.aplayer') | player container
fixed | false | enable fixed mode, [see more details](https://aplayer.js.org/#/home?id=fixed-mode)
mini | false | enable mini mode, [see more details](https://aplayer.js.org/#/home?id=mini-mode)
autoplay | false | audio autoplay
theme | '#b7daff' | main color
loop | 'all' | player loop play, values: 'all', 'one', 'none'
order | 'list' | player play order, values: 'list', 'random'
preload | 'auto' | values: 'none', 'metadata', 'auto'
volume | 0.7 | default volume, notice that player will remember user setting, default volume will not work after user set volume themselves
audio | - | audio info, should be an object or object array
audio.name | - | audio name
audio.artist | - | audio artist
audio.url | - | audio url
audio.cover | - | audio cover
audio.lrc | - | [see more details](https://aplayer.js.org/#/home?id=lrc)
audio.theme | - | main color when switching to this audio, it has priority over the above theme
audio.type | 'auto' | values: 'auto', 'hls', 'normal' or other custom type, [see more details](https://aplayer.js.org/#/home?id=mse-support)
customAudioType | - | [see more details](https://aplayer.js.org/#/home?id=mse-support)
mutex | true | prevent to play multiple player at the same time, pause other players when this player start play
lrcType | 0 | [see more details](https://aplayer.js.org/#/home?id=lrc)
listFolded | false | indicate whether list should folded at first
listMaxHeight | - | list max height
storageName | 'aplayer-setting' | localStorage key that store player setting

For example:

<div class="aplayer-wrap">
    <div id="aplayer3"><button class="docute-button load">Click to load player</div>
</div>

```js
const ap = new APlayer({
    container: document.getElementById('player'),
    mini: false,
    autoplay: false,
    theme: '#FADFA3',
    loop: 'all',
    order: 'random',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    listFolded: false,
    listMaxHeight: 90,
    lrcType: 3,
    audio: [
        {
            name: 'name1',
            artist: 'artist1',
            url: 'url1.mp3',
            cover: 'cover1.jpg',
            lrc: 'lrc1.lrc',
            theme: '#ebd0c2'
        },
        {
            name: 'name2',
            artist: 'artist2',
            url: 'url2.mp3',
            cover: 'cover2.jpg',
            lrc: 'lrc2.lrc',
            theme: '#46718b'
        }
    ]
});
```

## API

+ `APlayer.version`: static property, return the version of APlayer

+ `ap.play()`: play audio

+ `ap.pause()`: pause audio

+ `ap.seek(time: number)`: seek to specified time, the unit of time is second

  ```js
  ap.seek(100);
  ```

+ `ap.toggle()`: toggle between play and pause

+ `ap.on(event: string, handler: function)`: bind audio and player events, [see more details](https://aplayer.js.org/#/home?id=event-binding)

+ `ap.volume(percentage: number, nostorage: boolean)`: set audio volume

  ```js
  ap.volume(0.1, true);
  ```

+ `ap.theme(color: string, index: number)`: set player theme, the default of index is current audio index

  ```js
  ap.theme('#000', 0);
  ```

+ `ap.setMode(mode: string)`: set player mode, the value of mode should be 'mini' or 'normal'

+ `ap.mode`: return current player mode, 'mini' or 'normal'

+ `ap.notice(text: string, time: number, opacity: number)`: show message, the unit of time is millisecond, the default of time is 2000, the default of opacity is 0.8, setting time to 0 can disable notice autohide.

  ```js
  ap.notice('Amazing player', 2000, 0.8);
  ```

+ `ap.skipBack()`: skip to previous audio

+ `ap.skipForward()`: skip to next audio

+ `ap.destroy()`: destroy player

+ `ap.lrc`

  + `ap.lrc.show()`: show lrc

  + `ap.lrc.hide()`: hide lrc

  + `ap.lrc.toggle()`: toggle lrc between show and hide

+ `ap.list`

  + `ap.list.show()`: show list

  + `ap.list.hide()`: hide list

  + `ap.list.toggle()`: toggle list between show and hide

  + `ap.list.add(audios: array | object)`: add new audios to the list

  ```js
  ap.list.add([{
      name: 'name',
      artist: 'artist',
      url: 'url.mp3',
      cover: 'cover.jpg',
      lrc: 'lrc.lrc',
      theme: '#ebd0c2'
  }]);
  ```

  + `ap.list.remove(index: number)`: remove an audio from the list

  ```js
  ap.list.remove(1);
  ```

  + `ap.list.switch()`: switch to an audio in the list

  ```js
  ap.list.switch(1);
  ```

  + `ap.list.clear()`: remove all audios from the list

+ `ap.audio`: native audio

 + `ap.audio.currentTime`: returns the current playback position

 + `ap.audio.duration`: returns audio total time

 + `ap.audio.paused`: returns whether the audio paused

 + most [native api](http://www.w3schools.com/tags/ref_av_dom.asp) are supported

## Event binding

`ap.on(event, handler)`

```js
ap.on('ended', function () {
    console.log('player ended');
});
```

Audio events

- abort
- canplay
- canplaythrough
- durationchange
- emptied
- ended
- error
- loadeddata
- loadedmetadata
- loadstart
- mozaudioavailable
- pause
- play
- playing
- progress
- ratechange
- seeked
- seeking
- stalled
- suspend
- timeupdate
- volumechange
- waiting

Player events

- listshow
- listhide
- listadd
- listremove
- listswitch
- listclear
- noticeshow
- noticehide
- destroy
- lrcshow
- lrchide

## LRC

We have three ways to pass LRC to APlayer, indicate the way to pass LRC by option `lrcType`, then put lrc to option `audio.lrc` or HTML.

<div class="aplayer-wrap">
    <div id="aplayer4"><button class="docute-button load">Click to load player</div>
</div>

### LRC file

The first way, put LRC to a LRC file, LRC file will be loaded when this audio start to play.

```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    lrcType: 3,
    audio: {
        name: 'name',
        artist: 'artist',
        url: 'demo.mp3',
        cover: 'demo.jpg',
        lrc: 'lrc.lrc'
    }
});
```

### LRC string in JS

The second way, put LRC to a JS string.

```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    lrcType: 1,
    audio: {
        name: 'name',
        artist: 'artist',
        url: 'demo.mp3',
        cover: 'demo.jpg',
        lrc: '[00:00.00]APlayer\n[00:04.01]is\n[00:08.02]amazing'
    }
});
```

### LRC in HTML

The third way, put LRC to HTML.

```html
<link rel="stylesheet" href="APlayer.min.css">
<div id="player">
    <pre class="aplayer-lrc-content">
        [00:00.00]APlayer audio1
        [00:04.01]is
        [00:08.02]amazing
        <!-- ... -->
    </pre>
    <pre class="aplayer-lrc-content">
        [00:00.00]APlayer audio2
        [00:04.01]is
        [00:08.02]amazing
        <!-- ... -->
    </pre>
</div>
<script src="APlayer.min.js"></script>
```

```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    lrcType: 2,
    audio: [[
        {
            name: 'name1',
            artist: 'artist1',
            url: 'url1.mp3',
            cover: 'cover1.jpg'
        },
        {
            name: 'name2',
            artist: 'artist2',
            url: 'url2.mp3',
            cover: 'cover2.jpg'
        }
    ]]
});
```

### LRC format

The following LRC format are supported:

`[mm:ss]APlayer`

`[mm:ss.xx]is`

`[mm:ss.xxx]amazing`

`[mm:ss.xx][mm:ss.xx]APlayer`

`[mm:ss.xx]<mm:ss.xx>is`

`[mm:ss.xx]amazing[mm:ss.xx]APlayer`

## Playlist

APlayer will show a playlist when it has more than one audio, option `listFolded` indicates whether list should folded at first, and option `listMaxHeight` indicates list max height.

<div class="aplayer-wrap">
    <div id="aplayer5"><button class="docute-button load">Click to load player</div>
</div>

```js
const ap = new APlayer({
    container: document.getElementById('player'),
    listFolded: false,
    listMaxHeight: 90,
    lrcType: 3,
    audio: [
        {
            name: 'name1',
            artist: 'artist1',
            url: 'url1.mp3',
            cover: 'cover1.jpg',
            lrc: 'lrc1.lrc',
            theme: '#ebd0c2'
        },
        {
            name: 'name2',
            artist: 'artist2',
            url: 'url2.mp3',
            cover: 'cover2.jpg',
            lrc: 'lrc2.lrc',
            theme: '#46718b'
        }
    ]
});
```

## Fixed mode

APlayer can be fixed to page bottom via fixed mode, fixed mode is a very different mode, enjoy it!

<div class="aplayer-wrap">
    <div id="aplayer9"><button class="docute-button load">Click to load player</div>
</div>

```js
const ap = new APlayer({
    container: document.getElementById('player'),
    fixed: true,
    audio: [{
        name: 'name',
        artist: 'artist',
        url: 'url.mp3',
        cover: 'cover.jpg',
    }]
});
```

## Mini mode

If you don't have enough space for normal player, mini mode might be your choice.

Please note that mini mode is conflicted with fixed mode.

<div class="aplayer-wrap">
    <div id="aplayer6"><button class="docute-button load">Click to load player</div>
</div>

```js
const ap = new APlayer({
    container: document.getElementById('player'),
    mini: true,
    audio: [{
        name: 'name',
        artist: 'artist',
        url: 'url.mp3',
        cover: 'cover.jpg',
    }]
});
```

## MSE support

### HLS

It requires the library [hls.js](https://github.com/video-dev/hls.js) and it should be loaded before `APlayer.min.js`.

<div class="aplayer-wrap">
    <div id="aplayer7"><button class="docute-button load">Click to load player</div>
</div>

```html
<link rel="stylesheet" href="APlayer.min.css">
<div id="aplayer"></div>
<script src="hls.min.js"></script>
<script src="APlayer.min.js"></script>
```

```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [{
        name: 'HLS',
        artist: 'artist',
        url: 'url.m3u8',
        cover: 'cover.jpg',
        type: 'hls'
    }]
});
```

```js
// another way, use customType
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [{
        name: 'HLS',
        artist: 'artist',
        url: 'url.m3u8',
        cover: 'cover.jpg',
        type: 'customHls'
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
```

## Self-adapting theme according to cover

It requires the library [color-thief](https://github.com/lokesh/color-thief/blob/master/src/color-thief.js).

<div class="aplayer-wrap">
    <div id="aplayer8"><button class="docute-button load">Click to load player</div>
</div>

```html
<link rel="stylesheet" href="APlayer.min.css">
<div id="aplayer"></div>
<script src="APlayer.min.js"></script>
<script src="color-thief.js"></script>
```

```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    theme: '#e9e9e9',
    audio: [{
        name: 'name1',
        artist: 'artist1',
        url: 'url1.mp3',
        cover: 'cover1.jpg'
    }, {
        name: 'name2',
        artist: 'artist2',
        url: 'url2.mp3',
        cover: 'cover2.jpg'
    }]
});

const colorThief = new ColorThief();
const image = new Image();
const xhr = new XMLHttpRequest();
const setTheme = (index) => {
    if (!ap.list.audios[index].theme) {
        xhr.onload = function(){
            let coverUrl = URL.createObjectURL(this.response);
            image.onload = function(){
                let color = colorThief.getColor(image);
                ap.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
                URL.revokeObjectURL(coverUrl)
            };
            image.src = coverUrl;
        }
        xhr.open('GET', ap.list.audios[index].cover, true);
        xhr.responseType = 'blob';
        xhr.send();
    }
};
setTheme(ap.list.index);
ap.on('listswitch', (index) => {
    setTheme(index);
});
```

## CDN

- [jsDelivr](https://www.jsdelivr.com/package/npm/aplayer)
- [cdnjs](https://cdnjs.com/libraries/aplayer)
- [unpkg](https://unpkg.com/aplayer/)

## FAQ

### Why can't player autoplay in some mobile browsers?

Most mobile browsers forbid audio autoplay, you wont be able to achieve it without hacks.