import { Component } from '@angular/core';
import {OnInit} from '@angular/core/src/metadata/lifecycle_hooks';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MajeBug';

  constructor(private _accountService: AccountService, private _router: Router){}

  ngOnInit(): void{
    $('.ui.sidebar')
    .sidebar({context: $('.segment')})
    .sidebar('attach events', '.menu .item');
  }

  public exit(){
    this._accountService.doLogout();
    
  }

}

