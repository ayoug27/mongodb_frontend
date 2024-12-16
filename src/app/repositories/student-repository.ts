import {Student} from '../domain/student';
import {Observable} from 'rxjs';

export abstract class StudentRepository {
  abstract add(student: Student): Observable<Student>;
  abstract getAll(): Observable<Student[]>;
  abstract getById(id: string): Observable<Student>;
  abstract update(id: string, student: Student): Observable<Student>;
  abstract delete(id: string): Observable<void>;
}
