function MediaSprite (options) {
  options || (options = {})
  this.options = {
    media: options.media,
    mediaType: options.mediaType, // video, audio
    sprites: options.sprites || [],
    onReady: options.onReady || null,
    onSpriteEnd: options.onSpriteEnd || null
  }

  this.media = null
  this.sprites = this.options.sprites // array: [[0, 2], [2, 4]]; or object: { s1: [0, 1], s2: [2, 4] }
  this.currentSpriteKey = 0
  this.repeatMode = false

  this.timeUpdateHandler = this._handleTimeUpdate.bind(this)
  this.metaDataLoadedHandler = this._handleMetaDataLoaded.bind(this)

  this._init()
}

MediaSprite.prototype._init = function () {
  this._createMedia()
  this._attachEvents()
}

MediaSprite.prototype._attachEvents = function () {
  this.media.addEventListener('loadedmetadata', this.metaDataLoadedHandler)
  // this.media.addEventListener('timeupdate', this.timeUpdateHandler)
}

MediaSprite.prototype._createMedia = function () {
  let media = this.options.media
  let mediaType = this.options.mediaType

  if (typeof media === 'object') {
    // about HTMLMediaElement readyState: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
    if (media.readyState >= 1) {
      this._handleMetaDataLoaded()
    }
  } else {
    let el = document.createElement(mediaType)
    el.src = media
    el.preload = 'metadata'
    media = el
  }

  media.autoplay = false
  this.media = media
}

MediaSprite.prototype._handleTimeUpdate = function () {
  if (this.media.currentTime >= this.currentSpriteRange()[1]) {
    this._handleSpriteEnd()

    if (this.repeatMode) {
      this.play(this.currentSpriteKey)
    } else {
      this.pause()
    }
  }
}

MediaSprite.prototype._handleMetaDataLoaded = function () {
  this.options.onReady && this.options.onReady()
}

MediaSprite.prototype._handleSpriteEnd = function () {
  this.media.removeEventListener('timeupdate', this.timeUpdateHandler)
  this.options.onSpriteEnd && this.options.onSpriteEnd()
}

MediaSprite.prototype.currentSpriteRange = function () {
  return this.sprites[this.currentSpriteKey]
}

MediaSprite.prototype._play = function (spriteKey) {
  this.currentSpriteKey = spriteKey
  this.media.currentTime = this.currentSpriteRange()[0]
  this.media.addEventListener('timeupdate', this.timeUpdateHandler)
  this.media.play()
}

MediaSprite.prototype.play = function (spriteKey) {
  if (arguments.length === 0) {
    console.error('MediaSprite.play() requires spriteKey as the first argument')
    return
  }

  this.repeatMode = false
  this._play(spriteKey)
}

MediaSprite.prototype.repeat = function (spriteKey) {
  if (arguments.length === 0) {
    console.error('MediaSprite.repeat() requires spriteKey as the first argument')
    return
  }

  this.repeatMode = true
  this._play(spriteKey)
}

MediaSprite.prototype.pause = function () {
  this.media.pause()
}

MediaSprite.prototype.stop = function () {
  this.media.stop()
}

module.exports = MediaSprite
