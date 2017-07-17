const validUrl = require('validator')

const parseUrl = (urlParams) => {
  return urlParams.url + urlParams[0]
}

const isUrlValid = (url) => {
  console.log(validUrl.isURL(url))
  
  if (!validUrl.isURL(url)) return false
  else return true
}

module.exports = {
  parseUrl,
  isUrlValid
}