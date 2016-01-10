/**
 * question-model.js
 *
 * Description:
 *  data model for questions
 *
 * Author:
 *  @sota1235
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports.Questions = function() {
  var ChoiceSchema = new Schema({
    index: Number,
    text: String,
    imgPath: String
  });

  var QuestionsSchema = new Schema({
    text: String,
    choice: [ ChoiceSchema ],
    answer: Number,
  });

  QuestionsSchema.pre('save', function(next) {
    this.date = new Date();
    next();
  });

  mongoose.model('Questions', QuestionsSchema);
  mongoose.connect('mongodb://localhost/questions');

  var Questions;

  /* db initialize */
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("Connected to 'comments' database");
    Questions = mongoose.model('Questions');
  });

  /* Functions */
  // return all question data
  var findAll = function() {
    return new Promise(function(resolve, reject) {
      console.log('Getting questions list');

      Questions.find({}, function(err, results) {
        if (err) {
          reject({'error': 'An error has occurred'});
        }
        console.log('Success: Getting questions');
        resolve(results);
      });
    });
  };

  // get question by _id
  var findQuestion = function(id) {
    return new Promise(function(resolve, reject) {
      console.log('Getting question that id is ' + id);
      Questions.find({ _id: id }, function(err, result) {
        if (err) {
          reject({'error': 'An error has occurred'});
        }
        console.log('Success: Getting question');
        resolve(result);
      });
    });
  };

  // add question data from request body
  var addQuestion = function(question) {
    return new Promise(function(resolve, reject) {
      console.log('Adding question: ' + JSON.stringify(question));

      var addQuestion = new Questions(question);
      addQuestion.save(function(err, result) {
        if (err) {
          reject({'error': err});
        }
        console.log('Success: ' + JSON.stringify(result));
        resolve(result);
      });
    });
  };

  // update question data from request body
  var updateQuestion = function(id, index, fileName) {
    return new Promise(function(resolve, reject) {
      console.log('Adding question img id: ' + id);

      Questions.findOneAndUpdate(
        { _id: id, "choice.index": index },
        {
          $set: {
            "choice.$.imgPath": fileName
          }
        },
        function(err, doc) {
          if(err) {
            reject(err);
          }
          resolve('success');
        }
      );
    });
  };

  // delete question data by id
  var deleteQuestion = function(id) {
    return new Promise(function(resolve, reject) {
      console.log('Delete qustion id: ' + id);

      Questions.remove({_id: id}, function(err, result) {
        if(err) {
          console.log('Delete question error: ' + JSON.stringify(err));
          reject(err);
        }
        console.log('Success: ' + JSON.stringify(result));
        resolve(result);
      });
    });
  };

  return {
    findAll: findAll,
    findQuestion: findQuestion,
    addQuestion: addQuestion,
    deleteQuestion: deleteQuestion,
    updateQuestion: updateQuestion
  };
};
