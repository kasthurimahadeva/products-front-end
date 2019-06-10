import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = '/api/v1/products/';

  constructor(private http: HttpClient) { }

  getProductsList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProduct(id: string): Observable<Product> {
    const url = this.productUrl + id;
    return this.http.get<Product>(url);
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post<Product>(this.productUrl, product, { observe: 'response' });
  }

  updateProduct(id: string, product: Product): Observable<any> {
    const url = this.productUrl + id;
    console.log('Hi');
    return this.http.put<any>(url, product, {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      })
    }).pipe(
      tap(pro => console.log(JSON.stringify(pro))),
      catchError(err => this.handleError(err))
      );
  }

  deleteProduct(id: string): Observable<any> {
    const url = this.productUrl + id;
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    );
  }

  private handleError(err: any) {
    const errMsg = (err.message) ? err.message :
      err.status ? `${err.status} - ${err.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
