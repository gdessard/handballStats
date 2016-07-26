import { Component } from '@angular/core';
import { NavController, Loading } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/common';
import { AuthData } from '../../../providers/auth-data/auth-data';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { TranslatePipe } from 'ng2-translate/ng2-translate';


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/auth/login/login.html',
  providers: [AuthData],
  pipes: [TranslatePipe]
})
export class LoginPage {
  public loginForm: any;

  constructor(
      private nav: NavController, 
      public authData: AuthData, 
      public formBuilder: FormBuilder
    ) {
    this.nav = nav;
    this.authData = authData;
 
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  loginUser(event){
    event.preventDefault();
    this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password);
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }  

  goToSignup(){
    this.nav.push(SignupPage);
  }
  
  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }


  
}
