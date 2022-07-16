require('dotenv').config()

const express = require('express')
const fetch = require('node-fetch')

const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const UAParser = require('ua-parser-js')

const prismic = require('@prismicio/client')
const prismicH = require('@prismicio/helpers')
// const defaults = require('nodemon/lib/config/defaults')

const accessToken = process.env.PRISMIC_ACCESS_TOKEN
const repoName = 'myprtf' // Fill in your repository name.
// const accessToken = ''

var contentful = require('contentful')

var client = contentful.createClient({
    space: 'mallesr19g2u',
    accessToken: 'CDAiTXyDDWZTNJvWpCyz0Vo9zAHkod_GDd23kjXSuFU',
})

const linkResolver = (doc) => {
  if (doc.type === 'project') return `/project/${doc.uid}`
  if (doc.type === 'about') return '/about'

  return '/'
}

// const routes = [
//   {
//     type: 'page',
//     path: '/:uid'
//   }
// ]

// const client = prismic.createClient(repoName, {
//   fetch,
//   accessToken,
//   linkResolver
// })

// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
// const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  const ua = UAParser(req.headers['user-agent'])

  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  res.locals.ctx = {
    prismicH
  }

  res.locals.Link = linkResolver

  next()
})

const handleRequest = async (client) => {
  const meta = await client.getSingle('meta')
  const preloader = await client.getSingle('preloader')
  // const navigation = await client.getSingle('navigation')

  return {
    meta,
    preloader
  }
}

app.get('/', async (req, res) => {
  // Here we are retrieving the first document from your API endpoint
//   const defaults = await handleRequest(client)
//   const home = await client.getSingle('home')
//   const { results: projects } = await client.get({
//     predicates: prismic.predicates.at('document.type', 'project')
//   })


    var home
    client.getEntry('home').then(function(entry) {
        home = entry
    })

    var projects
    client.getEntries({
        content_type: 'project'
    }).then(function(entries) {
        projects = entries
    })

    res.render('home', { ...defaults, home, projects })
  // console.log(projects.project_item)
})

// app.get('/about', (req, res) => {
//   res.render('pages/about')
// })

app.get('/about', async (req, res) => {
//   const defaults = await handleRequest(client)
//   const about = await client.getSingle('about')

  res.render('about', { ...defaults, about })
  // console.log(meta, about, preloader)
})

app.get('/project/:uid', async (req, res) => {
  const uid = req.params.uid
//   const defaults = await handleRequest(client)

//   const project = await client.getByUID('project', uid)
  const images = project.data.images
  images.forEach(element => {
    console.log(element)
  })

  const { results: projects } = await client.get({
    predicates: prismic.predicates.at('document.type', 'project')
  })

  // console.log(project.data.images)

  res.render('project', { ...defaults, project, projects })
  // console.log(project.data.images[0].image.url)
  // console.log(images)
})

app.get('/preview/:uid', async (req, res) => {
  const uid = req.params.uid
  const defaults = await handleRequest(client)

  const project = await client.getByUID('project', uid)
  
  const { results: projects } = await client.get({
    predicates: prismic.predicates.at('document.type', 'project')
  })

  // console.log(project.data.project_videos.url)

  res.render('project', { ...defaults, project, projects })
  // console.log(projects, project)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})