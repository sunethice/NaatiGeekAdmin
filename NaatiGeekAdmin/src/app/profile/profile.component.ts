import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../Services/auth.service';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { UserProfile } from '../Services/user-profile.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { User } from 'firebase';
import { JsonPipe } from '@angular/common';
import { async } from 'rxjs/internal/scheduler/async';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<UserProfile>;
  item: Observable<UserProfile>;
  uid:string;
  form: FormGroup;
  downloadUrl: Observable<string>;
  uploadProgress: Observable<number>;
  error: string;

  constructor(public afAuth:AngularFireAuth, 
              public auth: AuthService, 
              private afs: AngularFirestore, 
              private route: ActivatedRoute,
              private afStorage: AngularFireStorage) {
    this.uid = this.route.snapshot.paramMap.get('id');
    this.downloadUrl = this.afStorage.ref(`/users/${this.uid}/profile-image`).getDownloadURL();
  }

  ngOnInit(): void {
    this.cpGetCurrentUserData();
  }

  async cpGetCurrentUserData(){
    /* const curUser = await this.afAuth.currentUser; 
       this.itemDoc = await this.afs.doc(`users/${curUser.uid}`);  this also can be used instead of following*/
    this.itemDoc = await this.afs.doc(`users/${this.uid}`);
    this.item = this.itemDoc.valueChanges(); //this allows us to watch any changes in the user document

    // this.form = new FormGroup({
    //   name : new FormControl(),
    //   email : new FormControl({value: "" , disabled: true}),
    //   type: new FormControl(""),
    //   address : new FormControl(""),
    //   city : new FormControl(""),
    //   state : new FormControl(""),  
    //   zip : new FormControl(""),
    //   phone: new FormControl("") 
    // });
  }

  async onSubmit(ngForm: NgForm){
    // this.loading = true;
    const { name, email, type, address, city, state, zip, phone} = ngForm.form.getRawValue();
    const userProfile: UserProfile = {
      uid: this.uid, name, email, type, address, city, state, zip, phone
    }
    try{
      await this.auth.updateUserDocument(userProfile);
    }
    catch(error){
      console.log(error.message);
    }
    // this.loading = false
  }

  fileInputChange(event){
    this.downloadUrl = null;
    this.error = null;

    //get the file
    const file = event.target.files[0];

    //create the file reference
    const filePath = `users/${this.uid}/profile-image`;
    const fileRef = this.afStorage.ref(filePath);

    //upload and store the task
    const task =  this.afStorage.upload(filePath,file);
    task.catch(error => this.error = error.message);

    //Observer percentage changes
    this.uploadProgress = task.percentageChanges();

    //get notified when the download url is available
    task.snapshotChanges()
        .pipe(
          finalize(()=>{
            this.downloadUrl = fileRef.getDownloadURL();
          })
        )
        .subscribe();
  }
}
