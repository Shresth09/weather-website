const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const aqi = require('./utils/aqi')


const app = express()
const port = process.env.PORT || 3000 

const indexPath = path.join(__dirname,'../public')

const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(indexPath))

app.get('',(req,res) => {
    res.render('index',{
        name:'shresth'
    })
})
app.get('/wsp',(req,res) => {
    res.render('wsp', {
        name:'shresth'
    })
})

app.get('/about',(req, res) => {
    res.send('<h1> express about page</h1>')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
        aqi(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                aqi: aqi,
               
            })
        })
    })
})


app.get('*',(req, res) => {

    res.send('page not found please visit  <a href="/">index</a> for website')
})


app.listen(port, () =>{
    console.log('Server is up on port' + port)
})