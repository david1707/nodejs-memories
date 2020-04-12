const express = require('express')
const bodyParser = require('body-parser')

const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: true}))

// Routes
const routes = require('./routes/routes')

app.use(routes)

app.listen(3000)