
var translit = require('./transliterate')
var when = require('when')

module.exports = {
	transliterate: translit.transliterate,
	render: function(procedure, template, req, res) {
		when(procedure(req)).then(function(data, status) {
			res.status(status || 200)
			res.render_context(template, data)
		}).catch(function(error) {
			res.status(500)
			res.render_context('500.html', {error: error})
		})
	},
	json: function(procedure, req, res) {
		when(procedure(req)).then(function(data, status) {
			res.status(status || 200)
			res.send({ status: true, data: data })
		}).catch(function(error) {
			res.status(500)
			res.send({ error: error })
		})
	}
}