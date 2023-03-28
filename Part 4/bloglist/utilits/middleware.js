const logger = require('./logger');

const unKnownEndPoint = (request, response) => {
    response.status(404).message({error:"unknown endpoint"});
}


module.exports = unKnownEndPoint;