A simple lib to control your media (audio / video) as sprite, just like image sprite.

### install

by npm:

```bash
npm i media-sprite --save
```

or by script:

```html
<script src="media-sprite.js"></script>
```

### usage

```js
var mediaSprite = MediaSprite({
  media: 'path/to/your/media.ogg', // url, HTMLVideoElement or HTMLAudioElement
  mediaType: 'video', // video or audio
  sprites: [[0, 2], [2, 4], [4, 9]], // or an object like: {first: [0, 2], sec: [2, 4], third: [4, 9]}
  onReady: function () {},  // when media is ready (metadata loaded)
  onSpriteEnd: function () {} // will be invoked when each sprite play completed
})

mediaSprite.play(0) // if sprites pass as an object, then invoke like mediaSprite.play('first')
mediaSprite.repeat(0) // if sprites pass as an object, then invoke like mediaSprite.repeat('first')
mediaSprite.pause()
```
