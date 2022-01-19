import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student} from '../models/Student'

const baseUrl = 'http://localhost:8080/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
   myStudents : Student [] = [];
  constructor(private http: HttpClient) { }


  getStudents() {
    this.myStudents = [];
    this.http
      .get<any>(`${baseUrl}/studentList`)
      .subscribe((data) => {
        data.map(dt => {
          this.myStudents.push(dt);
        });
      });
    return this.myStudents;
  }


  get(id): Observable<Student> {
    return this.http.get<Student>(`${baseUrl}/${id}`);
  }

  create(data): Observable<Student> {
    return this.http.post<Student>(`${baseUrl}/addStudent`, data);
  }

  update( data): Observable<Student> {
    return this.http.put<Student>(`${baseUrl}/studentUpdate`, data);
  }

  delete(id): Observable<Student> {
    return this.http.delete<Student>(`${baseUrl}/studentDelete/${id}`);
  }

  findByName(name): Observable<Student> {
    return this.http.get<Student>(`${baseUrl}?title=${name}`);
  }
}
