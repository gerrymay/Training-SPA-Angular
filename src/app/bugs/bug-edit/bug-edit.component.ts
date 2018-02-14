import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BugService } from '../../services/bug.service';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-bug-edit',
  templateUrl: './bug-edit.component.html',
  styleUrls: ['./bug-edit.component.css']
})
export class BugEditComponent implements OnInit {

  addBugForm :  FormGroup;
  errorMessage:string = '';
  bug: any = {};
  paramid:any = {};
  buginfo:any= {};

 
  constructor( private _fb: FormBuilder,
    private _activateRouter:ActivatedRoute,
    private _bugService:BugService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute) { 
     
      this.addBugForm = this._fb.group({
        'id':['',],
        'title':['',Validators.compose([Validators.required,Validators.minLength(5), Validators.maxLength(120) ])],
        'body':['',Validators.compose([Validators.required, Validators.maxLength(500)])],
        'isFixed': false,
        'stepsToReproduce':['',Validators.compose([Validators.required, Validators.maxLength(500) ])],
        'severity':1,
        'createdAt':['',]
      });
    
  }

  ngOnInit() {
    const param =  this._activatedRoute.snapshot.paramMap.get('id');
    if(param){ 
      this._bugService.getBug(Number(param)).subscribe(data=>{
        this.bug = data;
        this.addBugForm.setValue({
          id:data.id,
          title:data.title,
          body:data.body,
          stepsToReproduce:data.stepsToReproduce,
          isFixed:data.isFixed,
          severity:data.severity,
          createdAt:data.createdAt
        })
      },
    error=>{});
    }
  }

  public save(){

    var param = this._activateRouter.snapshot.paramMap.get('id');
    this.paramid = param;
    this.buginfo = this.addBugForm.value;
    this.buginfo.rowVersion = this.bug.rowVersion;
    this.buginfo.createdById = this.bug.createdById;
    this.buginfo.createAt= this.bug.createAt;
    this.buginfo.modifiedAt = this.bug.modifiedAt;
    this._bugService.putBug(Number(param), this.addBugForm.value).subscribe(data=>{
      this._router.navigate(["/bugs"])
    },
    error=>{this.errorMessage = error;}
  )
  
  }



}
