import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { NotFound } from './components/not-found/not-found';
import { CreateProduct } from './components/create-product/create-product';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
    },
    {
        path: 'products',
        component: ProductList,
        title: 'Products Page',
    },
    {
        path: 'products/new',
        component: CreateProduct,
        title: 'Create Product Page',
    },
    {
        path: 'products/:id',
        component: ProductDetail,
        title: 'Product Page',
    },
    {
        path: '**',
        component: NotFound,
        title: 'Page Not Found',
    },
];
