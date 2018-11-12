import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides} from 'ionic-angular';

import {HomePage} from '../home/home';
import {QuizLevelPage} from '../quiz-level/quiz-level';
import {ResultPage} from '../result/result';

import {MyService} from '../../providers/myService';

@Component({
  selector: 'test',
  templateUrl: 'test.html'
})
export class TestPage {

  @ViewChild('mySlider') slider: Slides;
  levelId: any;
  questions: any;
  mySlideOptions: any;
  totalDuration: any;
  score: number;
  scoreIncrementValue: number = 20;    //Score value to be incremented.
  score_final: number;
  displayIncrement: boolean = false;
  count: number = 0;
  questionIndicator: Array<any>;
  interval: any;
  isDisabled: boolean = false;

  constructor(public navCtrl: NavController, navParams: NavParams, public myService: MyService) {
    this.levelId = navParams.get("LevelId");
    this.questions = navParams.get("Questions");
    this.createQuestionIndicatorArray(this.questions.length);
  }

  //Initialize the slides on view.
  ngAfterViewInit() {
    //noinspection TypeScriptUnresolvedVariable
    this.slider.onlyExternal = true;
  }

  //Initialize the score, timer and pointing first question
  ionViewDidEnter() {
    this.score = 0;
    this.score_final = 0;
    this.questionIndicator[this.count].id = 0; //Current Question
    this.calculateProgress();
  }

  //Setting the timer for each question
  calculateProgress() {
    this.totalDuration = 50;    //Set the standarad time value for each question or use your timer variable to set dynamically
    let elapse = this.totalDuration;
    this.interval = setInterval(() => {
      let timePercent = (elapse / this.totalDuration) * 100;
      if (timePercent > 100) {
        timePercent = 100;
      }
      document.getElementById("progress-bar").style.width = timePercent + "%";
      elapse--;
      if (timePercent < 1) {
        this.onOptionSelected("0_0", "0_1"); //Send some value as dummy wrong answer
      }
      if (timePercent < 30) {
        document.getElementById("progress-bar").style.background = 'red';
        document.getElementById("progress").style.borderColor = "red";
      } else if (timePercent < 60) {
        document.getElementById("progress-bar").style.background = 'orange';
        document.getElementById("progress").style.borderColor = "orange";
      }
    }, 300);
  }

  createQuestionIndicatorArray(length) {
    this.questionIndicator = new Array();
    for (let i = 0; i < length; i++) {
      this.questionIndicator.push({"id": -1});
    }
    console.log("questionIndicator", this.questionIndicator);
  }


  onOptionSelected(optionChoose, optionCorrect) {
    clearInterval(this.interval);
    this.isDisabled = true;
    if (optionChoose === optionCorrect) {   //If option choose is correct. Append your code with this on correct answer choose
      console.log("Correct");
      this.displayIncrement = true;
      this.questionIndicator[this.count].id = 1;
      this.count++;
      setTimeout(() => {
        this.displayIncrement = false;
        let i = 1;
        let increment = setInterval(() => {
          if (i === (this.scoreIncrementValue + 1)) {
            clearInterval(increment);
          } else {
            this.score += 1;
            i++;
          }
        }, 45);
        this.slideToNextQuestion(); //Move to next question
      }, 1000);
      this.score_final += 20;
    } else {                                //If option choose is wrong. Append your code with this on wrong answer choose
      this.questionIndicator[this.count].id = 2;
      this.count++;
      this.slideToNextQuestion();  //Move to next question
    }
  }

  //Moves to next question
  slideToNextQuestion() {
    if ((this.slider.getActiveIndex() + 1) != this.slider.length()) {
      setTimeout(() => {
        this.questionIndicator[this.count].id = 0; //Set next question as current question
        this.slider.slideNext();
        this.isDisabled = false;
        document.getElementById("progress-bar").style.width = "100%";
        document.getElementById("progress-bar").style.background = 'limegreen';
        document.getElementById("progress").style.borderColor = "limegreen";
        this.calculateProgress();
      }, 1000);
    } else {
      setTimeout(() => {
        console.log(this.score);
        this.navCtrl.push(ResultPage, {"score": this.score_final, "total-questions": this.questionIndicator.length});
      }, 1000);
    }
  }

  //Terminating the test
  closeTest() {
    clearInterval(this.interval);
    this.navCtrl.insertPages(0, [{page: HomePage}, {page: QuizLevelPage}]);
    this.navCtrl.pop();
  }

}
