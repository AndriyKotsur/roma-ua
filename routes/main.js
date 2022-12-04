const express = require("express");
const router = express.Router();
const {
  News,
  Poll,
  Blog,
  Video,
  PhotoArchive,
  DocumentArchive
} = require("../models");
const { lookupQuery, projectQuery } = require('./helpers/queries');

router.get('/', async (_, res) => {
  try {
    const topNews = await News.aggregate( [
      { $match: { isMain: true } },
      { $lookup: lookupQuery },
      { $project: projectQuery },
      { $sort: { createdAt: -1 } },
      { $limit: 3 },
    ] );

    let arr = []
    for (const news of topNews) {
      arr.push(news._id)
    }

    const news = await News.aggregate( [
      { $match: { _id: { $nin: arr }, } },
      { $lookup: lookupQuery },
      { $project: projectQuery },
      { $sort: { createdAt: -1 } },
      { $limit: 7 },
    ] );

    const poll = await Poll
      .findOne({})
      .sort({ createdAt: -1 });

    const asideVideos = await Video.aggregate( [
      { $match: {  } },
      { $lookup: lookupQuery },
      { $project: projectQuery },
      { $sort: { createdAt: -1 } },
      { $limit: 3 },
    ] );

    const blog = await Blog.aggregate( [
      { $match: { } },
      { $lookup: lookupQuery },
      { $project: projectQuery },
      { $sort: { createdAt: -1 } },
    ] );

    const photos = await PhotoArchive
      .find({})
      .sort({ createdAt: -1 })
      .limit(3);

    const books = await DocumentArchive
      .find({
        type: 'book'
      })
      .sort({ createdAt: -1 })
      .limit(3);

    const documents = await DocumentArchive
      .find({
        type: 'document'
      })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).render('index', {
      pageId: 'front',
      topNews,
      news,
      poll: poll,
      asideVideos,
      blog,
      photos,
      books,
      documents,
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({
      message: 'Something went wrong'
    });
  }
});

module.exports = router;
