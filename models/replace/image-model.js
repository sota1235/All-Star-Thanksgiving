/**
 * image-model.js
 *
 * Description:
 *  data model for images
 *
 * Author:
 *  @sota1235
 */

var FluentModel = require('../fluent-model');

/**
 * @description 問題本文モデルクラス
 * @class Images
 * @constructor
 */
var Images = function() {
  this.connection = new FluentModel();
  this.tableName  = 'images';
};

/**
 * @description 全画像データを取得
 * @return {object} - Promise Object
 */
Images.prototype.getAll = function() {
  var sql =
    "SELECT * FROM " + this.tableName + ";";
  var connection = this.connection;
  return new Promise(function(resolve, reject) {
    connection.all(sql, [], function(err, rows) {
      if(err) reject(err);
      resolve(rows);
    });
  });
};

/**
 * @description 新規画像追加
 * @param name     {array}
 * @param fileName {string}
 * @return {object} - Promise object
 */
Images.prototype.add = function(name, fileName) {
  var sql =
    "INSERT INTO " + this.tableName + "(name, file_name) " +
    "VALUES(?, ?);";
  var connection = this.connection;
  return new Promise(function(resolve, reject) {
    connection.run(sql, [name, fileName], function(err, rows) {
      if(err) reject(err);
      resolve(this.lastID);
    });
  });
};

/**
 * @description 画像データ更新
 * @param imageId  {int}
 * @param name     {string}
 * @param fileName {string}
 * @return {object} - Promise object
 */
Images.prototype.update = function(imageId, name, fileName) {
  var setSql = [];
  var params = [];
  if(name) {
    setSql.push("name = ?");
    params.push(text);
  }
  if(fileName) {
    setSql.push("file_name = ?");
    params.push(answerIndex);
  }
  var sql =
    "UPDATE " + this.tableName + " SET " +
    setSql.join(',') +
    "WHERE image_id = ?";
  params.push(imageId);
  var connection = this.connection;
  return new Promise(function(resolve, reject) {
    connection.run(sql, params, function(err) {
      if(err) reject(err);
      resolve(this.changes);
    });
  });
};

/**
 * @description 画像削除
 * @param imageId {int}
 * @return {object} - Promise object
 */
Questions.prototype.delete = function(imageId) {
  var sql =
    "DELETE FROM " + this.tableName + " " +
    "WHERE image_id = ?";
  var connection = this.connection;
  return new Promise(function(resolve, reject) {
    connection.run(sql, [imageId], function(err) {
      if(err) reject(err);
      resolve(this.changes);
    });
  });
};

module.exports = Images;
