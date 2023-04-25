const connection = require('../config/connection')

exports.getAllPostsQuery = () => {
   return connection.query('SELECT users.name, users.img_url, posts.id, posts.user_id, posts.title, posts.description, posts.post_img, posts.post_date FROM users JOIN posts ON posts.user_id = users.id')
}

exports.addPostQuery = (user_id, { title, description, post_img }) => {

   return connection.query('INSERT INTO posts (title, description, post_img, user_id) VALUES ($1, $2, $3, $4) RETURNING id, user_id', [title, description, post_img, user_id])
   .then(result => {
       const insertedPostId = result.rows[0].id;
       return connection.query('SELECT users.name, users.img_url, posts.id, posts.user_id, posts.title, posts.description, posts.post_img, posts.post_date FROM users JOIN posts ON posts.user_id = users.id WHERE posts.id = $1', [insertedPostId])
   })
}



