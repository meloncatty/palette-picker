const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.static('public'))
app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000)

app.get('/api/v1/projects', (req, res) => {
  database('projects').select()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch((err) => {
      response.status(500).json({ err })
    })
})

app.post('/api/v1/projects', (req, res) => {
  const { project } = req.body

  database('projects').insert(project, 'id')
    .then(projectId => {
      res.status(201).json({projectId: projectId[0]})
    })
    .catch(err =>{
      res.status(500).json({ err })
    })
})

app.listen(app.get('port'), () => {
  console.log(`Palette Picker is running on port ${app.get('port')}.`)
})
