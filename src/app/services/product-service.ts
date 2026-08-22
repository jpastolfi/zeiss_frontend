import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { UpdateProduct, CreateProduct, ProductResponse, Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Service()
export class ProductService {
    private http = inject(HttpClient);
    private baseUrl = 'https://localhost:7018/api/products';

    getProductById(id: number): Observable<ProductResponse> {
        return this.http.get<ProductResponse>(`${this.baseUrl}/${id}`);
    }

    getProductByName(productName: string): Observable<ProductResponse[]> {
        return this.http.get<ProductResponse[]>(`/search?name=${productName}`);
    }

    getProducts(): Observable<ProductResponse[]> {
        return this.http.get<ProductResponse[]>(this.baseUrl);
    }

    getProductsByStockRange(minStock: number, maxStock: number): Observable<ProductResponse[]> {
        return this.http.get<ProductResponse[]>(`${this.baseUrl}/stock-level?min=${minStock}&max=${maxStock}`);
    }

    // createProduct(product: CreateProduct): Observable<ProductResponse> {
    createProduct(product: Omit<Product, 'id'>): Observable<ProductResponse> {
        return this.http.post<ProductResponse>(this.baseUrl, product);
    }

    incrementProductStock(id: string, quantity: number): Observable<ProductResponse> {
        return this.http.post<ProductResponse>(`${this.baseUrl}/${id}/add-to-stock/${quantity}`, null);
    }

    decrementProductStock(id: string, quantity: number): Observable<ProductResponse> {
        return this.http.post<ProductResponse>(`${this.baseUrl}/${id}/decrement-stock/${quantity}`, null);
    }

    // updateProduct(id: number, product: UpdateProduct): Observable<ProductResponse> {
    updateProduct(id: number, product: Omit<Product, 'id' | 'stock'>): Observable<ProductResponse> {
        return this.http.put<ProductResponse>(`${this.baseUrl}/${id}`, product);
    }

    deleteProduct(id: number): Observable<ProductResponse> {
        return this.http.delete<ProductResponse>(this.baseUrl);
    }
}
