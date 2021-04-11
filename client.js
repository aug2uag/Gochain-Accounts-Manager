/**

web3 client API to create accounts

Copyright 2021 Reza Fatahi
  */

const { exec } = require('child_process')
const CREATE_ACCOUNT = 'web3 account create'
const re = /0x(.*)/g


module.exports.createAccount = function(cb) {

	exec(CREATE_ACCOUNT, function (err, stdout, stderr) {
		if (err) return cb(err)
		let pair = stdout.match(re)
		return cb(null, {
			'private': pair[0],
			'public': pair[1]
		})
	})

}
