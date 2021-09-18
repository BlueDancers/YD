<template>
  <img :style="cssModule" :src="staticData.src" alt="" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['cssModule', 'staticData'],
  setup(props) {
    return {
      cssModule: props.cssModule,
      staticData: props.staticData,
    }
  },
})
</script>

<style scoped></style>
