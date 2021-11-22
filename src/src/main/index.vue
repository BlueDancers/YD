<template>
  <page-header></page-header>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from '@/components/header.vue'
export default defineComponent({
  name: 'Main',
  components: {
    PageHeader,
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
.main {
  padding-top: 50px;
  min-height: 100vh;
}
</style>