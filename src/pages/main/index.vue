<template>
  <div>222</div>
</template>

<script setup lang="ts">
import { useCloud } from '@/utils/request'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const pageId = ref('')

onMounted(() => {
  pageId.value = String(route.params.id)
  useCloud('pageDetails')
    .where({
      pageId: pageId.value,
    })
    .get()
    .then((res) => {
      console.log(res)
    })
})
</script>

<style scoped></style>
