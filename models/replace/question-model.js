/**
 * question-model.js
 *
 * Description:
 *  data model for questions
 *
 * Author:
 *  @sota1235
 */

var FluentModel = require('../fluent-model');

/**
 * 問題本文モデルクラス
 * @class Questions
 */
var Questions = function() {
  this.connection = new FluentModel();
  this.tableName  = 'questions';
};

/**
 * 全問題データを取得
 * @return {object} Promise Object
 */
Questions.prototype.getAll = function() {
  var sql =
    "SELECT * FROM " + this.tableName + " AS q " +
    "LEFT OUTER JOIN question_choices AS qc " +
    "ON q.question_id = qc.question_id;";
  var connection = this.connection;
  return new Promise(function(resolve, reject) {
    connection.all(sql, [], function(err, rows) {
      if(err) reject(err);
      resolve(rows);
    });
  });
};

/**
 * question_idからデータを取得
 * @param questionId {int}
 * @return {object} Promise Object
 */
Questions.prototype.get = function(id) {
  var sql =
    "SELECT * FROM " + this.tableName +
    " WHERE question_id = ?";
  var connection = this.connection;
  return new Promise(function(resolve, reject) {
    connection.all(sql, [id], function(err, rows) {
      if(err) reject(err);
      resolve(rows);
    });
  });
};

/**
 * 新規問題作成
 * @param data {array}
 * @return {object} Promise object
 */
Questions.prototype.add = function(data) {
  var sql =
    "INSERT INTO " + this.tableName + "(text, answer_index)" +
    "VALUES(?, ?);";
  var connection = this.connection;
  return new Promise(function(resolve, reject) {
    connection.run(sql, [data.text, data.answerIndex], function(err, rows) {
      if(err) reject(err);
      resolve(this.lastID);
    });
  });
};

/**
 * 問題データ更新
 * @param id          {int}
 * @param text        {string}
 * @param answerIndex {int}
 * @return {object} Promise object
 */
Questions.prototype.update = function(id, text, answerIndex) {
  var setSql = [];
  var params        = [];
  if(text) {
    setSql.push("text = ?");
    params.push(text);
  }
  if(answerIndex) {
    setSql.push("answer_index = ?");
    params.push(answerIndex);
  }
  var sql =
    "UPDATE " + this.tableName + " SET " +
    setSql.join(',') +
    "WHERE question_id = ?";
  params.push(id);
  var connection = this.connection;
  return new Promise(function(resolve, reject) {
    connection.run(sql, params, function(err) {
      if(err) reject(err);
      resolve(this.changes);
    });
  });
};

/**
 * 問題削除
 * @param questionId {int}
 */
Questions.prototype.delete = function(questionId) {
  var sql =
    "DELETE FROM " + this.tableName + " " +
    "WHERE question_id = ?";
  var connection = this.connection;
  return new Promise(function(resolve, reject) {
    connection.run(sql, [questionId], function(err) {
      if(err) reject(err);
      resolve(this.changes);
    });
  });
};

module.exports = Questions;
