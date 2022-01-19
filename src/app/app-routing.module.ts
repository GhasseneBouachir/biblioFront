import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { BooksComponent } from './books/books.component';
import { AccountsComponent } from './accounts/accounts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
{path: 'home' , component: HomeComponent },
{path: 'books' , component: BooksComponent} ,
{path: 'students', component: StudentsComponent},
{path: 'accounts', component: AccountsComponent},
{path: 'login', component: LoginComponent},
{path: '**' , component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routingComponents =  [BooksComponent, StudentsComponent, AccountsComponent]