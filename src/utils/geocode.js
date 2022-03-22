const request = require('request')
const geocode = (address,callback)=>{
    const geoUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address +'.json?access_token=pk.eyJ1IjoicGlua2lzaGluZGUzMDQiLCJhIjoiY2wwNmMwZWJ0MGMwZjNrcjIzNDlkemNtYyJ9.KBv-UVFuli-A6zhGAWAufg&limit=1'
     console.log('geourl: ',geoUrl)
    request({url: geoUrl,json:true},(error,response)=>{
        if(error){
            callback('Unable to access location',undefined)
        }
        else if(response.body.features.length==0){
            callback('Unable to access location with search',undefined)
        }
         else{
            callback(undefined,{
                latitude :response.body.features[0].center[1],
                longitude :response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
         }
    })
}

module.exports = geocode