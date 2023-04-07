const info = (...info) => {
    if (process.env.NODE_ENV !== 'testing') { 
    console.log(...info)
  }
}
const error = (...info) => {
    if (process.env.NODE_ENV !== 'test') { 
    console.log(...info)
  }
}

module.exports = {info,error};