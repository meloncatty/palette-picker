var generatePalette = document.querySelector('.generate-palette-submit')
var colorContainers = document.querySelectorAll('.palette-color')
var projectSubmit = document.querySelector('.add-project')
var paletteSubmit = document.querySelector('.submit-new-palette')

function generateColors() {
  var colorList = []

  for (var i = 0; i < 3; i++) {
    var randomRGB = Math.ceil(Math.random() * 256)
    colorList.push(randomRGB)
  }
  return colorList
}

generatePalette.addEventListener('click', assignColors)
assignColors()

//need case for no dupe colors
function assignColors(e) {

  if (e) e.preventDefault()

  colorContainers.forEach(container => {
    var bgColor = generateColors()
    container.style.background = 'rgb(' + bgColor[0] + ',' + bgColor[1] + ',' + bgColor[2] + ')'
    container.innerText = 'rgb(' + bgColor[0] + ',' + bgColor[1] + ',' + bgColor[2] + ')'
  })
}

//endpoint to link proj + pal

function savePalette(e) {

  e.preventDefault()

  var getColors = document.querySelectorAll('.palette-color')
  var colorList = Array.from(getColors).map(color => color.innerText)
  var paletteName = document.querySelector('.palette-name').value
  var projectName = document.querySelector('.select-project').value
  var newProject = document.querySelector('.display-projects-container')
  var projectContainer = document.createElement('div')
  var createElPalette = document.createElement('p').innerText = paletteName
  var createElProject = document.createElement('p').innerText = projectName
  newProject.appendChild(projectContainer)
  var createMiniColors = colorList.map(color => {
    var miniColors = document.createElement('div')
    miniColors.style.background = color
    miniColors.className = 'mini-color'
    return miniColors
  })
  console.log(createMiniColors)
  newProject.innerHTML = createElProject + ' ' + createElPalette
  for (var color of createMiniColors)
    newProject.appendChild(color)
}

paletteSubmit.addEventListener('click', savePalette)

function createProject(e) {
  
  e.preventDefault()

  var projectName = document.querySelector('.project-name').value
  addProjectToSelect(projectName)
  projectName = ''
}

function addProjectToSelect(project) {
  var selectEl = document.querySelector('.select-project')
  selectEl.options.add(new Option(project))
  document.querySelector('.project-name').value = ''
}

projectSubmit.addEventListener('click', createProject)
