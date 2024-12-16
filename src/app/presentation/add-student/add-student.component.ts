import { Component } from '@angular/core';
import {StudentFormComponent} from '../student-form/student-form.component';
import {MatCardModule} from '@angular/material/card';
import {Router} from '@angular/router';
import {StudentService} from '../../services/student.service';
import {Student} from '../../domain/student';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [StudentFormComponent, MatCardModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  constructor(private router: Router, private studentService: StudentService) {}

  addStudent(student: Student){
    this.studentService.createStudent(student).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => {
        alert('Failed to create employee');
        console.error(error);
      }
    })
    this.studentService.getStudents();
  }
}
