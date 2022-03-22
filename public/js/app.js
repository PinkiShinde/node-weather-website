console.log('Client side java script loaded!!!!!!!!!!')
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


// fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/Boston.json?access_token=pk.eyJ1IjoicGlua2lzaGluZGUzMDQiLCJhIjoiY2wwNmMwZWJ0MGMwZjNrcjIzNDlkemNtYyJ9.KBv-UVFuli-A6zhGAWAufg&limit=1')
// .then((response)=>{
//    if(!response){
//        console.log('Error')
//    }
//    else{
//        response.json().then((data)=>{
//          console.log('Data : '+data.features[0].text)
//        })
//    }
// })

// fetch('http://localhost:3000/weather?address=Boston').then((response)=>{
//   response.json().then((data)=>{
//     if(data.error)
//     {
//          console.log('Error')
//     }
//     else{
//           console.log('Data : ',data)
//     }
//   })

// })


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message1')
const message2=document.querySelector('#message2')

message1.textContent='Loading'
message2.textContent=''

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
  response.json().then((data)=>{
    if(data.error)
    {
         console.log('Error')
         message1.textContent=data.error
    }
    else{
          console.log('Data : ',data.ForecastData)
          console.log('Data : ',data.GeocodeData, data.location,data.longitude)
          message1.textContent=data.ForecastData.timezone
          message2.textContent=data.location
    }
  })

})


})