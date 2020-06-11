import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { DatesService } from 'src/app/core/data-services/dates.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslationWidth } from '@angular/common';
import { sharedStylesheetJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css'],
})
export class DatesComponent implements OnInit {
  public dates = [];
  public hours = [];
  // public selectedhour = '';
  datesForm: FormGroup;

  public campus = [
    { id: '1', desc: 'Alajuela' },
    { id: '2', desc: 'Heredia' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private readonly dateService: DatesService) {
    of(this.getHours()).subscribe((hours) => {
      this.hours = hours;
      // this.selectedhour = this.hours[1];
    });
  }

  ngOnInit() {
    this.datesRF();
    this.loadDates();
  }

  datesRF() {
    this.datesForm = this.formBuilder.group({
      selectedhour: ['5:00AM - 6:30AM'],
      selectedcampus: ['Alajuela'],
    });
  }


  public loadDates(): void {
    // console.log(this.datesForm.value.selectedhour);
    // console.log(this.datesForm.value.selectedcampus);
    let query = { hour: this.datesForm.value.selectedhour, campus: this.datesForm.value.selectedcampus}
    this.dateService.get(query).subscribe((response) => {
      this.dates = response.records;
    });
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

}
