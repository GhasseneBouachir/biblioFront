import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Account}  from '../models/Account';

const baseUrl = 'http://localhost:9191/accounts';


@Injectable({
  providedIn: 'root'
})
export class AccountService {  
  myAccounts : Account[] = [];
  constructor(private http: HttpClient) { }

  getAccounts() {
    this.myAccounts = [];
    this.http
      .get<any>(baseUrl)
      .subscribe((data) => {
        data.map(dt => {
          this.myAccounts.push(dt);
        });
      });
    return this.myAccounts;
  }

  get(id): Observable<Account> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  create(data): Observable<Account> {
    return this.http.post<any>(baseUrl, data);
  }

  update(id, data): Observable<Account> {
    return this.http.put<any>(`${baseUrl}/${id}`, data);
  }

  delete(id): Observable<Account> {
    return this.http.delete<any>(`${baseUrl}/${id}`);
  }

  findByTitle(title): Observable<Account> {
    return this.http.get<any>(`${baseUrl}?title=${title}`);
  }
}