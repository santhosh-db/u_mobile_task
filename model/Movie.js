const { Model } = require('objection');

class Theatre extends Model {
  static get tableName() {
    return 'movies';
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
    return 'movie_name';
  };

  static get seatsColumn() {
    return 'seats';
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['movie_name', 'duration'],
      properties: {
        id: { type: 'integer' },
        movie_name: { type: 'string', minLength: 1, maxLength: 255 },
        duration: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    };
  };
};

module.exports = Theatre;
