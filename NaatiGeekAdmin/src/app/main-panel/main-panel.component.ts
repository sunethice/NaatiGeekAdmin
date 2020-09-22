import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../Services/firebase.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})

export class MainPanelComponent implements OnInit {
  items: Observable<any[]>;
  searchString$ = new Subject<string>();
  currentDT = new Date();
  currentDTStr: string;
  
  addWords: FormGroup;
  mainCategories = {
    catList:[
      {name:'education', selected: false, id: 'CAT01'},
      {name:'health', selected: false, id: 'CAT02'},
      {name:'business', selected: false, id: 'CAT03'},
      {name:'employment', selected: false, id: 'CAT04'},
      {name:'Financial', selected: false, id: 'CAT05'},
      {name:'housing', selected: false, id: 'CAT06'},
      {name:'immigration', selected: false, id: 'CAT07'},
      {name:'legal', selected: false, id: 'CAT08'},
      {name:'social welfare', selected: false, id: 'CAT09'}
    ]
  };

  constructor(private fireService: FirebaseService, private fs: FirebaseService, private fb: FormBuilder, private datePipe: DatePipe) { 
    this.addWords = new FormGroup({
      english : new FormControl(''),
      sinhala : new FormControl(''),
      categories : this.cpBuildCategories()
    });
    this.currentDTStr = this.datePipe.transform(this.currentDT, 'yyyy-MM-dd');
    console.log(this.addWords);
  }

  ngOnInit(): void {
    this.searchString$
      .pipe(debounceTime(400))
      .subscribe(x => this.cpCheckForAvailability(x));
  }

  cpBuildCategories(){
    const arr = this.mainCategories.catList.map(cat => {
      return this.fb.control(cat.selected);
    });
    return this.fb.array(arr);
  }

  cpInputChanged(event){
    const mStrWord = event.target.value;
    this.searchString$.next(mStrWord);
  }

  cpCheckForAvailability(pSearchStr){
    this.items = this.fs.cpSearchCollection('Vocabulary', 'english', '==', pSearchStr).valueChanges();    
  }

  cpOnSubmit(pFormValues){
    const formValue = Object.assign({}, pFormValues, {
      english:pFormValues.english,
      sinhala:pFormValues.sinhala,
      categories: pFormValues.categories.map((selected, i) => {
        return {
          id: this.mainCategories.catList[i].id,
          name: this. mainCategories.catList[i].name,
          selected
       }
      })
    });
    this.fs.cpAddToCollection('Vocabulary',formValue);
    this.addWords.reset();
    // console.log(JSON.stringify(formValue));
  }
}
