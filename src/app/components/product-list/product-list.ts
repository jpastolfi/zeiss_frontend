import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SearchState } from '../../services/search-state';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ProductCard } from "../product-card/product-card";

@Component({
  imports: [ProductCard],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  private api = inject(ProductService);
  private searchState = inject(SearchState);

  private query$ = toObservable(this.searchState.query);

  products = toSignal(
    this.query$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => (
        term.trim() == ''
        ? this.api.getProducts()
        : this.api.getProductByName(term))
      )
    ),
    { initialValue: []}
  );
}
