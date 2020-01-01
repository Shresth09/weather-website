
const request = require('request')

const aqi = (latitude, longitude, callback) => {
    const url = 'https://api.breezometer.com/air-quality/v2/current-conditions?lat='+latitude+'&'+'lon='+longitude+'&key=fa897ee77eef45d990e138ac8dc5282e'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,'Quaility Of Air Outside' + data.indexes.baqi.aqi)
        }
    })
}

module.exports = aqi