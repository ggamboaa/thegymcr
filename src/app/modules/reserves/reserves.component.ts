import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DatesService } from 'src/app/core/data-services/dates.service';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html',
  styleUrls: ['./reserves.component.css'],
})
export class ReservesComponent implements OnInit {
  public filterBy: any;
  public day: any;

  public dates = [];

  registerForm: FormGroup;
  campus = [
    { id: '1', desc: 'Alajuela' },
    { id: '2', desc: 'Heredia' },
  ];
  days = [
    { id: '1', desc: 'Lunes' },
    { id: '2', desc: 'Martes' },
    { id: '3', desc: 'Miércoles' },
    { id: '4', desc: 'Jueves' },
    { id: '5', desc: 'Viernes' },
    { id: '6', desc: 'Sábado' },
    { id: '7', desc: 'Domingo' },
  ];
  hours = [];
  submitted = false;

  constructor(
    private readonly datesService: DatesService,
    private formBuilder: FormBuilder,
    private notifyService: NotificationService
  ) {
    of(this.getHours()).subscribe((hours) => {
      this.hours = hours;
    });

    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = 'Lunes';
    weekday[1] = 'Martes';
    weekday[2] = 'Miércoles';
    weekday[3] = 'Jueves';
    weekday[4] = 'Sábado';
    weekday[5] = 'Domingo';

    this.day = weekday[d.getDay()];
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      iden: ['', Validators.required],
      campus: ['', Validators.required],
      days: this.day,
      hours: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  getHours() {
    return [
      { id: '1', group: 'G- #1', desc: '5:00AM - 6:30AM' },
      { id: '2', group: 'G- #2', desc: '6:30AM - 8:00AM' },
      { id: '3', group: 'G- #3', desc: '8:00AM - 9:30AM' },
      { id: '4', group: 'G- #4', desc: '9:30AM - 11:00AM' },
      { id: '5', group: 'G- #5', desc: '11:00AM - 12:30PM' },
      { id: '6', group: 'G- #6', desc: '12:30PM - 1:30PM' },
      { id: '7', group: 'G- #7', desc: '1:30PM - 3:00PM' },
      { id: '8', group: 'G- #8', desc: '3:00PM - 4:30PM' },
      { id: '9', group: 'G- #9', desc: '4:30PM - 6:00PM' },
      { id: '10', group: 'G- #10', desc: '6:00PM - 7:30PM' },
      { id: '11', group: 'G- #11', desc: '7:30PM - 9:00PM' },
    ];
  }

  loadDates(id: string) {
    let query = {};
    if (id && id !== '') {
      query = { filter: id };
    }

    this.datesService.getAll(query).subscribe(
      (response) => {
        this.dates = response.records;
      },
      (error) => {
        console.log(error);
      }
    );

    // this.ngOnInit();
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.datesService.add(this.registerForm.value).subscribe(
      () => {
        this.notifyService.showSuccess(
          'Su cita fue guardada con éxito !!',
          'Cita guardada'
        );
        this.loadDates(this.registerForm.get('iden').value);
        // this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
