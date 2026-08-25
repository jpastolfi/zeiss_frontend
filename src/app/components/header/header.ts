import { Component, inject } from '@angular/core';
import { SearchState } from '../../services/search-state';
import { Router, RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private searchState = inject(SearchState);
  private route = inject(Router)
  onSearchInput(value: string) {
    this.searchState.setQuery(value)
  }
  redirectToCreateProduct = () => this.route.navigate(['products/new'])
}
