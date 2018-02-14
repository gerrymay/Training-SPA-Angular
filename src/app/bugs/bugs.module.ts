import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugListComponent } from '../bugs/bug-list/bug-list.component'
import { BugService } from '../services/bug.service';
import { FromnowPipe } from '../pipes/fromnow.pipe';
import { SeverityComponent } from '../bugs/severity/severity.component';
import { BugDetailsComponent } from '../bugs/bug-details/bug-details.component';
import { BugGuard } from '../guards/bug.guard';
import { AddBugComponent } from '../bugs/add-bug/add-bug.component';
import {HttpClientModule, HttpClient} from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms'
import { AuthGuard } from '../guards/auth.guard';
import { AccountService } from '../services/account.service';
import { BugEditComponent } from './bug-edit/bug-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
    .forChild([
      {path:'bugs', component: BugListComponent, canActivate:[AuthGuard]},
      {path:'bugsDetails/:id', component:BugDetailsComponent, canActivate:[BugGuard, AuthGuard]},
      {path:'addBug', component:AddBugComponent, canActivate:[AuthGuard]},
      {path:'editBug/:id', component:BugEditComponent, canActivate:[ AuthGuard]}
    ]),
  ],
  providers: [AccountService, AuthGuard,BugService, BugGuard],
  declarations: [
    BugListComponent,
    FromnowPipe,
    SeverityComponent,
    BugDetailsComponent,
    AddBugComponent,
    BugEditComponent]
})
export class BugsModule { 


}
