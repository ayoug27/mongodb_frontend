import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentRepository} from '../repositories/student-repository';
import {Student} from '../domain/student';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongoDbStudentRepository implements StudentRepository{
  private url = "https://675fe9a01f7ad2426999e180.mockapi.io/";

  constructor(private httpClient: HttpClient) { }

  add(student: Student) : Observable<Student>{
    return this.httpClient.post<Student>(`${this.url}/students`, student, {responseType: 'json'});
  }

  getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.url}/students`, {responseType: 'json'});
  }

  getById(id: string): Observable<Student> {
    return this.httpClient.get<Student>(`${this.url}/students/${id}`, {responseType: 'json'});
  }

  update(id: string, student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${this.url}/students/${id}`, student, {responseType: 'json'});
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/students/${id}`);
  }
}
