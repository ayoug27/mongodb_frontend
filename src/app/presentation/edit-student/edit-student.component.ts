import {Component, OnInit, WritableSignal} from '@angular/core';
import {Student} from '../../domain/student';
import {StudentService} from '../../services/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentFormComponent} from '../student-form/student-form.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [StudentFormComponent, MatCardModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent implements OnInit{
  student = {} as WritableSignal<Student>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('Invalid student id');
      this.router.navigate(['/']);
    }
    this.studentService.getStudent(id!);
    this.student = this.studentService.student$;
  }

  editStudent(student: Student){
    this.studentService
      .updateStudent(this.student()._id || '', student)
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => {
          alert('Failed to update student');
          console.error(error);
        }
      })
  }
}
