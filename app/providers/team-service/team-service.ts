import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';  
import { Team } from '../../model/team.model';

/*
  Generated class for the TeamService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TeamService {
  public fireAuth: any;
  public db: any;  

  constructor(private http: Http) {
    //creates a firebase auth reference, now you can get access to all the auth methods with this.fireAuth
    this.fireAuth = firebase.auth();
    //creating a database reference to the root node on my firebase database.
    this.db = firebase.database().ref('/teams');   
  }

  /** 
   * Save a team
   * 
   * @param name team's name
   * @return key of new team
   */
  addTeam(name: string) : string {
    //TODO test for unique name
    var newTeamKey = this.db.push({
      name: name
    })
    return newTeamKey;
  }

  /** 
   * Delete a team
   * 
   * @param key id of team create by push function
   */
  delTeam(key: string) {
    return this.db.child(key).remove()
      .catch(error => {
        console.log("remove failed: " + error.message);
      });
  }  


/**
 * @Return Subscription for child_added
 */
  observableAdded(): Observable<Team> {
    return Observable.create(observer => {
      let listener = this.db.on('child_added', snapshot => {
        let data = snapshot.val();
        observer.next(new Team(
          snapshot.key,
          data.name
        ));
      }, observer.error);

      return () => {
        this.db.off('child_added', listener);
      };
    });
  }

/**
 * 
 * @Return Subscription for child_removed
 */
  observableRemoved(): Observable<string> {
    return Observable.create(observer => {
      let listener = this.db.on('child_removed', snapshot => {
        observer.next(
          snapshot.key
        );
      }, observer.error);

      return () => {
        this.db.off('child_removed', listener);
      };
    });
  }  



}

