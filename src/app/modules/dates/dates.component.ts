import { Component, OnInit } from '@angular/core';
import { DatesService } from 'src/app/core/data-services/dates.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css'],
})
export class DatesComponent implements OnInit {
  public dates = [];

  constructor(private readonly dateService: DatesService) {}

  ngOnInit() {
    this.loadDates();
  }

  private loadDates(): void {
    this.dateService.get().subscribe((response) => {
      this.dates = response.records;
    });
  }
}
