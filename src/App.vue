<template>
  <HeaderBlock/>
  <router-view/>
</template>
<script setup>
import HeaderBlock from './components/HeaderBlock.vue'
import { ref } from 'vue'

let centerDialogVisible = ref(false)
</script>
<style lang="scss">
.el-select {
  width: 100%;
  .el-input {
    width: 100%;
  }
}
</style>
