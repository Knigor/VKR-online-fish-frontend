<template>
  <article class="max-w-[900px]">
    <div class="mb-4 flex items-center">
      <div class="flex items-center gap-4">
        <div class="avatar">
          <div class="w-24 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div class="font-medium dark:text-white">
          <p>
            Кретов Игорь Олегович
            <span class="block text-sm text-gray-500 dark:text-gray-400"
              >knigor1337@gmail.ru</span
            >
          </p>
        </div>
      </div>
    </div>
    <div class="mb-1 flex items-center space-x-1 rtl:space-x-reverse">
      <!-- Звёздочки сюда -->
      <div class="rating">
        <input
          v-for="count in 5"
          :key="count"
          type="radio"
          :name="`rating-${uniqId}`"
          class="mask mask-star-2 bg-orange-400"
          :aria-label="`${count} star`"
          :checked="count === rating"
          disabled
        />
      </div>
    </div>

    <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400">
      <p>
        Написано
        <time>{{
          formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1)
        }}</time>
      </p>
    </footer>
    <p class="mb-2 text-gray-500 dark:text-gray-400">
      This is my third Invicta Pro Diver. They are just fantastic value for
      money. This one arrived yesterday and the first thing I did was set the
      time, popped on an identical strap from another Invicta and went in the
      shower with it to test the waterproofing.... No problems.
    </p>
    <a
      href="#"
      class="mb-5 block text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
      >Read more</a
    >
    <aside>
      <!-- <div class="mt-3 flex items-center">
        <a
          href="#"
          class="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >Helpful</a
        >
        <a
          href="#"
          class="ms-4 border-s border-gray-200 ps-4 text-sm font-medium text-blue-600 hover:underline md:mb-0 dark:border-gray-600 dark:text-blue-500"
          >Report abuse</a
        >
      </div> -->
    </aside>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  rating: number
}>()

const uniqId = ref(Math.random())
const created_at = ref('2025-04-10 15:43:26')

const formatedDate = computed(() => {
  const date = new Date(created_at.value)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<style scoped>
input[type='radio'] {
  cursor: default;
}
</style>
