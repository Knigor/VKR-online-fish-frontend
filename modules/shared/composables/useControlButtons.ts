export const useControllButtons = () => {
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

  return { handlePlus, handleMinus, handleInput, quantity, priceProduct }
}
