const express = require('express')
const bodyParser = require('body-parser')

const app = express();

// Template engine
app.set('view engine', 'ejs');
app.set('views', 'views')

// Middleware
app.use(bodyParser.urlencoded({extended: true}))

// Routes
const routes = require('./routes/routes')

app.use(routes)

app.listen(3000)