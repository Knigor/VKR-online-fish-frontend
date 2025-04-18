<template>
  <div class="flex flex-col items-center justify-center gap-12 pt-8 pb-8">
    <!-- Фильтры по категориям -->

    <!-- <div class="flex max-w-[900px] grid-cols-2 flex-wrap gap-2 filter">
      <button
        v-for="category in categories"
        :key="category"
        class="btn"
        :class="{ 'bg-blue-600 text-white': selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div> -->

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
        <option selected>Порядок: по умолчанию</option>
        <option>Цена: По возрастанию</option>
        <option>Цена: По убыванию</option>
      </select>
    </div>

    <div class="mr-4 flex w-full max-w-[900px] justify-end gap-4">
      <p class="link link-accent underline-offset-4" @click="openAddedModal">
        Добавить
      </p>
      <p class="link link-primary underline-offset-4">Отзывы</p>
    </div>

    <!-- Карточки товара -->
    <div
      class="mx-auto grid max-w-[900px] grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="card in cards"
        :key="card.id"
        class="card w-full border-blue-600 shadow-sm"
      >
        <figure class="">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            class="rounded-xl rounded-b-none"
          />
        </figure>
        <div class="card-body rounded-t-none">
          <h2 class="card-title">
            {{ card.name }}
            <div class="badge badge-secondary p-2">
              {{ new Intl.NumberFormat('ru-RU').format(card.price) }}р
            </div>
          </h2>
          <p>
            {{ truncate(card.descriptionProduct) }}
          </p>

          <div class="flex gap-2">
            <button class="btn btn-secondary" @click="openDeleteModal(card)">
              Удалить
            </button>
            <button
              class="btn btn-warning max-w-[130px]"
              @click="openUpdateModal(card)"
            >
              Редактировать
            </button>
          </div>

          <!-- Модалка на удаление -->

          <DeleteModal
            v-if="currentCardName"
            :card-product="currentCardName"
            :is-open="isOpenDelete"
            @close-modal="isOpenDelete = false"
          />

          <!-- Модалка на редактирование -->
          <UpdateModal
            v-if="currentCardName"
            :card-product="currentCardName"
            :is-open="isOpenUpdate"
            @close-modal="isOpenUpdate = false"
          />

          <!-- Модалка на добавление -->

          <AddedModal
            :is-open="isOpenAdded"
            :categories="categories"
            @close-modal="isOpenAdded = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DeleteModal from '../components/DeleteModal.vue'
import UpdateModal from '../components/UpdateModal.vue'
import AddedModal from '../components/AddedModal.vue'
import { useCategory } from '~/modules/main/composables/useCategory'
import type { Category } from '~/modules/shared/types/type'
import { useProducts } from '~/modules/shared/composables/useProducts'
const { getCategories } = useCategory()
const { getProductById } = useProducts()

const categories = ref<Category[]>([])

onMounted(async () => {
  try {
    const response = await getCategories()
    categories.value = response
  } catch (error) {
    console.error(error)
  }
})

interface Card {
  id: number
  descriptionProduct: string
  name: string
  price: number
}

definePageMeta({
  layout: 'custom'
})

const isOpenDelete = ref(false)
const currentCardName = ref<Card>()

const isOpenUpdate = ref(false)

const isOpenAdded = ref(false)

function openDeleteModal(card: Card) {
  isOpenDelete.value = true
  currentCardName.value = card
}

async function openUpdateModal(card: Card) {
  isOpenUpdate.value = true
  currentCardName.value = card

  try {
    const response = await getProductById(card.id)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

function openAddedModal() {
  isOpenAdded.value = true
}

const cards = ref([
  {
    id: 1,
    descriptionProduct: 'Описание продукта 5 из категории Икра.',
    name: 'Чёрная икра',
    price: 100
  },
  {
    id: 2,
    descriptionProduct: 'Описание продукта 5 из категории Икра.',
    name: 'Крабы',
    price: 11200
  },
  {
    id: 3,
    descriptionProduct: 'Описание продукта 5 из категории Икра.',
    name: 'Креветки норм',
    price: 300
  },
  {
    id: 4,
    descriptionProduct:
      'Описание продукта 5 из категории Икра. Описание продукта 5 из категории Икра. Описание продукта 5 из категории Икра. Описание продукта 5 из категории Икра.',
    name: 'Креветки супер',
    price: 300
  }
])

const truncate = (str: string) => {
  return str.length > 40 ? str.slice(0, 60) + '...' : str
}
</script>

<style scoped></style>
