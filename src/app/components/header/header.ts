import { Component, inject } from '@angular/core';
import { SearchState } from '../../services/search-state';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private searchState = inject(SearchState);
  onSearchInput(value: string) {
    this.searchState.setQuery(value)
  }
}
