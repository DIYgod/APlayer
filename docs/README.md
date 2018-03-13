---
search: english
---

# APlayer

🍭 Wow, such a beautiful HTML5 music player

## Special Sponsors

<a href="https://pear.hk/" target="_blank">
    <img width="222px" src="https://i.imgur.com/5qQYmfc.png">
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
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'APlayer';

const ap = new APlayer(options);
```

## Options

Name | Default | Description
----|-------|----
container | document.querySelector('.aplayer') | player container
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
mutex | true | prevent to play multiple player at the same time, pause other players when this player start play
lrc | false | [see more details](https://aplayer.js.org/#/home?id=lrc)
listFolded | false | indicate whether list should folded at first
listMaxHeight | - | list max height

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
    listMaxHeight: '90px',
    lrc: 3,
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

+ `ap.seek(time: number)`: seek to specified time

  ```js
  ap.seek(100);
  ```

+ `ap.toggle()`: toggle between play and pause

+ `ap.on(event: string, handler: function)`: bind audio and player events, [see more details](https://aplayer.js.org/#/home?id=event-binding)

+ `ap.switchAudio(index: number)`: switch audio list

  ```js
  ap.switchAudio(1);
  ```

+ `ap.addAudio(audio)`: add new audios to the list

  ```js
  ap.addAudio([
      {
          name: 'name',
          artist: 'artist',
          url: 'url.mp3',
          cover: 'cover.jpg',
          lrc: 'lrc.lrc',
          theme: '#ebd0c2'
      }
  ]);
  ```

+ `ap.removeAudio(index: number)`: remove audio from the list

  ```js
  ap.removeAudio(1);
  ```

+ `ap.volume(percentage: number, nostorage: boolean)`: set audio volume

  ```js
  ap.volume(0.1, true);
  ```

+ `ap.theme(color: string, index: number)`: set player theme, the default of index is current audio index.

  ```js
  ap.theme('#000', 0);
  ```

+ `ap.destroy()`: destroy player

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

Video events

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

- switchaudio
- addaudio
- removeaudio
- destroy

## LRC

We have three ways to pass LRC to APlayer, indicate the way to pass LRC by option `lrc`, then put lrc to option `audio.lrc` or HTML.

<div class="aplayer-wrap">
    <div id="aplayer4"><button class="docute-button load">Click to load player</div>
</div>

### LRC file

The first way, put LRC to a LRC file, LRC file will be loaded when this audio start to play.

```js
const ap = new APlayer({
    container: document.getElementById('aplayer'),
    lrc: 3,
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
    lrc: 1,
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
    lrc: 2,
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
    listMaxHeight: '90px',
    lrc: 3,
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

## Mini mode

If you don't have enough space for normal player, mini mode might be your choice.

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

## Self-adapting theme according to cover

It requires the library [color-thief](https://github.com/lokesh/color-thief/blob/master/src/color-thief.js).

<div class="aplayer-wrap">
    <div id="aplayer7"><button class="docute-button load">Click to load player</div>
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
ap.on('switchaudio', (index) => {
    if (!ap.options.audio[index].theme) {
        colorThief.getColorAsync(ap.options.audio[index].cover, (color) => {
            ap.theme(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, index);
        });
    }
});
```

## CDN

- [jsDelivr](https://www.jsdelivr.com/package/npm/aplayer)
- [cdnjs](https://cdnjs.com/libraries/aplayer)
- [unpkg](https://unpkg.com/aplayer/)

## FAQ

### Why can't player autoplay in some mobile browsers?

Most mobile browsers forbid video autoplay, you wont be able to achieve it without hacks.