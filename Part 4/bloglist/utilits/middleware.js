const logger = require('./logger');

const getTokenFromReq = function (request, response, next) {
  const auth = request.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    request.token = auth.replace("Bearer ", ""); // Store token in request object
    next(); // Call next middleware or route handler
  } else {
    request.token = null; // Store null in request object
    next(); // Call next middleware or route handler
  }
};

const unKnownEndPoint = (request, response) => {
    response.status(404).send({error:"unknown endpoint"});
}

const requestLogger = (request, response, next) => {
    logger.info("Method", request.method)
    logger.info("Path", request.path)
    logger.info("Body", request.body)
    logger.info("---")

    next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  else if (error.name === 'invalid token')
  {
     return response.status(400).json({
      error: 'invalid token'
    })
  }

  next(error)
}


module.exports = {unKnownEndPoint, requestLogger, errorHandler, getTokenFromReq};