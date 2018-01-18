var load = require('audio-loader')


// load a collection of files

const defaultConfig = {
  fftSize: 512
}

class Audiolizer {
  _audio = new Audio()
  _audioCtx = new AudioContext()
  _analyser = this._audioCtx.createAnalyser()
  _dataArray = new Uint8Array(this._analyser.frequencyBinCount)
  _file
  _source
  _convert
  _config
  _isPlaying

  constructor(config = {}) {
    this._config = {
      ...defaultConfig,
      ...config
    }
    this._analyser.fftSize = this._config.fftSize
    this._draw = this._draw.bind(this)
  }

  _visualize() {
    this._dataArray = new Uint8Array(this._analyser.fftSize)
  }

  _draw() {
    this._analyser.getByteTimeDomainData(this._dataArray)
    this._convert(this._dataArray)
    if (this._isPlaying) {
      requestAnimationFrame(this._draw)
    } else {
      cancelAnimationFrame(this._draw)
    }
  }

  set file(file) {
    this._file = file
    this._updateSrc()
  }

  set fftSize(fftSize) {
    this._analyser.fftSize = fftSize
  }

  set convert(fn) {
    this._convert = fn
  }

  play() {
    this._isPlaying = true
    this._play()
    this._visualize()
    this._draw()
  }

  stop() {
    this._stop()
  }

  pause() {
    this._isPlaying = false
    this._pause()
  }

  _stop() {
    this._pause()
    this._audio.currentTime = 0
  }

  _pause() {
    this._audio.pause()
  }

  _play() {
    this._audio.play()
  }

  _updateSrc() {
    this._audio.src = this._file
    this._loadFile()
  }

  set volume(volume) {
    this._audio.volume = volume
  }

  _loadFile() {
    load(this._file).then(buffer => {
      if (! this._source) {
        this._source = this._audioCtx.createMediaElementSource(this._audio)
        this._source.connect(this._analyser)
        this._analyser.connect(this._audioCtx.destination)
      }
      this.play()
   })
  }
}

export default Audiolizer
