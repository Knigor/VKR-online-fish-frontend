<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4"
  >
    <div
      class="w-full max-w-md rounded-md border border-blue-300 bg-white p-6 shadow-md"
    >
      <h1 class="text-center text-2xl font-semibold text-gray-700">
        Здравствуйте
      </h1>
      <p class="mt-4 text-center text-base text-gray-600">
        Добро пожаловать, введите ваш Email
      </p>
      <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
        <div>
          <label id="email" class="label">
            <span class="label-text text-base">Почта</span>
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Введите почту"
            class="input input-bordered input-primary mt-1 w-full border"
            :class="{ 'border-red-500': errors.email }"
          />
          <span v-if="errors.email" class="text-xs text-red-500">
            {{ errors.email }}
          </span>
        </div>
        <div>
          <label id="password" class="label">
            <span class="label-text text-base">Пароль</span>
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Введите пароль"
            class="input input-bordered input-primary mt-1 w-full border"
            :class="{ 'border-red-500': errors.password }"
          />
          <span v-if="errors.password" class="text-xs text-red-500">
            {{ errors.password }}
          </span>
        </div>

        <div class="relative">
          <button
            :class="{ 'opacity-50': loading }"
            class="btn btn-primary btn-block mt-4"
            type="submit"
          >
            Войти
          </button>
          <transition name="fade">
            <progress
              v-if="loading"
              class="progress absolute inset-0 bottom-2 text-blue-600 transition-all duration-300"
            ></progress>
          </transition>
        </div>

        <div>
          <NuxtLink to="/register">
            <button class="btn btn-block">Зарегистрироваться</button>
          </NuxtLink>
        </div>
      </form>
    </div>

    <footer class="fixed bottom-0 left-0 w-full p-3 text-sm text-gray-600">
      @ ВКР Интернет-магазина рыбной продукции
    </footer>
  </div>
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import type { ValidationError } from 'yup'

interface ErrorsLogin {
  email: string
  password: string
}

const loading = ref(false)

const schema = object({
  email: string()
    .email('Введите корректный email')
    .required('Email обязателен для заполнения'),
  password: string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .required('Пароль обязателен для заполнения')
})

const form = ref({
  email: '',
  password: ''
})

const errors = ref<ErrorsLogin>({
  email: '',
  password: ''
})

const clearErrors = () => {
  errors.value = {
    email: '',
    password: ''
  }
}

const handleSubmit = async () => {
  clearErrors()
  loading.value = true

  try {
    await schema.validate(form.value, { abortEarly: false })

    navigateTo('/')
  } catch (error) {
    const validationError = error as ValidationError
    if (validationError.inner) {
      validationError.inner.forEach((err) => {
        if (
          err.path &&
          errors.value[err.path as keyof ErrorsLogin] !== undefined
        ) {
          errors.value[err.path as keyof ErrorsLogin] = err.message
        }
      })
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Добавьте стили для ошибок если нужно */
.border-red-500 {
  border-color: #ef4444;
}
</style>
