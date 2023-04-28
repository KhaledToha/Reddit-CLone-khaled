const connection = require('../config/connection')

exports.getVotesNumbersQuery = (post_id) => {
    return connection.query('SELECT sum(value)AS total_sum FROM votes where post_id = $1', [post_id])
}

exports.getUserVoteByPostIdQuery = (user_id, post_id) => {
    return connection.query('SELECT value AS user_vote, ( SELECT SUM(value) FROM votes WHERE post_id = $1) AS total_sum FROM votes WHERE post_id = $1 AND user_id = $2; ',[post_id,user_id])
}

exports.deleteVoteByUserIdAndPostIdQuery = (user_id, post_id) => {
    return connection.query('DELETE FROM votes WHERE user_id = $1 AND post_id = $2 ', [user_id, post_id])
        .then(() => {
            return connection.query('SELECT sum(value) AS total_sum FROM votes where post_id = $1', [post_id])
        })
}

exports.addVoteQuery = (user_id, post_id, { value }) => {
    return connection.query('INSERT INTO votes (user_id, post_id, value) VALUES ($1, $2, $3) RETURNING *', [user_id, post_id, value])
        .then(() => {
            return connection.query('SELECT value AS user_vote, ( SELECT SUM(value) FROM votes WHERE post_id = $1) AS total_sum FROM votes WHERE post_id = $1 AND user_id = $2; ',[post_id,user_id])
        })
}

exports.updateVoteQuery = (user_id, post_id, { value }) => {
    return connection.query('UPDATE votes SET value = $1 WHERE post_id = $2 AND user_id = $3', [value, post_id, user_id])
        .then(() => {
            return connection.query('SELECT value AS user_vote, ( SELECT SUM(value) FROM votes WHERE post_id = $1) AS total_sum FROM votes WHERE post_id = $1 AND user_id = $2; ',[post_id,user_id])
        })
}