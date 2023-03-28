const logger = require('./logger');

const unKnownEndPoint = (request, response) => {
    response.status(404).send({error:"unknown endpoint"});
}

const requestLogger = (request, response) => {
    logger.info("Method", request.method)
    logger.info("Path", request.path)
    logger.info("Body", request.body)
    logger.info("---")
}


module.exports = {unKnownEndPoint, requestLogger};