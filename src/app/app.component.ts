import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  //rootPage = HomePage;
  rootPage: any = 'LoginPage'; // Luis cambia root page

  constructor(
    platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private auth: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // code luis eduardo
      /**
       * Ahora vamos a comprobar la sesión en el evento platform.ready 
       * de app.components.ts que se ejecuta cuando la app está cardada
       *  y lista y si estamos autenticados haremos que la página activa
       *  sea misTabsPage, pero si la sesión  no está activa la página 
       * que se muestre se la de login.
       */
      this.auth.Session.subscribe(session => {
        if (session) {
          this.rootPage = HomePage;  // Sin comillas
        }
        else {
          this.rootPage = 'LoginPage';
        }
      });
      // code luis eduardo

      this.statusBar.overlaysWebView(false);
      //Modify the value with the primary color to display the status bar with your primary color
      this.statusBar.backgroundColorByHexString("#ac6bff");
      this.splashScreen.hide();
    });
  }
}
