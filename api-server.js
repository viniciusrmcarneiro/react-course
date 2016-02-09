const config =  require('./config/dev');
const ApiServer = require('./api');
const api = ApiServer(config.api);
