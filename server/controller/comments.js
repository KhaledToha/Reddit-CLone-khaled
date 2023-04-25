const comments = require('../database/queries/comments')
const CustomError = require('../helper/customError')

exports.getCommentsByPostId = (req,res,next)=> {

    comments.getCommentByPostIdQuery(req.params.id)
    .then(data => {
        res.status(200).json({
            error: false,
            message: 'Fetch Comments Successfully',
            data: data.rows
        })
    })
    .catch(err => next(new CustomError(500, 'something went wrong')))
}

exports.addComment = (req,res,next)=>{
    if(!req.userData || !req.userData.id){
        next(new CustomError(401, 'unauthorized'))
        return
    }
    comments.addCommentQuery(req.userData.id, req.body)
    .then(data => {
        res.status(201).json({
            error: false,
            message: 'Comment added Successfully',
            data: data.rows[0]
        })
    })
    .catch(err =>{
         next(new CustomError(500, 'something went wrong'))
        return
        })
}