import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscription;
  constructor(private afAuth:AngularFireAuth, private router:Router) { }

  IsLoggedIn(){
    console.log("IsLoggedIn");
    return !!this.afAuth.authState.pipe(first()).toPromise();;
    // return this.afAuth.authState.pipe(first()).toPromise();
    // const subscription = this.afAuth.authState.subscribe(res => {
    //   let isLoggedIn = false;
      // if (res && res.uid) {
      //   console.log("a");
      //   isLoggedIn = true;
      // } 
      // else{
      //   console.log("b");
      //   subscription.unsubscribe();
      //   isLoggedIn = false;
      // }
      
      // return isLoggedIn;
    // });

    // setTimeout(() => {
    //   console.log("c");
    //   subscription.unsubscribe();
    // }, 10000);

    // const promise = new Promise((resolve, reject) => {
    //   console.log('ee');
    //   const resp = this.afAuth.authState;

      
    // });
    
  }

  onIsLoggedInResolve(res){
    let isLoggedIn = false;
    if (res && res.uid) {
      console.log("a");
      isLoggedIn = true;
    } 
    else{
      console.log("b");
      isLoggedIn = false;
    }
    
    return isLoggedIn;
  }

  onIsLoggedInReject(res){
    console.log(`reject response : ${res}`);
  }

  logout(){
    this.afAuth.signOut();
    this.router.navigate(['']);
  }
}
