import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BugService } from '../../services/bug.service';
import { Router } from '@angular/router';

var $:any;

@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.css']
})
export class AddBugComponent implements OnInit {

  addBugForm :  FormGroup;
  errorMessage:string = '';

  constructor(private fb:FormBuilder, private _bugService:BugService, private _router: Router) {
      this.addBugForm = this.fb.group({
        'title':['',Validators.compose([Validators.required,Validators.minLength(5), Validators.maxLength(120) ])],
        'body':['',Validators.compose([Validators.required, Validators.maxLength(500)])],
        'isFixed': false,
        'stepsToReproduce':['',Validators.compose([Validators.required, Validators.maxLength(500) ])],
        'severity':1
      });
   }

public save(){
  
  this._bugService.postBug(this.addBugForm.value).subscribe(data=>{
    this._router.navigate(["/bugs"])
  },
  error=>{this.errorMessage = error;}
)

}

/*
 save(){
    var param = this._activatedRoute.snapshot.paramMap.get('id');
    this.bugid=param;
    var temp = this.editBugForm.value;
    temp.rowVersion = this.bug.rowVersion;
    temp.createdById = this.bug.createdById;
    temp.createAt= this.bug.createAt;
    console.log(temp.rowVersion);
     this._bugService.putBug(Number(param), this.editBugForm.value)
                     .subscribe(data=>{
                       //success message
                       this._router.navigate(["/bugs"])
                     }, error=>{this.errorMessage=error;})
   }

*/

  ngOnInit() {
  }

}
