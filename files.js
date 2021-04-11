/**

safe read


Copyright 2021 Reza Fatahi

  */

const fs = require('fs')
let was = {}


module.exports.setFilename = function setFilename(name) {
	was.FN = name
}


// set empty array to file
function defaultFile() {
	fs.writeFileSync(was.FN, '[]')
	return []
}


// file to JSON
module.exports.safeGet = was.safeGet = function safeGet(cb) {
	fs.readFile(was.FN, 'utf-8', function(err, file) {
		if (err && err.code == 'ENOENT') return cb(null, defaultFile())
		else if (err) return cb(err)
		return cb(null, JSON.parse(file))
	})
}

// add JSON to file
module.exports.safeWrite = was.safeWrite = function safeWrite(json, cb) {
	was.safeGet(function(err, list) {
		if (err) return cb(err)
		list.push(json)
		was.save(list, function(err) {
			if (err) return cb(err)
			return cb()
		})
	})
}

// overwrite JSON in file
module.exports.save = was.save = function save(list, cb) {
	fs.writeFile(was.FN, JSON.stringify(list), function(err) {
		if (err) return cb(err)
		return cb()
	})
}


module.exports.remove = function remove() {
	try {
		fs.rm(was.FN, function() {})
	} catch(e) {
		// statements
		console.log(e);
	}
}