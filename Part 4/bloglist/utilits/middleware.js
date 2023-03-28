const logger = require('./logger');

const unKnownEndPoint = (request, response) => {
    response.status(404).send({error:"unknown endpoint"});
}


module.exports = unKnownEndPoint;