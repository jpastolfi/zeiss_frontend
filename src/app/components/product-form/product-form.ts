import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export class ProductForm {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
