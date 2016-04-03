# APlayer

[![npm](https://img.shields.io/npm/v/aplayer.svg?style=flat-square)](https://www.npmjs.com/package/aplayer)
[![npm](https://img.shields.io/npm/l/aplayer.svg?style=flat-square)](https://www.npmjs.com/package/aplayer)
[![devDependency Status](https://img.shields.io/david/dev/DIYgod/aplayer.svg?style=flat-square)](https://david-dm.org/DIYgod/APlayer#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/aplayer.svg?style=flat-square)](https://www.npmjs.com/package/aplayer)
[![Travis](https://img.shields.io/travis/DIYgod/APlayer.svg?style=flat-square)](https://travis-ci.org/DIYgod/APlayer)
[![%e2%9d%a4](https://img.shields.io/badge/made%20with-%e2%9d%a4-ff69b4.svg?style=flat-square)](https://www.anotherhome.net/)

Wow, such a beautiful html5 music player

## Introduction

UI 参考网易云音乐外链播放器

[Demo](https://www.anotherhome.net/file/APlayer)

Screenshot
![image](https://i.imgur.com/JDrJXCr.png)

## Install

```
$ npm install aplayer
```

## CDN

[cdnjs](https://cdnjs.com/libraries/aplayer)

## Usage

### HTML

```HTML
<link rel="stylesheet" href="APlayer.min.css">
<!-- ... -->
<div id="player1" class="aplayer"></div>
<!-- ... -->
<script src="APlayer.min.js"></script>
```

### JS

```JS
var ap = new APlayer({
    element: document.getElementById('player1'),
    narrow: false,
    autoplay: true,
    showlrc: false,
    theme: '#e6d0b2',
    music: {
        title: 'Preparation',
        author: 'Hans Zimmer/Richard Harvey',
        url: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.mp3',
        pic: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.jpg'
    }
});
ap.init();
```

#### Options

```JS
{
    element: document.getElementById('player1'),                       // Optional, player element
    narrow: false,                                                     // Optional, narrow style
    autoplay: true,                                                    // Optional, autoplay song(s), not supported by mobile browsers
    showlrc: 0,                                                        // Optional, show lrc, can be 0, 1, 2, see: ###With lrc
    mutex: true,                                                       // Optional, pause other players when this player playing
    theme: '#e6d0b2',                                                  // Optional, theme color, default: #b7daff
    music: {                                                           // Required, music info, see: ###With playlist
        title: 'Preparation',                                          // Required, music title
        author: 'Hans Zimmer/Richard Harvey',                          // Required, music author
        url: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.mp3',  // Required, music url
        pic: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.jpg'   // Optional, music picture
        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'                   // Optional, lrc, see: ###With lrc
    }
}
```

#### API

+ `ap.init()`
+ `ap.play()`
+ `ap.pause()`

#### Work with module bundler

```js
var APlayer = require('APlayer');
var ap = new APlayer({
    // ...
});
```

### With lrc

Show lrc, you can put LRC in JS or HTML as you like.

#### LRC format:

Support multiple time tag, support three decimal second

```
[mm:ss.xx]lyric
[mm:ss.xxx]lyric
[mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
...
```

#### LRC in JS:

JS:

```js
{
    showlrc: 1,
    music: {
        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'    // lrc here, separate lines with \n
    }
}
```

#### LRC in HTML:

JS:

```js
{
    showlrc: 2
}
```

HTML:

```HTML
<div id="player1" class="aplayer">
    <pre class="aplayer-lrc-content">
        [00:00.00]平凡之路 - 朴树
        [00:04.01]作词：韩寒 朴树
        [00:08.02]作曲：朴树 编曲：朴树
        [00:12.02]徘徊着的 在路上的
        [00:17.37]你要走吗
        [00:23.20]易碎的 骄傲着
        <!-- ... -->
    </pre>
</div>
```

### With playlist

Show multiple music.

#### JS:

Option:

```JS
music: [
    {
        title: '',
        author: '',
        url: '',
        pic: ''
    },
    {
        title: '',
        author: '',
        url: '',
        pic: ''
    },
    ...
]
```

## Run in development

```
$ npm install
$ npm run dev
```

## Make a release

```
$ npm install
$ npm run build
```

## Related Projects

+ [APlayer-Typecho-Plugin](https://github.com/zgq354/APlayer-Typecho-Plugin)

+ [hexo-tag-aplayer](https://github.com/grzhan/hexo-tag-aplayer)


## LICENSE

MIT © [DIYgod](http://github.com/DIYgod)