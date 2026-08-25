import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { UpdateProductData, CreateProductData, ProductResponse } from '../models/product.model';
import { Observable } from 'rxjs';

@Service()
export class ProductService {
    private http = inject(HttpClient);
    private baseUrl = 'https://localhost:7018/api/products';

    getProductById(id: number): Observable<ProductResponse> {
        return this.http.get<ProductResponse>(`${this.baseUrl}/${id}`);
    }

    getProductByName(productName: string): Observable<ProductResponse[]> {
        return this.http.get<ProductResponse[]>(`${this.baseUrl}/search?name=${productName}`);
    }

    getProducts(): Observable<ProductResponse[]> {
        return this.http.get<ProductResponse[]>(this.baseUrl);
    }

    getProductsByStockRange(minStock: number, maxStock: number): Observable<ProductResponse[]> {
        return this.http.get<ProductResponse[]>(`${this.baseUrl}/stock-level?min=${minStock}&max=${maxStock}`);
    }

    createProduct(product: CreateProductData): Observable<ProductResponse> {
        return this.http.post<ProductResponse>(this.baseUrl, product);
    }

    incrementProductStock(id: number, quantity: number): Observable<ProductResponse> {
        return this.http.post<ProductResponse>(`${this.baseUrl}/${id}/add-to-stock/${quantity}`, null);
    }

    decrementProductStock(id: number, quantity: number): Observable<ProductResponse> {
        return this.http.post<ProductResponse>(`${this.baseUrl}/${id}/decrement-stock/${quantity}`, null);
    }

    updateProduct(id: number, product: UpdateProductData): Observable<ProductResponse> {
        return this.http.put<ProductResponse>(`${this.baseUrl}/${id}`, product);
    }

    deleteProduct(id: number): Observable<ProductResponse> {
        return this.http.delete<ProductResponse>(`${this.baseUrl}/${id}`);
    }
}
