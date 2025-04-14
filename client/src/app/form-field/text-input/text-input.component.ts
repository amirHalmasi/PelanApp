import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.css'],
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class TextInputComponent {
  @Input('options') textInputOption!: any;
  // signupForm = new FormGroup({
  //   name: new FormControl('', { nonNullable: true }),
  //   lastname: new FormControl('', { nonNullable: true }),
  // });
}
