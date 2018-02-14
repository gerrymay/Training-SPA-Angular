import { Component, OnInit } from '@angular/core';
import { BugService } from '../../services/bug.service';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class BugListComponent implements OnInit {

  public bugs:any[] = [];
  constructor(private _bugService:BugService) { }

  ngOnInit() {
    
    this._bugService.getBugs()
    .subscribe(data=>{
      this.bugs = data;
    },
    error=>{console.log(error);});
  
  }


}
