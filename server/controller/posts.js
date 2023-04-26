const { json } = require('express')
const posts = require('../database/queries/posts')
const CustomError = require('../helper/customError')

exports.getAllPosts = (req,res,next)=>{
    posts.getAllPostsQuery()
    .then((data)=>{
        res.status(200).json({
            error: false,
            message: 'fetch all data successfully',
            data: data.rows,
            user: req.userData
        })

    })
    .catch((err)=>{
        next(new CustomError(400, 'Invalid token'))
        return;
        // res.status(500).json({
        //     error: true,
        //     message: 'failed to fetch data',
        //     data: err
        // })
    })
}

exports.addPost = (req,res,next)=>{
    posts.addPostQuery(req.userData.id, req.body)
    .then(data => {
        res.status(201).json({
            error: false,
            message: 'Post Created Successfully',
            data: data.rows[0]
        })
    })
    .catch((err)=>{
        next( new CustomError(400, 'Invalid Token'))
        return
    })
}

exports.getPostByUserId = (req,res,next)=>{
    posts.getPostsByUserIdQuery(req.params.id)
    .then(data => {
        res.status(200).json({
            error: false,
            message: 'Fetch user posts',
            data: data.rows
        })
    })
    .catch(err => next(new CustomError(500, err)))
}