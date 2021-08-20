---
nav: zh-Hans
search: zh-Hans
---

# APlayer

🍭 Wow, such a beautiful HTML5 music player

## 特别贊助商

<a href="https://www.dogecloud.com/?ref=dplayer" target="_blank">
    <img width="222px" src="https://i.imgur.com/BBKXPAp.png">
</a>
<a href="https://console.upyun.com/register/?invite=BkLZ2Xqob" target="_blank">
    <img width="222px" src="https://imgur.com/apG1uKf.png">
</a>

## 安装

使用 npm:

```sh
npm install aplayer --save
```

使用 Yarn:

```sh
yarn add aplayer
```

## 入門

<div class="aplayer-wrap">
    <div id="aplayer2"><button class="docute-button load">點擊載入播放器</div>
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

使用模組管理器:

```js
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'APlayer';

const ap = new APlayer(options);
```

## 參數

名稱 | 預設值 | 描述
----|-------|----
container | document.querySelector('.aplayer') | 播放器容器元素
fixed | false | 開啟吸底模式, [详情](https://aplayer.js.org/#/home?id=fixed-mode)
mini | false | 開啟迷你模式, [详情](https://aplayer.js.org/#/home?id=mini-mode)
autoplay | false | 音樂自動播放
theme | '#b7daff' | 主題色
loop | 'all' | 音樂循環播放, 可選值: 'all', 'one', 'none'
order | 'list' | 音樂循環順序, 可選值: 'list', 'random'
preload | 'auto' | 預先載入，可選值: 'none', 'metadata', 'auto'
volume | 0.7 | 預設音量，請注意播放器會記憶用戶設置，用戶手動設置音量後預設值即失效
audio | - | 音樂訊息, 應該是一個對像或對像數組
audio.name | - | 音樂名稱
audio.artist | - | 音樂創作者
audio.url | - | 音樂鏈接
audio.cover | - | 專輯封面
audio.lrc | - | [詳情](https://aplayer.js.org/#/home?id=lrc)
audio.theme | - | 切换到此音樂時的主题色，優先於上面的 theme
audio.type | 'auto' | 可選值: 'auto', 'hls', 'normal' 或其他自定义类型, [詳情](https://aplayer.js.org/#/home?id=mse-support)
customAudioType | - | 自定義類型，[詳情](https://aplayer.js.org/#/home?id=mse-support)
mutex | true | 互斥，阻止多個播放器同時播放，目前播放器播放時暫停其他播放器
lrcType | 0 | [詳情](https://aplayer.js.org/#/home?id=lrc)
listFolded | false | 列表預設隱藏
listMaxHeight | - | 列表最大高度
storageName | 'aplayer-setting' | 儲存播放器設定的 localStorage key
例如:

<div class="aplayer-wrap">
    <div id="aplayer3"><button class="docute-button load">點擊載入播放器</div>
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

+ `APlayer.version`: 靜態屬性, 返回 APlayer 的版本號

+ `ap.play()`: 播放音樂

+ `ap.pause()`: 暫停音樂

+ `ap.seek(time: number)`: 跳轉到特定時間，時間的單位為秒

  ```js
  ap.seek(100);
  ```

+ `ap.toggle()`: 切換播放/暫停

+ `ap.on(event: string, handler: function)`: 綁定音樂和播放器事件，[詳情](https://aplayer.js.org/#/home?id=event-binding)
  
+ `ap.volume(percentage: number, nostorage: boolean)`: 設定音樂音量

  ```js
  ap.volume(0.1, true);
  ```

+ `ap.theme(color: string, index: number)`: 設定播放器主題色, index 預設是目前音樂的 index

  ```js
  ap.theme('#000', 0);
  ```

+ `ap.setMode(mode: string)`: 設定播放器模式，mode 取值應是 'mini' 或 'normal'

+ `ap.mode`: 返回播放器目前模式，'mini' 或 'normal'

+ `ap.notice(text: string, time: number, opacity: number)`: 顯示通知，時間的單位為毫秒，預設時間 2000 毫秒，預設透明度 0.8，設定時間為 0 可以取消通知自動隱藏

  ```js
  ap.notice('Amazing player', 2000, 0.8);
  ```

+ `ap.skipBack()`: 切換到上一首音樂

+ `ap.skipForward()`: 切換到下一首音樂

+ `ap.destroy()`: 刪除播放器

+ `ap.lrc`

  + `ap.lrc.show()`: 顯示歌詞

  + `ap.lrc.hide()`: 隱藏歌詞

  + `ap.lrc.toggle()`: 顯示/隱藏歌詞

+ `ap.list`

  + `ap.list.show()`: 顯示播放列表

  + `ap.list.hide()`: 隱藏播放列表

  + `ap.list.toggle()`: 顯示/隱藏播放列表

  + `ap.list.add(audios: array | object)`: 添加一或多個新音樂到播放列表

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

  + `ap.list.remove(index: number)`: 移除播放列表中的一個音樂

  ```js
  ap.list.remove(1);
  ```

  + `ap.list.switch()`: 切換到播放列表裡的其他音樂

  ```js
  ap.list.switch(1);
  ```

  + `ap.list.clear()`: 清空播放列表

+ `ap.audio`: 原生 audio

 + `ap.audio.currentTime`: 返回音樂目前播放進度

 + `ap.audio.duration`: 返回音樂總時間

 + `ap.audio.paused`: 返回音樂是否暫停

 + 支持大多數[原生audio接口](http://www.w3schools.com/tags/ref_av_dom.asp)

## 事件綁定

`ap.on(event, handler)`

```js
ap.on('ended', function () {
    console.log('player ended');
});
```

音樂事件

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

## 歌詞

我們有三種方式來給 APlayer 傳遞歌詞，使用 `lrcType` 参数指明使用哪種方式，然后把歌詞放到 `audio.lrc` 参數或者 HTML 裡。

<div class="aplayer-wrap">
    <div id="aplayer4"><button class="docute-button load">點擊載入播放器</div>
</div>

### LRC 文件方式

第一種方式，把歌詞放到 LRC 文件里，音樂播放時會載入對應的 LRC 文件。

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

### JS 字串方式

第二種方式，把歌詞放到 JS 字串裡面。

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

第三种方式，把歌詞放到 HTML 里面。

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
    audio: [
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
    ]
});
```

### 歌詞格式

支持以下格式的歌詞：

`[mm:ss]APlayer`

`[mm:ss.xx]is`

`[mm:ss.xxx]amazing`

`[mm:ss.xx][mm:ss.xx]APlayer`

`[mm:ss.xx]<mm:ss.xx>is`

`[mm:ss.xx]amazing[mm:ss.xx]APlayer`

## 播放列表

當有多個音樂時 APlayer 會顯示一個播放列表，`listFolded` 参數指明列表是否預設隱藏，`listMaxHeight` 参數指明列表最大高度。

<div class="aplayer-wrap">
    <div id="aplayer5"><button class="docute-button load">點擊載入播放器</div>
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

APlayer 可以通過吸底模式固定在頁面底部，這種模式跟普通模式有很大不同。

<div class="aplayer-wrap">
    <div id="aplayer9"><button class="docute-button load">點擊載入播放器</div>
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

如果你沒有足夠空間來放置正常模式的播放器，那麼你可以考慮使用迷你模式。

請注意迷你模式與吸底模式衝突。

<div class="aplayer-wrap">
    <div id="aplayer6"><button class="docute-button load">點擊載入播放器</div>
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

需要在 `APlayer.min.js` 前面載入 [hls.js](https://github.com/video-dev/hls.js)。

<div class="aplayer-wrap">
    <div id="aplayer7"><button class="docute-button load">點擊載入播放器</div>
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
// 另一種方式，使用 customAudioType
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

## 根據封面自動設定主題色

需要另外載入 [color-thief.js](https://github.com/lokesh/color-thief/blob/master/src/color-thief.js)

<div class="aplayer-wrap">
    <div id="aplayer8"><button class="docute-button load">點擊載入播放器</div>
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

## 常見問題

### 為什麼播放器不能在手機上自動播放？

大多數行動瀏覽器禁止了音樂自動播放。