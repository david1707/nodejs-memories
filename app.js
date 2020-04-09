const express = require('express')

const app = express();

const routes = require('./routes/routes')
// Routes
app.use(routes)

app.listen(3000)