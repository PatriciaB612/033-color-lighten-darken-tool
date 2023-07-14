const hexInput = document.getElementById('hex-input')
const inputColor = document.getElementById('input-color')
const alteredColor = document.getElementById('altered-color')
const alteredColorText = document.getElementById('altered-color-text')
const sliderText = document.getElementById('slider-text')
const slider = document.getElementById('slider')
const lightenText = document.getElementById('lighten-text')
const darkenText = document.getElementById('darken-text')
const toggleBtn = document.getElementById('toggle-btn')

hexInput.addEventListener('keyup', () => {
  const hex = hexInput.value
  if (!isValidHex(hex)) return

  const strippedHex = hex.replace('#', '')

  inputColor.style.backgroundColor = '#' + strippedHex
  reset()
})

const isValidHex = (hex) => {
  if (!hex) return false
  if (!hex.match(/^[A-Fa-f0-9#]*$/)) return false

  const strippedHex = hex.replace('#', '')
  return strippedHex.length === 3 || strippedHex.length === 6
}

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('toggled')
  if (toggleBtn.classList.contains('toggled')) {
    lightenText.classList.add('unselected')
    darkenText.classList.remove('unselected')
  } else if (!toggleBtn.classList.contains('toggled')) {
    darkenText.classList.add('unselected')
    lightenText.classList.remove('unselected')
  }
  reset()
})

const convertHexToRGB = (hex) => {
  if (!hex) return null
  let strippedHex = hex.replace('#', '')

  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex[2] +
      strippedHex[2]
  }

  const r = parseInt(strippedHex.substring(0, 2), 16)
  const g = parseInt(strippedHex.substring(2, 4), 16)
  const b = parseInt(strippedHex.substring(4, 6), 16)

  return { r, g, b }
}

const convertRGBToHex = (r, g, b) => {
  const firstPair = ('0' + r.toString(16)).slice(-2)
  const secondtPair = ('0' + g.toString(16)).slice(-2)
  const thirdPair = ('0' + b.toString(16)).slice(-2)

  const hex = '#' + firstPair + secondtPair + thirdPair

  return hex
}

const alterColor = (hex, percentage) => {
  const { r, g, b } = convertHexToRGB(hex)
  const amount = Math.floor((percentage / 100) * 255)

  const newR = increaseWithinRange(r, amount)
  const newB = increaseWithinRange(g, amount)
  const newG = increaseWithinRange(b, amount)

  return convertRGBToHex(newR, newB, newG)
}

const increaseWithinRange = (hex, amount) => {
  const newHex = hex + amount
  if (newHex > 255) return 255
  if (newHex < 0) return 0
  return newHex
}

slider.addEventListener('input', () => {
  if (!isValidHex(hexInput.value)) return
  sliderText.textContent = `${slider.value}%`

  const valueAddition = toggleBtn.classList.contains('toggled')
    ? -slider.value
    : slider.value

  const alteredHex = alterColor(hexInput.value, valueAddition)

  alteredColorText.textContent = `Altered Color ${alteredHex}`
  alteredColor.style.backgroundColor = alteredHex
})

const reset = () => {
  slider.value = 0
  sliderText.textContent = '0%'
  alteredColorText.textContent = `Altered Color ${hexInput.value}`
  alteredColor.style.backgroundColor = `#${hexInput.value}`

  if (!hexInput.value.match(/#/)) {
    alteredColorText.textContent = `Altered Color #${hexInput.value}`
  }
}
