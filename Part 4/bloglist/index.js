const app = require("./app");
const config = require('./utilits/config')
const logger = require('./utilits/logger')


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
