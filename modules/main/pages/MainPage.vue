<template>
  <div class="flex flex-col items-center justify-center gap-12 pt-8 pb-8">
    <!-- Лого на главной страницы -->
    <div
      class="hero h-[265px] max-w-[900px]"
      style="
        background-image: url(https://www.agropraktika.com/upload/iblock/f77/i526y9llz9miehjz7ggu4rgy0wj1eku9.jpg);
      "
    >
      <div class="hero-overlay"></div>
      <div class="hero-content text-neutral-content text-center">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Рыбный островок</h1>
          <p class="mb-5 font-bold">
            Большой ассортимент красной и черной икры, икры щуки, рыбы, устриц и
            многое другое, переходите в каталог
          </p>
          <!-- <button class="btn btn-primary" @click="selectedCategory = 'Все'">
            Просмотр продукции
          </button> -->
        </div>
      </div>
    </div>

    <!-- Фильтры по категориям -->

    <div class="flex max-w-[900px] grid-cols-2 flex-wrap gap-2 filter">
      <button
        v-for="category in categories"
        :key="category.id"
        class="btn"
        :class="{
          'btn-primary text-white': selectedCategory === category.name
        }"
        @click="handleCategoryFilter(category)"
      >
        {{ category.name }}
      </button>
      <button
        v-if="selectedCategory !== ''"
        class="btn btn-square btn-ghost"
        @click="handleReset"
      >
        <X stroke-width="1" />
      </button>
    </div>

    <!-- Поиск -->
    <div class="flex w-full max-w-[900px] justify-end gap-2">
      <div class="join">
        <input
          v-model="searchProducts"
          class="input join-item input-xs border-1"
          type="search"
          placeholder="Поиск"
        />
      </div>
      <select
        v-model="selectedSort"
        class="select select-xs border-1"
        @change="handleSort(selectedSort)"
      >
        <option value="DEFAULT">Порядок: по умолчанию</option>
        <option value="price_asc">Цена: По возрастанию</option>
        <option value="price_desc">Цена: По убыванию</option>
      </select>
    </div>

    <!-- Карточки товара -->
    <div
      v-if="!isLoadingProducts"
      class="mx-auto grid max-w-[900px] grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="card in filteredProducts"
        :key="card.id"
        class="card w-full border-blue-600 shadow-sm"
      >
        <figure class="">
          <img
            src="https://optim.tildacdn.com/tild3633-6536-4365-b461-386262313565/-/format/webp/4_3_23.jpg"
            alt="Shoes"
            class="rounded-xl rounded-b-none"
          />
        </figure>
        <div class="card-body rounded-t-none">
          <h2 class="card-title">
            {{ card.nameProduct }}
            <div class="badge badge-secondary p-2">
              {{ new Intl.NumberFormat('ru-RU').format(card.priceProduct) }}р
            </div>
          </h2>
          <p>
            {{ truncate(card.descriptionProduct) }}
          </p>

          <button
            class="btn btn-primary"
            :disabled="card.quantityProduct === 0"
            @click="navigateTo({ name: 'product', params: { id: card.id } })"
          >
            {{ card.quantityProduct === 0 ? 'Нет в наличии' : 'Подробнее' }}
          </button>
        </div>
      </div>
    </div>
    <!-- Скелетоны -->
    <div
      v-else
      class="grid max-w-[900px] grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div v-for="i in 6" :key="i" class="mx-4 flex w-[300px] flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
    </div>

    <!-- Ничего не найдено -->
    <div v-if="filteredProducts.length === 0 && !isLoadingProducts" class="">
      <p>Ничего не нашлось</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, Category } from '~/modules/shared/types/type'
import { useProducts } from '~/modules/shared/composables/useProducts'
import { useCategory } from '../composables/useCategory'
import { X } from 'lucide-vue-next'
definePageMeta({
  layout: 'custom',
  keepalive: true
})

const selectedCategory = ref('')

const { getProducts, getProductByCategory, getProductsSort } = useProducts()
const { getCategories } = useCategory()
const cardsProduct = ref<Product[]>([])
const categories = ref<Category[]>([])
const isLoadingProducts = ref(false)
const selectedSort = ref('DEFAULT')

console.log(selectedSort.value)

onMounted(async () => {
  isLoadingProducts.value = true
  try {
    await Promise.all([getCategories(), getProducts()]).then(
      ([category, products]) => {
        categories.value = category
        cardsProduct.value = products
      }
    )
  } catch (error) {
    console.error(error)
  } finally {
    isLoadingProducts.value = false
  }
})

const handleReset = async () => {
  selectedCategory.value = ''
  isLoadingProducts.value = true
  try {
    const response = await getProducts()
    cardsProduct.value = response
  } catch (error) {
    console.error(error)
  } finally {
    isLoadingProducts.value = false
  }
}
const searchProducts = ref('')
const handleCategoryFilter = async (category: Category) => {
  console.log('Кликл Фильтр')
  selectedCategory.value = category.name
  isLoadingProducts.value = true
  searchProducts.value = ''
  try {
    const response = await getProductByCategory(category.id)
    cardsProduct.value = response
  } catch (error) {
    console.error(error)
  } finally {
    isLoadingProducts.value = false
  }
}

const filteredProducts = computed(() => {
  return cardsProduct.value.filter((item) => {
    return item.nameProduct
      .toLowerCase()
      .includes(searchProducts.value.toLowerCase())
  })
})

const handleSort = async (sort: string) => {
  if (selectedSort.value === 'DEFAULT') {
    selectedSort.value = sort
    isLoadingProducts.value = true
    try {
      const response = await getProducts()
      cardsProduct.value = response
    } catch (error) {
      console.error(error)
    } finally {
      isLoadingProducts.value = false
    }
  } else {
    selectedSort.value = sort
    isLoadingProducts.value = true
    try {
      const response = await getProductsSort(sort)
      cardsProduct.value = response
    } catch (error) {
      console.error(error)
    } finally {
      isLoadingProducts.value = false
    }
  }
}

const truncate = (str: string) => {
  return str.length > 40 ? str.slice(0, 60) + '...' : str
}
</script>

<style scoped></style>
