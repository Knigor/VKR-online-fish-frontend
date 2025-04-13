<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog class="relative z-10" as="div" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="relative w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <button
                class="btn btn-square btn-ghost absolute top-2 right-4"
                @click="closeModal"
              >
                <X stroke-width="1" />
              </button>
              <DialogTitle
                as="h3"
                class="text-lg leading-6 font-medium text-gray-900"
              >
                Оформление заказа
              </DialogTitle>

              <hr class="mt-4" />
              <div class="mt-2 mb-2">
                <!-- Карточки товаров в корзине -->
                <ul class="list bg-base-100 rounded-box shadow-md">
                  <li class="list-row items-center">
                    <div>
                      <img
                        class="rounded-box size-25"
                        src="https://static.tildacdn.com/stor6565-3463-4632-a133-646663663863/42978652.jpg"
                      />
                    </div>
                    <div>
                      <div class="mt-1">Живые устрицы товар 1</div>
                    </div>

                    <div class="flex items-center gap-1">
                      <button
                        class="btn btn-square btn-ghost"
                        @click="handleMinus"
                      >
                        <Minus stroke-width="1" />
                      </button>

                      <input
                        v-model="quantity"
                        class="input input-neutral flex h-8 w-8 items-center justify-center p-1"
                        @input="handleInput"
                      />

                      <button
                        class="btn btn-square btn-ghost"
                        @click="handlePlus"
                      >
                        <Plus stroke-width="1" />
                      </button>
                    </div>
                    <p class="inline-block w-24 text-end text-gray-600">
                      {{ new Intl.NumberFormat('ru-RU').format(priceProduct) }}
                      р.
                    </p>

                    <button class="btn btn-square btn-ghost">
                      <X stroke-width="1" />
                    </button>
                  </li>
                </ul>
              </div>

              <hr class="" />

              <p class="mt-4 mb-4 text-end">Сумма: <span>14 888</span> р.</p>

              <hr class="" />

              <div class="mt-2">
                <h3 class="text-lg font-semibold">Контактная информация</h3>
                <div class="mt-2">
                  <p class="text-primary text-[16px]">
                    Имя:
                    <span class="text-gray-500">{{
                      authStore.user?.name
                    }}</span>
                  </p>
                  <p class="text-primary text-[16px]">
                    Почта:
                    <span class="text-gray-500">{{
                      authStore.user?.email
                    }}</span>
                  </p>
                  <p class="text-primary text-[16px]">
                    Телефон:
                    <span class="text-gray-500">{{
                      authStore.user?.phone
                    }}</span>
                  </p>
                </div>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="btn btn-primary btn-block"
                  @click="closeModal"
                >
                  Оформить заказ
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import { useAuthStore } from '~/modules/auth/store/authStore'
import { X, Minus, Plus } from 'lucide-vue-next'

const authStore = useAuthStore()
const isOpen = defineModel<boolean>('isOpen')
function closeModal() {
  isOpen.value = false
}

const quantity = ref(1)
const priceProduct = ref(5160)

const handlePlus = () => {
  if (quantity.value < 99) {
    quantity.value++
    priceProduct.value = quantity.value * 5160
  }
}
const handleMinus = () => {
  if (quantity.value > 1) {
    quantity.value--
    priceProduct.value = quantity.value * 5160
  }
}

const handleInput = () => {
  quantity.value = Math.min(99, Math.max(1, quantity.value))
  priceProduct.value = quantity.value * 5160
}
</script>
