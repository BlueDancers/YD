<template>
  <div class="page_list">
    <div class="padd">
      <a-button type="primary" @click="openNewModal">新建页面</a-button>
    </div>
    <!-- {{ status }} -->
    <!-- 具体数据 -->
    <div class="pagelist_main" v-if="listData.length > 0">
      <div class="list_item" v-for="item in listData" :key="item._id" @click="gotoPage(item)">
        <img class="item_img" v-if="item.tumbUrl" :src="item.tumbUrl" />
        <img class="item_img" v-else src="@/assets/error-img.png" />
        <div class="item_back"></div>
        <div class="item_data">
          <div class="data_item">
            <div class="data_item_left">网页名称:</div>
            <div class="data_item_right">{{ item.routerName }}</div>
          </div>
          <div class="data_item">
            <div class="data_item_left">网页路由:</div>
            <div class="data_item_right">{{ item.router }}</div>
          </div>
          <div class="data_item">
            <div class="data_item_left">网页类型:</div>
            <div class="data_item_right">{{ item.pageType == 1 ? '长页面' : '滚动页' }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 其他状态 -->
    <div>
      <!-- 加载中 -->
      <a-empty class="none_cont" v-if="status == 'none'">
        <template #description> 没有页面 </template>
      </a-empty>
      <!-- 加载状态 -->
      <a-spin class="none_cont" size="large" v-if="status == 'loading'" />
    </div>
    <a-modal v-model:visible="showNewModal" title="新建页面" @ok="newPage" :rules="rules">
      <a-form :ref="newPageRef" :model="newPageState" name="routerName">
        <a-form-item label="页面名称">
          <a-input placeholder="请输入页面名称" v-model:value="newPageState.routerName" />
        </a-form-item>
        <a-form-item label="页面路径" name="router">
          <a-input addon-before="/" placeholder="请输入页面路径" v-model:value="newPageState.router" />
        </a-form-item>
        <a-form-item label="页面类型" name="pageType">
          <a-radio-group v-model:value="newPageState.pageType">
            <a-radio :value="1">长页面</a-radio>
            <a-radio :value="2">滚动页</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="页面描述" name="disp">
          <a-textarea placeholder="请输入页面描述" v-model:value="newPageState.disp" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { message } from 'ant-design-vue'
import { useCloud } from '@/utils/Hook/useRequest'
import { useReq } from '@/utils/Hook/useRqe'
import { log } from 'console'
export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {
      init()
    })

    // 统一依赖
    const route = useRoute()
    const router = useRouter()
    const store = useAppStore()
    const { run, data, status } = useReq<any>()
    const showNewModal = ref(false)
    const newPageRef = ref()
    const newPageState = reactive({
      router: '', // 自定义路由名称
      routerName: '', // 自定义网页名称
      disp: '', // 描述字段
      pageType: 1, // 1 长单页模式 2 滑动页模式
    })
    const rules = {
      router: [{ required: true, message: '请输入页面路径', trigger: 'blur' }],
      routerName: [{ required: true, message: '请输入页面名称', trigger: 'blur' }],
      disp: [{ required: true, message: '请输入页面详情', trigger: 'blur' }],
      pageType: [{ required: true, message: '请选择页面类型', trigger: 'blur' }],
    }
    // 请求数据
    async function init() {
      run(
        useCloud('pageList')
          .where({
            organizeId: route.query.id,
          })
          .get()
      )
    }
    // 打开新建页面弹窗
    function openNewModal() {
      showNewModal.value = true
    }
    /**
     * 新建页面
     */
    const newPage = async () => {
      // newPageRef.value
      //   .validate()
      //   .then(() => {
      //     console.log('values')
      //   })
      //   .catch((error) => {
      //     console.log('error', error)
      //   })
      if (newPageState.router == '') {
        message.error('请输入页面路由')
        return
      }
      if (newPageState.routerName == '') {
        message.error('请输入页面名称')
        return
      }
      let listRes: any = await useCloud('pageList').add({
        organizeId: route.query.id, // 群组id
        tumbUrl: '', // 缩略图
        backColor: '#ffffff',
        ...newPageState,
      })
      console.log('页面数据填充完成')
      await useCloud('pageDetails').add({
        pageId: listRes.id,
        content: [],
      })
      console.log('装修数据填充完成')
      router.push({
        name: 'content',
        query: {
          id: listRes.id,
        },
      })
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
      if (store.userData.uid == data._openid) {
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
      } else {
        message.error('不可以删除别人创建的哦')
      }
    }
    return {
      newPage,
      listData: data,
      status,
      gotoPage,
      gotoDelete,
      showNewModal,
      openNewModal,
      newPageState,
      rules,
      newPageRef,
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
      width: 270px;
      height: 480px;
      box-shadow: 2px 2px 4px #eee;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .item_img {
        padding: 6px;
        border-radius: 4px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .item_back {
        border-radius: 6px;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        transition: all 0.3s;
      }
      .item_data {
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: #fff;
        transition: all 0.3s;
        opacity: 0;
        padding: 10px;

        .data_item {
          display: flex;
          .data_item_left {
            text-align: right;
            width: 60px;
          }
          .data_item_right {
            margin-left: 6px;
          }
        }
      }
      &:hover {
        box-shadow: 4px 4px 8px #eee;
        .item_back {
          background-color: rgba(0, 0, 0, 0.4);
        }
        .item_data {
          display: block;
          opacity: 1;
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
