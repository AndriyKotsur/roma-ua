const express = require("express");
const router = express.Router();
const {
  Organization
} = require("../models");

router.get('/organization/:categoryUrl', async (req, res) => {
  const page = req.query.page || 1;
  const {
    categoryUrl
  } = req.params;

  try {
    if (['ukraine', 'world', 'transcarpathia'].indexOf(categoryUrl) === -1) throw new Error

    const organization = await Organization
      .find({
        category: categoryUrl
      })
      .sort({ createdAt: -1 })
      .skip((9 * page) - 9)
      .limit(9);

    const count = await Organization.countDocuments({ category: categoryUrl });

    res.status(200).render('organizations', {
      pageId: 'organizations',
      categoryUrl,
      currentPage: page,
      pages: Math.ceil(count / 9),
      organization
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

router.get('/organization/:categoryUrl/:url', async (req, res) => {
  const {
    categoryUrl,
    url
  } = req.params;


  try {
    const article = await Organization
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

    const asideOrganizations = await Organization
      .find({
        url: {
          $ne: url
        }
      })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).render('article', {
      pageId: 'article',
      categoryId: categoryUrl + '/',
      articleId: 'organization' + '/',
      article,
      asideOrganizations
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

module.exports = router;
