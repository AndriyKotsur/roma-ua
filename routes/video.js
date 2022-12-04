const express = require("express");
const router = express.Router();
const {
  News,
  Poll,
  Video
} = require("../models");
const { lookupQuery, projectQuery } = require('./helpers/queries');

router.get('/video/:categoryUrl', async (req, res) => {
  const page = req.query.page || 1;
  console.log(page);
  const {
    categoryUrl
  } = req.params;

  try {
    if (['tv-romano-givipen', 'tv-romano-lav', 'pap-jaz-fest', 'other'].indexOf(categoryUrl) === -1) throw new Error

    const videos = await Video.aggregate( [
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
    
    const asideNews = await News.aggregate( [
      { $match: { } },
      { $lookup: lookupQuery },
      { $project: projectQuery },
      { $sort: { createdAt: -1 } },
      { $limit: 3 },
    ] );
    
    const count = await Video.countDocuments({ category: categoryUrl })
    
    res.status(200).render('videos', {
      pageId: 'videos',
      categoryUrl,
      currentPage: page,
      pages: Math.ceil(count / 7),
      videos,
      poll,
      asideNews
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

router.get('/video/:categoryUrl/:url', async (req, res) => {
  const {
    categoryUrl,
    url,
  } = req.params;

  try {
    const article = await Video
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

    const asideVideos = await Video
      .find({
        url: {
          $ne: url
        }
      })
      .limit(3)
      .sort({
        createdAt: -1
      });

    res.status(200).render('article', {
      pageId: 'article',
      categoryId: categoryUrl + '/',
      articleId: 'video' + '/',
      article,
      asideVideos
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

module.exports = router;
