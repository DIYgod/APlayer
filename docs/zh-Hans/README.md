---
nav: zh-Hans
search: zh-Hans
---

# APlayer

🍭 Wow, such a beautiful HTML5 music player

## 特别赞助商

<a href="https://www.dogecloud.com/?ref=dplayer" target="_blank">
    <img width="222px" src="https://i.imgur.com/BBKXPAp.png">
</a>
<a href="https://console.upyun.com/register/?invite=BkLZ2Xqob" target="_blank">
    <img width="222px" src="https://imgur.com/apG1uKf.png">
</a>

## 安装

使用 npm:

```
npm install aplayer --save
```

使用 Yarn:

```
yarn add aplayer
```

## 入门

<div class="aplayer-wrap">
    <div id="aplayer2"><button class="docute-button load">点击加载播放器</div>
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

使用模块管理器:

```js
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'APlayer';

const ap = new APlayer(options);
```

## 参数

名称 | 默认值 | 描述
----|-------|----
container | document.querySelector('.aplayer') | 播放器容器元素
fixed | false | 开启吸底模式, [详情](https://aplayer.js.org/#/home?id=fixed-mode)
mini | false | 开启迷你模式, [详情](https://aplayer.js.org/#/home?id=mini-mode)
autoplay | false | 音频自动播放
theme | '#b7daff' | 主题色
loop | 'all' | 音频循环播放, 可选值: 'all', 'one', 'none'
order | 'list' | 音频循环顺序, 可选值: 'list', 'random'
preload | 'auto' | 预加载，可选值: 'none', 'metadata', 'auto'
volume | 0.7 | 默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
audio | - | 音频信息, 应该是一个对象或对象数组
audio.name | - | 音频名称
audio.artist | - | 音频艺术家
audio.url | - | 音频链接
audio.cover | - | 音频封面
audio.lrc | - | [详情](https://aplayer.js.org/#/home?id=lrc)
audio.theme | - | 切换到此音频时的主题色，比上面的 theme 优先级高
audio.type | 'auto' | 可选值: 'auto', 'hls', 'normal' 或其他自定义类型, [详情](https://aplayer.js.org/#/home?id=mse-support)
customAudioType | - | 自定义类型，[详情](https://aplayer.js.org/#/home?id=mse-support)
mutex | true | 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
lrcType | 0 | [详情](https://aplayer.js.org/#/home?id=lrc)
listFolded | false | 列表默认折叠
listMaxHeight | - | 列表最大高度
storageName | 'aplayer-setting' | 存储播放器设置的 localStorage key

例如:

<div class="aplayer-wrap">
    <div id="aplayer3"><button class="docute-button load">点击加载播放器</div>
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

+ `APlayer.version`: 静态属性, 返回 APlayer 的版本号

+ `ap.play()`: 播放音频

+ `ap.pause()`: 暂停音频

+ `ap.seek(time: number)`: 跳转到特定时间，时间的单位为秒

  ```js
  ap.seek(100);
  ```

+ `ap.toggle()`: 切换播放和暂停

+ `ap.on(event: string, handler: function)`: 绑定音频和播放器事件，[详情](https://aplayer.js.org/#/home?id=event-binding)
  
+ `ap.volume(percentage: number, nostorage: boolean)`: 设置音频音量

  ```js
  ap.volume(0.1, true);
  ```

+ `ap.theme(color: string, index: number)`: 设置播放器主题色, index 默认为当前音频的 index

  ```js
  ap.theme('#000', 0);
  ```

+ `ap.setMode(mode: string)`: 设置播放器模式，mode 取值应为 'mini' 或 'normal'

+ `ap.mode`: 返回播放器当前模式，'mini' 或 'normal'

+ `ap.notice(text: string, time: number, opacity: number)`: 显示通知，时间的单位为毫秒，默认时间 2000 毫秒，默认透明度 0.8，设置时间为 0 可以取消通知自动隐藏

  ```js
  ap.notice('Amazing player', 2000, 0.8);
  ```

+ `ap.skipBack()`: 切换到上一首音频

+ `ap.skipForward()`: 切换到下一首音频

+ `ap.destroy()`: 销毁播放器

+ `ap.lrc`

  + `ap.lrc.show()`: 显示歌词

  + `ap.lrc.hide()`: 隐藏歌词

  + `ap.lrc.toggle()`: 显示/隐藏歌词

+ `ap.list`

  + `ap.list.show()`: 显示播放列表

  + `ap.list.hide()`: 隐藏播放列表

  + `ap.list.toggle()`: 显示/隐藏播放列表

  + `ap.list.add(audios: array | object)`: 添加一个或几个新音频到播放列表

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

  + `ap.list.remove(index: number)`: 移除播放列表中的一个音频

  ```js
  ap.list.remove(1);
  ```

  + `ap.list.switch()`: 切换到播放列表里的其他音频

  ```js
  ap.list.switch(1);
  ```

  + `ap.list.clear()`: 清空播放列表

+ `ap.audio`: 原生 audio

 + `ap.audio.currentTime`: 返回音频当前播放时间

 + `ap.audio.duration`: 返回音频总时间

 + `ap.audio.paused`: 返回音频是否暂停

 + 支持大多数[原生audio接口](http://www.w3schools.com/tags/ref_av_dom.asp)

## 事件绑定

`ap.on(event, handler)`

```js
ap.on('ended', function () {
    console.log('player ended');
});
```

音频事件

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

播放器事件

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

## 歌词

我们有三种方式来给 APlayer 传递歌词，使用 `lrcType` 参数指明使用哪种方式，然后把歌词放到 `audio.lrc` 参数或者 HTML 里。

<div class="aplayer-wrap">
    <div id="aplayer4"><button class="docute-button load">点击加载播放器</div>
</div>

### LRC 文件方式

第一种方式，把歌词放到 LRC 文件里，音频播放时会加载对应的 LRC 文件。

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

### JS 字符串方式

第二种方式，把歌词放到 JS 字符串里面。

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

### HTML 方式

第三种方式，把歌词放到 HTML 里面。

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

### 歌词格式

支持下面格式的歌词：

`[mm:ss]APlayer`

`[mm:ss.xx]is`

`[mm:ss.xxx]amazing`

`[mm:ss.xx][mm:ss.xx]APlayer`

`[mm:ss.xx]<mm:ss.xx>is`

`[mm:ss.xx]amazing[mm:ss.xx]APlayer`

## 播放列表

当有多个音频时会 APlayer 会展示一个播放列表，`listFolded` 参数指明列表是否默认折叠，`listMaxHeight` 参数指明列表最大高度。

<div class="aplayer-wrap">
    <div id="aplayer5"><button class="docute-button load">点击加载播放器</div>
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
## 吸底模式

APlayer 可以通过吸底模式固定在页面底部，这种模式跟普通模式有很大不同。

<div class="aplayer-wrap">
    <div id="aplayer9"><button class="docute-button load">点击加载播放器</div>
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

## 迷你模式

如果你没有足够空间来放置正常模式的播放器，那么你可以考虑使用迷你模式。

请注意迷你模式与吸底模式冲突。

<div class="aplayer-wrap">
    <div id="aplayer6"><button class="docute-button load">点击加载播放器</div>
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

## MSE 支持

### HLS

需要在 `APlayer.min.js` 前面加载 [hls.js](https://github.com/video-dev/hls.js)。

<div class="aplayer-wrap">
    <div id="aplayer7"><button class="docute-button load">点击加载播放器</div>
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
// 另一种方式，使用 customAudioType
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

## 根据封面自适应主题色

需要额外加载 [color-thief.js](https://github.com/lokesh/color-thief/blob/master/src/color-thief.js)

<div class="aplayer-wrap">
    <div id="aplayer8"><button class="docute-button load">点击加载播放器</div>
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

## 常见问题

### 为什么播放器不能在手机上自动播放？

大多数移动端浏览器禁止了音频自动播放。