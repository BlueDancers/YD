<template>
  <div class="page_list">
    <div class="padd">
      <a-button type="primary" @click="toggleModal">新建页面</a-button>
    </div>
    <!-- {{ status }} -->
    <!-- 具体数据 -->
    <div class="pagelist_main" v-if="listData.length > 0">
      <div class="list_item" v-for="item in listData" :key="item._id" @mouseover="mouseOver" @mouseout="mouseOut">
        <img class="item_img" v-if="item.tumbUrl.length" :src="`${item.tumbUrl[0]}?t=${new Date().getTime()}`" />
        <img class="item_img" v-else src="@/assets/error-img.png" />
        <div class="item_back"></div>
        <!-- 默认 -->
        <div class="item_data">
          <div class="data_item">
            <div class="data_item_right">{{ item.routerName }}</div>
          </div>
          <div class="data_item">
            <div class="data_item_left">网页类型:</div>
            <div class="data_item_right">{{ item.pageType == 1 ? '长页面' : '滚动页' }}</div>
          </div>
        </div>
        <!-- 选中 -->
        <div class="item_data_hover">
          <div class="hover_item" @click="gotoPage(item)">
            <svg-icon name="bianji" :style="{ width: '24px', height: '24px', color: '#000' }"></svg-icon>
            <span class="hover_item_text">编辑</span>
          </div>
          <div class="hover_item">
            <svg-icon name="chakan" :style="{ width: '24px', height: '24px', color: '#000' }"></svg-icon>
            <span class="hover_item_text">查看</span>
          </div>
          <a-dropdown placement="bottomLeft">
            <div>其他</div>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <div @click="gotoDelete(item)">删除页面</div>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <!-- 新建页面 -->
    <new-modal :showNewModal="showNewModal" @closeModal="toggleModal"></new-modal>
    <!-- 其他状态 -->
    <div>
      <!-- 加载中 -->
      <a-empty class="none_cont" v-if="status == 'none'">
        <template #description> 没有页面 </template>
      </a-empty>
      <!-- 加载状态 -->
      <a-spin class="none_cont" size="large" v-if="status == 'loading'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { message } from 'ant-design-vue'
import { useCloud } from '@/utils/Hook/useRequest'
import { useReq } from '@/utils/Hook/useRqe'
import newModal from './component/newModal'
export default defineComponent({
  components: {
    newModal,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useAppStore()
    const { run, data, status } = useReq<any>()
    const showNewModal = ref(false)
    onMounted(() => {
      init()
    })
    async function init() {
      run(
        useCloud('pageList')
          .where({
            organizeId: route.query.id,
          })
          .get()
      )
    }
    // 切换页面弹窗
    function toggleModal() {
      showNewModal.value = !showNewModal.value
    }
    // 前往编辑
    function gotoPage(data) {
      router.push({
        name: 'content',
        query: {
          id: data._id,
        },
      })
    }
    // 删除页面
    async function gotoDelete(data) {
      await useCloud('pageList')
        .where({ _id: data._id })
        .remove()
        .then(() => {
          message.success('删除成功~')
          init()
        })
        .catch((err) => {
          console.log(err)
        })
      if (store.userData.uid == data._openid) {
      } else {
        message.error('不可以删除别人创建的哦')
      }
    }

    function mouseOver(evt) {
      // console.log(evt)
    }

    function mouseOut(evt) {
      // console.log(evt)
    }
    return {
      listData: data,
      status,
      gotoPage,
      gotoDelete,
      showNewModal,
      toggleModal,
      mouseOver,
      mouseOut,
    }
  },
})
</script>

<style lang="scss" scoped>
.page_list {
  .pagelist_main {
    padding-left: 20px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .list_item {
      background-color: #fff;
      position: relative;
      border: 1px solid #eee;
      margin-left: 14px;
      margin-bottom: 16px;
      width: 210px;
      height: 280px;
      box-shadow: 2px 2px 4px #eee;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .right_icon {
        display: none;
        position: absolute;
        z-index: 100;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background-color: #fff;
        text-align: center;
        line-height: 20px;
      }
      .item_img {
        border-radius: 4px;
        height: 200px;
        max-width: 200px;
        margin: 4px 0;
        object-fit: cover;
      }
      .item_back {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        position: absolute;
        left: 0px;
        right: 0px;
        height: 210px;
        transition: all 0.3s;
      }
      .item_data {
        border-top: 1px solid #eee;
        padding: 0 4px;
        width: 100%;
        height: 60px;
        background-color: #fff;
        transition: all 0.3s;
        padding-top: 6px;
        .data_item {
          margin: 4px 0;
          margin-left: 4px;
          display: flex;
          .data_item_left {
            text-align: right;
            width: 60px;
          }
          .data_item_right {
          }
        }
      }
      .item_data_hover {
        padding: 0 20px;
        box-sizing: border-box;
        width: 100%;
        display: none;
        height: 80px;
        cursor: pointer;
        .hover_item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
      &:hover {
        box-shadow: 4px 4px 8px #eee;
        .right_icon {
          display: block;
        }
        .item_back {
          background-color: rgba(0, 0, 0, 0.5);
        }
        .item_data {
          display: none;
        }
        .item_data_hover {
          display: flex;
          align-items: center;
          justify-content: space-around;
          .hover_item_text {
            margin-top: 4px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
.thmb_img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
</style>
