const express = require('express')

const app = express();

// Routes
app.use('/create-memory', (req, res, next) => {
    console.log('CREATE MEMORY')
    res.send('<h1>Create a new memory</h1>')
})

app.use('/', (req, res, next) => {
    console.log('HOME')
    res.send('<h1>Home</h1>')
})



app.listen(3000)