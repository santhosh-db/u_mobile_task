const { Model } = require('objection');
const Theatre = require('./Theatre');
const Movie = require('./Movie');

class Schedule extends Model {
  static get tableName() {
    return 'schedule';
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
      required: ['screen_name', 'title'],
      properties: {
        id: { type: 'integer' },
        start_time: { type: 'string' },
        end_time: {type: 'string'},
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      }
    };
  };

  static get relationMappings() {
    return {      
      movie: {
        relation: Model.HasManyRelation,
        modelClass: Movie,
        join: {
          from: 'movies.id',
          to: 'schedule.movie_id'
        }
      },
      theatre: {
          relation: Model.HasManyRelation,
          modelClass: Theatre,
          join: {
            from: 'theatres.id',
            to: 'schedule.screen_id'
          }
        }
    }
  };
};

module.exports = Schedule;
