import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
    },
    {
        path: 'products',
        component: undefined,
        title: 'Products Page',
    },
    {
        path: 'products/new',
        component: undefined,
        title: 'Create Product Page',
    },
    {
        path: 'products/:id/edit',
        component: undefined,
        title: 'Edit Product Page',
    },
    {
        path: 'products/:id',
        component: undefined,
        title: 'Product Page',
    },
    {
        path: '**',
        component: undefined,
        title: 'Page Not Found',
    },
];
