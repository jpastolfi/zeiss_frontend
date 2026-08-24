import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  private api = inject(ProductService);
  products = toSignal(this.api.getProducts(), { initialValue: []});
}
