const votes = require('../database/queries/votes')

exports.voteCheck = (req,res,next)=>{
    votes.getUserVoteByPostIdQuery(req.userData.id, req.params.id)
    .then(data => {
        if(data.rows.length == 0){
            next()
        }else{
            if(data.rows[0].user_vote == 1 && req.body.value == 1 || data.rows[0].user_vote == -1 && req.body.value == -1 ){
                req.deleteVote = true
                next()
            }else{
                req.updateVote = true
                next()
            }
        }
    })
}