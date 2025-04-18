<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10">
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg leading-6 font-medium text-gray-900"
              >
                <button
                  class="btn btn-square btn-ghost absolute top-2 right-4"
                  @click="closeModal"
                >
                  <X stroke-width="1" />
                </button>
                Редактировать {{ cardProduct.name }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Редактирование</p>
              </div>

              <form class="mt-4 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Название продукта
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-primary mt-2 border"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Описание продукта
                  </label>
                  <textarea
                    type="text"
                    placeholder="Primary"
                    class="textarea textarea-primary max-h-12 border"
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Цена
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-primary mt-2 border"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Количество
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-primary mt-2 border"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Тип продукта
                  </label>
                  <input
                    type="text"
                    placeholder="Охлажденная"
                    class="input input-primary mt-2 border"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Вес продукта
                  </label>
                  <input
                    type="text"
                    placeholder="50 г"
                    class="input input-primary mt-2 border"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Кол-во товара на складе
                  </label>
                  <input
                    type="text"
                    placeholder="23"
                    class="input input-primary mt-2 border"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Вставьте ссылку на картинку
                  </label>
                  <input
                    type="text"
                    placeholder="http://aboba.ru"
                    class="input input-primary mt-2 border"
                  />
                </div>

                <div class="mt-4 flex gap-4">
                  <button class="btn btn-accent" @click="updateProduct">
                    Обновить
                  </button>
                  <button class="btn btn-info" @click="closeModal">
                    Отменить
                  </button>
                </div>
              </form>
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
import { X } from 'lucide-vue-next'

interface Card {
  id: number
  descriptionProduct: string
  name: string
  price: number
}

defineProps<{
  isOpen: boolean
  cardProduct: Card
}>()

// const name = ref('')

const emit = defineEmits<{
  closeModal: []
  updateProduct: []
}>()

function updateProduct() {
  emit('updateProduct')
}

function closeModal() {
  emit('closeModal')
}
</script>
