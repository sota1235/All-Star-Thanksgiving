/**
 * question-service.js
 *
 * Description:
 *   Service class for controlling Questions
 *
 * Author:
 *   @sota1235
 */

/**
 * 問題用サービスクラス
 * @class QuestionService
 */
module.exports.QuestionService = function(app) {
  /**
   * 質問モデル
   */
  var Questions = app.get('models').Questions();

  /**
   * 問題を作成
   * @param req {object}
   * @param res {object}
   * @return {object} Promise object
   */
  var createQuestion = function(req, res) {
    var question = req.body;
    return new Promise(function(resolve, reject) {
      Questions.addQuestion(question)
        .then(function(result) {
          resolve();
        })
        .catch(function(err) {
          res.json(err);
          resolve();
        });
    });
  };

  /**
   * 問題一覧を取得
   * @param req {object}
   * @param res {object}
   */
  var getAllQuestions = function(res) {
    Questions.findAll()
      .then(function(result) { res.json(result); })
      .catch(function(err)   { res.json(err); });
  };

  /**
   * 指定されたIDの問題を取得
   * @param req {object}
   * @param res {object}
   */
  var getQuestion = function(req, res) {
    var questionId = req.params.id;
    Questions.findQuestion(questionId)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  };

  /**
   * クイズ選択肢用の画像をアップロード
   * @param req {object}
   * @param res {object}
   */
  var updateChoiceImage = function(req, res) {
    Questions.updateQuestion(
        req.query.id,
        req.query.index,
        req.file.filename)
      .then(function(result) {;
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  };

  /**
   * 指定されたIDの問題を削除
   * @param req {object}
   * @param res {object}
   */
  var deleteQuestion = function(req, res) {
    var questionId = req.body.id;
    Questions.deleteQuestion(questionId)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  };

  return {
    create      : createQuestion,
    readAll     : getAllQuestions,
    read        : getQuestion,
    updateImage : updateChoiceImage,
    delete      : deleteQuestion
  };
}
