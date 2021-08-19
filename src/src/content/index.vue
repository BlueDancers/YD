<template>
  <div class="page_content">
    <a-row class="content_header">
      <a-col class="header_left" :span="5">开发工具</a-col>
      <a-col class="header_centent" :span="14">页面设置按钮</a-col>
      <a-col class="header_right" :span="5">
        <a-button>保存</a-button>
      </a-col>
    </a-row>
    <div class="content_main">
      <page-left></page-left>
      <div class="main_page">
        <div class="main_iframe"></div>
      </div>
      <page-right></page-right>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageLeft from './components/left.vue'
import PageRight from './components/right.vue'
export default defineComponent({
  components: {
    PageLeft,
    PageRight,
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
    .main_page {
      .main_iframe {
        margin-top: 20px;
        background-color: white;
        width: 375px;
        height: 700px;
      }
    }
  }
}
</style>
