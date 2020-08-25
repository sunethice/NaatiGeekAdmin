import { Component, OnInit } from '@angular/core';
import { faUser,faKey,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormGroup,FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;
  faEnv = faEnvelope;
  form: FormGroup;
  loading = false;
  
  constructor(private afAuth: AngularFireAuth, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstname : new FormControl(""),
      lastname : new FormControl(""),
      email : new FormControl(""),
      password: new FormControl("") 
    });
  }

  async onSubmit(pFormValues){
    this.loading = true;
    const { firstname, lastname, email, password} = pFormValues;
    try{
      const mResp = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await mResp.user.updateProfile({displayName: `${firstname} ${lastname}`});
      this.auth.createUserDocument();
      this.form.reset();
      const mUserId = mResp.user.uid;
      this.router.navigate([`/profile/${mUserId}`])
    }
    catch(error){
      console.log(error.message);
    }
    this.loading = false;
  }

}
