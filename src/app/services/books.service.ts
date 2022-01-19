import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Book} from '../models/Book';




@Injectable({
  providedIn: 'root'
})
export class BooksService {
  myBooks: Book[] = [];
  private baseUrl = 'http://localhost:8080/book';
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/bookList`);
  }

  get(id): Observable<Book> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(data): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/addBook`, data);
  }

  update( data): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/bookUpdate`, data);
  }

  delete(id): Observable<Book> {
    return this.http.delete<Book>(`${this.baseUrl}/bookDelete/${id}`);
  }

  findByTitle(title): Observable<Book> {
    return this.http.get<any>(`${this.baseUrl}?title=${title}`);
  }
}
