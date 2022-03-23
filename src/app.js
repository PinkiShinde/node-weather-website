const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast =require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()
const port =process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead',
        profession : 'IT'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    console.log('Address provided : ',req.query.address)
    const loc=req.query.address
    if(!loc){
       return res.send({error : 'Please provide addrees for serach'})
    }
    
    geocode(loc,(error,{latitude,longitude,location}={})=>{
        if(error)
       // return res.status(404).send('Error in Geocode api')
        return res.send({error : 'Error in Geocode api'})
        else{
    console.log('Geocode data : ',latitude,longitude,location)
    
    forecast(latitude,longitude,(forecastError,forecastData)=>{
        if(forecastError)
        return res.send({error : 'Error in Weather api '})
        else{
        console.log('Forecast Data : ',forecastData)
        res.send({
            GeocodeData : latitude,longitude,location,
            ForecastData : forecastData 
        })
        }
     
    })
        }
    })

    // res.send({
    //     address : req.query.address,
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia'
    // })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404 Help',
        name : 'Swarnika',
        errorMessage : 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Swarnika',
        errorMessage : 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port .'+ port)
})