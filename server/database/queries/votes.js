const connection = require('../config/connection')

exports.getVotesNumbersQuery = (post_id)=>{
   return connection.query('SELECT sum(value) FROM votes where post_id = $1',[post_id])
}

exports.getUserVoteByPostIdQuery = (user_id, post_id) => {
    return connection.query('SELECT * FROM votes WHERE user_id = $1 AND post_id = $2',[user_id, post_id])
}

exports.deleteVoteByUserIdAndPostIdQuery = (user_id, post_id)=> {
    return connection.query('DELETE FROM votes WHERE user_id = $1 AND post_id = $2 RETURNING *',[user_id,post_id])
}

exports.addVoteQuery = (user_id, { post_id,value })=>{
    return connection.query('INSERT INTO votes (user_id, post_id, value) VALUES ($1, $2, $3) RETURNING *',[user_id, post_id, value])
}