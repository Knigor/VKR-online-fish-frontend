<template>
  <div
    class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4"
  >
    <div
      class="w-full max-w-md rounded-md border border-blue-300 bg-white p-6 shadow-md"
    >
      <h1 class="text-center text-2xl font-semibold text-gray-700">
        Регистрация
      </h1>
      <p class="mt-4 text-center text-base text-gray-600">
        Создайте новый аккаунт
      </p>
      <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
        <div>
          <label id="name" class="label">
            <span class="label-text text-base">Имя</span>
          </label>
          <input
            id="name"
            v-model="formRegister.name"
            type="text"
            placeholder="Введите ваше имя"
            class="input input-bordered input-primary mt-1 w-full border"
          />
          <span v-if="errors.name" class="text-xs text-red-500">
            {{ errors.name }}
          </span>
        </div>

        <div>
          <label id="phone" class="label">
            <span class="label-text text-base">Телефон</span>
          </label>
          <input
            id="phone"
            v-model="formRegister.phone"
            type="tel"
            placeholder="Введите номер телефона"
            class="input input-bordered input-primary mt-1 w-full border"
          />
          <span v-if="errors.phone" class="text-xs text-red-500">
            {{ errors.phone }}
          </span>
        </div>

        <div>
          <label id="email" class="label">
            <span class="label-text text-base">Почта</span>
          </label>
          <input
            id="email"
            v-model="formRegister.email"
            type="email"
            placeholder="Введите почту"
            class="input input-bordered input-primary mt-1 w-full border"
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
            v-model="formRegister.password"
            type="password"
            placeholder="Введите пароль"
            class="input input-bordered input-primary mt-1 w-full border"
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
            Зарегистрироваться
          </button>
          <transition name="fade">
            <progress
              v-if="loading"
              class="progress absolute inset-0 bottom-2 text-blue-600 transition-all duration-300"
            ></progress>
          </transition>
        </div>

        <div>
          <NuxtLink to="/authorization">
            <button class="btn btn-block">Уже есть аккаунт? Войти</button>
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

const schema = object({
  name: string().required('Имя обязательно для заполнения'),
  phone: string().required('Телефон обязателен для заполнения'),
  email: string()
    .email('Введите корректный email')
    .required('Email обязателен для заполнения'),
  password: string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .required('Пароль обязателен для заполнения')
})

const formRegister = ref({
  name: '',
  phone: '',
  email: '',
  password: ''
})

const errors = ref({
  name: '',
  phone: '',
  email: '',
  password: ''
})

const clearErrors = () => {
  errors.value = {
    name: '',
    phone: '',
    email: '',
    password: ''
  }
}

const loading = ref(false)

const handleSubmit = async () => {
  clearErrors()
  loading.value = true

  try {
    await schema.validate(formRegister.value, { abortEarly: false })

    navigateTo('/')
  } catch (error) {
    const validationError = error as ValidationError
    if (validationError.inner) {
      validationError.inner.forEach((err) => {
        if (
          err.path &&
          errors.value[err.path as keyof typeof errors.value] !== undefined
        ) {
          errors.value[err.path as keyof typeof errors.value] = err.message
        }
      })
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
