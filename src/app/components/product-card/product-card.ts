import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductResponse } from '../../models/product.model';

@Component({
  imports: [RouterLink],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<ProductResponse>()
}
