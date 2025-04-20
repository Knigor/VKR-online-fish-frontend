<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
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
                Оставьте отзыв на товар

                <button
                  class="btn btn-square btn-ghost absolute top-2 right-4"
                  @click="closeModal"
                >
                  <X stroke-width="1" />
                </button>
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-900">Оцените товар</p>
                <div class="rating mt-2">
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                    aria-label="1 star"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                    aria-label="2 star"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                    aria-label="3 star"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                    aria-label="4 star"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-orange-400"
                    aria-label="5 star"
                  />
                </div>
              </div>

              <div class="mt-4">
                <p class="text-sm text-gray-900">Оцените товар</p>
                <textarea
                  type="text"
                  placeholder="Введите то что вы думаете"
                  class="textarea textarea-primary mt-2 max-h-[200px] border"
                ></textarea>
              </div>

              <div class="mt-4 flex gap-4">
                <button class="btn btn-success" @click="addedReview">
                  Добавить
                </button>
                <button class="btn btn-info" @click="closeModal">
                  Отменить
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
import { X } from 'lucide-vue-next'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  closeModal: []
  addedReview: []
}>()

function addedReview() {
  emit('addedReview')
}

function closeModal() {
  emit('closeModal')
}
</script>
