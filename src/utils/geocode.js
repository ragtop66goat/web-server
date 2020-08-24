const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic211Y2tpbmZvb3RoIiwiYSI6ImNrZGwyNzBwdzBmemoycmt5ZHV5ZGJwMjMifQ.4d0kez4iJCTb-k64lEVD8w&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.message==='Not Found') {
            callback('Unable to find that location!')
        }else if (body.features.length===0) {
            callback('Unable to find that location')
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode


//this is the first version before refactoring
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=pk.eyJ1Ijoic211Y2tpbmZvb3RoIiwiYSI6ImNrZGwyNzBwdzBmemoycmt5ZHV5ZGJwMjMifQ.4d0kez4iJCTb-k64lEVD8w&limit=1'

// request({url: geocodeURL, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to the location services!')
//     }else if(response.body.message==='Not Found') {
//         console.log('Unalbe to find that location!')
//     }else {
//         lattitude = response.body.features[0].center[1]
//         longitude = response.body.features[0].center[0]
//         console.log(lattitude, longitude)
//     }
// })