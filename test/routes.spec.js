var environment = process.env.NODE_ENV || 'test'
var config = require('../knexfile.js')['test']

var express = require('express')
var router = express.Router()

router.get('/projects', function(req, res, next) {
  res.send('send shows back')
})


var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var server = require('../server')

chai.use(chaiHttp)

describe('Client Routes', () => {
  it('should return the homepage with status 200', done => {
    chai.request(server)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200)
        response.should.be.html
      })
      done()
  })

  it('should return 404 for a route that does not exist' , done => {
    chai.request(server)
      .get('/badUrl')
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
  })
})

describe('API Routes', () => {
  describe('GET /api/v1/projects', () => {
    it('should return all projects', done => {
      chai.request(server)
        .get('/api/v1/projects')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.length.should.equal(2)
          response.body[0].should.have.property('name')
          response.body[0].name.should.equal('project 1')
          console.log(response.body)
        })
        done()
    })
  })

  describe('POST /api/v1/projects', () => {
    it('should create a new project', done => {
      chai.request(server)
        .post('/api/v1/projects')
        .send({
          name: 'project 4'
        })
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.a('object')
          response.body.should.have.property('id')
          response.body.id.should.equal(4)
        })
        done()
    })
  })
})

module.exports = require('knex')(config)
