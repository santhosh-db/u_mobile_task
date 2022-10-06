const db = require('../config/db');

module.exports={
    user:  require('./User'),
    theatre:require('./Theatre'),
    ticket: require('./Ticket'),
    schedule: require('./schedule')
}