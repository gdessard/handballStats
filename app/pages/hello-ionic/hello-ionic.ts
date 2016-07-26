import {NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {AuthData} from '../../providers/auth-data/auth-data';
import {LoginPage} from '../../pages/auth/login/login';
import {TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html',
  providers: [AuthData],
  pipes: [TranslatePipe]

})
export class HelloIonicPage {
  constructor(public nav: NavController, public authData: AuthData) {
  }
	
  logOut(){
    this.authData.logoutUser().then(() => {
      this.nav.rootNav.setRoot(LoginPage);
    });
  }
}
