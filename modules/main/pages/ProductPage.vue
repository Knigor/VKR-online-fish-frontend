<template>
  <div class="flex flex-col items-center justify-center gap-12 pt-8 pb-8">
    <!-- Продукт -->
    <ProductComponents />
    <!-- Отзывы покупателей-->
    <p class="text-2xl">Отзывы покупателей</p>

    <div
      class="scrollbar-thumb-gray-600 scrollbar-thin scrollbar-track-gray-300 h-[600px] overflow-auto"
    >
      <ReviewRating :rating="4" />
      <ReviewRating :rating="5" />
      <ReviewRating :rating="2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ReviewRating from '../components/ReviewRating.vue'
import ProductComponents from '../components/ProductComponents.vue'
definePageMeta({
  layout: 'custom'
})
</script>
