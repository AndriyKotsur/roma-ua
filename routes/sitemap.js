const express = require('express')
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')

const { News, Video, Blog, Organization, Portrait } = require('../models')
const router = express.Router()


router.get('/sitemap.xml', async (_, res) => {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  let sitemap

  if (sitemap)
    return res.send(sitemap)

  try {
    const smStream = new SitemapStream({ hostname: 'https://romaua.org.ua/' || 'https://www.romaua.org.ua/' })
    const pipeline = smStream.pipe(createGzip())

    const news = await News.find().then(data => data.map(({ url, category }) => `news/${category}/${url}`))
    news.forEach((item) => smStream.write({ url: item, changefreq: 'weekly', priority: 0.8}));

    const video = await Video.find().then(data => data.map(({ url, category }) => `video/${category}/${url}`))
    video.forEach((item) => smStream.write({ url: item, changefreq: 'weekly', priority: 0.8}));

    const blog = await Blog.find().then(data => data.map(({ url }) => `blog/${url}`))
    blog.forEach((item) => smStream.write({ url: item, changefreq: 'weekly', priority: 0.8}));

    const organization = await Organization.find().then(data => data.map(({ url, category }) => `organization/${category}/${url}`))
    organization.forEach((item) => smStream.write({ url: item, changefreq: 'weekly', priority: 0.8}));

    const portrait = await Portrait.find().then(data => data.map(({ url }) => `portrait/${url}`))
    portrait.forEach((item) => smStream.write({ url: item, changefreq: 'weekly', priority: 0.8}));

    streamToPromise(pipeline).then(sm => sitemap = sm)
    smStream.end()
    pipeline.pipe(res).on('error', (e) => { throw e })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
})

module.exports = router
