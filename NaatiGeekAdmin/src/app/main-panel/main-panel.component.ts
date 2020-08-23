import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../Services/firebase.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})

export class MainPanelComponent implements OnInit {
  vacabList;
  constructor(private fireService: FirebaseService) { }

  ngOnInit(): void {
    this.getVocablist();
  }

  getVocablist(): void{
    // this.fireService.getVocabList()
    // .subscribe(
    //   res => (
    //     this.onGetVocabList(res)
    //   ) 
    // );  
    // console.log(this.vacabList);
  }

  onGetVocabList(pRes):void{
    this.vacabList = pRes;
    console.log(this.vacabList);
  }

}
