import {Component} from '@angular/core';
import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {TestPage} from '../test/test';

import {MyService} from '../../providers/myService';

@Component({
    selector: 'quizlevel',
    templateUrl: 'quizlevel.html'
})
export class QuizLevelPage {

    levels:any;
    timer:any;
    timerInterval: any;
    levelId:any;
    myloader:any;
    alert:any;

    constructor(public navCtrl:NavController, public loadingCtrl:LoadingController, public alertCtrl: AlertController, public myService:MyService) {
        this.myService.getLevels().subscribe((data) => {
            console.log("what is in the data ", data[0].difficulty);
            this.levels = data[0].difficulty;
        });
    }

    startTest(levelId) {
        this.levelId = levelId;
        this.startLoading();
        this.getLevelQuestions();
    }

    startLoading(){
        this.myloader = this.loadingCtrl.create({
            content: ''
        });
        this.myloader.present();
    }

    //Getting quiz question here to save time
    getLevelQuestions(){
        this.myService.getQuestions().subscribe((data) => {
            this.myloader.dismiss();
            this.showTestAlert(data);
        });
    }

    //Showing test details
    showTestAlert(questions){
        let alert = this.alertCtrl.create({
            title: 'Detalles',
            message: `<table class="detailsTable">` +
                      `<tr class="detailsrecord"><td class="leftCol">numero de preguntas</td><td class="rightCol">`+questions.length+`</td></tr>`+
                      `<tr class="detailsrecord"><td class="leftCol">tiempo por pregunta</td><td class="rightCol">3s</td></tr>`+
                      `<tr class="detailsrecord"><td class="leftCol">puntos por pregunta</td><td class="rightCol">20</td></tr>`+
                      `</table>`,
            buttons: [{
                text: 'Empezar',
                handler: ()=>{
                    this.startTimerLoading(questions);
                }
            }],

        });
        alert.present();
    }

    //Showing timer before starting the test
    startTimerLoading(questions) {
        this.timer = 3;
        let loading = this.loadingCtrl.create({
            spinner: 'ios',
            content: this.timer
        });
        loading.present();
        this.timerInterval = setInterval(() => {
            if (this.timer != 1) {
                this.timer--;
                //noinspection TypeScriptUnresolvedVariable
                loading.data.content = this.timer;
            }else{
                clearInterval(this.timerInterval);
                loading.dismiss();
                this.navCtrl.setRoot(TestPage,{"LevelId" : this.levelId, "Questions" : questions});
            }
        }, 1000);
    }

}
