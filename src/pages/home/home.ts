import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

//import {QuizLevelPage} from "../quiz-level/quiz-level";
//import {ChartPage} from '../chart/chart';
import {HOME} from '../../providers/constant';



@Component({
    selector: 'home',
    templateUrl: 'home.html'
})
export class HomePage {

    home:string;

    constructor(public navCtrl:NavController) {
        this.home = HOME;
    }

    registrarse() {
        this.navCtrl.push('SignupPage');
    }

    iniciar() {
        this.navCtrl.push('LoginPage');
    }

}

