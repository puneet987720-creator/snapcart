const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const session = require('express-session')
const mongodbStore = require('connect-mongodb-session')(session)
const db_path = 'mongodb+srv://puneet987720_db_user:Puneet108@e-commerce.yffoapx.mongodb.net/snapCart?appName=e-commerce'
const {default:mongoose} = require('mongoose')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')

const authRoutes = require('./routes/authroutes')

const store = new mongodbStore({
  uri: db_path,
  collection: 'sessions'
})

const port = 3000

store.on('error', function(error) {
  console.error('Session store error:', error)
})

// Middleware setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'e-commerce site',
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.get('/', (req, res) => { 
  res.send('Hello World!')
})

app.use(authRoutes)

mongoose.connect(db_path).then(() => {
  console.log('Connected to MongoDB')
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err)
})

