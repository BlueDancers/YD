<template>
  <yd-button v-if="item.name == 'y-button'" :compData="item" :isMobile="false"></yd-button>
  <yd-div v-if="item.name == 'y-div'" :compData="item" :isMobile="false"></yd-div>
  <yd-img v-if="item.name == 'y-img'" :compData="item" :isMobile="false"></yd-img>
  <yd-edit v-else-if="item.name == 'y-edit'" :compData="item" :isMobile="false"></yd-edit>
  <yd-p v-else-if="item.name == 'y-p'" :compData="item" :isMobile="false"></yd-p>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    default: () => {},
    type: Object,
  },
})
</script>

<style scoped></style>
