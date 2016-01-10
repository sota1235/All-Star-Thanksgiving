/**
 * Create table for questions
 */
var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('questions', {
    question_id : {
      type          : 'int',
      primaryKey    : true,
      notNull       : true,
      autoIncrement : true,
      unique        : true
    },
    text : {
      type    : 'string',
      notNull : true
    },
    answer_index : {
      type    : 'int',
      notNull : true
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('questions', callback);
};
