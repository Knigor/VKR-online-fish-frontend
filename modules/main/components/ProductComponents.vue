<template>
  <div class="hero bg-base max-w-[900px]">
    <div class="hero-content flex-col gap-12 lg:flex-row">
      <img
        :src="product.imageUrlProduct"
        class="max-w-sm rounded-lg shadow-2xl"
      />
      <div>
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-bold">{{ product.nameProduct }}</h1>
          <div class="badge badge-secondary p-2">
            {{ new Intl.NumberFormat('ru-RU').format(product.priceProduct) }}р
          </div>

          <p>
            Цена за
            <span class="text-gray-600">{{ product.productWeight }}</span>
          </p>

          <div class="flex gap-2 py-2">
            <ControllButtons />
            <button
              class="btn btn-primary"
              @click="() => $toast.success('Товар успешно добавлен в корзину')"
            >
              Добавить в корзину
            </button>
            <button class="btn btn-info" @click="handleOpenReview">
              Оставить отзыв
            </button>
          </div>
          <Toaster theme="dark" position="bottom-right" />

          <!-- Модалка на добавление отзыва -->
          <ReviewProduct
            :is-open="isOpen"
            @added-review="handleAddedReview"
            @close-modal="isOpen = false"
          />

          <p>Тип: {{ product.typeProducts }}</p>
          <p class="py-6 text-gray-600">
            {{ product.descriptionProduct }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ControllButtons from '~/modules/shared/components/ControllButtons.vue'
import ReviewProduct from './ReviewProduct.vue'
import type { Product } from '~/modules/shared/types/type'

defineProps<{
  product: Product
}>()

const { $toast } = useNuxtApp()
const isOpen = ref(false)

const handleAddedReview = () => {
  $toast.success('Отзыв отправлен на модерацию')
  isOpen.value = false
}

const handleOpenReview = () => {
  isOpen.value = true
}
</script>

<style scoped>
.my-toast {
  border: 1px solid #fda4af;
  color: red;
}
</style>
