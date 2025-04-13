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
          <button class="btn btn-primary" @click="selectedCategory = 'Все'">
            Просмотр продукции
          </button>
        </div>
      </div>
    </div>

    <!-- Фильтры по категориям -->

    <div class="flex max-w-[900px] grid-cols-2 flex-wrap gap-2 filter">
      <button
        v-for="category in categories"
        :key="category"
        class="btn"
        :class="{ 'bg-blue-600 text-white': selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <!-- Поиск -->
    <div class="flex w-full max-w-[900px] justify-end gap-2">
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

    <!-- Карточки товара -->
    <div
      class="mx-auto grid max-w-[900px] grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="card in cards"
        :key="card.id"
        class="card w-full border-1 border-blue-600 shadow-sm"
      >
        <figure class="px-10 py-10">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            class="rounded-xl"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {{ card.name }}
            <div class="badge badge-secondary p-2">
              {{ new Intl.NumberFormat('ru-RU').format(card.price) }}р
            </div>
          </h2>
          <p>
            {{ truncate(card.descriptionProduct) }}
          </p>

          <button class="btn btn-primary">Подробнее</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedCategory = ref('Все') // "" — означает "Все"

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

const categories = [
  'Все',
  'Икра',
  'Крабы',
  'Креветки',
  'Живые устрицы',
  'Рыба',
  'Полуфабрикаты',
  'Рыбная продукция',
  'Готовая продукция',
  'Морепродукты'
]

definePageMeta({
  layout: 'custom'
})

const truncate = (str: string) => {
  return str.length > 40 ? str.slice(0, 60) + '...' : str
}
</script>

<style scoped></style>
