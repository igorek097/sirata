require('dotenv').config()


const express = require('express')
const fetch = require('node-fetch')
const path = require('path')
const UAParser = require('ua-parser-js')
const contentful = require('contentful')
const lodash  = require('lodash')


const port = process.env.PORT || 3000
const app = express()


app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'public')))


var client = contentful.createClient({
    space: 'mallesr19g2u',
    accessToken: 'CDAiTXyDDWZTNJvWpCyz0Vo9zAHkod_GDd23kjXSuFU'
})


app.get('/', async (req, res) => {
    client.getEntries({
        content_type: 'project'
    }).then(function(els) {
        res.render('home', {projects: els.items})
    })
})


app.get('/preview/:id', async (req, res) => {
    const project_id = req.params.id
    client.getEntry(project_id).then(function(el) {
        lodash.forEach(el.fields.images, function(image) {
            if (image.metadata.tags.length > 0) {
                res.render('project', {img: Array(image)})
            }
        })
    })
})


app.get('/project/:id', async (req, res) => {
    const project_id = req.params.id
    client.getEntry(project_id).then(function(el) {
        res.render('project', {img: el.fields.images})
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
