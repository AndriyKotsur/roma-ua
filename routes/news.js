const express = require("express");
const router = express.Router();
const {
  News,
  Poll,
  Video
} = require("../models");
const { lookupQuery, projectQuery } = require('./helpers/queries');

router.get('/news/:categoryUrl', async (req, res) => {
  const page = req.query.page || 1;
  const {
    categoryUrl
  } = req.params;

  try {
    if (['ukraine', 'world', 'transcarpathia'].indexOf(categoryUrl) === -1) throw new Error

    const news = await News.aggregate( [
      { $match: { category: categoryUrl } },
      { $lookup: lookupQuery },
      { $project: projectQuery },
      { $sort: { createdAt: -1 } },
      { $skip: (7 * page) - 7 },
      { $limit: 7 },
    ] );

    const poll = await Poll
      .findOne({})
      .sort({
        createdAt: -1
      });

    const asideVideos = await Video.aggregate( [
      { $match: { } },
      { $lookup: lookupQuery },
      { $project: projectQuery },
      { $sort: { createdAt: -1 } },
      { $limit: 3 },
    ] );

    const count = await News.countDocuments({
      category: categoryUrl
    });

    res.status(200).render('news', {
      pageId: 'news',
      categoryUrl,
      currentPage: page,
      pages: Math.ceil(count / 7),
      news,
      poll,
      asideVideos
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

router.get('/news/:categoryUrl/:url', async (req, res) => {
  const {
    categoryUrl,
    url,
  } = req.params;

  try {
    const article = await News
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

    const asideNews = await News.aggregate( [
      { $match: { url: { $ne: url } } },
      { $lookup: lookupQuery },
      { $project: projectQuery },
      { $sort: { createdAt: -1 } },
      { $limit: 3 },
    ] );

    res.status(200).render('article', {
      pageId: 'article',
      articleId: 'news' + '/',
      categoryId: categoryUrl + '/',
      article,
      asideNews
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

module.exports = router;
