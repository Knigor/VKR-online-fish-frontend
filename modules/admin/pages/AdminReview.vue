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
        <option value="success">Порядок: Прошли модерацию</option>
        <option value="pending">Порядок: Не прошли модерацию</option>
      </select>
    </div>

    <div class="mr-4 flex w-full max-w-[900px] justify-end gap-4">
      <p class="link link-accent underline-offset-4" @click="$router.back()">
        Назад
      </p>
    </div>

    <!-- Отзывы -->

    <div
      class="scrollbar-thumb-gray-600 scrollbar-thin scrollbar-track-gray-300 h-[600px] overflow-auto"
    >
      <ReviewRatingAdmin :rating="4" />
      <ReviewRatingAdmin :rating="5" />
      <ReviewRatingAdmin :rating="2" />
      <ReviewRatingAdmin :rating="2" />
      <ReviewRatingAdmin :rating="2" />
      <ReviewRatingAdmin :rating="2" />
      <ReviewRatingAdmin :rating="2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ReviewRatingAdmin from '../components/ReviewRatingAdmin.vue'

definePageMeta({
  layout: 'custom'
})
</script>

<style scoped></style>
