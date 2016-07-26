import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/common';
import { NavController, Loading } from 'ionic-angular';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { TeamService } from '../../../providers/team-service/team-service';
import { Team } from '../../model/team.model';
import { Subscription } from 'rxjs/Subscription';

/*
  Add ou update Team

  @Author: gdessard
*/
@Component({
  templateUrl: 'build/pages/team/add-team/add-team.html',
  providers: [TeamService],
  pipes: [TranslatePipe]
})
export class AddTeamPage {

  public addTeamForm: any;
  public teams: Team[] = [];
  public subscriptionAdd: Subscription;
  public subscriptionDel: Subscription;

  constructor(
    private nav: NavController,     
    public teamService: TeamService, 
    public formBuilder: FormBuilder
  ){
    //TODO why validator don't work
    this.addTeamForm = formBuilder.group({
      teamName: ['', Validators.required, Validators.minLength(4), Validators.maxLength(30)]
    })   
  }

   ngOnInit() {
    this.subscriptionAdd = this.teamService.observableAdded().subscribe(team => {
      this.teams.push(team);
    });

    this.subscriptionDel = this.teamService.observableRemoved().subscribe(key => {
      this.teams.forEach((team, index) => {
        if (team.id === key) {
          this.teams.splice(index, 1);
        }
      })
    });
   }

  ngOnDestroy() {
    this.subscriptionAdd.unsubscribe();
  }
  
  /**
   * Add a team
   * @param event 
   */
  addTeam(event) {
    console.log("start addTeam");
    
    this.teamService.addTeam(this.addTeamForm.value.teamName);
  }   

  /**
   * Del a team
   * @param event
   * @param team team you wwant to delete 
   */
  delTeam(event, team: Team) {
    console.log("start delTeam");
    this.teamService.delTeam(team.id);
  }
    

}
