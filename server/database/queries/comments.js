const connection = require('../config/connection')

exports.getCommentByPostIdQuery = (id) => {
    return connection.query('SELECT comments.id AS comment_id , comments.post_id, comments.content, comments.comment_data, users.id, users.name, users.img_url FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = $1', [id])
}

exports.addCommentQuery = (user_id, { post_id, content })=>{
    return connection.query('INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING id',[user_id,post_id,content])
    .then(data => {
        
        let commentID = data.rows[0].id
        return connection.query('SELECT comments.id AS comment_id , comments.post_id, comments.content, comments.comment_data, users.id, users.name, users.img_url FROM comments JOIN users ON comments.user_id = users.id WHERE comments.id = $1',[commentID])
    })
}