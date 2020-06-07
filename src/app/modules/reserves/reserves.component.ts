import { ReserveService } from './../../core/data-services/reserve.service';
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
  campus = [
    { id: '1', desc: 'Alajuela' },
    { id: '2', desc: 'Heredia' },
  ];
  days = [];
  hours = [];
  submitted = false;

  constructor(
    private readonly reserveService: ReserveService,
    private formBuilder: FormBuilder
  ) {
    // async days
    of(this.getDays()).subscribe((days) => {
      this.days = days;
    });

    of(this.getHours()).subscribe((hours) => {
      this.hours = hours;
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      iden: ['', Validators.required],
      campus: [''],
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
      { id: '7', desc: 'Domingo' },
    ];
  }

  getHours() {
    return [
      { id: '1', group: 'Grupo #1', desc: '5:00AM - 6:30AM' },
      { id: '2', group: 'Grupo #2', desc: '6:30AM - 8:00AM' },
      { id: '3', group: 'Grupo #3', desc: '8:00AM - 9:30AM' },
      { id: '4', group: 'Grupo #4', desc: '9:30AM - 11:00AM' },
      { id: '5', group: 'Grupo #5', desc: '11:00AM - 12:30PM' },
      { id: '6', group: 'Grupo #6', desc: '12:30PM - 1:30PM' },
      { id: '7', group: 'Grupo #7', desc: '1:30PM - 3:00PM' },
      { id: '8', group: 'Grupo #8', desc: '3:00PM - 4:30PM' },
      { id: '9', group: 'Grupo #9', desc: '4:30PM - 6:00PM' },
      { id: '10', group: 'Grupo #10', desc: '6:00PM - 7:30PM' },
      { id: '11', group: 'Grupo #11', desc: '7:30PM - 9:00PM' },
    ];
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.reserveService.add(this.registerForm.value).subscribe(
      () => {
        console.log('Guardado..!');
      },
      (error) => {
        console.log(error);
      }
    );

    // display form values on success
    // alert(
    //   'SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4)
    // );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
