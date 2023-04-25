const express = require('express')
const { errHandling } = require('../middlelware/error')
const { authCheck } = require('../middlelware/authChecker')
const posts = require('./posts')
const users = require('./users')
const comments = require('./comments')


const router  = express.Router()

router.get('/home',authCheck, posts.getAllPosts)
router.post('/post', authCheck, posts.addPost)

router.get('/comments:id', comments.getCommentsByPostId)
router.post('/comments', authCheck, comments.addComment)

router.post('/signup', users.addUser)
router.post('/login', users.login)

router.use(errHandling)



module.exports = router