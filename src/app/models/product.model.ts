export interface CreateProductData {
    name: string,
    price: number,
    categoryName: string,
    stock: number,
}

export interface UpdateProductData {
    name?: string,
    price?: number,
    categoryName?: string,
}

export interface ProductResponse extends CreateProductData {
    id: number,
}
