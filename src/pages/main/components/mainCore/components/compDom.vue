<template>
  <y-button v-if="item.name == 'y-button'" :compData="item"></y-button>
  <y-div v-else-if="item.name == 'y-div'" :compData="item"></y-div>
  <y-img v-else-if="item.name == 'y-img'" :compData="item"></y-img>
  <y-edit v-else-if="item.name == 'y-edit'" :compData="item"></y-edit>
  <y-p v-else-if="item.name == 'y-p'" :compData="item"></y-p>
</template>

<script setup lang="ts">
import yButton from '@/pages/main/dragComp/yButton.vue'
import YDiv from '@/pages/main/dragComp/yDiv.vue'
import YImg from '@/pages/main/dragComp/yImg.vue'
import YEdit from '@/pages/main/dragComp/yEdit.vue'
import yP from '@/pages/main/dragComp/yP.vue'
const props = defineProps({
  item: {
    default: () => {},
    type: Object,
  },
})
</script>

<style scoped></style>
