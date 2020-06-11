import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'src/app/config';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  constructor(private http: HttpClient) {}

  public get(pQuery: any): Observable<any> {
    return this.http.get(`${CONFIG.api.basePath}/dates`,{ params: pQuery }).pipe(
      map((data) => data),
      catchError(this.handleError<any>('getDates'))
    );
  }

  public getAll(pQuery: any): Observable<any> {
    return this.http
      .get(`${CONFIG.api.basePath}/dates`, { params: pQuery })
      .pipe(catchError(this.handleError<any>('getDates')));
  }

  public add(objDate: any): Observable<any> {
    return this.http
      .post(`${CONFIG.api.basePath}/dates`, objDate)
      .pipe(catchError(this.handleError<any>('getCustomers')));
  }

  public update(id: number, pDate: any): Observable<any> {
    return this.http
      .put(`${CONFIG.api.basePath}/dates/${id}`, pDate)
      .pipe(catchError(this.handleError<any>('updateDate')));
  }

  public delete(id: number): Observable<any> {
    return this.http
      .delete(`${CONFIG.api.basePath}/dates/${id}`)
      .pipe(catchError(this.handleError<any>('deleteCustomer')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
