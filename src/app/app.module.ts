import {NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {IonicApp, IonicModule,IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {QuizLevelPage} from '../pages/quiz-level/quiz-level';
import {TestPage} from '../pages/test/test';
import {ChartPage} from '../pages/chart/chart';
import {ResultPage} from '../pages/result/result';
import {MyService} from '../providers/myService';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
@NgModule({
    declarations: [
        MyApp,
        HomePage,
        QuizLevelPage,
        TestPage,
        ResultPage,
        ChartPage
    ],
    imports: [
      BrowserModule,
      HttpModule,
      IonicModule.forRoot(MyApp, {
            backButtonText: ''
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        QuizLevelPage,
        TestPage,
        ResultPage,
        ChartPage
    ],
  providers: [
    StatusBar,
    SplashScreen,
    MyService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
