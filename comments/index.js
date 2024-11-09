const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:postId/comments', (req,res) => {
    res.send(commentsByPostId[req.params.postId] || []);
});

app.post('/posts/:postId/comments', (req,res) => {
    const commnetId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const postComments = commentsByPostId[req.params.postId] || [];

    postComments.push({ id: commnetId, content});
    commentsByPostId[req.params.postId] = postComments;

    res.status(201).send(postComments);
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});