const mongo = require('mongodb').MongoClient

const mongoUri = process.env.MONGO_URI

const connect = (url, res) => {
  mongo.connect(mongoUri, (err, db) => {
    if (err) {
      throw err
    }

    const collection = db.collection('urls')

    collection.find({_id: 'url info'}).toArray((err, docs) => {
      if (err) {
        throw err
      }

      if (docs.length === 0) {
        collection.insertMany([{_id: 'url info', numIds: 0}, {0: url}], err => {
          if (err) {
            throw err
          }

          const urlsToSend = {normal: url, shortened: 'https://nickel-value.glitch.me/0'}

          db.close()
          res.end(JSON.stringify(urlsToSend))
        })
      } else {
        collection.update({_id: 'url info'}, {$inc: {numIds: 1}}, err => {
          if (err) {
            throw err
          }
          const urlId = {}
          const key = docs[0].numIds + 1
          urlId[key] = url
          collection.insert(
            urlId
          ).then(() => {
            const urlToSend = {normal: url, shortened: 'https://nickel-value.glitch.me/' + key}
            res.end(JSON.stringify(urlToSend))  
            db.close()
          }).catch(err => {
            console.log(err)
          })
        })
      }
    })
  })
}

module.exports = connect

