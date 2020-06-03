const NodeGeocoder = require('node-geocoder');

console.log('process.env.GEOCODER_PROVIDER', process.env.GEOCODER_PROVIDER);
console.log('process.env.GEOCODER_API_KEY', process.env.GEOCODER_API_KEY);
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
