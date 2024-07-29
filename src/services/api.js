import axios from 'axios'
import { ElNotification } from 'element-plus'
import store from '@/store'

const headers = {
  Accept: 'application/json', 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer n0oLJk7fcqNCWMJUQesCqBdnxsVOVJTk6hojuXiv275Trko3DZ`;
  return config;
});

api.interceptors.response.use(undefined, (error) => {
  let errorMessage = error.response?.data?.message

  if (error.response && (error.response.status === 401 || error.response.status === 419)) {
    store.dispatch('auth/LOGOUT')
    if (window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
    ElNotification({ type: 'error',zIndex:99999,title: 'Ошибка авторизации', message: 'Введен неверный логин или пароль' })
    return Promise.reject(error)
  }
  if (error.response && error.response.status === 403) {
    ElNotification({ type: 'error',zIndex:99999,title: 'Ошибка авторизации', message: 'Нет прав на совершение действия' })
    return Promise.reject(error)
  }
  if (error.response && error.response.status === 404) {
    ElNotification({ type: 'error',zIndex:99999,title: '404', message: 'Ресурс отсутствует' })
    return Promise.reject(error)
  }

  if (error.response && error.response.status === 413) {
    ElNotification({ type: 'error',zIndex:99999,title: 'Ошибка', message: 'Слишком большой объем данных' })
    return Promise.reject(error)
  }

  if (error.response && error.response.status === 422) {
    let $validationMessage = error.response?.data?.errors
    ElNotification.error({
      title: 'Ошибка',zIndex:99999,message: Object.values($validationMessage).join('\n') ?? 'Обратитесь к разработчикам.'
    })
    return Promise.reject(error)
  }

  if (error.response && error.response.status === 500) {
    ElNotification({ type: 'error',zIndex:99999,title: 'Ошибка', message: errorMessage ?? 'Обратитесь к разработчикам.' })
    return Promise.reject(error)
  }

  if (error.response?.data?.errors) {
    errorMessage = Object.values(error.response.data.errors).flat().toString()
  }
  ElNotification({ type: 'error', title: 'Ошибка',zIndex:99999,  message: errorMessage ?? 'Нераспознання ошибка' })

  return Promise.reject(error)
})

export default api
