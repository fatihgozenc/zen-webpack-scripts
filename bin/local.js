const util = require('util');
const exec = util.promisify(require('child_process').exec);

exec("yarn build && yarn open http://localhost:3001 && http-server-pwa -p 3001 build")