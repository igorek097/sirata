// const express = require('express')
// const router = express.Router()
// const projects = require('../utils/projects')

// /* GET home page. */
// router.use(function (req, res, next) {
// projects.getProjects('project').then(function (projectList) {
//     req.projects = projectList
//     next()
//   }).catch(function (err) {
//     console.log('index.js - getProducts (line 7) error:', JSON.stringify(err,null,2))
//     next()
//   })
// })

// router.get('/', function (req, res, next) {
//   res.render('projects', {
//     'projects': req.projects
//   })
// })

// module.exports = router