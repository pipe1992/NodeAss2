const store = require('./store')

// Functions

getComments = (req, res) => {
    if(!req.params.id_post) return res.status(400).send('Incorrect request')
    const post = store.posts.find((post) => {
        return post.id == req.params.id_post
    })
    if(post){
        res.status(200).send(post.comments)
    }else{
        res.status(200).send([])
    }    
}

addComments = (req, res) => {
    if(!req.params.id_post) return res.status(400).send('Incorrect request')
    const post = store.posts.find((post) => {
        return post.id == req.params.id_post
    })
    if(!post) return res.status(400).send(`There is no post with id: ${req.params.id_post}`)
    const comment = {
        id: 0,
        msg: ''
    }
    comment.msg = req.body.msg
    comment.id = post.comments.length
    post.comments.push(comment)
    res.status(201).send({id: comment.id})
}

updateComments = (req, res) => {
    if(!req.params.id_post || !req.params.id_comment) return res.status(400).send('Incorrect request')
    const post = store.posts.find((post) => {
        return post.id == req.params.id_post
    })
    if(!post) return res.status(400).send(`There is no post with id: ${req.params.id_post}`)
    const comment = post.comments.find((comment) => {
        return comment.id == req.params.id_comment
    })
    if(!comment) return res.status(400).send(`There is no comment with id: ${req.params.id_comment}`)
    comment.msg = req.body.msg
    res.status(201).send({comment: comment})
}

removeComments = (req, res) => {
    if(!req.params.id_post || !req.params.id_comment) return res.status(400).send('Incorrect request')
    const post = store.posts.find((post) => {
        return post.id == req.params.id_post
    })
    if(!post) return res.status(400).send(`There is no post with id: ${req.params.id_post}`)
    const commentIndex = post.comments.find((comment, index) => {
        if(comment.id == req.params.id_comment){
            post.comments.splice(index, 1)
            return index
        }
    })
    if(!commentIndex) return res.status(400).send(`There is no comment with id: ${req.params.id_comment}`)
    res.status(202).send(commentIndex)
}

module.exports = {
    getComments,
    addComments,
    updateComments,
    removeComments   
}