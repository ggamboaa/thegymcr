import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DatesService } from 'src/app/core/data-services/dates.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html',
  styleUrls: ['./reserves.component.css'],
})
export class ReservesComponent implements OnInit {
  public filterBy: any;
  public day: any;
  public showBTNSave: boolean;

  public weekday = new Array(7);
  public dates = [];

  public registerForm: FormGroup;
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
    // this.weekday = new Array(7);
    this.weekday[0] = 'Lunes';
    this.weekday[1] = 'Martes';
    this.weekday[2] = 'Miércoles';
    this.weekday[3] = 'Jueves';
    this.weekday[4] = 'Sábado';
    this.weekday[5] = 'Domingo';

    this.day = this.weekday[d.getDay()];
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      iden: ['', Validators.required],
      campus: ['', Validators.required],
      days: this.day,
      hours: ['', Validators.required],
    });
    this.showBTNSave = true;
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

  loadDates(iden: string) {
    let query = {};
    this.dates = [];
    this.showBTNSave = true;

    if (iden && iden !== '') {
      query = { filter: iden };
    }

    this.datesService.getAll(query).subscribe(
      (response) => {
        if (response.totalRecords > 0) {
          this.dates = response.records;
          this.showBTNSave = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadDatesSubmit(iden: string) {
    let query = {};
    this.dates = [];

    if (iden && iden !== '') {
      query = { filter: iden };
    }

    this.datesService.getAll(query).subscribe(
      (response) => {
        if (response.totalRecords > 0) {
          this.dates = response.records;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public deleteDate(id: number): void {
    // Swal.fire({
    //   title: '¿Desea eliminar el registro seleccionado?',
    //   text: 'No será posible recuperarlo posteriormente!',
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Sí, eliminar!',
    //   cancelButtonText: 'No, cancelar',
    // }).then((result) => {
    //   if (result.value) {
    this.datesService.delete(id).subscribe(() => {
      this.showBTNSave = true;
      this.dates = [];
    });
    //   Swal.fire('Eliminado!', 'Su registro ha sido eliminado', 'success');
    // } else if (result.dismiss === Swal.DismissReason.cancel) {
    //   Swal.fire('Cancelado', 'Su registro está seguro :)', 'error');
    // }
    // });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.datesService.add(this.registerForm.value).subscribe(
      () => {
        this.notifyService.showSuccess(
          '¡ Su cita fue guardada correctamente !',
          'Cita guardada'
        );
        this.loadDatesSubmit(this.registerForm.get('iden').value);
        this.registerForm.reset();
        this.submitted = false;

        // this.resetForm(this.registerForm);
        // this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // resetForm(formGroup: FormGroup) {
  //   let control: AbstractControl = null;
  //   formGroup.reset();
  //   formGroup.markAsUntouched();
  // }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
