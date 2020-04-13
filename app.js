const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express();

// Template engine
app.set('view engine', 'ejs');
app.set('views', 'views')

// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'static')))

// Routes
const routes = require('./routes/routes')

app.use(routes)

app.listen(3000)