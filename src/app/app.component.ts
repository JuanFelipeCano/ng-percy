import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePickerComponent, DatePickerInputComponent } from './components';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePickerComponent, FormsModule, ReactiveFormsModule, DatePickerInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-components';

  date = new Date(2024, 8, 1);

  form!: FormGroup;
  dateControl!: FormControl;
  inputControl!: FormControl;

  ngOnInit(): void {
    this.dateControl = new FormControl(this.date);
    this.inputControl = new FormControl('input');

    this.form = new FormGroup({
      date: this.dateControl,
      input: this.inputControl,
    });
  }

  selected(value: any) {
    console.log(value);
    console.log(this.date);
  }

  submitForm() {
    console.log(this.form.value);
  }
}
