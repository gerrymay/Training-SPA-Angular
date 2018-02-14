import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  model:any={name:'',lastname:'', gender:true, photo:'https://angular.io/generated/images/marketing/home/code-icon.svg'};
  array:any[]=["Uno","Dos","Tres","Cuatro"];



  clicked(){
    console.log(this.model.name)
    this.model.lastname = this.model.lastname + 'A';
  }

  selectedItem(item){
    alert(item);
  }

addItem(){
  this.array.push("ANOTHER ITEM");

}
removeItem(){
  this.array.pop();

}

  constructor() { }

  ngOnInit() {
  }

}
