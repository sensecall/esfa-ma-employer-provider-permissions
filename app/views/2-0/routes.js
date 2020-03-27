const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router

router.get('/', (req, res, next) => {
	res.redirect(`/${req.version}/config`)
})

function createBusinessList(l, i) {
	let x = Array.from({length: i}, () => Math.floor(Math.random() * l)).sort((a, b) => a - b)
	return x
}

function createProviderList(l, i) {
	let x = Array.from({length: i}, () => Math.floor(Math.random() * l)).sort((a, b) => a - b)
	return x
}

function randomBusinesses(req, res){
	let list = createBusinessList(req.session.data['businesses'].length, req.session.data['orgs-count'])
	return list
}

function randomProviders(req, res){
	let list = createProviderList(req.session.data['providers'].length, req.session.data['providers-count'])
	return list
}

router.post('/config', (req, res, next) => {
	req.session.data['random-businesses'] = randomBusinesses(req,res)
	req.session.data['random-providers'] = randomProviders(req,res)
	res.redirect('organisations')
})

router.get('/organisations', (req, res, next) => {
	if(! req.session.data['random-businesses']){
		req.session.data['random-businesses'] = randomBusinesses(req,res)
	}

	if(! req.session.data['random-providers']){
		req.session.data['random-providers'] = randomProviders(req, res)
	}

	res.render(`${req.version}/organisations`)
})