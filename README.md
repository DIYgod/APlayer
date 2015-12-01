# APlayer

[![npm](https://img.shields.io/npm/v/aplayer.svg?style=flat-square)](https://www.npmjs.com/package/aplayer)
[![npm](https://img.shields.io/npm/l/aplayer.svg?style=flat-square)](https://www.npmjs.com/package/aplayer)
[![devDependency Status](https://david-dm.org/DIYgod/APlayer/dev-status.svg?style=flat-square)](https://david-dm.org/DIYgod/APlayer#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/aplayer.svg?style=flat-square)](https://www.npmjs.com/package/aplayer)
[![Travis](https://img.shields.io/travis/DIYgod/APlayer.svg?style=flat-square)](https://travis-ci.org/DIYgod/APlayer)

Wow, such a beautiful html5 music player

## Introduction

UI 参考网易云音乐外链播放器

[Demo](https://www.anotherhome.net/file/APlayer)

Screenshot
![image](https://github.com/DIYgod/APlayer/raw/master/screenshot.png)
![image](https://github.com/DIYgod/APlayer/raw/master/screenshot-lrc.png)

## Install

```
npm install aplayer
```

## Usage

### HTML:

```
<link rel="stylesheet" href="APlayer.css">
<!-- ... -->
<div id="player1" class="aplayer">
    <div style="padding: 10px; font-size: 10px; text-align: center;">(＞﹏＜) APlayer 加载中,好累的说...</div>
</div>
<!-- ... -->
<script src="APlayer.js"></script>
```

### JS:

```
var ap = new APlayer({
    element: document.getElementById('player1'),
    narrow: false,
    autoplay: true,
    showlrc: false,
    music: {
        title: 'Preparation',
        author: 'Hans Zimmer/Richard Harvey',
        url: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.mp3',
        pic: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.jpg'
    }
});
ap.init();
```

### JS Initialized Options

```
{
    element: document.getElementById('player1'),                       // Optional, player element
    narrow: false,                                                     // Optional, narrow style
    autoplay: true,                                                    // Optional, autoplay, not supported by mobile browsers
    showlrc: false,                                                    // Optional, show lrc
    music: {                                                           // Required, music info
        title: 'Preparation',                                          // Required, music title
        author: 'Hans Zimmer/Richard Harvey',                          // Required, music author
        url: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.mp3',  // Required, music url
        pic: 'http://7xifn9.com1.z0.glb.clouddn.com/Preparation.jpg'   // Required, music picture
    }
}
```

### With lrc

Using [LRC format](https://en.wikipedia.org/wiki/LRC_(file_format))

HTML:

```
<link rel="stylesheet" href="APlayer.css">
<!-- ... -->
<div id="player1" class="aplayer">
    <div style="padding: 10px; font-size: 10px; text-align: center;">(＞﹏＜) APlayer 加载中,好累的说...</div>
    <pre class="aplayer-lrc-content">
        [ti:平凡之路]
        [ar:朴树]
        [al:《后会无期》主题歌]
        [by:周敏]

        [00:00.00]平凡之路 - 朴树
        [00:04.01]作词：韩寒 朴树
        [00:08.02]作曲：朴树 编曲：朴树
        [00:12.02]徘徊着的 在路上的
        [00:17.37]你要走吗
        [00:23.20]易碎的 骄傲着
        [00:28.75]那也曾是我的模样
        <!-- ... -->
    </pre>
</div>
<!-- ... -->
<script src="APlayer.js"></script>
```

JS:

Initialized Option: `showlrc: false`

### API

+ `ap.init()`
+ `ap.play()`
+ `ap.pause()`

### Development

```
gulp
```

## Todo

- [x] 播放进度拖拽控制
- [x] 音量控制
- [x] 分享到微博
- [x] 加载样式及错误处理
- [x] 窄样式 及 移动版样式
- [x] 歌词展示
- [x] 默认选项
- [x] 移动端兼容性
- [ ] 播放列表

## Issues

- [ ] 在 Firefox 中调整进度后, 播放到最后时音乐总时间会自动变长
- [ ] 移动端各种浏览器触发事件的时机不同: 目前使用 loadedmetadata 代替 canplay
```
举例:
WIFI环境:
iOS: 加载? durationchange(真) loadedmetadata 点击 开始播放 loadeddata canplay canplaythrough
Android Chrome: durationchange(真) loadedmetadata loadeddata canplay canplaythrough 点击 加载 开始播放
Android UC: durationchange loadedmetadata loadeddata 加载 durationchange(真) canplay canplaythrough 点击 开始播放
PC: 加载 开始播放 durationchange(真) loadedmetadata loadeddata canplay canplaythrough
蜂窝环境:
Android Chrome: durationchange loadedmetadata loadeddata canplay canplaythrough 点击 加载 开始播放 durationchange(真)
Android UC: durationchange loadedmetadata loadeddata 点击 加载 开始播放 canplay canplaythrough durationchange(真)
```
- [ ] 移动版 Safari 和 部分 Android 浏览器不支持 volume
- [ ] 部分 Android 浏览器不支持 duration


## LICENSE

(MIT License)

Copyright (c) DIYgod

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
