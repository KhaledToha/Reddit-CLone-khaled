const votes = require('../database/queries/votes')
const CustomError = require('../helper/customError')

exports.getVotes = (req, res, next) => {
    votes.getVotesNumbersQuery(req.params.id)
        .then(data => {
            res.status(200).json({
                error: false,
                message: 'Fetch votes successfully',
                data: data.rows[0]
            })
        })
        .catch(err => next(new CustomError(500, err)))
}

exports.getUserVoteByPostId = (req, res, next) => {
    votes.getUserVoteByPostIdQuery(req.userData.id, req.params.id)
        .then(data => {
            res.status(200).json({
                error: false,
                message: 'Fetch user vote successfully',
                data: data.rows[0]
            })
        })
        .catch(err => new CustomError(500, err))
}

exports.deleteVote = (req, res, next) => {

    votes.deleteVoteByUserIdAndPostIdQuery(req.userData.id, req.params.id)
        .then(data => {
            res.status(202).json({
                error: false,
                messages: 'vote deleted successfully',
                data: data.rows[0]
            })
        })
        .catch(err => next(new CustomError(500, err)))
}

exports.addVote = (req,res,next)=>{

    votes.addVoteQuery(req.userData.id, req.body)
    .then(data => {
        res.status(201).json({
            error: false,
            message: 'Vote added successfully',
            data: data.rows[0]
        })
    })
    .catch(err => next(new CustomError(502, err)))
}