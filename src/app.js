const path = require('path')
const express = require('express')

const publicDirectoryPath = path.join(__dirname, '../public')

const app = express()
app.set('view engine', 'hbs')

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {

        title: 'Weather App', 
        name: 'Jason Gionfriddo'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jason Gionfriddo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is where you can find the answers.'
    })
})

app.listen(3000, () => {
    console.log('Server is starting on port 3000')
})