const express = require("express");
const router = express.Router();
const {
  Portrait
} = require("../models");

router.get('/portrait', async (req, res) => {
  const page = req.query.page || 1;

  try {
    const portraits = await Portrait
      .find({})
      .sort({ createdAt: -1 })
      .skip((9 * page) - 9)
      .limit(9);

    const count = await Portrait.countDocuments({});

    res.status(200).render('portraits', {
      pageId: 'portraits',
      currentPage: page,
      pages: Math.ceil(count / 9),
      portraits
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

router.get('/portrait/:url', async (req, res) => {
  const {
    url
  } = req.params;

  try {
    const article = await Portrait
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

    const asidePortraits = await Portrait
      .find({
        url: {
          $ne: url
        }
      })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).render('article', {
      pageId: 'article',
      categoryId: '',
      articleId: 'portrait' + '/',
      article,
      asidePortraits
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

module.exports = router;
