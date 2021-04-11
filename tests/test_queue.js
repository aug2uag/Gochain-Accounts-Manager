const assert = require('assert')
let Queue = require('./queue')

Queue.init(function(err, status) {
	assert(err == null)
	console.log(status)
	assert(status == 'Ok')
	Queue.getAccount(function(err, account) {
		assert(err == null)
		console.log(account)
		assert(account.public != null)
		assert(account.private != null)
	})
})