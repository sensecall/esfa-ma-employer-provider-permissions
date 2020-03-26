const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router

router.use(/\/([0-9]+)-([0-9]+)/, (req, res, next) => {
	req.version = req.originalUrl.split('/')[1]
	require(`./views/${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})