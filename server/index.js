require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const morgan = require('morgan')
const mongoose = require('./db/connect')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

// connect to db
mongoose.connect(process.env.DATABASE_URI)

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('common'))

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

app.get('/', (req, res) => {
  res.send('heelo')
})

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
)
