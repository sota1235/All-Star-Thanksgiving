/**
 * fluent-model.js
 *
 * Description:
 *   Base file for accessing to Database
 *
 * Author:
 *   @sota1235
 */

var sqlite3  = require('sqlite3').verbose();
var dbConfig = require('../config/database.json');

/**
 * DBアクセス用クラス
 * @class FluentModel
 */
var FluentModel = function(mode) {
  var mode         = mode || sqlite3.OPEN_READWRITE;
  var targetConfig = dbConfig[process.env.NODE_ENV || 'development'];
  this.db          = new sqlite3.Database(targetConfig.filename, mode);
};

/**
 * SQLを実行する
 * @param sql      {string}
 * @param param    {array}
 * @param callback {function}
 * @return {object}
 */
FluentModel.prototype.run = function(sql, params, callback) {
  return this.db.run(sql, params, callback);
};

/**
 * SQLを実行し、結果を返す
 * @param sql      {string}
 * @param param    {array}
 * @param callback {function}
 * @return {object}
 */
FluentModel.prototype.all = function(sql, params, callback) {
  this.db.all(sql, params, callback);
};

module.exports = FluentModel;
