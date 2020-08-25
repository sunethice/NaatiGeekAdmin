import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'NaatiGeekAdmin';

  constructor(public auth: AuthService){}

  ngOnInit(){ }

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
