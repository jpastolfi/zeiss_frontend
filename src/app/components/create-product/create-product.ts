import { Component, inject, output } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { CreateProductData, ProductResponse } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-create-product',
  styleUrl: './create-product.css',
  templateUrl: './create-product.html',
})
export class CreateProduct {
  private location = inject(Location);  
  private router = inject(Router);  
  private productApi = inject(ProductService);
  private categoryApi = inject(CategoryService);

  categories = toSignal(this.categoryApi.getCategories(), { initialValue: [] });

  created = output<ProductResponse>();

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    categoryName: new FormControl('', Validators.required),
  })

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const value = this.productForm.getRawValue();

    const newProduct: CreateProductData = {
      name: value.name!,
      price: value.price!,
      categoryName: value.categoryName!,
      stock: 0,
    }

    this.productApi.createProduct(newProduct)
      .subscribe(result => this.created.emit(result));

      this.router.navigate(['/products']);
  }
}
