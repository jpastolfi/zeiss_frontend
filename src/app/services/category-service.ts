import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../models/category.model';

@Service()
export class CategoryService {
    private http = inject(HttpClient);
    private baseUrl = 'https://localhost:7018/api/categories';

    getCategories(): Observable<CategoryResponse[]> {
        return this.http.get<CategoryResponse[]>(this.baseUrl);
    }
}
