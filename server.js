const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const routes = require('./routes/index')

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))

// Posts

app.get('/posts', routes.posts.getPosts)
app.post('/posts', routes.posts.addPost)
app.put('/posts/:id_post', routes.posts.updatePost)
app.delete('/posts/:id_post', routes.posts.removePost)

// Comments

app.get('/posts/:id_post/comments', routes.comments.getComments)
app.post('/posts/:id_post/comments', routes.comments.addComments)
app.put('/posts/:id_post/comments/:id_comment', routes.comments.updateComments)
app.delete('/posts/:id_post/comments/:id_comment', routes.comments.removeComments)

app.listen(3000)