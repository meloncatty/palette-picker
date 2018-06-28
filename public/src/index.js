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

function createProjectInfo() {
  var projectContainer = document.createElement('div')
  projectContainer.className = 'individual-project'

  var displayContainer = document.querySelector('.display-projects-container')
  displayContainer.appendChild(projectContainer)

  var projectName = document.querySelector('.select-project').value

  var createElProject = document.createElement('h2')
  createElProject.innerText = projectName
  
  projectContainer.appendChild(createElProject)

  return projectContainer
}

function createPaletteInfo() {
  var miniPaletteContainer = document.createElement('div')
  miniPaletteContainer.className = 'mini-palette-container'

  var paletteName = document.querySelector('.palette-name').value
  var createElPalette = document.createElement('p')
  createElPalette.innerText = paletteName

  miniPaletteContainer.appendChild(createElPalette)
  
  return miniPaletteContainer
}

function createMiniColors() {
  var getColors = document.querySelectorAll('.palette-color')
  var colorList = Array.from(getColors).map(color => color.innerText)
  
  var createMiniColors = colorList.map(color => {
    var miniColors = document.createElement('div')
    miniColors.style.background = color
    miniColors.className = 'mini-color'

    return miniColors
  })

  var miniColorsContainer = document.createElement('div')
  miniColorsContainer.className = 'mini-color-container'
  
  for (var color of createMiniColors)
    miniColorsContainer.appendChild(color)
  
  return miniColorsContainer
}

function createNewProject(e) {

  e.preventDefault()

  var projectContainer = createProjectInfo()
  var miniPaletteContainer = createPaletteInfo()
  var miniColorsContainer = createMiniColors()

  projectContainer.appendChild(miniPaletteContainer)
  miniPaletteContainer.appendChild(miniColorsContainer)
}

paletteSubmit.addEventListener('click', createNewProject)

function submitNewProject(e) {
  
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

projectSubmit.addEventListener('click', submitNewProject)
