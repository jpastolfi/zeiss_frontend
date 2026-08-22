export interface UpdateProduct {
    name: string,
    price: number,
    categoryName: string,
}

export interface CreateProduct extends UpdateProduct {
    stock: number,
}

export interface ProductResponse extends CreateProduct {
    id: number,
}

export interface Product {
    name: string,
    price: number,
    categoryName: string,
    stock: number,
    id: number,
}