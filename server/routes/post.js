const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require('../middleware/auth')

// @route POST api/auth/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => {
  const {title, description, url, status} = req.body

  // Simple validation
  if (!title) {
    return res
      .status(400)
      .json({success: false, message: 'Title is required'})
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith('https://')
        ? url
        : `https://${url}`,
      status: status || 'TO LEARN',
      user: req.userId,
    })
    const post = await newPost.save()
    res.json({
      success: true,
      message: 'Happy learning!',
      post,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.massage,
    })
  }
})

module.exports = router
