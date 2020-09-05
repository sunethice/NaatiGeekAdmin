import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WordDoc } from '../Services/word-doc.model';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private afs: AngularFirestore) { }

  cpAddToCollection(pStrCollection, pData) :void { 
    const shirtsCollection = this.afs.collection<WordDoc>(pStrCollection);
    shirtsCollection.add(pData);
  }

  cpSearchCollection(pStrCollection, 
                     pStrKey, 
                     pStrOp:firebase.firestore.WhereFilterOp = '==', 
                     pStrValue = "") { 
    return this.afs.collection(pStrCollection, ref => ref.where(pStrKey, pStrOp, pStrValue));
  }
}
