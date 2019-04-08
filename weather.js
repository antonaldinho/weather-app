//Codigo por Jose Antonio Aleman
//A01196565
//Desarrollo de Aplicaciones Web
const request = require('request');
const credentials = require('./credentials.js');

function getForecast (latParam, longParam, callback) {
    const url = 'https://api.darksky.net/forecast/' + credentials.darkskyKey + '/' + latParam + ',' + longParam + '?exclude=[minutely, hourly, daily]&lang=es&units=si';
    request({url: url, json: true}, function(error, response) {
        if(error) {
            callback('Service unavailable', undefined);
        }
        else {
            const data = {
                temperature: response.body.currently.temperature,
                summary: response.body.currently.summary,
                precipitation: response.body.currently.precipProbability
            }
            callback(undefined, data);
        }
    });
}

function getCoordinates (city, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ city + '.json?access_token=' + credentials.coordKey;
    request({url: url, json: true}, function(error, response) {
        if(response.body.features.length == 0) {
            callback('location non existent', undefined);
        }
        else {
            //console.log(response.body);
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            const place = response.body.features[0].place_name;
            const coordinates = {
                lat: latitude,
                long: longitude,
                place: place
            }
            callback(undefined, coordinates);
        }
    });
}

module.exports = {
    getCoordinates: getCoordinates,
    getForecast: getForecast
}