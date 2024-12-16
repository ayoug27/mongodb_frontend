import { Routes } from '@angular/router';
import {StudentsListComponent} from './presentation/students-list/students-list.component';
import {AddStudentComponent} from './presentation/add-student/add-student.component';
import {EditStudentComponent} from './presentation/edit-student/edit-student.component';

export const routes: Routes = [
  {path: '', component: StudentsListComponent, title: 'Students List'},
  {path: 'new', component: AddStudentComponent},
  {path: 'edit/:id', component: EditStudentComponent}
];
