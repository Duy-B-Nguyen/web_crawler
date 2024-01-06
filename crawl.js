const url = require('url')

const normalizeURL = urlString => {
  const urlObj = new URL(urlString)
  let fullPath = urlObj.host + urlObj.pathname;
  if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}

console.log(normalizeURL("https://www.google.com/path"));
module.exports = {
  normalizeURL
}