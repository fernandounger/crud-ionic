import { Product } from './../model/product';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000';
const HTTP_OPTIONS = {
  headers: new HttpHeaders (
    {'Content-Type': 'application/json;charset=utf-8'}
  )
};


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  insertProduct(product: Product): Observable<any> {
    return this.http.post(`${API_URL}/Produto`, product, HTTP_OPTIONS);
  }

  findProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/Produto/${id}`);
  }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/Produto`);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(`${API_URL}/Produto/${product.id}`, product, HTTP_OPTIONS);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/Produto/${id}`);
  }
}
