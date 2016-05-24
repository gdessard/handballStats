import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {Home} from './pages/home/home';


@App({
  templateUrl: 'build/app.html'
})
class MyApp {
  constructor() {
	  //Fist page load of application
	  this.rootPage = Home;
  }
}
