const cloudinary = require("cloudinary").v2;

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.cloud_key;
const api_secret = process.env.cloud_secret;

cloudinary.config({
  api_key,
  api_secret,
  cloud_name,
});

module.exports = { cloudinary };
