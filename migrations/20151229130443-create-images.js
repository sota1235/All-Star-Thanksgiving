/**
 * Create table for images
 */
var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('images', {
    image_id : {
      type          : 'int',
      primaryKey    : true,
      notNull       : true,
      autoIncrement : true,
      unique        : true
    },
    name : {
      type    : 'string',
      notNull : true
    },
    file_name : {
      type    : 'string',
      notNull : true,
      unique  : true
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('images', callback);
};
