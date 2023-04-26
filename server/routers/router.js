const express = require('express')
const { errHandling } = require('../middlelware/error')
const { authCheck } = require('../middlelware/authChecker')
const { users, posts, comments, votes } = require('../controller/index')
const router  = express.Router()

router.get('/home',authCheck, posts.getAllPosts)
router.get('/profile/post:id',authCheck, posts.getPostByUserId)
router.post('/post', authCheck, posts.addPost)

router.get('/votes:id',votes.getVotes)
router.delete('/votes:id', authCheck, votes.deleteVote)
router.post('/votes', authCheck, votes.addVote)
router.get('/userVotes:id', authCheck, votes.getUserVoteByPostId)


router.get('/comments:id', comments.getCommentsByPostId)
router.post('/comments', authCheck, comments.addComment)

router.post('/signup', users.addUser)
router.post('/login', users.login)
router.get('/users:id', users.getUserById)

router.use(errHandling)



module.exports = router