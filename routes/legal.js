const express = require('express');
const router = express.Router();

router.get('/privacy-policy', (_, res) => {
    try {
        res.status(200).render('privacy-policy', {
            pageId: 'privacyPolicy',
        })
    } catch (err) {
        console.error(err.message);
        res.status(404).render('not-found', {
            pageId: 'notFound'
        })
    }
})

router.get('/offer-agreement', (_, res) => {
    try {
        res.status(200).render('offer-agreement', {
            pageId: 'offerAgreement'
        })
    } catch (err) {
        console.error(err.message)
        res.status(404).render('not-found', {
            pageId: 'notFound'
        })
    }
})

module.exports = router