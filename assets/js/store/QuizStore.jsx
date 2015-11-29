/**
 * QuizStore.jsx
 *
 * Description:
 *   Store class for quiz page
 *
 * Author:
 *   @sota1235
 */

import _ from 'lodash';
import { EventEmitter2 } from 'eventemitter2';
import { getQuestion } from '../lib/ajax.jsx';

export default class QuizStore extends EventEmitter2 {
  constructor(emitter) {
    super();
    this.emitter = emitter;
    this.defaultQuiz = {
      title: '',
      choices: [
        {num: 'A1', text: '', count: 0},
        {num: 'A2', text: '', count: 0},
        {num: 'A3', text: '', count: 0},
        {num: 'A4', text: '', count: 0}
      ]
    };
    this.quiz    = _.clone(this.defaultQuiz, true);
    this.mapQuiz = this.mapQuiz.bind(this);
    // events
    emitter.on('displayQuiz',    this.onDisplayQuestion.bind(this));
    emitter.on('voteQuiz',       this.countUp.bind(this));
    emitter.on('openAnswer',     this.onAnswerOpen.bind(this));
    emitter.on('finishQuestion', this.onFinishQuestion.bind(this));
  }
  // getter for components
  getQuiz() {
    return this.quiz;
  }
  // display question
  onDisplayQuestion(id) {
    getQuestion(id)
      .then( result => {
        console.log(`get question id: ${id}`);
        return result;
      })
      .then(this.mapQuiz);
  }
  // answer aalignment
  onAnswerOpen(index) {
    this.quiz.choices[Number(index)].style = {
      backgroundColor: 'yellow' // TODO: 正解演出CSS
    }
    this.updateQuiz();
  }
  // count up vote number
  countUp(index) {
    if(index < 1 || index > 4) return;
    this.quiz.choices[index-1].count++;
    this.updateQuiz();
  }
  // finish quiz
  onFinishQuestion() {
    this.quiz = _.clone(this.defaultQuiz, true);
    this.updateQuiz();
  }
  // mapping data to quiz
  mapQuiz(data) {
    console.log(data);
    this.quiz.title   = data[0].text;
    this.quiz.choices = this.quiz.choices.map((q, i) => {
      q.text  = data[0].choice[i];
      q.style = {};
      return q;
    });
    this.updateQuiz();
  }
  // TODO: private
  updateQuiz() {
    this.emit('quizChanged');
  }
}
