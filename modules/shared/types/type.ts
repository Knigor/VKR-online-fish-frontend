export interface Category {
  id: number
  name: string
}

export interface Product {
  id: number
  nameProduct: string
  descriptionProduct: string
  imageUrlProduct: string
  priceProduct: number
  productWeight: string
  quantityProduct: number
  typeProducts: string
  categoryId: number
}
