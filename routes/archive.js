const express = require("express");
const router = express.Router();
const fs = require('fs');
const {
  PhotoArchive,
  DocumentArchive
} = require("../models");

router.get('/photos', async (req, res) => {
  const page = req.query.page || 1;

  try {
    const photos = await PhotoArchive
      .find({})
      .sort({
        createdAt: -1
      })
      .skip((9 * page) - 9)
      .limit(9);

    const count = await PhotoArchive.countDocuments({});

    res.status(200).render('archive-gallery', {
      pageId: 'archiveGallery',
      currentPage: page,
      pages: Math.ceil(count / 9),
      photos
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

router.get('/photos/:url', async (req, res) => {
  const {
    url
  } = req.params;

  try {
    const photoArchive = await PhotoArchive
      .find({
        url
      });

    res.status(200).render('gallery', {
      pageId: 'gallery',
      photoArchive
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

router.get('/books', async (req, res) => {
  const page = req.query.page || 1;

  try {
    const books = await DocumentArchive
      .find({
        type: 'book'
      })
      .sort({
        createdAt: -1
      })
      .limit(9)
      .skip((9 * page) - 9);

    const count = await DocumentArchive.countDocuments({
      type: 'book'
    });

    res.status(200).render('archive-books', {
      pageId: 'archiveBooks',
      books,
      pages: Math.ceil(count / 9),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

router.get('/books/:url', async (req, res) => {
  const {
    url
  } = req.params;

  try {
    const book = await DocumentArchive
      .find({
        url
      });

    const books = await DocumentArchive
      .find({
        $and: [
          {
            type: 'book'
          },
          {
            url: {
              $ne: url
            }
          },
        ]
      })
      .limit(3);

    res.status(200).render('book', {
      pageId: 'book',
      book,
      books
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

router.get('/documents', async (req, res) => {
  const page = req.query.page || 1;

  try {
    const documents = await DocumentArchive
      .find({
        type: 'document'
      })
      .sort({
        createdAt: -1
      })
      .limit(9)
      .skip((9 * page) - 9);

    const count = await DocumentArchive.countDocuments({
      type: 'document'
    });

    res.status(200).render('archive-documents', {
      pageId: 'archiveDocuments',
      currentPage: page,
      pages: Math.ceil(count / 9),
      documents
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

router.get('/documents/:url', async (req, res) => {
  const {
    url
  } = req.params;

  try {
    const document = await DocumentArchive
      .find({
        url
      });

    const documents = await DocumentArchive
      .find({
        $and: [
          {
            type: 'document'
          },
          {
            url: {
              $ne: url
            }
          },
        ]
      })
      .sort({
        createdAt: -1
      })
      .limit(3);

    res.status(200).render('document', {
      pageId: 'document',
      document,
      documents
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

router.get('/download/:url', (req, res) => {
  const {
    url
  } = req.params;

  try {
    if (fs.existsSync(`./public/archives/${url}`)) {
      const file = fs.readdirSync(`./public/archives/${url}`, function (error, files) {
        if (error) throw error;
        return files;
      });
      res.status(200).download(`public/archives/${url}/${file[0]}`);
    } else if (fs.existsSync(`./app/public/archives/${url}`)) {
      const file = fs.readdirSync(`./app/public/archives/${url}`, function (error, files) {
        if (error) throw error;
        return files;
      });
      res.status(200).download(`app/public/archives/${url}/${file[0]}`);
    } else {
      res.status(404).render('not-found', {
        pageId: 'notFound',
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(404).render('not-found', {
      pageId: 'notFound',
    });
  }
});

module.exports = router;
