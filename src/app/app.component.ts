import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// declare ga as a function to access the JS code in TS
declare var gtag;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sidebar';

  constructor(public router: Router) {
    const navEndEvents = router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
    navEndEvents.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-189290568-1', {
        page_path: event.urlAfterRedirects,
      });
    });

    /* this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-189290568-1', {
          page_path: event.urlAfterRedirects,
        });
      }
    }); */
  }
}
