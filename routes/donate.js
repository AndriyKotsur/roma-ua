require('dotenv').config();
const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const { Supporter } = require('../models');

router.get('/donate', (_, res) => {
    try {
        res.status(200).render('donate', {
            pageId: 'donate',
        })
    } catch (err) {
        console.error(err.message);
        res.status(404).render('not-found', {
            pageId: 'notFound'
        })
    }
})

router.post('/donate', (req, res) => {
    const public_key = process.env.PRIVAT_PUBLIC_KEY;
    const private_key = process.env.PRIVAT_PRIVATE_KEY;
    let value;
    const {
        amount,
        name,
        phone,
        email
    } = req.body;

    switch (amount) {
        case 'small':
            value = 100
            break;
        case 'medium':
            value = 500
            break;
        case 'large':
            value = 1000
            break;
        default:
            value = 0
            break;
    }

    try {
        Supporter.create({
            name,
            email,
            phone
        })

        const params = {
            "public_key": public_key,
            "version": "3",
            "action": "paydonate",
            "amount": value || 0,
            "currency": "UAH",
            "description": "Підтримка інформаційно-аналітичного агентства \"РомаУА\"",
            "order_id": Date.now(),
            "language": "uk",
            "result_url": 'https://romaua.org.ua',
        };

        const data = Buffer.from(JSON.stringify(params)).toString('base64');
        const sha1 = crypto.createHash('sha1');
        const signature = sha1.update(private_key + data + private_key).digest('base64');

        res.status(200).json({
            data,
            signature
        });
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router
