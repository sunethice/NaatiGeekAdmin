import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../Services/firebase.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})

export class MainPanelComponent implements OnInit {
  wordDoc: {};
  items: Observable<any[]>;
  searchString$ = new Subject<string>();

  constructor(private fireService: FirebaseService, private fs: FirebaseService) { }

  ngOnInit(): void {
    this.searchString$
      .pipe(debounceTime(400))
      .subscribe(x => this.cpCheckForAvailability(x));
  }

  cpInputChanged(event){
    const mStrWord = event.target.value;
    this.searchString$.next(mStrWord);
  }

  cpCheckForAvailability(pSearchStr){
    this.items = this.fs.cpSearchCollection('Vocabulary', 'english', '==', pSearchStr).valueChanges();    
  }
}
