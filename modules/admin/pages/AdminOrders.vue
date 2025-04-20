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
        <button class="btn join-item btn-xs rounded-r-full">Найти</button>
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
      <OrdersAdmin />
      <OrdersAdmin />
      <OrdersAdmin />
      <OrdersAdmin />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrdersAdmin from '../components/OrdersAdmin.vue'

definePageMeta({
  layout: 'custom'
})
</script>

<style scoped></style>
