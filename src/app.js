const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')


const app = express()

//handlebars is the template engine. It expects the hbs files to live in the root directory in a directory called views
//unless told to look elsewhere, hence the viewsPath var pointing to the tmplates file
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars as the engine and the views directory path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve up
app.use(express.static(publicDirectoryPath))

//the empty string is due to index being the default
app.get('', (req, res) => {
    //the first argument for render needs to match the hbs file
    res.render('index', {

        title: 'Weather', 
        name: 'Jason Gionfriddo'
    })
})

//the first argument mathces the webaddress for the desired page
app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Jason Gionfriddo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is where you can find the answers.',
        name: 'Jason Gionfriddo'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
       title: '404', 
       name:'Jason Gionfriddo',
       errorMessage: 'Help article not found' 
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Jason Gionfriddo',
        errorMessage:'Page not found'
    })

})

//this is what port your browser is looking for run this in the terminal with nodemon src/app.js
app.listen(3000, () => {
    console.log('Server is starting on port 3000')
})
