import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public afAuth:AngularFireAuth, public auth: AuthService) { }

  ngOnInit(): void {
  }

  async cpIsLogged(): Promise<boolean> {
    console.log("cpIsLogged");
    // const user = await this.auth.IsLoggedIn();
    // return !!user;
    return true;
  }

  logout(){
    this.auth.logout();
  }
}
