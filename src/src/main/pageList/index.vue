<template>
  <div class="page_list">
    <div class="padd">
      <a-button type="primary" @click="newPage">新建页面</a-button>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { message } from 'ant-design-vue'
import { useCloud } from '@/utils/Hook/useRequest'
import { useReq } from '@/utils/Hook/useRqe'
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
    // 表格数据
    // 表格部分逻辑
    const columns = [
      {
        title: '页面缩略图',
        align: 'center',
        slots: { customRender: 'thmb' },
      },
      {
        title: '页面描述',
        dataIndex: 'disp',
      },
      {
        title: '页面路由',
        dataIndex: 'router',
      },
      {
        title: '页面描述',
        dataIndex: 'disp',
      },
      {
        title: '页面名称',
        dataIndex: 'routerName',
      },
      {
        title: '操作',
        slots: { customRender: 'action' },
      },
    ]

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
    /**
     * 新建页面
     */
    const newPage = async () => {
      await useCloud('pageList')
        .add({
          organizeId: route.query.id, // 群组id
          router: '', // 自定义路由名称
          routerName: '', // 自定义网页名称
          disp: '', // 描述阻断
          tumbUrl: '', // 缩略图
          backColor: '#ffffff',
          content: [], // 页面数据
        })
        .then((res: any) => {
          console.log(res)
          router.push({
            name: 'content',
            query: {
              id: res.id,
            },
          })
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
      columns,
      newPage,
      listData: data,
      status,
      gotoPage,
      gotoDelete,
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
