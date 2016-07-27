import { Component, ViewChild, provide } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { ionicBootstrap, Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HelloIonicPage } from './pages/hello-ionic/hello-ionic';
import { ListPage } from './pages/list/list';
import { LoginPage } from './pages/auth/login/login';
import { AddTeamPage } from './pages/team/add-team/add-team';
import * as firebase from 'firebase';
import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';


@Component({
  templateUrl: 'build/app.html',
  providers: [TranslateService],
  pipes: [TranslatePipe]
})
class MyApp {
  rootPage: any;
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController, 
    private translate: TranslateService
  ) {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAzFI5_pxrWc6sZWomz7bC5CcHxltt9gRg",
    authDomain: "handballstats-8b496.firebaseapp.com",
    databaseURL: "https://handballstats-8b496.firebaseio.com",
    storageBucket: "handballstats-8b496.appspot.com",
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // If there's a user take him to the home page.
      this.rootPage = HelloIonicPage;
    } else {
      // If there's no user logged in send him to the LoginPage
      this.rootPage = LoginPage;
    }
  });

    this.initializeApp();

    this.translateConfig();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'Ajout d\'une équipe', component: AddTeamPage },

//      { title: this.translate.get("team.add.title", null).subscribe
//        (localizedValue => console.log(localizedValue)), component: AddTeamPage }
    ];
  }  

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  translateConfig() {
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(fr|en)/gi.test(userLang) ? userLang : 'fr';
 
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('fr');
 
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(userLang);
  }  
}

ionicBootstrap(MyApp, [[provide(TranslateLoader, {
  useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
  deps: [Http]
}),
  TranslateService]], {
});
