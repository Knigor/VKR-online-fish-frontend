<template>
  <article class="mr-4 max-w-[900px]">
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
      shower with it to test the waterproofing.... No problems. This is my third
      Invicta Pro Diver. They are just fantastic value for money. This one
      arrived yesterday and the first thing I did was set the time, popped on an
      identical strap from another Invicta and went in the shower with it to
      test the waterproofing.... No problems.
    </p>
    <div class="flex justify-end gap-4">
      <button class="btn btn-success">Одобрить</button>
      <button class="btn btn-error">Удалить</button>
    </div>
    <aside></aside>
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
