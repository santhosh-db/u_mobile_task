const { Model } = require('objection');

class Movie extends Model {
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

  static get titleColumn() {
    return 'title';
  };

  static get languageColumn() {
    return 'language';
  };

  static get typeColumn(){
    return 'type';
  }

  static get durationColumn(){
    return 'duration';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'language','type','duration'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        language: {type:'string'},
        type:{type:'string'},
        duration: { type: 'integer' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    };
  };
};

module.exports = Movie;
