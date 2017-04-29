const MongoClient = require('mongodb').MongoClient

function DB() {
    this.db = null
}

DB.prototype.connect = (uri) => {
    // Connect to the database specified by the connect string / uri
	
	// Trick to cope with the fact that "this" will refer to a different
	// object once in the promise's function.
	var _this = this

    return new Promise((resolve, reject) => {
        if (_this.db) {
            // Already connected
            resolve()
        } else {
            let __this = _this

            MongoClient.connect(uri)
                .then((database) => {
                        // Store the database connection as part of the DB object so
                        // that it can be used by subsequent method calls.
                        __this.db = database
                        resolve()
                    }, (err) => {
                        console.log('Error connecting: ' + err.message)
                        reject(err.message)
                    }
                )
        }
    })
}

DB.prototype.close = () => {
    if (this.db) {
        this.db.close()
            .then(
                () => {}, (error) => {
                    console.log('Failed to close the database: ' + error.message)
                }
            )
    }
}

DB.prototype.findDocuments = (coll) => {
    let _this = this

    return new Promise((resolve, reject) => {
        _this.db.collection(coll, {strict: false}, (error, collection) => {
            if (error) {
                console.log('Could not access collection: ' + error.message)
                reject(error.message)
            } else {
                let cursor = collection.find({})
                cursor.toArray((error, docArray) => {
                    if (error) {
                        console.log('Error reading from cursor: ' + error.message)
                        reject(error.message)
                    } else {
                        resolve(docArray)
                    }
                })
            }
        })
    })
}

DB.prototype.addDocument = (coll, document) => {
    let _this = this
    return new Promise((resolve, reject) => {
        _this.db.collection(coll, {strict: false}, (error, collection) => {
            if (error) {
                console.log('Could not access the collection: ' + error.message)
                reject(error.message)
            } else {
                collection.insert(document, {w: 'majority'})
                    .then(result => resolve(), (err) => {
                        console.log('Insert failed: ' + err.message)
                        reject(err.message)
                    })
            }
        })
    })
}

DB.prototype.updateDocument = (coll, document) => {
    let _this = this
    return new Promise((resolve, reject) => {
        _this.db.collection(coll, {strict: false}, (error, collection) => {
            if (error) {
                console.log('Could not access the collection: ' + error.message)
                reject(error.message)
            } else {
                collection.updateOne(
                    {
                         bar_id: document.bar_id,
                         numAttendees: {$gte: 0}
                    },
                    { 
                        $inc: { numAttendees: document.value }
                    }, 
                    { upsert: true }
                )
                    .then(() => {
                        collection.updateOne(
                            {
                                bar_id: document.bar_id,
                                numAttendees: {$lt: 0}
                            },
                            { $set: { numAttendees: 0 } }
                        )
                            .then(() => resolve(), (err) => {
                                console.log('Update failed: ' + err.message)
                                reject(err.message)
                            })
                    })
            }
        })
    })
}

// DB.prototype.countDocuments = (coll) => {
//     let _this = this

//     return new Promise((resolve, reject) => {
//         _this.db.collection(coll, {strict: true}, (error, collection) => {
//             if (error) {
//                 console.log('Could not access collection: ' + error.message)
//                 reject(error.message)
//             } else {
//                 collection.count()
//                     .then(count => resolve(count), (err) => {
//                         console.log('countDocuments failed: ' + err.message)
//                         reject(err.message)
//                     })
//             }
//         })
//     })
// }

module.exports = DB