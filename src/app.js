const express = require('express')
const stackRouter = require('./routers/stack')
const storeRouter = require('./routers/store')

const app = express()

app.use(express.json())
app.use(stackRouter)
app.use(storeRouter)

module.exports = app