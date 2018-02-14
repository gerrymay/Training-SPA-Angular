import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from  '@angular/common/http';
import {FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FromnowPipe } from './pipes/fromnow.pipe';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import {AccountService} from './services/account.service';
import { BugListComponent } from './bugs/bug-list/bug-list.component';
import { BugService } from './services/bug.service';
import { SeverityComponent } from './bugs/severity/severity.component';
import { BugDetailsComponent } from './bugs/bug-details/bug-details.component';
import { AddBugComponent } from './bugs/add-bug/add-bug.component';
import { BugsModule } from './bugs/bugs.module';
import { BugGuard } from './guards/bug.guard';
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'welcome', component:WelcomeComponent, canActivate:[AuthGuard]},
      {path:'login', component:LoginComponent},
      {path:'', redirectTo:'welcome',pathMatch:'full'},
      {path:'**', redirectTo:'welcome', pathMatch:'full'}
    ]),
    ReactiveFormsModule,
    BugsModule
  ],
  providers: [AccountService, BugService, BugGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
