import type { $Fetch } from 'ofetch'

export const useReviews = () => {
  const { $protectedApi } = useNuxtApp() as unknown as { $protectedApi: $Fetch }

  const getReviews = async (productId: number) => {
    try {
      const response = await $protectedApi(`reviews/product/${productId}`, {
        method: 'GET'
      })
      return response
    } catch (error) {
      console.error('Ошибка при получении отзывов:', error)
    }
  }
  return { getReviews }
}
