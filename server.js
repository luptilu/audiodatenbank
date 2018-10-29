const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://luptilu:luisa1@ds143293.mlab.com:43293/audiodatenbank', (err, client) => {
    if (err) return console.log(err)
    db = client.db('audiodatenbank') // whatever your database name is
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
  })

  app.set('view engine', 'ejs')
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(express.static('public'))

  app.get('/', (req, res) => {
    db.collection('links').find({isUsed : false}).toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.render('index.ejs', {links: result})
    })
  })
   
app.post('/links', (req, res) => {
    req.body.isUsed=false
    db.collection('links').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('In die Datenbank gespeichert. Yeah.')
      res.redirect('/')
    })
    // db.collection('links').update( { _id: },
    //   { $set:
    //     { isUsed: true,
    //        feedback:
    //   )¶

  })

  app.set('view engine', 'ejs')

  

  
  
