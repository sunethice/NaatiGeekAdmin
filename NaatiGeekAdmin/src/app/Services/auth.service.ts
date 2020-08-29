import { Injectable, assertPlatform } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { UserProfile } from './user-profile.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscription;
  constructor(private afAuth:AngularFireAuth, private router:Router, private afs: AngularFirestore) { }

  async IsLoggedIn(){
    console.log("IsLoggedIn");
     
    const isLogged = !!(await this.afAuth.currentUser);
    // (await this.afAuth.currentUser).unlink;
    return isLogged;
    // return !!this.afAuth.authState.pipe(first()).toPromise();;
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

  async createUserDocument(){
    //get the current user
    const user = await this.afAuth.currentUser;

    //create the object with new data
    const mUserProfile : UserProfile = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      type:"",
      phone:"0426394747",
      address:"",
      city:"",
      state:"",
      zip:""

    }

    //write to cloud firestore
    return this.afs.collection('users').doc(`${user.uid}`).set(mUserProfile);

  }

  async updateUserDocument(pUser: UserProfile){
    return this.afs.collection('users').doc(`${pUser.uid}`).update(pUser);
    // const user = this.afs.collection('users').doc(`${pUser.uid}`).get();

    // let { type, phone, address, city, state, zip } = user;

    // type = pUser.type;

  }

  

  logout(){
    this.afAuth.signOut();
    this.router.navigate(['']);
  }
}
