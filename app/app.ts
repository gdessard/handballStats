import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {LoginPage} from './pages/login/login';
import * as firebase from 'firebase';


@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  rootPage: any;
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController
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

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
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
}

ionicBootstrap(MyApp);
