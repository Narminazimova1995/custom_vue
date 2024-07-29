import { ref, watch } from 'vue'

function getSavedValue (key, initialValue) {
  let item = JSON.parse(localStorage.getItem(key))
  if (item) {
    return item
  }
  localStorage.setItem(key, JSON.stringify(initialValue))
  return initialValue
}

export default function useLocalStorage (key, initialValue = null) {
  let item = ref(getSavedValue(key, initialValue))
  watch(item.value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  })

  const removeValue = () => {
    item.value = null
    localStorage.removeItem(key)
  }

  return {
    removeValue,
    item
  }
}
