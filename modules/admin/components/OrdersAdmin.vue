<template>
  <div class="mr-6 space-y-6">
    <div class="rounded-xl border p-4 shadow-md">
      <div
        class="mb-2 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h2 class="text-lg font-bold">Заказ №{{ order.id }}</h2>
          <p class="text-sm text-gray-600">Создан: {{ order.createdAt }}</p>
          <p class="text-sm text-gray-600">
            Пользователь: {{ order.userName }} ({{ order.userEmail }})
          </p>
          <p class="text-sm text-gray-600">Телефон: {{ order.phone }}</p>
        </div>
      </div>

      <div class="border-t pt-2">
        <h3 class="mb-1 text-sm font-semibold">Товары:</h3>
        <ul class="space-y-1">
          <li
            v-for="item in order.items"
            :key="item.id"
            class="flex justify-between text-sm"
          >
            <span
              >{{ item.productName }} ({{ item.quantity }} ×
              {{ item.price }}₽)</span
            >
            <span class="font-medium">{{ item.total }}₽</span>
          </li>
        </ul>
      </div>

      <div class="border-t pt-2 text-right text-sm font-semibold">
        Итого: {{ order.totalQuantity }} шт. / {{ order.totalAmount }}₽
      </div>

      <div
        class="flex items-center justify-end gap-4 border-t pt-2 text-right text-sm font-semibold"
      >
        <button class="btn btn-success btn-xs">Одобрить</button>
        <button class="btn btn-warning btn-xs">Отклонить</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '~/modules/shared/types/type'

defineProps<{
  order: Order
}>()
</script>
