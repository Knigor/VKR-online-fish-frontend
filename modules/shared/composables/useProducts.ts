import type { $Fetch } from 'ofetch'
import type { Product } from '../types/type'

export const useProducts = () => {
  const { $protectedApi } = useNuxtApp() as unknown as { $protectedApi: $Fetch }

  const getProductById = async (id: number) => {
    try {
      const response = await $protectedApi(`products/${id}`, { method: 'GET' })
      return response
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error)
      return []
    }
  }

  const getProducts = async (): Promise<Product[]> => {
    try {
      const response = await $protectedApi('products', { method: 'GET' })
      return response
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error)
      return []
    }
  }

  const getProductByCategory = async (
    categoryId: number
  ): Promise<Product[]> => {
    try {
      const response = await $protectedApi(
        `productsCategory/?category_id=${categoryId}`,
        {
          method: 'GET'
        }
      )
      return response
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error)
      return []
    }
  }

  const getProductsSort = async (sort: string): Promise<Product[]> => {
    try {
      const response = await $protectedApi(`products?sort=${sort}`, {
        method: 'GET'
      })
      return response
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error)
      return []
    }
  }

  return { getProductById, getProducts, getProductByCategory, getProductsSort }
}
