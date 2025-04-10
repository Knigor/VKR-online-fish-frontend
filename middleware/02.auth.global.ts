export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/authorization') {
    console.log('02.auth.global')
  }
})
