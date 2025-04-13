<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <NuxtLink
        to="/"
        class="link link-primary text-xl no-underline hover:text-blue-600"
        >Рыбный островок</NuxtLink
      >
    </div>

    <div class="mr-4 flex flex-wrap items-end gap-4">
      <!-- Поиск  -->
      <div class="flex gap-2">
        <input
          id="search"
          placeholder="Поиск..."
          class="input input-bordered input-primary mt-1 w-full border"
        />
      </div>
      <!-- Иконки -->
      <div class="dropdown dropdown-end flex gap-2">
        <!-- Иконка корзины -->
        <div
          class="tooltip tooltip-primary hover:tooltip-open tooltip-bottom"
          data-tip="Открыть"
        >
          <div
            role="button"
            class="btn btn-ghost btn-circle"
            @click="$emit('openCart')"
          >
            <div class="indicator">
              <ShoppingCart />
              <span class="badge badge-sm indicator-item">1</span>
            </div>
          </div>
        </div>

        <!-- Иконка админа -->
        <div
          v-if="userRole === 'ROLE_ADMIN'"
          class="tooltip tooltip-primary hover:tooltip-open tooltip-bottom"
          data-tip="Админка"
        >
          <div role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <ShieldUser />
            </div>
          </div>
        </div>

        <!-- Иконка выхода -->

        <div
          class="tooltip tooltip-primary hover:tooltip-open tooltip-bottom"
          data-tip="Выход"
        >
          <div
            role="button"
            class="btn btn-ghost btn-circle"
            @click="$emit('logOut')"
          >
            <div class="indicator">
              <LogOut />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CartModal v-model:is-open="isOpen" />
</template>

<script setup lang="ts">
import { LogOut, ShoppingCart, ShieldUser } from 'lucide-vue-next'
import CartModal from './CartModal.vue'

const isOpen = defineModel<boolean>('isOpen')
const userRole = defineModel<string>('userRole')
defineEmits(['logOut', 'openCart'])
</script>

<style scoped></style>
