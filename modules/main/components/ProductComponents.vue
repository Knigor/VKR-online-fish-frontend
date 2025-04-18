<template>
  <div class="hero bg-base max-w-[900px]">
    <div class="hero-content flex-col gap-12 lg:flex-row">
      <img
        src="https://optim.tildacdn.com/tild3131-3863-4939-b633-623232613761/-/format/webp/4_3_8.jpg"
        class="max-w-sm rounded-lg shadow-2xl"
      />
      <div>
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-bold">Печень трески (ст/б, 500гр)</h1>
          <p>800 руб</p>

          <p>Цена за <span class="text-gray-600"> 50 г</span></p>

          <div class="flex gap-2 py-2">
            <ControllButtons />
            <button
              class="btn btn-primary"
              @click="() => $toast.success('Товар успешно добавлен в корзину')"
            >
              Добавить в корзину
            </button>
          </div>
          <Toaster theme="dark" position="bottom-right" />

          <p>Тип: Замороженная</p>
          <p class="py-6 text-gray-600">
            О пользе печени трески для здоровья известно с древнейших времён.
            Еще не зная о том, что такое витамины, врачи рекомендовали её
            пациентам с ослабленным зрением, больным ревматизмом и артрозами, а
            также для укрепления иммунитета. Продукт самого высшего качества с
            огромным количеством рыбьего жира, витаминов и микроэлементов,
            которые хорошо усваиваются организмом.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ControllButtons from '~/modules/shared/components/ControllButtons.vue'
const { $toast } = useNuxtApp()
</script>

<style scoped>
.my-toast {
  border: 1px solid #fda4af;
  color: red;
}
</style>
