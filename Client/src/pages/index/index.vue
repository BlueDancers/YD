<template>
  <div v-for="item in domData" :key="item.id" :style="resetCss(item.cssModule)">
    <template v-for="c in item.components" :key="c.id">
      <component :is="c.name" :cssModule="resetCss(c.cssModule)" :staticData="c.staticData"></component>
    </template>
  </div>
</template>

<script lang="ts">
import { cloud } from '@/modules/request'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { resetCss } from '../../utils/index'
import YImg from '../../component/YImg.vue'
import YP from '../../component/YP.vue'
import YButton from '../../component/YButton.vue'

export default defineComponent({
  components: {
    YImg,
    YP,
    YButton
  },
  setup() {
    const db = cloud.database()
    const route = useRoute()
    const domData: any = ref([])
    console.log(route.params)
    onMounted(async () => {
      let parentData = await db
        .collection('organize')
        .where({
          routerCode: route.params.pid,
        })
        .get()
      console.log()
      if (parentData.data.length != 1) {
        console.log('组织不存在')
        return
      }
      let _id = parentData.data[0]._id
      console.log({ organizeId: _id, router: route.params.pid })

      let pageData = await db
        .collection('pageList')
        .where({
          organizeId: _id,
          router: route.params.cid,
        })
        .get()
      if (pageData.data.length != 1) {
        console.log('页面不存在')
        return
      }
      processPageData(pageData.data[0])
    })
    function processPageData(data) {
      console.log(data.content)
      document.title = data.routerName
      document.body.style.backgroundColor = data.backColor
      domData.value = data.content
    }
    return {
      domData,
      resetCss,
    }
  },
})
</script>

<style scoped></style>
