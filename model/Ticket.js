const { Model } = require('objection');
const User = require('./User');

class Ticket extends Model {
  static get tableName() {
    return 'tickets';
  };
  static get idColumn() {
    return 'id';
  }
  $beforeInsert() {
    this.createdAt = new Date();
  };

  $beforeUpdate() {
    this.updatedAt = new Date();
  };

  static get movienameColumn() {
    return 'moviename';
  };

  static get noOfTicketColumn() {
    return 'noOfTicket';
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['moviename', 'noOfTicket'],
      properties: {
        id: { type: 'integer' },
        moviename: { type: 'string', minLength: 1, maxLength: 255 },
        noOfTicket: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    };
  };

  static relationMappings = {
    ticket: {
      relation: Model.HasManyRelation,
      modelClass: User,
      join: {
        from: 'users.id',
        to: 'tickets.user_id'
      }
    }
  };

};

module.exports = Ticket;
