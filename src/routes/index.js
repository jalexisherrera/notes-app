const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Index');
});

router.get('/about', (req, res) => {
    res.send('About');
})

module.exports = router;