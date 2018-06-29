var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var environment = process.env.NODE_ENV || 'development'
var configuration = require('./knexfile')[environment]
var database = require('knex')(configuration)

app.use(express.static('public'))
app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000)

app.get('/api/v1/projects', (req, res) => {
  database('projects').select()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch((err) => {
      res.status(500).json({ err })
    })
})

app.get('/api/v1/palettes', (req, res) => {
  database('palettes').select()
    .then(palettes => {
      res.status(200).json(palettes)
    })
    .catch((err) => {
      res.status(500).json({ err })
    })
})

app.post('/api/v1/projects', (req, res) => {
  var { project } = req.body

  database('projects').insert(project, 'id')
    .then(projectId => {
      res.status(201).json({projectId: projectId[0]})
    })
    .catch(err =>{
      res.status(500).json({ err })
    })
})

app.post('/api/v1/projects/:id/palettes', (req, res) => {
  var { palette } = req.body

  database('palettes').insert(palette, 'id')
    .then(paletteId => {
      res.status(201).json({paletteId: paletteId[0]})
    })
    .catch(err => {
      res.status(500).json({ err })
    })
})

app.listen(app.get('port'), () => {
  console.log(`Palette Picker is running on port ${app.get('port')}.`)
})

module.exports = app
