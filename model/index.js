const db = require('../config/db');

module.exports={
    user:  require('./User'),
    theatre:require('./Theatre'),
    ticket: require('./Ticket'),
    //order: require('./order')
}