import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResponse } from '../../models/product.model';
import { Location } from '@angular/common';

@Component({
  imports: [],
  selector: 'app-product-detail',
  styleUrl: './product-detail.css',
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ProductService);
  private location = inject(Location);

  private product_id = Number(this.route.snapshot.paramMap.get('id'));
  product = signal<ProductResponse | undefined>(undefined)
  constructor() {
    this.api.getProductById(this.product_id).subscribe(result => this.product.set(result))
  }
  increaseStock(value: string) {
    const quantity = Number(value);
    this.api.incrementProductStock(this.product_id, quantity).subscribe(updated => {
      this.product.set(updated);
    })
  }

  decreaseStock(value: string) {
    const quantity = Number(value);
    this.api.decrementProductStock(this.product_id, quantity).subscribe(updated => {
      this.product.set(updated);
    })
  }

  deleteProduct() {
    this.api.deleteProduct(this.product_id).subscribe(updated => {
      this.router.navigate(['/products']);
    })
  }

  goBack() {
    this.location.back();
  }
}
