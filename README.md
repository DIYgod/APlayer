# APlayer

[![npm](https://img.shields.io/npm/v/aplayer.svg?style=flat-square)](https://www.npmjs.com/package/aplayer)
[![npm](https://img.shields.io/npm/l/aplayer.svg?style=flat-square)](https://www.npmjs.com/package/aplayer)
[![npm](https://img.shields.io/npm/dt/aplayer.svg?style=flat-square)](https://www.npmjs.com/package/aplayer)

Wow, such a beautiful html5 music player

## Introduction

[Demo](https://www.anotherhome.net/file/APlayer)

Screenshot
![image](https://github.com/DIYgod/APlayer/raw/master/screenshot.png)

## Install

```
npm install aplayer
```

## Usage

The following HTML structure is used for APlayer:

```
<link rel="stylesheet" href="APlayer.css">
<!-- ... -->
<div id="player1" class="aplayer"></div>
<!-- ... -->
<script src="APlayer.js"></script>
```

And this is how the jRating is initialized:

```
var ap = new APlayer({
    element: document.getElementById('player1'),
    autoplay: true,
    height: '66px',
    width: '100%',
    music: {
        title: 'Preparation',
        author: 'Hans Zimmer/Richard Harvey',
        url: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.mp3',
        pic: 'Preparation.jpg'
    }
});
```

The following options are available:

```
{
    element: document.getElementById('player1'),
    autoplay: true,
    height: '66px',
    width: '100%',
    music: {
        title: 'Preparation',
        author: 'Hans Zimmer/Richard Harvey',
        url: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.mp3',
        pic: 'Preparation.jpg'
    }
}
```

API

+ `ap.play()`
+ `ap.pause()`

## Todo

- [x] 播放进度拖拽控制
- [ ] 音量控制
- [ ] 分享到微博
- [ ] 播放列表
- [ ] 歌词展示

## Issues

- [ ] 在 Firefox 中调整进度后，播放到最后时音乐总时间会自动变长


## LICENSE

(MIT License)

Copyright (c) DIYgod

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.