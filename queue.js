/**

Maintains N list of placeholder records for account creation;
account is bound to new registration


Copyright 2021 Reza Fatahi

  */

const client = require('./client')
const fs = require('./files')
const N = 10
const QUEUE = 'accounts.json'
fs.setFilename(QUEUE)  // config fs

// files API
let get = fs.safeGet
let write = fs.safeWrite
let save = fs.save

// add account to file
function queue(cb) {
	client.createAccount(function(err, keys) {
		if (err) return cb(err)
		write(keys, function(err) {
			if (err) return cb(err)
			cb()
		})
	})
}

// remove account from file
function dequeue(cb) {
	get(function(err, accounts) {
		if (err) return cb(err)
		let account = accounts.pop()
		save(accounts, function(err) {
			if (err) return cb(err)
			return cb(null, account)
		})
	})
}

// set min N accounts to QUEUE (with memo)
function seedAccounts(n, cb) {
	if (n < N) {
		// add keys to queue until full
		queue(function(err) {
			if (err) return cb(err)
			seedAccounts(n+1, cb)
		})
	} else {
		cb(null, 'Ok')
	}
}


// init FS and accounts with ten accounts
module.exports.init = function init(cb) {
	get(function(err, accounts) {
		if (err) return cb(err)
		console.log('accounts.length =', accounts.length)
		if (accounts.length < N) {
			return seedAccounts(accounts.length, cb)
		}
		cb(null, 'Ok')
	})
}

// dequeue; returns private/public key pair
module.exports.getAccount = function getAccount(cb) {
	dequeue(function(err, account) {
		if (err) return cb(err)
		// restore queue
		queue(function(err) {
			if (err) return cb(err)
			return cb(null, account)
		})
	})
}
