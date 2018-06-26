var generatePalette = document.querySelector('.generate-palette-submit')


function generateColors(e) {
  e.preventDefault()
  var colorList = []
  for (var i = 0; i < 5; i++) {
    var randomRGB = Math.ceil(Math.random() * 256)
    colorList.push(randomRGB)
  }
  return colorList
}
