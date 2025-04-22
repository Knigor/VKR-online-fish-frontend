import type { $Fetch } from 'ofetch'

export const useOrders = () => {
  const { $protectedApi } = useNuxtApp() as unknown as { $protectedApi: $Fetch }

  const getOrders = async () => {
    try {
      const response = await $protectedApi('orders', { method: 'GET' })
      return response
    } catch (error) {
      console.error('Ошибка при получении заказов:', error)
      return []
    }
  }

  return { getOrders }
}
