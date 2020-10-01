const weather = require('./weather');

const query = process.argv.slice(2).join(' ');


weather.getWeather(query);
