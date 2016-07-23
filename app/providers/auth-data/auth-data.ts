import {Injectable} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';
import {HelloIonicPage} from '../../pages/hello-ionic/hello-ionic';
import * as firebase from 'firebase';

@Injectable()
export class AuthData {
  public fireAuth: any;
  public userProfile: any;
  local: Storage;  

  constructor(public nav: NavController) {
    //creates a firebase auth reference, now you can get access to all the auth methods with this.fireAuth
    this.fireAuth = firebase.auth();
    //creating a database reference to the userProfile node on my firebase database.
    this.userProfile = firebase.database().ref('/userProfile');

  }

/**
 *  it takes an email and a password, both strings.
 * That function is returning Firebase login.
 * We are calling this.fireAuth.signInWithEmailAndPassword()  passing the email & password.
 * On successful login it’s going to set the rootPage  to be the HomePage
 * If there’s a problem it’s going to show an alert to the user with the error message
 */
loginUser(email: string, password: string): any {
  return this.fireAuth.signInWithEmailAndPassword(email, password).then((authData) => {
    this.nav.setRoot(HelloIonicPage);
  }, (error) => {
      let prompt = Alert.create({
        message: error.message,
        buttons: [{text: "Ok"}]
      });
      this.nav.present(prompt);
  });
}  

/**
 * function that takes email & password both strings.
 * We are passing those to this.fireAuth.createUserWithEmailAndPassword() 
 * which handles the user creating logic for us.
 * This one might confuse you, we are calling the signInWithEmailAndPassword()  
 * on successful user creation. This because we are creating a userProfile  
 * node on our database, and Firebase security rules default to only authenticated users 
 * have read & write access. 
 */
signupUser(email: string, password: string): any {
  return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
    this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
      //After the user is created and authenticated we need to create a userProfile  node for that user:
      this.userProfile.child(authenticatedUser.uid).set({
        email: email
      }).then(() => {
        //instead of this.nav.push(HomePage)  it’s easy, I want HomePage  to be my rootPage , 
        //that means it’s going to be the only page on the stack, no back button or anything like that.
        this.nav.setRoot(HelloIonicPage);
      });

    })
  }, (error) => {
    var errorMessage: string = error.message;
      let prompt = Alert.create({
        message: errorMessage,
        buttons: [{text: "Ok"}]
      });
      this.nav.present(prompt);
  });
}

/**
 * We are creating a resetPassword  function that takes an email as a string.
 * We are passing that email to: this.fireAuth.sendPasswordResetEmail(email)  
 * and Firebase will take care of the reset login, 
 * they send an email to your user with a password reset link, the user follows 
 * it and changes his password without you breaking a sweat.
 * After that you create an alert letting your user know that email was sent.
 * Or an alert letting them know there was a problem.
 */
resetPassword(email: string): any {
  return this.fireAuth.sendPasswordResetEmail(email).then((user) => {
    let prompt = Alert.create({
      message: "We just sent you a reset link to your email",
      buttons: [{text: "Ok"}]
    });
    this.nav.present(prompt);
 
  }, (error) => {
    var errorMessage: string;
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "You'll need to write a valid email address";
        break;
      case "auth/user-not-found":
        errorMessage = "That user does not exist";
        break;
      default:
        errorMessage = error.message;
    }
    
    let prompt = Alert.create({
      message: errorMessage,
      buttons: [{text: "Ok"}]
    });
 
    this.nav.present(prompt);
  });
}
	
/** logout function */
logoutUser(): any {
  return this.fireAuth.signOut();
}


}
