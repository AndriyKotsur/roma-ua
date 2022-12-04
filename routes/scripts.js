const express = require("express");
const router = express.Router();
const moment = require('moment');

const {
  News,
  Poll,
  Comment,
  Video,
  Organization,
  Portrait,
  Blog
} = require("../models");

router.post('/create-comment', async (req, res) => {
  try {
    const {
      id,
      title,
      name,
      text
    } = req.body
    if (!id || !title || !name || !text) {
      return res.status(404).json({
        message: 'Fill all fields'
      });
    }

    const news = await News.findById(id);
    const video = await Video.findById(id);
    const organization = await Organization.findById(id);
    const portrait = await Portrait.findById(id);
    const blog = await Blog.findById(id);

    if (news || video || organization || portrait || blog) {
      const data = {
        userName: name,
        text,
        isApproved: false,
        date: moment().locale('uk').format('LLL'),
        title,
      }

      if (news) {
        const newComment = await Comment.create({
          ...data,
          news: id
        });
        await News.findByIdAndUpdate(id, {
          $push: {
            comments: newComment._id
          }
        });
      }

      if (video) {
        const newComment = await Comment.create({
          ...data,
          video: id
        });
        await Video.findByIdAndUpdate(id, {
          $push: {
            comments: newComment._id
          }
        });
      }

      if (organization) {
        const newComment = await Comment.create({
          ...data,
          organization: id
        });
        await Organization.findByIdAndUpdate(id, {
          $push: {
            comments: newComment._id
          }
        });
      }

      if (portrait) {
        const newComment = await Comment.create({
          ...data,
          portrait: id
        });
        await Portrait.findByIdAndUpdate(id, {
          $push: {
            comments: newComment._id
          }
        });
      }

      if (blog) {
        const newComment = await Comment.create({
          ...data,
          blog: id
        });
        await Blog.findByIdAndUpdate(id, {
          $push: {
            comments: newComment._id
          }
        });
      }

      res.status(200).json({
        message: 'Comment created'
      });
    } else {
      res.status(404).json({
        message: 'Not found article'
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(404).json({
      message: 'Something went wrong'
    });
  }
});

router.post('/add-vote', async (req, res) => {
  try {
    const {
      id,
      index,
    } = req.body

    const poll = await Poll.findByIdAndUpdate(id, {
      $inc: {
        [`answers.${index}.votes`]: 1
      }
    });

    res.status(200).json({
      poll
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({
      message: 'Something went wrong'
    });
  }
});

router.post('/search', async (req, res) => {
  try {
    const value = req.body.search

    const filter = {
      title: {
        $regex: `^${value}`,
        $options: 'i'
      }
    }

    const news = await News.find(filter);
    const video = await Video.find(filter);
    const organization = await Organization.find(filter);
    const portrait = await Portrait.find(filter);
    const blog = await Blog.find(filter);

    res.status(200).json([
      ...news,
      ...video,
      ...organization,
      ...portrait,
      ...blog,
    ]);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({
      message: 'Somenthing went wrong'
    });
  }
});

module.exports = router;