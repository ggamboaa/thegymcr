import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReserveService {
  constructor(private http: HttpClient) {}

  public add(objCustomer: any): Observable<any> {
    return this.http
      .post(`${CONFIG.api.basePath}/dates`, objCustomer)
      .pipe(catchError(this.handleError<any>('getCustomers')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
