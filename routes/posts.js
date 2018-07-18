const store = require('./store')

// Functions

getPosts = (req, res) => {
    if(req.query.id_post)return res.status(200).send(store.posts[req.query.id_post])
    res.status(200).send(store.posts)
}

addPost = (req, res) => {
    const post = {
        id: 0,
        name: '',
        url: '',
        text: '',
        comments: []
    }
    if(req.body.name && req.body.url && req.body.text){
        post.id = store.posts.length
        post.name = req.body.name
        post.url = req.body.url
        post.text = req.body.text
        store.posts.push(post)
        res.status(201).send({id: post.id})
    }else{
        res.status(400).send('Error: parametros incompletos')
    }
}

updatePost = (req, res) => {
    if(!req.params.id_post)return res.status(400).send('Error: parametros incompletos')
    const post = store.posts.find((post)=>{
        return post.id == req.params.id_post
    })
    if(post && req.body.name && req.body.url && req.body.text){
        post.name = req.body.name
        post.url = req.body.url
        post.text = req.body.text
        res.status(200).send(post)
    }else{
        res.status(400).send('Error: parametros incompletos') 
    }
}

removePost = (req, res) => {
    if(!req.params.id_post) return res.status(400).send('Error: parametros incompletos')
    store.posts.map((post, index)=>{
        if(post.id == req.params.id_post){
            store.posts.splice(index, 1)
        }
    })
    res.sendStatus(202)
}

module.exports = {
    getPosts: getPosts,
    addPost: addPost,
    updatePost: updatePost,
    removePost: removePost
}