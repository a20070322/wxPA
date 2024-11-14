const axios = require("axios");

const request = axios.create({
  timeout: 150000,
});
exports.request = request;
