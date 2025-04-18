import type { $Fetch } from 'ofetch'

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

  return { getProductById }
}
