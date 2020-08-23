import { Injectable } from '@angular/core';
// import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  // constructor(private firestore: AngularFirestore) { }

  cpAddNewWord(pData:Object) :void { }

  getVocabList() { 
    // console.log(this.firestore.collection("Vocabulary"));

    // this.firestore.collection("users").get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //       console.log(`${doc.id} => ${doc.data()}`);
    //   });
    // });
  }
}
