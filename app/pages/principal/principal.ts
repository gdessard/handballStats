import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Nav } from 'ionic-angular';
//Pages of menu
import { AccueilPage } from '../accueil/accueil';
import { AddTeamPage } from '../team/add-team/add-team';

/*
  Generated class for the PrincipalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/principal/principal.html',
})
export class PrincipalPage {
  rootPage: any;
  @ViewChild(Nav) nav: Nav;
  // Pages au menu
  pages: Array<{title: string, component: any}>;  

  constructor(
    private menu: MenuController) {
    // AccueilPage is root page after login
    this.rootPage = AccueilPage;

    // set our app's pages
    this.pages = [
      { title: 'Accueil', component: AccueilPage },
      { title: 'Ajout d\'une équipe', component: AddTeamPage },

//      { title: this.translate.get("team.add.title", null).subscribe
//        (localizedValue => console.log(localizedValue)), component: AddTeamPage }
    ];      

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    if (page.component == AccueilPage) {
      //Principal page, it's root page
      this.nav.setRoot(page.component);
    } else {
      // navigate to the new page if it is not the current page
      this.nav.push(page.component);
    }
  }  

}
