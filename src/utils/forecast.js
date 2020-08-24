const request = require ('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=07733019a857d0f605c3bb6f1b5a1359&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Uable to connect to weather services!', undefined)
        }else if(body.error) {
            callback('Uable to find that location!', undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0]+'. It is currently ' + body.current.temperature+ ' degrees out. It feels like '+ body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast

// this is before refactoring
// const url = 'http://api.weatherstack.com/current?access_key=07733019a857d0f605c3bb6f1b5a1359&query=37.8267,-122.4233&units=f'

// request({url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     }else if(response.body.error) {
//         console.log('Unable to find location!')
//     }else{
//         console.log(response.body.current.weather_descriptions[0]+'. It is currently ' + response.body.current.temperature+ ' degrees out. It feels like '+ response.body.current.feelslike + ' degrees out.')
//     }
// })