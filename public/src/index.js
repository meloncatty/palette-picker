var generatePalette = document.querySelector('.generate-palette-submit')
var colorContainers = document.querySelectorAll('.palette-color')


function generateColors() {
  var colorList = []
  for (var i = 0; i < 3; i++) {
    var randomRGB = Math.ceil(Math.random() * 256)
    colorList.push(randomRGB)
  }
  return colorList
}

generatePalette.addEventListener('click', assignColors)

function assignColors(e) {
  e.preventDefault()
  colorContainers.forEach(container => {
    var bgColor = generateColors()
    container.style.background = 'rgb(' + bgColor[0] + ',' + bgColor[1] + ',' + bgColor[2] + ')'
    container.innerText = 'rgb(' + bgColor[0] + ',' + bgColor[1] + ',' + bgColor[2] + ')'
  })
}