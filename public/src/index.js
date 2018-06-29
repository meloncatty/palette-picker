var generatePalette = document.querySelector('.generate-palette-submit')
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

generatePalette.addEventListener('click', createPalettes)
createPalettes()

//need case for no dupe colors
function createPalettes(e) {

  if (e) e.preventDefault()

  var colorContainers = document.querySelectorAll('.palette-color')
  colorContainers.forEach((container, index) => {
    var bgColor = generateColors()
    container.style.background = 'rgb(' + bgColor[0] + ',' + bgColor[1] + ',' + bgColor[2] + ')'
    container.innerText = 'rgb(' + bgColor[0] + ',' + bgColor[1] + ',' + bgColor[2] + ')'
    container.classList += ' palette-' + 0 + index
  })

  var lockContainer00 = document.createElement('div')
  lockContainer00.className = 'lock-container'
  var lockContainer01 = document.createElement('div')
  lockContainer01.className = 'lock-container'
  var lockContainer02 = document.createElement('div')
  lockContainer02.className = 'lock-container'
  var lockContainer03 = document.createElement('div')
  lockContainer03.className = 'lock-container'
  var lockContainer04 = document.createElement('div')
  lockContainer04.className = 'lock-container'

  document.querySelector('.palette-00').appendChild(lockContainer00)
  document.querySelector('.palette-01').appendChild(lockContainer01)
  document.querySelector('.palette-02').appendChild(lockContainer02)
  document.querySelector('.palette-03').appendChild(lockContainer03)
  document.querySelector('.palette-04').appendChild(lockContainer04)
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

  var deleteContainer = document.createElement('div')
  deleteContainer.className = 'delete-card'

  var paletteName = document.querySelector('.palette-name').value
  var createElPalette = document.createElement('p')
  createElPalette.innerText = paletteName

  miniPaletteContainer.appendChild(createElPalette)
  miniPaletteContainer.appendChild(deleteContainer)

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

function displayNewProject(e) {

  e.preventDefault()

  var projectContainer = createProjectInfo()
  var miniPaletteContainer = createPaletteInfo()
  var miniColorsContainer = createMiniColors()

  projectContainer.appendChild(miniPaletteContainer)
  miniPaletteContainer.appendChild(miniColorsContainer)

  getProjectId()
}

paletteSubmit.addEventListener('click', displayNewProject)

function submitNewProject(e) {

  e.preventDefault()


  var projectName = document.querySelector('.project-name').value
  addProjectToSelect(projectName)


  postNewProject(projectName)

  projectName = ''
}

function getProjectId() {
  var projectName = document.querySelector('.select-project').value
  try {
    var url = 'http://localhost:3000/api/v1/projects'
    fetch(url)
      .then(res => res.json())
      .then(projects => {
        var findProject = projects.filter(project => project.name === projectName)
        postNewPalette(findProject[0].id)
      })
  } catch (err) {
    console.log(err)
  }
}

function postNewProject(projectName) {
  var url = 'http://localhost:3000/api/v1/projects'
  try {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        project: {
          name: projectName
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res))
  } catch (err) {
    console.log(err)
  }
}

//need to add name to palette
function postNewPalette(projectId) {
  var selectedProject = document.querySelector('.select-project').value
  var colorContainers = Array.from(document.querySelectorAll('.palette-color'))
  var getColors = colorContainers.map(color => color.innerText)
  try {
    var url= `http://localhost:3000/api/v1/projects/` + projectId + `/palettes`
    var options = {
          method: 'POST',
          body: JSON.stringify({
            palette: {
              project_id: projectId.toString,
              color1: getColors[0].trim(),
              color2: getColors[1].trim(),
              color3: getColors[2].trim(),
              color4: getColors[3].trim(),
              color5: getColors[4].trim()
            }
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
    console.log(options.body)
    fetch(url, options)
      .then(res => console.log(res))
  } catch (err) {
    console.log(err)
  }
}

function addProjectToSelect(project) {
  var selectEl = document.querySelector('.select-project')
  selectEl.options.add(new Option(project))
  document.querySelector('.project-name').value = ''
}

projectSubmit.addEventListener('click', submitNewProject)
