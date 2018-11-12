import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { HomePage } from '../home/home';
import { QuizLevelPage } from '../quiz-level/quiz-level';
import { ChartPage } from '../chart/chart';

@Component({
  selector: 'result',
  templateUrl: 'result.html'
})

export class ResultPage {

  score:any;
  noOfCorrectAnswer: any;
  noOfWrongAnswer: any;
  totalNoOfQuestions: any;
  answers: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: Nav) {
    this.score = navParams.get('score');
    this.totalNoOfQuestions = navParams.get('total-questions');
  }

  ionViewDidLoad(){
    this.noOfCorrectAnswer = this.score/20; //My standard score increment value is 20. Calculated correct answer based on it. you can get your data here.
    this.noOfWrongAnswer = this.totalNoOfQuestions - this.noOfCorrectAnswer;
  }

  viewOverallResult(){
    this.navCtrl.push(ChartPage);
  }

  ContinueToNextTest(){
    this.nav.remove(0,1);
    this.nav.insertPages(0, [{page: HomePage}, {page: QuizLevelPage}]).then(() => {
      this.nav.pop();
    });
  }

}
