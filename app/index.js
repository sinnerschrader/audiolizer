import Audiolizer from '../src/index.js'
import DEMO_AUDIO_1 from './audio/electronical.mp3'
import DEMO_AUDIO_2 from './audio/nerdcore.mp3'
import DEMO_AUDIO_3 from './audio/car.mp3'

const W = 512
const H = 512
const LINE_WIDTH = 3
const VOLUME = 0.2
const OPACITY = 0.2
const FF = 64
const STEP = W / FF
const BG = '#000'
const FG = '#fff'
const BRAND = getComputedStyle(document.documentElement).getPropertyValue('--brand-color')


const C = document.getElementById('canvas')
const verticesRange = document.getElementById('vertices')
const volumeRange = document.getElementById('volume')
const trailRange = document.getElementById('trail')
const playDemo1 = document.getElementById('demo1')
const playDemo2 = document.getElementById('demo2')
const playDemo3 = document.getElementById('demo3')
const stopButton = document.getElementById('stop')
const playButton = document.getElementById('play')
const $ = C.getContext('2d')


let vertices = ~~(FF * 2 / parseInt(verticesRange.value, 10))

verticesRange.setAttribute('min', 3)
verticesRange.setAttribute('max', FF * 2)
verticesRange.setAttribute('value', FF)
volumeRange.setAttribute('min', 0)
volumeRange.setAttribute('max', 1)
volumeRange.setAttribute('step', 0.1)
volumeRange.setAttribute('value', VOLUME)
trailRange.setAttribute('min', 0.1)
trailRange.setAttribute('max', 1)
trailRange.setAttribute('step', 0.05)
trailRange.setAttribute('value', OPACITY)



const audiolizer = new Audiolizer({fftSize: FF})
audiolizer.volume = VOLUME


verticesRange.addEventListener('input', e => {
  vertices = ~~(FF * 2 / parseInt(e.target.value, 10))
})

volumeRange.addEventListener('input', e => {
  audiolizer.volume = parseFloat(e.target.value)
})

trailRange.addEventListener('input', e => {
  $.fillStyle = `hsla(0, 0%, 0%, ${parseFloat(e.target.value)})`
})

playDemo1.addEventListener('click', e => {
  audiolizer.file = DEMO_AUDIO_1
})

playButton.addEventListener('click', e => {
  audiolizer.play()
})

stopButton.addEventListener('click', e => {
  audiolizer.stop()
})

playDemo2.addEventListener('click', e => {
  audiolizer.file = DEMO_AUDIO_2
})

playDemo3.addEventListener('click', e => {
  audiolizer.file = DEMO_AUDIO_3
})

C.height = H
C.width = W
$.fillStyle = BG
$.fillRect(0, 0, W, H)
$.strokeStyle = FG
$.lineWidth = LINE_WIDTH
let counter = 0
$.fillStyle = `hsla(0, 0%, 0%, ${OPACITY})`
audiolizer.convert = (arr = []) => {
  $.fillRect(0, 0, W, H)
  $.beginPath()
  let n = 0
  const revArr = [...arr].reverse()
  const roundArr = [...arr, ...revArr]
  let start
  const filteredArray = roundArr.filter((x, i) => !Boolean(i % vertices))
  filteredArray.forEach((point, i) => {
    const rad = 2 * Math.PI / filteredArray.length * i
    const x = Math.sin(rad) * point + W / 2
    const y = Math.cos(rad) * point + H / 2
    if (!start) {
      start = true
      $.moveTo(x, y)
    } else {
      $.lineTo(x, y)
    }
    n += point
  })

  const average = n / filteredArray.length
  if (average > 128) {
    $.strokeStyle = BRAND
  } else {
    $.strokeStyle = FG
  }

  $.closePath()
  $.stroke()
}

//audiolizer.play()
