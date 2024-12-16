import {Component, effect, EventEmitter, inject, input, Output} from '@angular/core';
import {Student} from '../../domain/student';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  formBuilder = inject(FormBuilder);

  initialState = input<Student>();

  @Output()
  formValuesChanged = new EventEmitter<Student>();

  @Output()
  formSubmitted = new EventEmitter<Student>();

  studentForm = this.formBuilder.group({
    firstName: ['',[Validators.required, Validators.minLength(3)]],
    lastName: ['',[Validators.required, Validators.minLength(3)]],
    age: [0,[Validators.required, Validators.min(0)]],
    sector: ['INFO',[Validators.required]],
  });

  constructor() {
    effect(()=> {
      // noinspection TypeScriptValidateTypes
      this.studentForm.setValue({
        firstName: this.initialState()?.firstName || '',
        lastName: this.initialState()?.lastName || '',
        age: this.initialState()?.age || null,
        sector: this.initialState()?.sector || 'INFO',
      });
    });
  }

  get firstName() {
    return this.studentForm.get('firstName');
  }

  get lastName() {
    return this.studentForm.get('lastName');
  }

  get age() {
    return this.studentForm.get('age');
  }

  get sector() {
    return this.studentForm.get('sector');
  }

  submitForm() {
    this.formSubmitted.emit(this.studentForm.value as Student);
  }
}
