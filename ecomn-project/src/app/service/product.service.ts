import { Injectable } from '@angular/core';
import { product } from '../Models/iuser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  listProduct = new BehaviorSubject<product[]>([]);
  headerOption;
  constructor (private http: HttpClient) {
    this.headerOption = {
      headers: new HttpHeaders({
        'Contact-Type': 'application/json'
      }),
    }
  }
  addProduct(data: product): Observable<product> {
    return this.http.post<product>('http://localhost:3000/products', JSON.stringify(data), this.headerOption).pipe(
      retry(3),
    );
  }
  productList(): Observable<product[]> {
    this.http.get<product[]>('http://localhost:3000/products', this.headerOption).pipe(
      retry(3)
    ).subscribe(
      (result) => {
        this.listProduct.next(result);
      }
    );
    return this.listProduct.asObservable();
  }
  deleteProduct(id: string): Observable<product> {
    return this.http.delete<product>(`http://localhost:3000/products/${id}`, this.headerOption).pipe(
      retry(3),
      tap(() => this.productList()),
    );
  }
  getProductById(id: string): Observable<product> {
    return this.http.get<product>(`http://localhost:3000/products/${id}`, this.headerOption);
  }
  updateProduct(product: product): Observable<product> {
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, JSON.stringify(product), this.headerOption);
  }
  popularProductsE(): Observable<product[]> {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=5', this.headerOption);
  }
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8', this.headerOption).pipe(
      retry(3)
    );
  }
  searchProduct(query: string): Observable<product[]> {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`, this.headerOption);
  }
}
