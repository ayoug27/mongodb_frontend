import {Component, WritableSignal} from '@angular/core';
import {StudentService} from '../../services/student.service';
import {Student} from '../../domain/student';
import {RouterModule} from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styleUrls: ['./students-list.component.css'],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title><p class="title-form">Students List</p></mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="students$()">
          <ng-container matColumnDef="col-firstname">
            <th mat-header-cell *matHeaderCellDef><p>First Name</p></th>
            <td mat-cell *matCellDef="let element"><p>{{ element.firstName }}</p></td>
          </ng-container>
          <ng-container matColumnDef="col-lastname">
            <th mat-header-cell *matHeaderCellDef><p>Last Name</p></th>
            <td mat-cell *matCellDef="let element"><p>{{ element.lastName }}</p></td>
          </ng-container>
          <ng-container matColumnDef="col-age">
            <th mat-header-cell *matHeaderCellDef><p>Age</p></th>
            <td mat-cell *matCellDef="let element"><p>{{ element.age }}</p></td>
          </ng-container>
          <ng-container matColumnDef="col-sector">
            <th mat-header-cell *matHeaderCellDef><p>Sector</p></th>
            <td mat-cell *matCellDef="let element"><p>{{ element.sector }}</p></td>
          </ng-container>
          <ng-container matColumnDef="col-action" >
            <th mat-header-cell *matHeaderCellDef><p>Action</p></th>
            <td mat-cell *matCellDef="let element" >
              <button mat-raised-button [routerLink]="['edit/', element._id]" class="edit-button">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deleteStudent(element._id || '')"
                class="delete-button"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button class="add-button" mat-raised-button color="primary" [routerLink]="['new']">
          Add a New Student
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class StudentsListComponent{
  students$ = {} as WritableSignal<Student[]>;
  displayedColumns: string[] = [
    'col-firstname',
    'col-lastname',
    'col-age',
    'col-sector',
    'col-action'
  ];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  deleteStudent(id: string): void {
    this.studentService.deleteStudent(id).subscribe({
      next: () => this.fetchStudents(),
    });
  }

  private fetchStudents(): void {
    this.students$ = this.studentService.students$;
    this.studentService.getStudents();
  }
}
