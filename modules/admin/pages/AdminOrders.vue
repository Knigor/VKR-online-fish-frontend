<template>
  <div class="flex flex-col items-center justify-center gap-12 pt-8 pb-8">
    <!-- Поиск -->
    <div class="mr-4 flex w-full max-w-[900px] justify-end gap-2">
      <div class="join">
        <input
          class="input join-item input-xs border-1"
          type="search"
          placeholder="Поиск"
        />
      </div>

      <select class="select select-xs border-1">
        <option value="default">Порядок: по умолчанию</option>
        <option value="success">Порядок: Отклоненные</option>
        <option value="pending">Порядок: Одобренные</option>
      </select>
    </div>

    <!-- Отзывы -->

    <div
      class="scrollbar-thumb-gray-600 scrollbar-thin scrollbar-track-gray-300 grid h-[600px] max-w-[900px] gap-4 overflow-auto lg:grid-cols-2"
    >
      <OrdersAdmin v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrdersAdmin from '../components/OrdersAdmin.vue'
import { useOrders } from '~/modules/shared/composables/useOrders'
import type { Order } from '~/modules/shared/types/type'

definePageMeta({
  layout: 'custom'
})

const orders = ref<Order[]>()
const isLoadingOrder = ref(false)

const { getOrders } = useOrders()

onMounted(async () => {
  isLoadingOrder.value = true
  try {
    const response = await getOrders()
    orders.value = response
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped></style>
