<template>
  <div class="page_content">
    <a-row class="content_header">
      <a-col class="header_left" :span="5">开发工具</a-col>
      <a-col class="header_centent" :span="14">页面设置按钮</a-col>
      <a-col class="header_right" :span="5">
        <a-button>保存</a-button>
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
import { defineComponent } from 'vue'
import PageLeft from './components/left.vue'
import PageRight from './components/right.vue'
import PageCenter from './components/center.vue'

export default defineComponent({
  components: {
    PageLeft,
    PageRight,
    PageCenter,
  },
  setup() {
    return {}
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
