<template>
  <div>页面管理</div>
</template>

<script setup lang="ts">
// let item = {
//   img: '', // 缩略图
//   router: '', // 路由
//   title: '', // 网页名称
//   organizeId:'' // 组织id
//   _id: '', // 网页id
//   createTime: '', // 创建时间
// }

import { useCloud } from '@/utils/request'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const organizeId = ref('')

onMounted(() => {
  console.log()
  organizeId.value = String(route.params.groupId)
  useCloud('pageList')
    .where({
      organizeId: route.params.groupId,
    })
    .get()
    .then((res) => {
      console.log(res)
    })
})
</script>

<style scoped></style>
