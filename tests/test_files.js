const assert = require('assert')
const fs = require('./files')
const N = 50
const FN = 'accounts_test.json'
fs.setFilename(FN)  // config fs
fs.remove()  // cleanup

let get = fs.safeGet
let write = fs.safeWrite

get(function(err, accounts) {
	assert(err == null)
	assert(accounts.length == 0)
	write({'foo': true}, function(err) {
		assert(err == null)
		get(function(err, accounts) {
			assert(err == null)
			assert(accounts.length == 1)
			assert(accounts[0].foo == true)
			console.log('all tests passed')
			fs.remove()  // cleanup
		})
	})
})
