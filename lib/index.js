var express = require('express')
var path = require('path')
var _ = require('underscore')
var routes = require('./routes')

function default_route(req, res, next){
	res.status(404)
	if (req.accepts('html'))
		res.render_context('404.html', {url: req.url })
	else if (req.accepts('json'))
		res.send({ error: req.gettext('Not found') })
	else
		res.type('txt').send(req.gettext('Not found'))
}


function init(app) {
	app.use('/static', express.static(path.join(__dirname, '..', 'templates', 'static')))

	// Context
	app.use(function(req, res, next) {
		res.context = {}
		res.render_context = function(template, data) {
			var context_data = _.extend(res.context, data)
			res.render(template, context_data)
		}
		next()
	})

	// Routes
	app.get('/', function(req, res, next) {
		return routes.render(routes.transliterate, 'translit.html', req, res)
	})
	app.post('/', function(req, res, next) {
		return routes.json(routes.transliterate, req, res)
	})

	app.use(default_route)
}

module.exports = {
	init: init
}
