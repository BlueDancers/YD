<template>
  <div class="content_right">右侧</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.content_right {
  background-color: #f8f9fa;
  width: 340px;
  height: calc(100vh - 50px);
}
</style>
