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

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';



export const firebaseConfig = {
    apiKey: "AIzaSyBmnmeHZkhLkXDcqYnwErR1lsPnc4fbr_w",
    authDomain: "proyectofedesoft-c5d88.firebaseapp.com",
    databaseURL: "https://proyectofedesoft-c5d88.firebaseio.com",
    projectId: "proyectofedesoft-c5d88",
    storageBucket: "proyectofedesoft-c5d88.appspot.com",
    messagingSenderId: "114101151256"
  };
  


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
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {
}
