<template>
  <div
      class="mb-1"
      style="position: relative;
    width: 100%;"
  >
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo fixed-top"
        mode="horizontal"
        background-color="#5389bf"
        text-color="#fff"
        :router="true"
        active-text-color="#ffd04b"
    >
      <el-menu-item
          index="Home"
          :route="{name: 'Home'}"
      >
        Home
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import Outbound from '@/pages/flights/Outbound.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

let activeIndex = ref('')

onMounted(async () => {
  await router.isReady()
  activeIndex.value = route.name
})

const routeName = computed(() => {
  const routes = {
    '/users': 'Клиенты',
    '/internal-users': 'Модераторы',
  }
  return routes[route.path]
})

const getNameFirstLetter = () => {
  return store.getters['auth/GET_USER_NAME_FIRST_LETTER']
}

const showUserPanel = () => {
  store.commit('theme/CHANGE_USER_PANEL')
}

</script>
<style>
.flex-grow {
  flex-grow: 1;
}

</style>
