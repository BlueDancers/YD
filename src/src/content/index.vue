<template>
  <div class="page_content">
    <a-row class="content_header">
      <a-col class="header_left" :span="5">开发工具</a-col>
      <a-col class="header_centent" :span="14">页面设置按钮</a-col>
      <a-col class="header_right" :span="5">
        <a-button @click="saveCarryPage" type="primary">保存</a-button>
      </a-col>
    </a-row>
    <!-- 操作台 -->
    <div class="content_main">
      <page-left></page-left>
      <page-center></page-center>
      <page-right></page-right>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import PageLeft from './components/left.vue'
import PageRight from './components/right.vue'
import PageCenter from './components/center.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { cloud } from '@/modules/request'
export default defineComponent({
  components: {
    PageLeft,
    PageRight,
    PageCenter,
  },
  setup() {
    const db = cloud.database()
    const route = useRoute()
    const store = useStore()
    onMounted(() => {
      let id: string = String(route.query.id)
      db.collection('pageList')
        .doc(id)
        .get()
        .then((res) => {
          if (res.data.length == 1) {
            store.commit('core/changeContList', res.data[0].content)
          }else {
            console.log('获取页面数据失败');
          }
        })
    })
    let containerList = computed(() => store.state.core.containerList)
    const saveCarryPage = () => {
      console.log(containerList.value)
      db.collection('pageList')
        .where({
          _id: route.query.id,
        })
        .update({
          content: containerList.value,
        })
        .then((res) => {
          console.log(res)
        })
    }
    return {
      saveCarryPage,
    }
  },
})
</script>

<style lang="scss" scoped>
.page_content {
  .content_header {
    background-color: #f8f9fa;
    height: 50px;
    padding: 0 20px;
    .header_left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .header_centent {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .header_right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .content_main {
    height: calc(100vh - 50px);
    display: flex;
    justify-content: space-between;
  }
}
</style>
