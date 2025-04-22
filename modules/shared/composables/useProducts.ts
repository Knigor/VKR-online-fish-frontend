import type { $Fetch } from 'ofetch'
import type { Product, AddedProduct } from '../types/type'
import { useAuthStore } from '~/modules/auth/store/authStore'

export const useProducts = () => {
  const { $protectedApi } = useNuxtApp() as unknown as { $protectedApi: $Fetch }
  const authStore = useAuthStore()

  const getProductById = async (id: number) => {
    try {
      const response = await $protectedApi(`products/${id}`, { method: 'GET' })
      return response
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error)
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

  const deleteProduct = async (id: number) => {
    try {
      const response = await $protectedApi(`products/${id}`, {
        method: 'DELETE'
      })
      return response
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error)
    }
  }

  const addedProduct = async (product: AddedProduct) => {
    Object.assign(product, { userId: authStore.user?.id })

    try {
      const response = await $protectedApi('products', {
        method: 'POST',
        body: JSON.stringify(product) || product
      })
      return response
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error)
    }
  }

  return {
    getProductById,
    addedProduct,
    getProducts,
    getProductByCategory,
    getProductsSort,
    deleteProduct
  }
}
