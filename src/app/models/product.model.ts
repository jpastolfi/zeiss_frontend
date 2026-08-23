export interface CreateProduct {
    name: string,
    price: number,
    categoryName: string,
    stock: number,
}

export type UpdateProduct = Partial<CreateProduct>

export interface ProductResponse extends CreateProduct {
    id: number,
}
