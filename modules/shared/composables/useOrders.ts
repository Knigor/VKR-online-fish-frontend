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

  const deleteOrder = async (id: number) => {
    try {
      const response = await $protectedApi(`orders/items/${id}`, {
        method: 'DELETE'
      })
      return response
    } catch (error) {
      console.error('Ошибка при удалении заказа:', error)
    }
  }

  const updateOrder = async (id: number, status: string) => {
    try {
      const response = await $protectedApi(`orders/${id}/status`, {
        method: 'PATCH',
        body: { status }
      })
      return response
    } catch (error) {
      console.error('Ошибка при обновлении заказа:', error)
    }
  }

  return { getOrders, deleteOrder, updateOrder }
}
