// express, router, export
const express = require('express');

const postRoutes = express.Router();
const postController = require('../controllers/postController');
const { validatePost } = require('../helper/middleware');

// routes
postRoutes.get('/api/posts', postController.postIndex);

postRoutes.post('/api/posts', validatePost, postController.addPost);

module.exports = postRoutes;
