const express = require("express");
const router = express.Router();
const { Media } = require("../models");

router.get('/media', async (_, res) => {
  try {
    const media = await Media
      .find({})
      .sort({ createdAt: -1 });

    res.status(200).render('media', { pageId: 'media', media });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

module.exports = router;
