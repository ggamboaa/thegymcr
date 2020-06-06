import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html',
  styleUrls: ['./reserves.component.css'],
})
export class ReservesComponent implements OnInit {
  registerForm: FormGroup;
  days = [];
  hours = [];
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    // async days
    of(this.getDays()).subscribe((days) => {
      this.days = days;
      // this.registerForm.controls.days.patchValue(this.days[0].id);
    });

    of(this.getHours()).subscribe((hours) => {
      this.hours = hours;
      // this.registerForm.controls.hours.patchValue(this.hours[0].id);
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: ['', Validators.required],
      days: [''],
      hours: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  getDays() {
    return [
      { id: '1', desc: 'Lunes' },
      { id: '2', desc: 'Martes' },
      { id: '3', desc: 'Miércoles' },
      { id: '4', desc: 'Jueves' },
      { id: '5', desc: 'Viernes' },
      { id: '6', desc: 'Sábado' },
    ];
  }

  getHours() {
    return [
      { id: '1', desc: '5:00AM - 6:00AM' },
      { id: '2', desc: '6:00AM - 7:00AM' },
      { id: '3', desc: '7:00AM - 8:00AM' },
      { id: '4', desc: '8:00AM - 9:00AM' },
      { id: '5', desc: '9:00AM - 10:00AM' },
      { id: '6', desc: '10:00AM - 11:00AM' },
    ];
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert(
      'SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4)
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
