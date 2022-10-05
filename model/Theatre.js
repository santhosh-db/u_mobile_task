const { Model } = require('objection');

class Theatre extends Model {
  static get tableName() {
    return 'theatres';
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

  static get screennameColumn() {
    return 'screen_name';
  };

  static get seatsColumn() {
    return 'seats';
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['screen_name', 'seats'],
      properties: {
        id: { type: 'integer' },
        screen_name: { type: 'string', minLength: 1, maxLength: 255 },
        seats: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    };
  };
};

module.exports = Theatre;
