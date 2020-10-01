const { error } = require('console');
const https = require('https');
const APIkey = "8357f913c739753137b1642cd1136998";
const querystring = require('querystring');

function printTemperature(weatherInfo) {
    console.log(`The current temperature in ${weatherInfo.name} is ${weatherInfo.main.temp}`);
}

function getWeather(query) {    

    const parameters = {
        units: "metric",
        q: query,
        appid: APIkey
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`;

    const request = https.get(url, response => {
        let body = "";
        response.on('data', data => {
            body += data.toString();
        })
        response.on('end', () => {
            const weatherInfo = JSON.parse(body);
            console.log(response.statusCode)
            printTemperature(weatherInfo);
        })

        request.on('error', error => {
            console.error(`Problem with request: ${error.message}`)
        })

    });
}
module.exports.getWeather = getWeather;