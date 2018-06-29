var generatePalette = document.querySelector('.generate-palette-submit')
var projectSubmit = document.querySelector('.add-project')
var paletteSubmit = document.querySelector('.submit-new-palette')
var projectInput = document.querySelector('.project-name')
var paletteInput = document.querySelector('.palette-name')
var selectedProject = document.querySelector('.select-project')

projectInput.addEventListener('keyup', toggleProjectSubmit)
paletteInput.addEventListener('keyup', togglePaletteSubmit)
generatePalette.addEventListener('click', createPalettes)
paletteSubmit.addEventListener('click', (e) => {
  displayNewProject(e)
  setTimeout(fadeOutPaletteNotice, 5000)
})
projectSubmit.addEventListener('click', (e) => {
  submitNewProject(e)
  setTimeout(fadeOutProjectNotice, 5000)
})

function init() {
  createPalettes()
  getProjects()
  getPalettes()
}

document.onload(init())

function generateColors() {
  var colorList = []

  for (var i = 0; i < 3; i++) {
    var randomRGB = Math.ceil(Math.random() * 256)
    colorList.push(randomRGB)
  }

  return colorList
}

function toggleProjectSubmit() {
  if (projectInput.value !== '') {
    projectSubmit.removeAttribute('disabled')
  } else if (projectInput.value === '') {
    projectSubmit.setAttribute('disabled', 'disabled')
  }
}

function fadeOutPaletteNotice() {
  var noticeEl = document.querySelector('.fade-out')
  if (noticeEl) {
    noticeEl.style.opacity = 0
    setTimeout(removePaletteNotice, 5000)
  }
}

function removePaletteNotice() {
  var noticeContainer = document.querySelector('.save-palette-notice')
  var noticeEl = document.querySelector('.fade-out')
  noticeContainer.removeChild(noticeEl)
}

function fadeOutProjectNotice() {
  var noticeEl = document.querySelector('.fade-out')
  if(noticeEl) {
    noticeEl.style.opacity = 0
    setTimeout(removeProjectNotice, 5000)
  }
}

function removeProjectNotice() {
  var noticeContainer = document.querySelector('.creation-success')
  var noticeEl = document.querySelector('.fade-out')
  noticeContainer.removeChild(noticeEl)
}

function togglePaletteSubmit() {
  if (paletteInput.value !== '') {
    paletteSubmit.removeAttribute('disabled')
  } else if (paletteSubmit.value === '') {
    paletteSubmit.setAttribute('disabled', 'disabled')
  }
}

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

  var createElPalette = document.createElement('p')
  createElPalette.innerText = paletteInput.value

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

function submitNewProject(e) {

  e.preventDefault()

  var projectName = document.querySelector('.project-name').value
  addProjectToSelect(projectName)


  postNewProject(projectName)

  projectName = ''
}

function addProjectToSelect(project) {
  var selectEl = document.querySelector('.select-project')
  selectEl.options.add(new Option(project))
  document.querySelector('.project-name').value = ''
}

function getProjects() {
  try {
    var url = '/api/v1/projects'
    fetch(url)
      .then(res => res.json())
      .then(projects => {
        projects.map(project => {
          var projectContainer = document.createElement('div')
          projectContainer.className = 'individual-project ' + 'project-' + project.id

          var displayContainer = document.querySelector('.display-projects-container')
          displayContainer.appendChild(projectContainer)

          var createElProject = document.createElement('h2')
          createElProject.innerText = project.name

          projectContainer.appendChild(createElProject)

          return projectContainer
        })
      })
  } catch (err) {
    console.log(err)
  }
}

function getPalettes() {
  try {
    var url = '/api/v1/palettes'
    fetch(url)
      .then(res => res.json())
      .then(palettes => {
        palettes.map(palette => {
          var miniPaletteContainer = document.createElement('div')
          miniPaletteContainer.className = 'mini-palette-container'

          var deleteContainer = document.createElement('div')
          deleteContainer.className = 'delete-card'

          var createElPalette = document.createElement('p')
          createElPalette.innerText = palette.name

          miniPaletteContainer.appendChild(createElPalette)
          miniPaletteContainer.appendChild(deleteContainer)

          var projectContainers = document.querySelectorAll('.individual-project')
          var projectsList = Array.from(projectContainers)
          var projectsClassList = projectsList.map(project => Array.from(project.classList)[1].split('-')[1])
          projectsClassList.map(projectId => {
            if(parseInt(projectId) === parseInt(palette.project_id)) {
              projectContainer = document.querySelector('.project-' + projectId)
              projectContainer.appendChild(miniPaletteContainer)
              var createMiniColors = [palette.color1, palette.color2, palette.color3, palette.color4, palette.color5].map(color => {
                var miniColors = document.createElement('div')
                miniColors.style.background = color
                miniColors.className = 'mini-color'

                return miniColors
              })
              var miniColorsContainer = document.createElement('div')
              miniColorsContainer.className = 'mini-color-container'

              for (var color of createMiniColors)
                miniColorsContainer.appendChild(color)

              miniPaletteContainer.appendChild(miniColorsContainer)
              projectContainer.appendChild(miniPaletteContainer)
            }
          })

          // projectContainer.appendChild(miniPaletteContainer)
        })
      })
  } catch (err) {
    console.log(err)
  }
}

function getProjectId() {
  var projectName = document.querySelector('.select-project').value
  if (!projectName) {
    var savePaletteNotice = document.querySelector('.save-palette-notice')
    var savePaletteNoticeEl = document.createElement('p')
    savePaletteNoticeEl.className = 'fade-out'
    savePaletteNoticeEl.innerText = 'You must select a project.'
    savePaletteNotice.appendChild(savePaletteNoticeEl)
  }
  try {
    var url = '/api/v1/projects'
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
  var url = '/api/v1/projects'
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
    }).then(res => {
      if (res.ok) {
        var creationSuccessContainer = document.querySelector('.creation-success')
        var creationSuccessTextEl = document.createElement('p')
        creationSuccessTextEl.className = 'fade-out'
        creationSuccessTextEl.innerText = 'Project successfully created!'
        creationSuccessContainer.appendChild(creationSuccessTextEl)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

function postNewPalette(projectId) {
  var stringifyProjectId = projectId.toString()
  var paletteName = document.querySelector('.palette-name').value
  var selectedProject = document.querySelector('.select-project')
  if (paletteName) {
    var colorContainers = Array.from(document.querySelectorAll('.palette-color'))
    var getColors = colorContainers.map(color => color.innerText)
    try {
      var url= `/api/v1/projects/` + projectId + `/palettes`
      var options = {
            method: 'POST',
            body: JSON.stringify({
              palette: {
                project_id: stringifyProjectId,
                color1: getColors[0].trim(),
                color2: getColors[1].trim(),
                color3: getColors[2].trim(),
                color4: getColors[3].trim(),
                color5: getColors[4].trim(),
                name: paletteName
              }
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }
      fetch(url, options)
    } catch (err) {
      console.log(err)
    }
  }
  selectedProject.selectedIndex = 0
}
