import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private afs: AngularFirestore) { }

  cpAddToCollection(pData:Object) :void { }

  cpSearchCollection(pStrCollection, 
                     pStrKey, 
                     pStrOp:firebase.firestore.WhereFilterOp = '==', 
                     pStrValue = "") { 
    return this.afs.collection(pStrCollection, ref => ref.where(pStrKey, pStrOp, pStrValue));
  }
}
