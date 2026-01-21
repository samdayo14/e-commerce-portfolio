import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, ProductResponse } from '../../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  getProducts(): Observable<Product[]> {
    return this.http
      .get<ProductResponse>(`${this.apiUrl}?limit=100`)
      .pipe(map((response) => response.products));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http
      .get<ProductResponse>(`${this.apiUrl}/category/${category}`)
      .pipe(map((response) => response.products));
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http
      .get<ProductResponse>(`${this.apiUrl}/search?q=${query}`)
      .pipe(map((response) => response.products));
  }
}
