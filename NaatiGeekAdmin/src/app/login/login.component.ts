import { Component, OnInit } from '@angular/core';
import { faUser,faKey } from '@fortawesome/free-solid-svg-icons';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;
  remember_me:boolean = false;

  constructor(private afAuth:AngularFireAuth, private router:Router) { }

  ngOnInit(): void {
    console.log("login");
  }

  async onSubmit(loginValues){
    try{
      const resp = await this.afAuth.signInWithEmailAndPassword(loginValues.username, loginValues.password);
      const userID = resp.user.uid;
      this.router.navigate([`/profile/${userID}`]);
    }catch(error){
      console.log(error.message);  
    }
  }

}
