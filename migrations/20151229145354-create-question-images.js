/**
 * Create table for images of question's choice
 */
var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('question_images', {
    question_image_id : {
      type          : 'int',
      primaryKey    : true,
      notNull       : true,
      autoIncrement : true,
      unique        : true
    },
    question_choice_id : {
      type    : 'int',
      notNull : true,
    },
    file_name : {
      type    : 'string',
      notNull : true
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('question_images', callback);
};
