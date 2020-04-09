const express = require('express')

const app = express();

// Routes
app.get('/', (req, res, next) => {
    console.log('HOME')
    // res.send('<h1>Home</h1>')
    res.write('<head><title>Home</title></head>')
    res.write('<body>')
    res.write('<h1>Home</h1>')
    res.write('<p>Here we will list all your memories</p>')
    res.write('</body>')
    res.end()
})

app.get('/create-memory', (req, res, next) => {
    console.log('CREATE MEMORY')
    // res.send('<h1>Create a new memory</h1>')
    res.write('<head><title>Create a new memory</title></head>')
    res.write('<body>')
    res.write('<h1>Create memory form</h1>')
    res.write('<p>Here we can create a new memory</p>')
    res.write('</body>')
    res.end()
})

app.listen(3000)