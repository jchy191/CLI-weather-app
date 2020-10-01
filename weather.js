const { error } = require('console');
const https = require('https');
const API = require('./api.json');
const querystring = require('querystring');

function printTemperature(weatherInfo) {
    console.log(`The current temperature in ${weatherInfo.name} is ${weatherInfo.main.temp}`);
}

function getWeather(query) {    

    try {
        const parameters = {
            units: "metric",
            q: query,
            appid: API.key
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`;

        const request = https.get(url, response => {
            if (response.statusCode === 200) {
                let body = "";

                response.on('data', data => {
                    body += data.toString();
                })

                response.on('end', () => {
                    try {
                        const weatherInfo = JSON.parse(body);
                        printTemperature(weatherInfo);
                    } catch (error) {
                        console.error(error.message);
                    }
                    
                })

                request.on('error', error => {
                    console.error(`Problem with request: ${error.message}`)
                })
            } else {
                const message = `There was an error getting the weather for ${query} (${response.statusCode}). Did you spell the area correctly?`;
                const statusCodeError = new Error(message);
                console.error(statusCodeError.message);
            }
        })
    } catch (error) {
        console.error(erro.message);
    }
    
}

module.exports.getWeather = getWeather;