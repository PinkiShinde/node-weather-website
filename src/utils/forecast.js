const request = require('request')

const forecast = (lat,long,callbacks)=>{

    const forecastUrl = 'https://api.weatherbit.io/v2.0/current?key=3a0620af011b4a75a48eff2a959460dd&lat='+lat+'&lon='+long
    request({url: forecastUrl,json:true},(error,response)=>{
        if(error){
           callbacks('Unable to get weather data',undefined)
        }else if(response.body.error){
            callbacks('Unable to get weather data at this time',undefined)
        }
        else{
            callbacks(undefined,{
          timezone : response.body.data[0].timezone,
          countrycode : response.body.data[0].country_code,
          weather_description : response.body.data[0].weather.description,
          cloud : response.body.data[0].clouds

        })
    }

    })
}

module.exports = forecast