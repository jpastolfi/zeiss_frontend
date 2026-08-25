import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResponse } from '../../models/product.model';
import { Location } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-product-detail',
  styleUrl: './product-detail.css',
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productApi = inject(ProductService);
  private categoryApi = inject(CategoryService);
  private location = inject(Location);
  editing = signal(false);

  categories = toSignal(this.categoryApi.getCategories(), { initialValue: [] });
  private product_id = Number(this.route.snapshot.paramMap.get('id'));
  product = signal<ProductResponse | undefined>(undefined)
  constructor() {
    this.productApi.getProductById(this.product_id).subscribe(result => this.product.set(result))
  }

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    categoryName: new FormControl('', Validators.required),
  })
  
  increaseStock(value: string) {
    const quantity = Number(value);
    this.productApi.incrementProductStock(this.product_id, quantity).subscribe(updated => {
      this.product.set(updated);
    })
  }

  decreaseStock(value: string) {
    const quantity = Number(value);
    this.productApi.decrementProductStock(this.product_id, quantity).subscribe(updated => {
      this.product.set(updated);
    })
  }

  deleteProduct() {
    this.productApi.deleteProduct(this.product_id).subscribe(updated => {
      this.router.navigate(['/products']);
    })
  }

  goBack() {
    this.location.back();
  }

  editProduct() {
    this.productForm.patchValue(this.product()!);
    this.editing.set(true)
  }

  cancelEdit() {
    this.editing.set(false);
  }

  onSubmit() {
    if (this.productForm.invalid) {
       this.productForm.markAllAsTouched();
       return;
    }

    const value = this.productForm.getRawValue();

    this.productApi.updateProduct(
      this.product_id,
      {
        name: value.name!,
        price: value.price!,
        categoryName: value.categoryName!,
      }
    ).subscribe(result => {
      this.product.set(result);
      this.editing.set(false);
    })
  }
}
