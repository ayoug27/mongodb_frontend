import {Injectable, signal} from '@angular/core';
import {Student} from '../domain/student';
import {StudentRepository} from '../repositories/student-repository';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students$ = signal<Student[]>([]);
  student$ = signal<Student>({} as Student);

  constructor(private studentRepository: StudentRepository) { }

  private refreshStudents() {
    this.studentRepository.getAll().subscribe(students => {
      this.students$.set(students);
    });
  }

  getStudents() {
    this.refreshStudents();
    return this.students$;
  }

  getStudent(id: string) {
    this.studentRepository.getById(id).subscribe(student => {
      this.student$.set(student);
      return this.student$;
    });
  }

  createStudent(student: Student) {
    return this.studentRepository.add(student);
  }

  updateStudent(id: string, student: Student) {
    return this.studentRepository.update(id, student);
  }

  deleteStudent(id: string) {
    return this.studentRepository.delete(id);
  }
}
