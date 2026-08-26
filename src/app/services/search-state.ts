import { Service, signal } from '@angular/core';

@Service()
export class SearchState {
    private _query = signal('');
    readonly query = this._query.asReadonly();
    setQuery(value: string)
    {
        this._query.set(value);
    }
}
 