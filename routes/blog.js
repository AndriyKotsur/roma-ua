const express = require("express");
const router = express.Router();
const {
  Blog
} = require("../models");

router.get('/blog/:url', async (req, res) => {
  const {
    url
  } = req.params;

  const pageId = 'article';
  const articleId = 'blog' + '/';
  const categoryId = '';

  try {
    const article = await Blog
      .findOneAndUpdate({
        url
      }, {
        $inc: {
          views: 1
        }
      });

    await article
      .populate({
        path: 'comments',
        match: {
          isApproved: true
        },
      })
      .execPopulate();

    const asideBlog = await Blog
      .find({
        url: {
          $ne: url
        }
      })
      .sort({ createdAt: -1 })
      .limit(3);
      
    res.status(200).render('article', {
      articleId,
      categoryId,
      pageId,
      article,
      asideBlog
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

module.exports = router;
